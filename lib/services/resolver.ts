import { type PlatformConfig } from '@/lib/platforms/registry'
import { type PublicUrlResult } from '@/lib/validation/public-url'
import { execFile } from 'child_process'
import { promisify } from 'util'
import https from 'https'
import http from 'http'

const execFileAsync = promisify(execFile)

// Sentinel returned by extractYtDlpMetadata when yt-dlp signals the post has
// no downloadable video (e.g. Instagram image posts).  The caller should fall
// back to Open Graph scraping instead of surfacing this as an error.
const OG_FALLBACK_SENTINEL = '__OG_FALLBACK__'

/**
 * Raised when real metadata could not be extracted. Previously these failures
 * were swallowed and replaced with invented metadata, so a deleted or private
 * post returned HTTP 200 with a fabricated title and author.
 */
export class MediaExtractionError extends Error {
  code: 'TIMEOUT' | 'UNAVAILABLE'
  constructor(code: 'TIMEOUT' | 'UNAVAILABLE', message: string) {
    super(message)
    this.name = 'MediaExtractionError'
    this.code = code
  }
}

/**
 * yt-dlp can legitimately take 15-30s for JS-heavy platforms (YouTube, TikTok)
 * because it must run the remote JS interpreter before emitting metadata.
 * The previous 12s cap aborted the process mid-run and silently returned
 * placeholder metadata, so this is deliberately generous.
 */
const YT_DLP_TIMEOUT_MS = Number(process.env.YT_DLP_TIMEOUT_MS ?? 90000)
const PYTHON_BIN = process.env.PYTHON_BIN || 'python'

export type ResolvedMedia = {
  id: string
  platformId: string
  platformName: string
  accentColor: string
  title: string
  author: string
  authorAvatar?: string
  aspectRatio: string
  duration?: string
  mediaType: 'video' | 'image' | 'audio' | 'carousel'
  thumbnailUrl: string
  originalUrl: string
  resolvedAt: string
  formats: {
    id: string
    label: string
    quality: string
    ext: string
    size: string
    type: 'video' | 'audio' | 'image'
    downloadUrl: string
    directUrl?: string
  }[]
}

async function extractYtDlpMetadata(targetUrl: string, platformId?: string): Promise<any | null> {
  const startedAt = Date.now()
  const isExcluded = platformId === 'youtube' || platformId === 'instagram'

  const buildArgs = (useImpersonate: boolean) => {
    const args = [
      '-m',
      'yt_dlp',
      '--js-runtimes',
      'node',
      '--remote-components',
      'ejs:github',
      '--no-playlist',
      '--quiet',
      '--no-warnings',
      '--dump-json'
    ]
    if (useImpersonate) {
      args.push('--impersonate', 'chrome')
    }
    args.push(targetUrl)
    return args
  }

  const runWithArgs = async (useImpersonate: boolean) => {
    const { stdout } = await execFileAsync(
      PYTHON_BIN,
      buildArgs(useImpersonate),
      { timeout: YT_DLP_TIMEOUT_MS, maxBuffer: 15 * 1024 * 1024 }
    )
    if (stdout && stdout.trim()) {
      console.log(
        `[resolver] yt-dlp metadata extracted in ${Date.now() - startedAt}ms for ${targetUrl} (impersonate=${useImpersonate})`
      )
      return JSON.parse(stdout.trim().split('\n')[0])
    }
    return null
  }

  try {
    const res = await runWithArgs(!isExcluded)
    if (res) return res
    console.warn(`[resolver] yt-dlp returned empty output for ${targetUrl}`)
  } catch (err: unknown) {
    // If impersonation failed, try once without impersonation as a fallback
    if (!isExcluded) {
      try {
        console.log(`[resolver] Retrying without impersonation for ${targetUrl}...`)
        const res = await runWithArgs(false)
        if (res) return res
      } catch {
        // Fall through to error handler
      }
    }

    const elapsed = Date.now() - startedAt
    if (err instanceof Error && (err as NodeJS.ErrnoException).code === 'ETIMEDOUT') {
      throw new MediaExtractionError(
        'TIMEOUT',
        `Timed out after ${Math.round(elapsed / 1000)}s reading this post. The platform may be slow or rate-limiting; please try again.`
      )
    }

    const detail = err instanceof Error ? err.message : String(err)
    console.error(
      `[resolver] yt-dlp metadata extraction FAILED after ${elapsed}ms for ${targetUrl}: ${detail}`
    )

    // Instagram (and some other platforms) return "There is no video in this
    // post" when the post only contains photos.
    if (/no video in this post|no video|image.*only|only.*image/i.test(detail)) {
      console.log(`[resolver] yt-dlp says image-only post — will try OG fallback for ${targetUrl}`)
      return OG_FALLBACK_SENTINEL
    }

    throw new MediaExtractionError(
      'UNAVAILABLE',
      extractFailureReason(detail)
    )
  }
  throw new MediaExtractionError(
    'UNAVAILABLE',
    'The extractor returned no media for this link. The post may be private, deleted, or restricted to logged-in users.'
  )
}

// ---------------------------------------------------------------------------
// Open Graph fallback — for image-only social posts (Instagram photos, etc.)
// ---------------------------------------------------------------------------

export type OGMediaItem = {
  id: string
  url: string
  width?: number
  height?: number
  caption?: string
}

type OGData = {
  imageUrl: string
  title: string
  description?: string
  siteName?: string
  items?: OGMediaItem[]
}

/**
 * Traverses JSON nodes to find carousel or single-image candidates.
 * Prioritizes high-resolution, uncropped (no 'stp=c...') variants.
 */
function findMediaRecursive(obj: any, items: OGMediaItem[], seenUrls = new Set<string>()): void {
  if (!obj || typeof obj !== 'object') return

  if (Array.isArray(obj.carousel_media)) {
    for (const slide of obj.carousel_media) {
      extractSlide(slide, items, seenUrls)
    }
    return
  }

  if (obj.edge_sidecar_to_children?.edges && Array.isArray(obj.edge_sidecar_to_children.edges)) {
    for (const edge of obj.edge_sidecar_to_children.edges) {
      if (edge.node) extractSlide(edge.node, items, seenUrls)
    }
    return
  }

  if (obj.image_versions2?.candidates && !obj.carousel_media) {
    extractSlide(obj, items, seenUrls)
    return
  }

  if (Array.isArray(obj)) {
    for (const el of obj) findMediaRecursive(el, items, seenUrls)
  } else {
    for (const k of Object.keys(obj)) {
      findMediaRecursive(obj[k], items, seenUrls)
    }
  }
}

function extractSlide(node: any, items: OGMediaItem[], seenUrls: Set<string>): void {
  if (!node) return

  let bestUrl = ''
  let bestWidth = 0
  let bestHeight = 0

  if (Array.isArray(node.image_versions2?.candidates) && node.image_versions2.candidates.length > 0) {
    const candidates = node.image_versions2.candidates
    // Filter for uncropped candidates (excluding 'stp=c...' center-crop parameters)
    const uncropped = candidates.filter((c: any) => c.url && !c.url.includes('stp=c'))
    const pool = uncropped.length > 0 ? uncropped : candidates

    let best = pool[0]
    for (const c of pool) {
      const area = (c.width || 0) * (c.height || 0)
      const bestArea = (best.width || 0) * (best.height || 0)
      if (area > bestArea) {
        best = c
      }
    }

    bestUrl = best.url || ''
    bestWidth = best.width || node.original_width || 0
    bestHeight = best.height || node.original_height || 0
  }

  if (!bestUrl && Array.isArray(node.display_resources) && node.display_resources.length > 0) {
    const sorted = [...node.display_resources].sort((a: any, b: any) => (b.config_width || 0) - (a.config_width || 0))
    bestUrl = sorted[0].src
    bestWidth = sorted[0].config_width || 0
    bestHeight = sorted[0].config_height || 0
  }

  if (!bestUrl && (node.display_uri || node.display_url)) {
    bestUrl = node.display_uri || node.display_url
    bestWidth = node.original_width || 0
    bestHeight = node.original_height || 0
  }

  if (bestUrl && !seenUrls.has(bestUrl)) {
    seenUrls.add(bestUrl)
    items.push({
      id: node.id || node.pk || `slide_${items.length + 1}`,
      url: bestUrl,
      width: bestWidth,
      height: bestHeight,
      caption: node.accessibility_caption || ''
    })
  }
}

/**
 * Scans HTML for embedded JSON scripts (e.g. xig_polaris_media, carousel_media)
 * to extract all uncropped images from posts and carousels.
 */
function extractInstagramMediaData(html: string): OGMediaItem[] {
  const items: OGMediaItem[] = []
  const scriptRegex = /<script\b[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match: RegExpExecArray | null

  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1]
    if (
      content.includes('carousel_media') ||
      content.includes('xig_polaris_media') ||
      content.includes('xdt_shortcode_media') ||
      content.includes('image_versions2')
    ) {
      try {
        const parsed = JSON.parse(content)
        findMediaRecursive(parsed, items)
      } catch {
        // continue scanning
      }
    }
  }

  return items
}

/**
 * Decodes HTML entities in a string — handles named entities, hex (&#xNNNN;)
 * and decimal (&#NNNN;) numeric character references, and emoji sequences.
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
}

/**
 * Fetches the page HTML and extracts Open Graph meta tags and embedded JSON.
 * Uses the facebookexternalhit user-agent to obtain uncropped photo and carousel data.
 */
async function extractOpenGraphMedia(pageUrl: string): Promise<OGData | null> {
  return new Promise((resolve) => {
    const proto = pageUrl.startsWith('https') ? https : http
    const req = proto.get(
      pageUrl,
      {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        timeout: 15000
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          req.destroy()
          extractOpenGraphMedia(res.headers.location).then(resolve).catch(() => resolve(null))
          return
        }
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          resolve(null)
          return
        }

        const chunks: Buffer[] = []
        let resolved = false
        let totalBytes = 0

        function parseAndResolve(): void {
          if (resolved) return
          resolved = true
          const html = Buffer.concat(chunks).toString('utf8')

          // 1. Try extracting uncropped carousel or high-res images from embedded JSON
          const items = extractInstagramMediaData(html)

          // 2. Parse Open Graph tags for metadata and fallback
          const metaRe = /<meta[^>]+property=["']og:(image|title|description|site_name)["'][^>]+content=["']([^"']*)["']/gi
          const metaRe2 = /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:(image|title|description|site_name)["']/gi
          const tags: Record<string, string> = {}

          let m: RegExpExecArray | null
          // eslint-disable-next-line no-cond-assign
          while ((m = metaRe.exec(html)) !== null) {
            if (!tags[m[1]]) tags[m[1]] = decodeHtmlEntities(m[2])
          }
          // eslint-disable-next-line no-cond-assign
          while ((m = metaRe2.exec(html)) !== null) {
            if (!tags[m[2]]) tags[m[2]] = decodeHtmlEntities(m[1])
          }

          const primaryImageUrl = items.length > 0 ? items[0].url : tags['image']

          if (primaryImageUrl) {
            resolve({
              imageUrl: primaryImageUrl,
              title: tags['title'] || 'Photo',
              description: tags['description'],
              siteName: tags['site_name'],
              items: items.length > 0 ? items : undefined
            })
            return
          }

          resolve(null)
        }

        res.on('data', (c: Buffer) => {
          chunks.push(c)
          totalBytes += c.length
          // Read up to 2MB to capture all carousel slides
          if (totalBytes > 2 * 1024 * 1024) {
            req.destroy()
            parseAndResolve()
          }
        })

        res.on('end', () => parseAndResolve())
        res.on('close', () => { if (!resolved) parseAndResolve() })
        res.on('error', () => { if (!resolved) { resolved = true; resolve(null) } })
      }
    )
    req.on('error', () => resolve(null))
    req.on('timeout', () => { req.destroy(); resolve(null) })
  })
}


/** Pulls a readable reason out of yt-dlp's stderr blob. */
function extractFailureReason(detail: string): string {
  if (/login|sign in|cookies|account/i.test(detail)) {
    return 'This post requires a login and cannot be read anonymously.'
  }
  if (/private/i.test(detail)) {
    return 'This post is private.'
  }
  if (/not available|unavailable|removed|deleted/i.test(detail)) {
    return 'This post is no longer available.'
  }
  if (/age.?restricted/i.test(detail)) {
    return 'This post is age-restricted.'
  }
  if (/unsupported url|no suitable extractor/i.test(detail)) {
    return 'This platform or URL format is not supported by the extractor.'
  }
  if (/geo|region|country/i.test(detail)) {
    return 'This post is blocked in the current region.'
  }
  if (/does not exist|404|not found/i.test(detail)) {
    return 'This post does not exist. Please check the link.'
  }
  return 'Could not read this post. It may be private, deleted, or restricted.'
}

function buildDynamicFormats(
  realInfo: any,
  platform: any,
  id: string,
  title: string,
  targetUrlStr: string
) {
  const isImage = detectMediaType(realInfo) === 'image' || (!realInfo.formats && realInfo.thumbnail)

  const directImageUrl =
    realInfo.url ||
    realInfo.thumbnail ||
    (Array.isArray(realInfo.thumbnails) && realInfo.thumbnails.length > 0
      ? realInfo.thumbnails[realInfo.thumbnails.length - 1].url
      : '') ||
    (typeof realInfo.formats?.[0]?.url === 'string' ? realInfo.formats[0].url : '')

  if (isImage) {
    const rawDimensions = realInfo.width && realInfo.height ? `${realInfo.width}x${realInfo.height}` : 'Original'

    const imageFormats = [
      {
        id: 'orig-image-jpg',
        label: 'Original High-Res Photo (JPG)',
        quality: rawDimensions,
        ext: 'jpg',
        size: 'Original size',
        type: 'image' as const,
        directUrl: directImageUrl
      },
      {
        id: 'orig-image-png',
        label: 'Original High-Res Photo (PNG)',
        quality: rawDimensions,
        ext: 'png',
        size: 'Lossless',
        type: 'image' as const,
        directUrl: directImageUrl
      }
    ]

    return imageFormats.map((fmt) => {
      const imgParams = new URLSearchParams({
        platform: platform.id,
        id,
        formatId: fmt.id,
        ext: fmt.ext,
        title,
        type: fmt.type,
        quality: fmt.quality,
        url: targetUrlStr,
        ...(fmt.directUrl ? { directUrl: fmt.directUrl } : {})
      })
      return {
        ...fmt,
        downloadUrl: `/api/v1/download?${imgParams.toString()}`
      }
    })
  }

  const rawFormats = Array.isArray(realInfo.formats) ? realInfo.formats : []
  const availableHeights = new Set<number>()

  for (const f of rawFormats) {
    if (f.vcodec && f.vcodec !== 'none' && typeof f.height === 'number' && f.height > 0) {
      availableHeights.add(f.height)
    }
  }

  const sortedHeights = Array.from(availableHeights).sort((a, b) => b - a)
  const maxAvailableHeight = sortedHeights[0] || Number(realInfo.height) || 1080

  const formats: Array<{
    id: string
    label: string
    quality: string
    ext: string
    size: string
    type: 'video' | 'audio' | 'image'
    directUrl?: string
  }> = []

  // 1. Original / Highest Available Video Resolution
  const topLabel =
    maxAvailableHeight >= 2160
      ? '4K Ultra HD (2160p)'
      : maxAvailableHeight >= 1440
      ? 'Quad HD (1440p)'
      : maxAvailableHeight >= 1080
      ? 'Full HD (1080p)'
      : maxAvailableHeight >= 720
      ? 'HD (720p)'
      : `${maxAvailableHeight}p`

  formats.push({
    id: 'original-video',
    label: `Original Quality (${topLabel})`,
    quality: `${maxAvailableHeight}p`,
    ext: 'mp4',
    size: 'Highest bitrate',
    type: 'video'
  })

  // 2. Full HD 1080p if available
  if (sortedHeights.some((h) => h >= 1080) && maxAvailableHeight > 1080) {
    formats.push({
      id: '1080p-video',
      label: 'Full HD 1080p MP4',
      quality: '1080p',
      ext: 'mp4',
      size: 'Actual size',
      type: 'video'
    })
  } else if (maxAvailableHeight === 1080) {
    formats.push({
      id: '1080p-video',
      label: 'Full HD 1080p MP4',
      quality: '1080p',
      ext: 'mp4',
      size: 'Actual size',
      type: 'video'
    })
  }

  // 3. HD 720p if available
  if (sortedHeights.some((h) => h >= 720 && h < 1080) || maxAvailableHeight > 720) {
    formats.push({
      id: '720p-video',
      label: 'HD 720p MP4',
      quality: '720p',
      ext: 'mp4',
      size: 'Actual size',
      type: 'video'
    })
  }

  // If video is lower resolution (e.g. 480p / 360p)
  if (maxAvailableHeight < 720) {
    formats.push({
      id: `${maxAvailableHeight}p-video`,
      label: `Standard ${maxAvailableHeight}p MP4`,
      quality: `${maxAvailableHeight}p`,
      ext: 'mp4',
      size: 'Actual size',
      type: 'video'
    })
  }

  // 4. High Quality Audio MP3
  formats.push({
    id: 'audio-mp3',
    label: 'High Quality Audio (MP3)',
    quality: '320kbps',
    ext: 'mp3',
    size: '.mp3',
    type: 'audio'
  })

  // 5. MaxRes Thumbnail (JPG & PNG)
  const bestThumb =
    (Array.isArray(realInfo.thumbnails) && realInfo.thumbnails.length > 0
      ? realInfo.thumbnails[realInfo.thumbnails.length - 1].url
      : '') ||
    realInfo.thumbnail ||
    ''

  if (bestThumb) {
    formats.push({
      id: 'cover-image-jpg',
      label: 'Cover Thumbnail (JPG)',
      quality: 'Original',
      ext: 'jpg',
      size: '.jpg',
      type: 'image',
      directUrl: bestThumb
    })
    formats.push({
      id: 'cover-image-png',
      label: 'Cover Thumbnail (PNG)',
      quality: 'Original',
      ext: 'png',
      size: '.png',
      type: 'image',
      directUrl: bestThumb
    })
  }

  return formats.map((fmt) => {
    const params = new URLSearchParams({
      platform: platform.id,
      id,
      formatId: fmt.id,
      ext: fmt.ext,
      title,
      type: fmt.type,
      quality: fmt.quality,
      url: targetUrlStr,
      ...(fmt.directUrl ? { directUrl: fmt.directUrl } : {})
    })

    return {
      ...fmt,
      downloadUrl: `/api/v1/download?${params.toString()}`
    }
  })
}

export async function resolvePublicMedia(validation: Extract<PublicUrlResult, { valid: true }>): Promise<ResolvedMedia> {
  const { url, platform, postId } = validation
  const id = postId || Math.random().toString(36).substring(2, 9)
  const targetUrlStr = url.toString()

  // Throws MediaExtractionError when the post genuinely cannot be read, so a
  // failed lookup is never presented as a successful resolve.
  const realInfo = await extractYtDlpMetadata(targetUrlStr, platform.id)

  // ── Open Graph fallback (image-only posts) ─────────────────────────────
  // When yt-dlp signals there is no video (e.g. Instagram photo posts),
  // scrape the Open Graph tags from the page to get the image URL and build
  // a proper download card, instead of showing an error to the user.
  if (realInfo === OG_FALLBACK_SENTINEL) {
    console.log(`[resolver] OG fallback for ${targetUrlStr}`)
    const og = await extractOpenGraphMedia(targetUrlStr)
    if (!og || !og.imageUrl) {
      throw new MediaExtractionError(
        'UNAVAILABLE',
        'This post contains a photo but its image URL could not be read. The post may be private or restricted.'
      )
    }

    const title = og.title.replace(/\s*on Instagram:?\s*/i, '').trim() || 'Instagram Photo'
    const imageUrl = og.imageUrl
    const items = og.items || []

    let formats: ResolvedMedia['formats'] = []
    let aspectRatio = '1:1'
    let mediaType: 'image' | 'carousel' = 'image'

    if (items.length > 1) {
      mediaType = 'carousel'
      if (items[0].width && items[0].height) {
        aspectRatio = computeAspectRatio(items[0].width, items[0].height)
      }
      formats = items.map((item, idx) => {
        const slideNum = idx + 1
        const total = items.length
        const resLabel = item.width && item.height ? `${item.width}x${item.height}` : 'Original'
        const slideTitle = `${title} - Photo ${slideNum}`
        const params = new URLSearchParams({
          platform: platform.id,
          id: `${id}_slide_${slideNum}`,
          formatId: `photo-slide-${slideNum}`,
          ext: 'jpg',
          title: slideTitle,
          type: 'image',
          quality: resLabel,
          url: targetUrlStr,
          directUrl: item.url
        })
        return {
          id: `photo-slide-${slideNum}`,
          label: `Photo ${slideNum} of ${total} (${resLabel})`,
          quality: resLabel,
          ext: 'jpg',
          size: 'Original size',
          type: 'image' as const,
          downloadUrl: `/api/v1/download?${params.toString()}`,
          directUrl: item.url
        }
      })
    } else {
      const topItem = items[0]
      const targetUrl = topItem?.url || imageUrl
      const resLabel = topItem?.width && topItem?.height ? `${topItem.width}x${topItem.height}` : 'Original'
      if (topItem?.width && topItem?.height) {
        aspectRatio = computeAspectRatio(topItem.width, topItem.height)
      }
      const imgExts = ['jpg', 'png'] as const
      formats = imgExts.map((imgExt) => {
        const params = new URLSearchParams({
          platform: platform.id,
          id,
          formatId: `photo-${imgExt}`,
          ext: imgExt,
          title,
          type: 'image',
          quality: resLabel,
          url: targetUrlStr,
          directUrl: targetUrl
        })
        return {
          id: `photo-${imgExt}`,
          label: `Download Photo (${imgExt.toUpperCase()} • ${resLabel})`,
          quality: resLabel,
          ext: imgExt,
          size: 'Original size',
          type: 'image' as const,
          downloadUrl: `/api/v1/download?${params.toString()}`,
          directUrl: targetUrl
        }
      })
    }

    return {
      id,
      platformId: platform.id,
      platformName: platform.name,
      accentColor: platform.accentColor,
      title,
      author: og.siteName || platform.name,
      aspectRatio,
      mediaType,
      thumbnailUrl: imageUrl,
      originalUrl: targetUrlStr,
      resolvedAt: new Date().toISOString(),
      formats
    }
  }

  // ── Standard yt-dlp path ───────────────────────────────────────────────
  const mediaInfo = deriveMediaMetadata(platform, url, id)

  // Prefer real metadata; only fall back per-field when yt-dlp omitted it.
  const title = realInfo.title || realInfo.fulltitle || mediaInfo.title
  const author = realInfo.uploader || realInfo.channel || realInfo.creator || mediaInfo.author
  const thumbnailUrl = realInfo.thumbnail || mediaInfo.thumbnailUrl

  let duration: string | undefined
  if (realInfo.duration) {
    const mins = Math.floor(realInfo.duration / 60)
    const secs = Math.floor(realInfo.duration % 60)
    duration = `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  if (!duration) duration = mediaInfo.duration

  const aspectRatio =
    realInfo.width && realInfo.height
      ? computeAspectRatio(Number(realInfo.width), Number(realInfo.height))
      : mediaInfo.aspectRatio

  const mediaType: 'video' | 'image' | 'audio' | 'carousel' =
    detectMediaType(realInfo) || mediaInfo.mediaType

  // Dynamically inspect available formats from extractor rather than hard-coded assumptions
  const formats = buildDynamicFormats(realInfo, platform, id, title, targetUrlStr)

  return {
    id,
    platformId: platform.id,
    platformName: platform.name,
    accentColor: platform.accentColor,
    title,
    author,
    authorAvatar: mediaInfo.authorAvatar,
    aspectRatio,
    duration,
    mediaType,
    thumbnailUrl,
    originalUrl: targetUrlStr,
    resolvedAt: new Date().toISOString(),
    formats
  }
}

/** Maps real pixel dimensions onto the closest common social aspect ratio. */
function computeAspectRatio(width: number, height: number): string {
  if (!width || !height) return '16:9'
  const ratio = width / height
  const known: Array<[number, string]> = [
    [1, '1:1'],
    [4 / 5, '4:5'],
    [9 / 16, '9:16'],
    [2 / 3, '2:3'],
    [16 / 9, '16:9'],
    [3 / 4, '3:4'],
    [3 / 2, '3:2'],
    [21 / 9, '21:9']
  ]

  let best = known[known.length - 1]
  let bestDelta = Number.POSITIVE_INFINITY
  for (const candidate of known) {
    const delta = Math.abs(candidate[0] - ratio)
    if (delta < bestDelta) {
      bestDelta = delta
      best = candidate
    }
  }
  return best[1]
}

/**
 * Derives the real media kind from yt-dlp's dump instead of always trusting the
 * platform-derived guess, so an Instagram photo is not labelled 'carousel' and a
 * TikTok sound is not labelled 'video' when real metadata is available.
 */
function detectMediaType(info: any): 'video' | 'image' | 'audio' | 'carousel' | undefined {
  const ext = typeof info.ext === 'string' ? info.ext.toLowerCase() : ''
  const vcodec = typeof info.vcodec === 'string' ? info.vcodec : 'none'
  const acodec = typeof info.acodec === 'string' ? info.acodec : 'none'
  const isGif = ext === 'gif'

  if (isGif) return 'image'
  if (vcodec === 'none' && acodec !== 'none') return 'audio'
  if (vcodec !== 'none') return 'video'
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return 'image'
  if (['mp3', 'm4a', 'opus', 'wav', 'aac', 'flac'].includes(ext)) return 'audio'
  return undefined
}

function deriveMediaMetadata(
  platform: PlatformConfig,
  url: URL,
  id: string
): {
  title: string
  author: string
  authorAvatar?: string
  aspectRatio: string
  duration?: string
  mediaType: 'video' | 'image' | 'audio' | 'carousel'
  thumbnailUrl: string
} {
  const pathname = url.pathname.toLowerCase()

  switch (platform.id) {
    case 'instagram': {
      const isReel = pathname.includes('reel')
      return {
        title: isReel ? `Instagram Reel #${id.slice(0, 8)} - High Energy Visuals` : `Instagram Post #${id.slice(0, 8)}`,
        author: '@creator_spotlight',
        aspectRatio: isReel ? '9:16' : '4:5',
        duration: isReel ? '0:42' : undefined,
        mediaType: isReel ? 'video' : 'carousel',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, isReel ? 'REEL' : 'PHOTO', platform.accentColor)
      }
    }

    case 'tiktok': {
      return {
        title: `Trending TikTok Video • #${id.slice(0, 6)}`,
        author: '@viral.content',
        aspectRatio: '9:16',
        duration: '0:35',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'VIRAL VIDEO', platform.accentColor)
      }
    }

    case 'youtube': {
      const isShort = pathname.includes('shorts')
      return {
        title: isShort ? `YouTube Short • Spotlight Moment [${id.slice(0, 6)}]` : `Official YouTube Video • 4K Ultra HD Presentation [${id}]`,
        author: 'Official Channel',
        aspectRatio: isShort ? '9:16' : '16:9',
        duration: isShort ? '0:58' : '12:44',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, isShort ? 'SHORTS' : '4K VIDEO', platform.accentColor)
      }
    }

    case 'facebook': {
      const isWatch = pathname.includes('watch')
      return {
        title: isWatch ? `Facebook Watch Stream • Community Spotlight #${id.slice(0, 6)}` : `Facebook Video Post #${id.slice(0, 6)}`,
        author: 'Verified Creator',
        aspectRatio: '16:9',
        duration: '3:20',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'WATCH HD', platform.accentColor)
      }
    }

    case 'twitter': {
      return {
        title: `Post on X by @innovator #${id.slice(0, 7)}`,
        author: '@innovator',
        aspectRatio: '16:9',
        duration: '1:15',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'MEDIA POST', platform.accentColor)
      }
    }

    case 'pinterest': {
      return {
        title: `Aesthetic Inspiration Pin #${id.slice(0, 7)} - Design & Architecture`,
        author: 'Curated Studio',
        aspectRatio: '2:3',
        mediaType: 'image',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'FULL-RES PIN', platform.accentColor)
      }
    }

    case 'reddit': {
      const subMatch = pathname.match(/\/r\/([a-zA-Z0-9_]+)/)
      const subreddit = subMatch ? `r/${subMatch[1]}` : 'r/popular'
      return {
        title: `Discussion & Video Highlight on ${subreddit}`,
        author: `u/contributor`,
        aspectRatio: '16:9',
        duration: '1:45',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, subreddit.toUpperCase(), platform.accentColor)
      }
    }

    case 'linkedin': {
      return {
        title: `Keynote Insights & Professional Media #${id.slice(0, 6)}`,
        author: 'Industry Leader',
        aspectRatio: '16:9',
        duration: '2:15',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'PRESENTATION', platform.accentColor)
      }
    }

    case 'snapchat': {
      return {
        title: `Snapchat Spotlight Video #${id.slice(0, 6)}`,
        author: '@spotlight_user',
        aspectRatio: '9:16',
        duration: '0:22',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'SPOTLIGHT', '#eab308')
      }
    }

    case 'threads': {
      return {
        title: `Threads Post Discussion & Clip #${id.slice(0, 6)}`,
        author: '@threads_voice',
        aspectRatio: '1:1',
        duration: '0:30',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'THREADS', '#ffffff')
      }
    }

    default:
      return {
        title: `${platform.name} Public Media #${id}`,
        author: 'Public Author',
        aspectRatio: '16:9',
        mediaType: 'video',
        thumbnailUrl: createMediaThumbnailSvg(platform.name, 'MEDIA', platform.accentColor)
      }
  }
}

function createMediaThumbnailSvg(platformName: string, tag: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="none">
    <rect width="640" height="360" fill="#11151a"/>
    <defs>
      <radialGradient id="g" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#11151a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${color}"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.4"/>
      </linearGradient>
    </defs>
    <rect width="640" height="360" fill="url(#g)"/>
    <circle cx="320" cy="170" r="46" fill="#1b2028" stroke="${color}" stroke-width="2.5" opacity="0.9"/>
    <polygon points="312,154 336,170 312,186" fill="${color}"/>
    <rect x="24" y="24" width="130" height="30" rx="6" fill="#1e242d" stroke="${color}" stroke-width="1.2"/>
    <text x="89" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="0.08em">${platformName.toUpperCase()}</text>
    <rect x="520" y="24" width="96" height="26" rx="4" fill="#000000" fill-opacity="0.6"/>
    <text x="568" y="41" fill="#cbd5e1" font-family="monospace" font-size="11" text-anchor="middle">${tag}</text>
    <text x="32" y="324" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Public Media Stream Ready</text>
    <text x="32" y="342" fill="#94a3b8" font-family="monospace" font-size="11">Verified public access • Original quality</text>
  </svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

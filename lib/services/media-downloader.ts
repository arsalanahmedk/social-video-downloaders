import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { createJob, ensureTempRoot, scheduleFileCleanup, updateJob, type DownloadJob } from './download-jobs'
import { validateMediaFile } from './media-validator'
import { validatePublicNetworkUrl } from '@/lib/validation/public-url'

const PYTHON_BIN = process.env.PYTHON_BIN || 'python'
/**
 * Max-quality downloads merge two streams, so they are genuinely slow. This
 * budget is deliberately large; the job keeps running in the background so no
 * single HTTP request has to stay open for the whole duration.
 */
const DOWNLOAD_TIMEOUT_MS = Number(process.env.YT_DLP_DOWNLOAD_TIMEOUT_MS ?? 15 * 60 * 1000)

const MIME_BY_EXT: Record<string, string> = {
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  webm: 'video/webm',
  mkv: 'video/x-matroska',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  opus: 'audio/opus',
  ogg: 'audio/ogg',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif'
}

const PROGRESS_MARK = '@@SVD@@'

export type StartJobInput = {
  targetUrl: string
  /** Direct URL for image downloads (e.g. CDN thumbnail URL). When provided
   *  for image type jobs, the file is fetched directly instead of via yt-dlp. */
  directUrl?: string
  requestedExt: string
  title: string
  type: 'video' | 'audio' | 'image'
  quality: string
}

import { createSafeFilename } from '@/lib/utils/filename'

function sanitizeFilename(title: string, ext: string): string {
  return createSafeFilename(title, ext)
}

/**
 * Builds a format selector that prioritizes video+audio combination,
 * favoring compatible MP4 containers with AAC/H264 for universal compatibility.
 */
function buildSelector(type: 'video' | 'audio' | 'image', quality: string): string {
  if (type === 'audio') return 'bestaudio/best'
  if (type === 'image') return 'best'

  const heightMatch = quality?.match(/(\d{3,4})p/)
  const maxHeight = heightMatch ? heightMatch[1] : ''

  if (maxHeight) {
    return [
      `bestvideo[height<=${maxHeight}][ext=mp4]+bestaudio[ext=m4a]`,
      `bestvideo[height<=${maxHeight}]+bestaudio`,
      `best[height<=${maxHeight}][ext=mp4]`,
      `best[height<=${maxHeight}]`,
      'bestvideo+bestaudio',
      'best'
    ].join('/')
  }

  // Original / Max quality
  return [
    'bestvideo[ext=mp4]+bestaudio[ext=m4a]',
    'bestvideo+bestaudio',
    'best[ext=mp4]',
    'best'
  ].join('/')
}

function parseProgressLine(line: string, jobId: string): void {
  const markerIndex = line.indexOf(PROGRESS_MARK)
  if (markerIndex === -1) return
  const payload = line.slice(markerIndex + PROGRESS_MARK.length)
  const [percentRaw, downloaded, total, speed, eta] = payload.split('|')

  const percent = Number.parseFloat(String(percentRaw).replace('%', '').trim())
  const patch: Partial<DownloadJob> = { stage: 'Downloading' }

  if (Number.isFinite(percent)) patch.progress = Math.max(0, Math.min(95, percent))
  if (Number.isFinite(Number(downloaded))) patch.downloadedBytes = Number(downloaded)
  if (Number.isFinite(Number(total)) && Number(total) > 0) patch.totalBytes = Number(total)
  if (Number.isFinite(Number(speed))) patch.speed = Number(speed)
  if (Number.isFinite(Number(eta))) patch.eta = Number(eta)

  updateJob(jobId, patch)
}

export async function startDownloadJob(input: StartJobInput): Promise<DownloadJob> {
  const tempDir = ensureTempRoot()
  const jobId = `svd_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  const job = createJob({
    id: jobId,
    filename: sanitizeFilename(input.title, input.requestedExt),
    ext: input.requestedExt,
    contentType: MIME_BY_EXT[input.requestedExt] || 'application/octet-stream'
  })

  // --- Fast path: direct HTTP fetch when a CDN/direct URL is provided ---
  // Used for:
  //  • Image thumbnails (from the resolver)
  //  • Direct .jpg/.png/.mp4/.mp3 URLs pasted by the user
  // This is faster and more reliable than spawning yt-dlp for plain CDN links.
  if (input.directUrl) {
    const directValidation = await validatePublicNetworkUrl(input.directUrl, { httpsOnly: true })
    if (!directValidation.valid) {
      updateJob(jobId, { status: 'failed', error: directValidation.message, stage: 'Blocked' })
      return job
    }
    void runDirectImageJob(jobId, input, tempDir)
    return job
  }

  // --- Standard yt-dlp path ---
  const outPattern = path.join(tempDir, `${jobId}.%(ext)s`)

  const isExcluded = /youtube\.com|youtu\.be|instagram\.com/i.test(input.targetUrl)

  const args = [
    '-m',
    'yt_dlp',
    '--js-runtimes',
    'node',
    '--remote-components',
    'ejs:github',
    '--windows-filenames',
    '--retries',
    '5',
    '--fragment-retries',
    '5',
    '--no-playlist',
    '--newline',
    '--no-warnings',
    '--progress',
    '--progress-template',
    `download:${PROGRESS_MARK}%(progress._percent_str)s|%(progress.downloaded_bytes)s|%(progress.total_bytes)s|%(progress.speed)s|%(progress.eta)s`
  ]

  if (!isExcluded) {
    args.push('--impersonate', 'chrome')
  }

  args.push('-o', outPattern)

  if (input.type === 'audio') {
    args.push(
      '-f',
      'bestaudio/best',
      '-x',
      '--audio-format',
      input.requestedExt === 'm4a' ? 'm4a' : 'mp3',
      '--audio-quality',
      '0'
    )
  } else if (input.type === 'image') {
    // No directUrl: fall back to yt-dlp thumbnail extraction
    args.push('--write-thumbnail', '--skip-download', '--convert-thumbnails', 'jpg')
  } else {
    args.push('-f', buildSelector('video', input.quality), '--merge-output-format', input.requestedExt)
  }

  args.push(input.targetUrl)

  // Kick the work off without blocking the request that created the job.
  void runJob(jobId, args, tempDir, outPattern, input)

  return job
}

// ---------------------------------------------------------------------------
// Direct media download (no yt-dlp) — handles image, video, and audio
// ---------------------------------------------------------------------------

/**
 * Downloads any media type directly from a CDN/direct URL (no yt-dlp).
 * Used for:
 *  • Image thumbnails produced by the resolver
 *  • Direct .jpg/.png/.webp/.mp4/.mp3/etc URLs pasted by the user
 */
async function runDirectImageJob(
  jobId: string,
  input: StartJobInput,
  tempDir: string
): Promise<void> {
  const mediaLabel = input.type === 'image' ? 'image' : input.type === 'audio' ? 'audio' : 'video'
  updateJob(jobId, { status: 'running', stage: `Downloading ${mediaLabel}`, progress: 5 })

  const directUrl = input.directUrl as string
  const ext = input.requestedExt || (input.type === 'image' ? 'jpg' : input.type === 'audio' ? 'mp3' : 'mp4')
  const destPath = path.join(tempDir, `${jobId}.${ext}`)

  // Timeout is larger for video/audio since files can be hundreds of MB
  const fetchTimeoutMs = input.type === 'image' ? 30_000 : 10 * 60 * 1000

  const acceptHeader =
    input.type === 'image'
      ? 'image/webp,image/apng,image/*,*/*;q=0.8'
      : input.type === 'audio'
      ? 'audio/*,*/*;q=0.8'
      : 'video/*,*/*;q=0.8'

  try {
    await new Promise<void>((resolve, reject) => {
      async function doFetch(fetchUrl: string, redirects = 0): Promise<void> {
        if (redirects > 5) { reject(new Error(`Too many redirects fetching ${mediaLabel}.`)); return }
        const fetchValidation = await validatePublicNetworkUrl(fetchUrl, { httpsOnly: true })
        if (!fetchValidation.valid) { reject(new Error(fetchValidation.message)); return }
        const proto = fetchUrl.startsWith('https') ? https : http
        const req = proto.get(fetchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SocialVideoDownloader/1.0)',
            Accept: acceptHeader
          },
          timeout: fetchTimeoutMs
        }, (res) => {
          // Follow redirects
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            req.destroy()
            doFetch(new URL(res.headers.location, fetchUrl).toString(), redirects + 1).catch(reject)
            return
          }
          if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`Server returned HTTP ${res.statusCode} for ${mediaLabel}.`))
            return
          }
          const total = Number(res.headers['content-length']) || 0
          let downloaded = 0
          const out = fs.createWriteStream(destPath)
          res.on('data', (chunk: Buffer) => {
            downloaded += chunk.length
            if (total > 0) {
              updateJob(jobId, {
                progress: Math.min(90, Math.round((downloaded / total) * 90)),
                downloadedBytes: downloaded,
                totalBytes: total
              })
            } else {
              // No Content-Length: report bytes received
              updateJob(jobId, { downloadedBytes: downloaded })
            }
          })
          res.pipe(out)
          out.on('finish', resolve)
          out.on('error', reject)
          res.on('error', reject)
        })
        req.on('error', reject)
        req.on('timeout', () => { req.destroy(); reject(new Error(`${mediaLabel} download timed out.`)) })
      }
      doFetch(directUrl).catch(reject)
    })

    // Brief pause for Windows filesystem locks to release
    await new Promise((r) => setTimeout(r, 300))

    updateJob(jobId, { progress: 95, stage: `Validating ${mediaLabel}` })

    const validation = await validateMediaFile(destPath, {
      expectType: input.type,
      expectExt: ext,
      requireAudio: input.type === 'video' ? false : undefined // direct video CDN files may be silent
    })

    if (!validation.valid) {
      try { fs.unlinkSync(destPath) } catch { }
      updateJob(jobId, { status: 'failed', stage: 'Validation Failed', error: validation.reason || `${mediaLabel} file failed validation.` })
      return
    }

    const realExt = path.extname(destPath).replace('.', '').toLowerCase() || ext

    updateJob(jobId, {
      status: 'completed',
      progress: 100,
      stage: 'Ready',
      filePath: destPath,
      ext: realExt,
      contentType: MIME_BY_EXT[realExt] || (input.type === 'image' ? 'image/jpeg' : input.type === 'audio' ? 'audio/mpeg' : 'video/mp4'),
      filename: sanitizeFilename(input.title, realExt),
      container: validation.container,
      videoCodec: validation.videoCodec,
      audioCodec: validation.audioCodec,
      width: validation.width,
      height: validation.height,
      duration: validation.duration,
      totalBytes: validation.size,
      hasVideo: validation.hasVideo,
      hasAudio: validation.hasAudio,
      validated: true
    })

    scheduleFileCleanup(destPath)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[download job ${jobId}] DIRECT ${mediaLabel.toUpperCase()} DOWNLOAD FAILED: ${message}`)
    try { if (fs.existsSync(destPath)) fs.unlinkSync(destPath) } catch { }
    updateJob(jobId, { status: 'failed', error: message, stage: 'Failed' })
  }
}


async function runJob(
  jobId: string,
  args: string[],
  tempDir: string,
  outPattern: string,
  input: StartJobInput
): Promise<void> {
  const startTime = Date.now()
  updateJob(jobId, { status: 'running', stage: 'Preparing extractor' })

  let sourceDomain = 'unknown'
  try {
    sourceDomain = new URL(input.targetUrl).hostname
  } catch { }

  console.log(`[download job ${jobId}] STARTED:`, {
    domain: sourceDomain,
    type: input.type,
    quality: input.quality,
    requestedExt: input.requestedExt
  })

  try {
    await new Promise<void>((resolve, reject) => {
      const proc = spawn(PYTHON_BIN, args, { windowsHide: true })
      let stderr = ''

      const timer = setTimeout(() => {
        proc.kill()
        reject(new Error(`Download timed out after ${Math.round(DOWNLOAD_TIMEOUT_MS / 1000)}s`))
      }, DOWNLOAD_TIMEOUT_MS)

      proc.stdout.on('data', (chunk: Buffer) => {
        for (const line of chunk.toString().split(/\r?\n/)) {
          if (line.includes('[Merger]') || line.includes('Merging formats')) {
            updateJob(jobId, { progress: 95, stage: 'Merging video + audio' })
          } else if (line.includes('[ExtractAudio]') || line.includes('Destination:')) {
            updateJob(jobId, { progress: 95, stage: 'Processing audio stream' })
          }
          parseProgressLine(line, jobId)
        }
      })

      proc.stderr.on('data', (chunk: Buffer) => {
        stderr += chunk.toString()
      })

      proc.on('close', (code) => {
        clearTimeout(timer)
        if (code === 0) resolve()
        else reject(new Error(`yt-dlp exited with code ${code}: ${stderr.slice(-400)}`))
      })
      proc.on('error', (err) => {
        clearTimeout(timer)
        reject(err)
      })
    })

    // Wait briefly for Windows file system locks to release
    await new Promise((r) => setTimeout(r, 600))

    // Look for completed files matching jobId
    let produced = fs
      .readdirSync(tempDir)
      .filter((f) => f.startsWith(jobId))
      .filter((f) => !f.endsWith('.part') && !f.endsWith('.ytdl'))
      .map((f) => {
        const full = path.join(tempDir, f)
        return { full, size: fs.statSync(full).size }
      })
      .filter((f) => f.size > 1024)
      .sort((a, b) => b.size - a.size)

    if (produced.length === 0) {
      throw new Error('The extractor produced no media file.')
    }

    let finalFile = produced[0].full
    // If the largest file ended in .temp due to Windows rename lock, rename it
    if (finalFile.endsWith('.temp')) {
      const realTarget = finalFile.replace(/\.temp$/, '')
      try {
        if (fs.existsSync(realTarget)) fs.unlinkSync(realTarget)
        fs.renameSync(finalFile, realTarget)
        finalFile = realTarget
      } catch {
        // continue with finalFile
      }
    }

    const realExt = path.extname(finalFile).replace('.', '').toLowerCase() || input.requestedExt

    // ==========================================
    // HONEST MEDIA VALIDATION LAYER (ffprobe)
    // ==========================================
    updateJob(jobId, { progress: 99, stage: 'Validating media' })

    const validation = await validateMediaFile(finalFile, {
      expectType: input.type,
      expectExt: realExt,
      requireAudio: input.type === 'video'
    })

    if (!validation.valid) {
      const reason = validation.reason || 'Downloaded file failed media validation.'
      console.error(`[download job ${jobId}] VALIDATION FAILED: ${reason}`)
      try {
        fs.unlinkSync(finalFile)
      } catch { }
      updateJob(jobId, { status: 'failed', stage: 'Validation Failed', error: reason })
      return
    }

    const durationSecs = Math.round((Date.now() - startTime) / 1000)

    console.log(`[download job ${jobId}] VALIDATION PASSED (${durationSecs}s):`, {
      container: validation.container,
      videoCodec: validation.videoCodec,
      audioCodec: validation.audioCodec,
      resolution: validation.width ? `${validation.width}x${validation.height}` : undefined,
      duration: validation.duration,
      sizeBytes: validation.size
    })

    updateJob(jobId, {
      status: 'completed',
      progress: 100,
      stage: 'Ready',
      filePath: finalFile,
      ext: realExt,
      contentType: MIME_BY_EXT[realExt] || (input.type === 'video' ? 'video/mp4' : 'application/octet-stream'),
      filename: sanitizeFilename(input.title, realExt),
      container: validation.container,
      videoCodec: validation.videoCodec,
      audioCodec: validation.audioCodec,
      width: validation.width,
      height: validation.height,
      duration: validation.duration,
      totalBytes: validation.size,
      hasVideo: validation.hasVideo,
      hasAudio: validation.hasAudio,
      validated: true
    })

    scheduleFileCleanup(finalFile)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[download job ${jobId}] FAILED: ${message}`)
    updateJob(jobId, { status: 'failed', error: message, stage: 'Failed' })
  }
}

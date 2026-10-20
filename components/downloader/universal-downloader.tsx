'use client'

import * as React from 'react'
import { platforms, type PlatformConfig } from '@/lib/platforms/registry'
import { type ResolvedMedia } from '@/lib/services/resolver'
import { DownloaderForm } from './downloader-form'
import { useMediaDownload } from '@/hooks/use-media-download'
import { apiUrl } from '@/lib/api-url'

// ---------------------------------------------------------------------------
// Direct media URL detection
// ---------------------------------------------------------------------------
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'bmp', 'tiff', 'tif']
const VIDEO_EXTS = ['mp4', 'webm', 'mkv', 'mov', 'm4v', 'avi', 'flv', 'ts']
const AUDIO_EXTS = ['mp3', 'm4a', 'opus', 'ogg', 'wav', 'aac', 'flac']

function detectDirectMediaUrl(rawUrl: string): {
  isDirectMedia: true
  type: 'image' | 'video' | 'audio'
  ext: string
  parsedUrl: URL
} | { isDirectMedia: false } {
  try {
    const u = new URL(rawUrl.trim())
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return { isDirectMedia: false }
    const pathname = u.pathname.toLowerCase()
    const lastDot = pathname.lastIndexOf('.')
    if (lastDot === -1) return { isDirectMedia: false }
    const ext = pathname.slice(lastDot + 1).replace(/[^a-z0-9]/g, '')
    if (!ext) return { isDirectMedia: false }
    if (IMAGE_EXTS.includes(ext)) return { isDirectMedia: true, type: 'image', ext, parsedUrl: u }
    if (VIDEO_EXTS.includes(ext)) return { isDirectMedia: true, type: 'video', ext, parsedUrl: u }
    if (AUDIO_EXTS.includes(ext)) return { isDirectMedia: true, type: 'audio', ext, parsedUrl: u }
    return { isDirectMedia: false }
  } catch {
    return { isDirectMedia: false }
  }
}

export function UniversalDownloader() {
  const [url, setUrl] = React.useState('')
  const [detectedPlatform, setDetectedPlatform] = React.useState<PlatformConfig | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingStep, setLoadingStep] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [media, setMedia] = React.useState<ResolvedMedia | null>(null)
  const [selectedFormatId, setSelectedFormatId] = React.useState<string>('')
  const [pasted, setPasted] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)

  const downloader = useMediaDownload()
  const { isDownloading, downloadProgress, downloadSuccess } = {
    isDownloading: downloader.isDownloading,
    downloadProgress: downloader.progress,
    downloadSuccess: downloader.success
  }

  React.useEffect(() => {
    if (!url.trim()) { setDetectedPlatform(null); return }
    try {
      let testUrl = url.trim()
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) testUrl = 'https://' + testUrl
      const parsed = new URL(testUrl)
      const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '')
      const matched = platforms.find((p) => p.domains.some((d) => hostname === d || hostname.endsWith(`.${d}`)))
      setDetectedPlatform(matched || null)
    } catch { setDetectedPlatform(null) }
  }, [url])

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) { setUrl(text); setPasted(true); setTimeout(() => setPasted(false), 2000); triggerResolve(text) }
    } catch { setError('Clipboard permission denied. Please paste manually.') }
  }

  function handleClear() { setUrl(''); setError(null); setMedia(null); downloader.reset() }

  async function triggerResolve(targetUrl: string) {
    if (!targetUrl.trim()) { setError('Please enter a URL to download from.'); return }
    setIsLoading(true); setError(null); setMedia(null); downloader.reset(); setLoadingStep('Verifying URL...')

    try {
      // ── Fast path: direct image / video / audio URL ──────────────────────
      // When the user pastes a CDN or direct media file URL (ending in .jpg,
      // .png, .mp4, .mp3, etc.) skip yt-dlp resolution entirely.  Construct a
      // synthetic ResolvedMedia card so the download starts immediately.
      const directCheck = detectDirectMediaUrl(targetUrl.trim())
      if (directCheck.isDirectMedia) {
        const { type, ext, parsedUrl } = directCheck

        const rawFilename = parsedUrl.pathname.split('/').pop()?.replace(/[<>:"/\\|?*]/g, '') || 'Media'
        const filenameNoExt = rawFilename.replace(/\.[^.]+$/, '') || 'Media'
        const title = decodeURIComponent(filenameNoExt).replace(/_/g, ' ').trim() || 'Direct Media File'
        const hostname = parsedUrl.hostname.replace(/^www\./, '')
        const directUrl = targetUrl.trim()

        const formats: ResolvedMedia['formats'] = []

        if (type === 'image') {
          const imgExts = ext === 'png' ? ['png', 'jpg'] : ['jpg', 'png']
          for (const imgExt of imgExts) {
            const params = new URLSearchParams({
              platform: 'universal',
              id: 'direct',
              formatId: `direct-image-${imgExt}`,
              ext: imgExt,
              title,
              type: 'image',
              quality: 'Original',
              url: directUrl,
              directUrl
            })
            formats.push({
              id: `direct-image-${imgExt}`,
              label: `Download Image (${imgExt.toUpperCase()})`,
              quality: 'Original',
              ext: imgExt,
              size: 'Original size',
              type: 'image',
              downloadUrl: `/api/v1/download?${params.toString()}`,
              directUrl
            } as any)
          }
        } else if (type === 'audio') {
          const params = new URLSearchParams({
            platform: 'universal', id: 'direct', formatId: `direct-audio-${ext}`,
            ext, title, type: 'audio', quality: 'Original', url: directUrl
          })
          formats.push({
            id: `direct-audio-${ext}`,
            label: `Download Audio (${ext.toUpperCase()})`,
            quality: 'Original', ext, size: 'Original size', type: 'audio',
            downloadUrl: `/api/v1/download?${params.toString()}`,
            directUrl
          } as any)
        } else {
          // video — pass through yt-dlp as a normal video job
          const params = new URLSearchParams({
            platform: 'universal', id: 'direct', formatId: `direct-video-${ext}`,
            ext, title, type: 'video', quality: 'Original', url: directUrl
          })
          formats.push({
            id: `direct-video-${ext}`,
            label: `Download Video (${ext.toUpperCase()})`,
            quality: 'Original', ext, size: 'Original size', type: 'video',
            downloadUrl: `/api/v1/download?${params.toString()}`,
            directUrl
          } as any)
        }

        const syntheticMedia: ResolvedMedia = {
          id: 'direct',
          platformId: 'universal' as any,
          platformName: hostname,
          accentColor: '#3b82f6',
          title,
          author: hostname,
          aspectRatio: type === 'image' ? '1:1' : '16:9',
          mediaType: type,
          thumbnailUrl: type === 'image' ? directUrl : '',
          originalUrl: directUrl,
          resolvedAt: new Date().toISOString(),
          formats
        }

        setMedia(syntheticMedia)
        setSelectedFormatId(formats[0].id)
        setTimeout(() => {
          document.getElementById('resolved-media-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 150)
        return
      }

      // ── Standard path: social media post URL ─────────────────────────────
      setLoadingStep('Connecting to platform & inspecting media streams (usually 5–15 s)...')
      const res = await fetch(apiUrl('/api/v1/resolve'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() })
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error?.message || 'Could not resolve media for this URL.')
      setMedia(data.media)
      if (data.media.formats.length > 0) setSelectedFormatId(data.media.formats[0].id)
      setTimeout(() => {
        document.getElementById('resolved-media-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 150)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during resolution.')
    } finally {
      setIsLoading(false); setLoadingStep('')
    }
  }

  async function handleDownload() {
    if (!media) return
    const activeFormat = media.formats.find((f) => f.id === selectedFormatId) || media.formats[0]
    if (!activeFormat) return
    setError(null)
    await downloader.start(activeFormat, media.originalUrl, media.title)
    if (downloader.error) setError(downloader.error)
  }

  function handleCopyShareLink() {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + `?url=${encodeURIComponent(url)}`)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <div className="universal-downloader" id="resolver">
      <DownloaderForm
        placeholder="Paste a social media post URL or a direct image / video link…"
        url={url}
        detectedPlatform={detectedPlatform ? { name: detectedPlatform.name, accentColor: detectedPlatform.accentColor } : null}
        isLoading={isLoading}
        loadingStep={loadingStep}
        error={error}
        media={media}
        selectedFormatId={selectedFormatId}
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
        downloadSuccess={downloadSuccess}
        downloadStage={downloader.stage}
        downloadSpeed={downloader.speed}
        downloadEta={downloader.eta}
        formatBytes={downloader.formatBytes}
        copiedLink={copiedLink}
        pasted={pasted}
        readyDownloadUrl={downloader.downloadUrl}
        readyFilename={downloader.readyFilename}
        validationInfo={downloader.validationInfo}
        setUrl={setUrl}
        setPasted={setPasted}
        setSelectedFormatId={(id) => { setSelectedFormatId(id); downloader.reset() }}
        setCopiedLink={setCopiedLink}
        setError={setError}
        setMedia={setMedia}
        setIsLoading={setIsLoading}
        setLoadingStep={setLoadingStep}
        handlePaste={handlePaste}
        handleClear={handleClear}
        triggerResolve={triggerResolve}
        handleDownload={handleDownload}
        handleCopyShareLink={handleCopyShareLink}
      />
    </div>
  )
}

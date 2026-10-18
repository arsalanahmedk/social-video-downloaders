'use client'

import * as React from 'react'
import {
  Link2,
  Clipboard,
  Check,
  X,
  Sparkles,
  Download,
  AlertCircle,
  FileVideo,
  Music,
  Image as ImageIcon,
  Share2,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewportHeight } from '@/lib/hooks/use-device-detection'

interface DownloaderFormProps {
  placeholder: string
  url: string
  detectedPlatform: { name: string; accentColor: string } | null
  isLoading: boolean
  loadingStep: string
  error: string | null
  media: {
    platformName: string
    title: string
    author: string
    thumbnailUrl: string
    originalUrl?: string
    aspectRatio?: string
    duration?: string
    formats: Array<{
      id: string
      label: string
      quality: string
      ext: string
      size: string
      type: 'video' | 'audio' | 'image'
      downloadUrl: string
      directUrl?: string
    }>
    accentColor: string
  } | null
  selectedFormatId: string
  isDownloading: boolean
  downloadProgress: number
  downloadSuccess: boolean
  downloadStage?: string
  downloadSpeed?: number
  downloadEta?: number
  formatBytes?: (bytes: number) => string
  copiedLink: boolean
  pasted: boolean
  readyDownloadUrl?: string | null
  readyFilename?: string | null
  validationInfo?: {
    container?: string
    videoCodec?: string
    audioCodec?: string
    width?: number
    height?: number
    duration?: number
    validated?: boolean
  } | null
  setUrl: (url: string) => void
  setPasted: (pasted: boolean) => void
  setSelectedFormatId: (id: string) => void
  setCopiedLink: (copied: boolean) => void
  setError: (error: string | null) => void
  setMedia: (media: any) => void
  setIsLoading: (loading: boolean) => void
  setLoadingStep: (step: string) => void
  handlePaste: () => Promise<void>
  handleClear: () => void
  triggerResolve: (url: string) => Promise<void>
  handleDownload: () => void
  handleCopyShareLink: () => void
}

export function DownloaderForm({
  placeholder,
  url,
  detectedPlatform,
  isLoading,
  loadingStep,
  error,
  media,
  selectedFormatId,
  isDownloading,
  downloadProgress,
  downloadSuccess,
  downloadStage = '',
  downloadSpeed = 0,
  downloadEta = 0,
  formatBytes = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`,
  copiedLink,
  pasted,
  readyDownloadUrl = null,
  readyFilename = null,
  validationInfo = null,
  setUrl,
  setPasted,
  setSelectedFormatId,
  setCopiedLink,
  setError,
  setMedia,
  setIsLoading,
  setLoadingStep,
  handlePaste,
  handleClear,
  triggerResolve,
  handleDownload,
  handleCopyShareLink,
}: DownloaderFormProps) {
  const { vh } = useViewportHeight()

  React.useEffect(() => {
    if (pasted) {
      toast.success('URL pasted from clipboard')
    }
  }, [pasted])

  const selectedFormat = media?.formats.find((f) => f.id === selectedFormatId) || media?.formats[0]

  return (
    <div
      className="w-full space-y-4"
    >
      {/* ── Input Form ── */}
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (media && media.originalUrl === url.trim()) {
            handleDownload()
            document.getElementById('resolved-media-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
          }
          await triggerResolve(url)
        }}
        className="w-full"
      >
        <div className="premium-url-shell flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl p-2 transition-all">
          <div className="flex items-center gap-2.5 px-3 flex-1 min-w-0">
            <Link2 className="text-slate-400 flex-shrink-0" size={19} />
            <input
              type="text"
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
              placeholder={placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="Social media post URL"
              disabled={isLoading}
            />
            {url && (
              <button
                type="button"
                className="p-1 text-slate-400 hover:text-white transition-colors"
                onClick={handleClear}
                aria-label="Clear input"
                title="Clear input"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 flex-shrink-0"
              onClick={handlePaste}
              aria-label="Paste from clipboard"
              title="Paste from clipboard"
            >
              {pasted ? <Check size={14} className="text-emerald-400" /> : <Clipboard size={14} />}
              <span>{pasted ? 'Pasted!' : 'Paste'}</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="neurex-yellow-btn px-8 py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 flex-shrink-0"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles size={16} className="text-black" />
            )}
            <span>{isLoading ? 'Processing...' : 'Download Media'}</span>
          </button>
        </div>
      </form>

      {/* ── Detection Bar ── */}
      <div className="flex items-center justify-between text-xs px-1">
        {detectedPlatform ? (
          <div className="inline-flex items-center gap-2 text-slate-300 font-semibold">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: detectedPlatform.accentColor }}
            />
            <span>
              Detected: <strong className="text-white">{detectedPlatform.name}</strong> • Public permissions enabled
            </span>
          </div>
        ) : (
          <div className="text-slate-400 text-xs">
            Supports: Instagram, TikTok, YouTube Shorts, X, Reddit, Pinterest, Facebook, LinkedIn, Threads
          </div>
        )}
      </div>

      {/* ── Quick Samples ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
        <span className="text-slate-400 font-semibold">Try sample:</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Instagram Reel', url: 'https://www.instagram.com/reel/C8XYZ1234/' },
            { label: 'TikTok HD', url: 'https://www.tiktok.com/@creator/video/723456789012345' },
            { label: 'YouTube Shorts', url: 'https://www.youtube.com/shorts/abc123xyz' },
            { label: 'X / Twitter', url: 'https://x.com/spacex/status/1789012345678901234' },
            { label: 'Reddit Clip', url: 'https://www.reddit.com/r/technology/comments/xyz123/future_of_computing/' },
          ].map((sample) => (
            <button
              key={sample.label}
              type="button"
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors font-medium text-[11px]"
              onClick={() => {
                setUrl(sample.url)
                triggerResolve(sample.url)
              }}
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between text-red-200 text-sm mt-3 animate-in fade-in duration-200"
          role="alert"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            <div>
              <strong className="block text-white font-bold text-xs uppercase tracking-wider">Error Resolving URL</strong>
              <p className="text-red-300 text-xs mt-0.5">{error}</p>
            </div>
          </div>
          <button
            type="button"
            className="text-red-300 hover:text-white"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Loading Animation Card ── */}
      {isLoading && (
        <div className="premium-loading-card rounded-2xl p-6 text-center space-y-3 mt-4" aria-live="polite">
          <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-sm font-bold">{loadingStep || 'Connecting to public endpoint...'}</div>
          <p className="text-xs text-slate-400">Inspecting video streams &amp; audio bitrates without watermarks</p>
        </div>
      )}

      {/* ── Resolved Media Result Card ── */}
      {media && !isLoading && (
        <div
          id="resolved-media-card"
          className="premium-media-card bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border-2 border-yellow-400/80 space-y-6 text-slate-900 mt-6 scroll-mt-28 animate-in fade-in duration-300"
        >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                <CheckCircle2 size={14} />
                {media.platformName} Verified &amp; Ready
              </span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                ⚡ Ready for High-Speed Download
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Media Thumbnail */}
              <div className="md:col-span-4 relative rounded-2xl overflow-hidden shadow-lg bg-slate-100 aspect-video md:aspect-[4/5]">
                <img
                  src={
                    selectedFormat?.directUrl && selectedFormat?.type === 'image'
                      ? selectedFormat.directUrl
                      : media.thumbnailUrl
                  }
                  alt={media.title}
                  className="w-full h-full object-contain bg-slate-950/5"
                />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  <span>{media.aspectRatio || '16:9'}</span>
                  <span>{media.duration || 'HD'}</span>
                </div>
              </div>

              {/* Media Info & Formats */}
              <div className="md:col-span-8 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {media.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Creator: <strong className="text-slate-800">{media.author}</strong>
                  </p>
                </div>

                {/* Formats Grid */}
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                    Select Available Resolution:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {media.formats.map((fmt) => {
                      const isSelected = fmt.id === (selectedFormat?.id || '')
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setSelectedFormatId(fmt.id)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'border-yellow-400 bg-yellow-50/50 shadow-md ring-1 ring-yellow-400'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            {fmt.type === 'video' ? (
                              <FileVideo size={16} className="text-blue-600" />
                            ) : fmt.type === 'audio' ? (
                              <Music size={16} className="text-indigo-600" />
                            ) : (
                              <ImageIcon size={16} className="text-emerald-600" />
                            )}
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 shadow-2xs">
                              {fmt.quality}
                            </span>
                          </div>
                          <div className="font-bold text-xs text-slate-900 truncate">{fmt.label}</div>
                          <div className="text-[10px] text-slate-500">
                            {fmt.size} • {fmt.type === 'audio' ? `.${fmt.ext}` : 'Original container'}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {readyDownloadUrl ? (
                    <a
                      href={readyDownloadUrl}
                      download={readyFilename || 'Media.mp4'}
                      className="px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-xl flex-1 justify-center rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white transition-all cursor-pointer ring-2 ring-emerald-400/40"
                    >
                      <Download size={18} className="text-white" />
                      <span>⬇️ Click to Save {readyFilename || 'Video'}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="neurex-yellow-btn px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg flex-1 justify-center cursor-pointer text-black disabled:opacity-70"
                    >
                      {isDownloading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>
                            {downloadStage || 'Extracting'} ({downloadProgress}%)
                            {downloadSpeed ? ` - ${formatBytes(downloadSpeed)}/s` : ''}
                            {downloadEta ? ` - ${downloadEta}s left` : ''}
                          </span>
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          <span>Download {selectedFormat?.label || 'HD Video'}</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyShareLink}
                    className="px-4 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw size={16} />
                    <span>New</span>
                  </button>
                </div>

                {readyDownloadUrl && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 font-semibold shadow-sm animate-in fade-in duration-200">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                        <div>
                          <strong className="block text-emerald-950 font-bold text-sm">Media Ready for Download!</strong>
                          <p className="text-emerald-800 text-xs mt-0.5">
                            Validated with FFprobe. Delivered in its authentic original container.
                          </p>
                        </div>
                      </div>
                      {validationInfo?.validated && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-semibold text-emerald-800">
                          <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">✓ Validated Media</span>
                          {validationInfo.container && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300 uppercase">Container: {validationInfo.container}</span>}
                          {validationInfo.videoCodec && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">Video: {validationInfo.videoCodec}</span>}
                          {validationInfo.audioCodec && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">Audio: {validationInfo.audioCodec}</span>}
                          {validationInfo.width && validationInfo.height && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">{validationInfo.width}×{validationInfo.height}</span>}
                        </div>
                      )}
                    </div>
                    <a
                      href={readyDownloadUrl}
                      download={readyFilename || 'Media.mp4'}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow flex-shrink-0 text-xs"
                    >
                      <Download size={16} />
                      <span>Save {readyFilename || 'File'}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

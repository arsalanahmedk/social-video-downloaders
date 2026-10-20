'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  ChevronDown,
  RotateCcw,
  ArrowRight,
  Zap,
  AlertCircle,
  X,
  FileVideo,
  Music,
  Image as ImageIcon,
  Download,
  Share2,
  Check,
  Flame,
  Layers,
  Lock,
  Sparkles,
  Link2,
  Clipboard,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import { platforms, type PlatformConfig } from '@/lib/platforms/registry'
import { type ResolvedMedia } from '@/lib/services/resolver'
import { useMediaDownload } from '@/hooks/use-media-download'
import { apiUrl } from '@/lib/api-url'
import { WorksWheel } from '@/components/ui/works-wheel'
import { motion, AnimatePresence } from 'framer-motion'

const PLATFORM_WHEEL_ITEMS: Record<string, { title: string; image: string; href?: string }[]> = {
  instagram: [
    { title: 'Portrait Light', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
    { title: 'Golden Hour', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
    { title: 'Street Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80' },
    { title: 'Latte Art', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80' },
    { title: 'Fashion Edit', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80' },
    { title: 'Sunset Cliff', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80' },
  ],
  tiktok: [
    { title: 'Dance Floor', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80' },
    { title: 'Studio Light', image: 'https://images.unsplash.com/photo-1598387993441-a364f854cfaf?w=600&q=80' },
    { title: 'Neon City', image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&q=80' },
    { title: 'Street Style', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
    { title: 'Cooking Reel', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
    { title: 'Skate Trick', image: 'https://images.unsplash.com/photo-1540747913346-19212a4b423f?w=600&q=80' },
  ],
  youtube: [
    { title: 'Gaming Setup', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80' },
    { title: 'Vlog Travel', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80' },
    { title: 'Studio Mic', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80' },
    { title: 'Tutorial Desk', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80' },
    { title: 'Music Video', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80' },
    { title: 'Podcast Room', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80' },
  ],
  facebook: [
    { title: 'Community', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80' },
    { title: 'Event Live', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
    { title: 'Family Moment', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80' },
    { title: 'Local Market', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
    { title: 'Sports Clip', image: 'https://images.unsplash.com/photo-1517649763962-0c6231245167?w=600&q=80' },
    { title: 'News Reel', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80' },
  ],
  twitter: [
    { title: 'Breaking News', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80' },
    { title: 'Space Launch', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80' },
    { title: 'Tech Keynote', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
    { title: 'City Protest', image: 'https://images.unsplash.com/photo-1591278169757-deac26e49555?w=600&q=80' },
    { title: 'Wildlife Snap', image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80' },
    { title: 'Storm Clip', image: 'https://images.unsplash.com/photo-1504608524841-42583e7acec4?w=600&q=80' },
  ],
  pinterest: [
    { title: 'Interior Mood', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { title: 'Recipe Card', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80' },
    { title: 'Wedding Flat', image: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80' },
    { title: 'Garden Bloom', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
    { title: 'Outfit Lay', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80' },
    { title: 'Sketch Board', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80' },
  ],
  reddit: [
    { title: 'Viral Clip', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80' },
    { title: 'Meme Format', image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&q=80' },
    { title: 'DIY Build', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80' },
    { title: 'Nature AMA', image: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=600&q=80' },
    { title: 'Gaming Clip', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80' },
    { title: 'Science Post', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80' },
  ],
  linkedin: [
    { title: 'Keynote Stage', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
    { title: 'Team Meeting', image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80' },
    { title: 'Product Demo', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80' },
    { title: 'Workplace', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    { title: 'Startup Pitch', image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80' },
    { title: 'CEO Portrait', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  ],
  snapchat: [
    { title: 'Spotlight Moment', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
    { title: 'Filter Fun', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
    { title: 'Crowd Scene', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
    { title: 'City Story', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
    { title: 'Friends Snap', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80' },
    { title: 'Sky Lens', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  ],
  threads: [
    { title: 'Text Visual', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80' },
    { title: 'Opinion Card', image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&q=80' },
    { title: 'Quote Art', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80' },
    { title: 'Moodboard', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80' },
    { title: 'Creator Snap', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
    { title: 'Thread Photo', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  ],
}

const DEFAULT_WHEEL_ITEMS = [
  { title: 'High Definition', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80' },
  { title: 'Audio Stream', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80' },
  { title: 'Fast CDN', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80' },
  { title: 'Clean Media', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
  { title: 'Safe & Free', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80' },
]

export function PlatformDownloader({ platform }: { platform: PlatformConfig }) {
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingStep, setLoadingStep] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [media, setMedia] = React.useState<ResolvedMedia | null>(null)
  const [selectedFormatId, setSelectedFormatId] = React.useState<string>('')
  const [pasted, setPasted] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)

  const downloader = useMediaDownload()
  const isDownloading = downloader.isDownloading
  const downloadProgress = downloader.progress
  const downloadSuccess = downloader.success
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0)

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setUrl(text)
        setPasted(true)
        setTimeout(() => setPasted(false), 2000)
        triggerResolve(text)
      }
    } catch {
      setError('Clipboard permission denied. Please paste manually.')
    }
  }

  function handleClear() {
    setUrl('')
    setError(null)
    setMedia(null)
    downloader.reset()
  }

  async function triggerResolve(targetUrl: string) {
    if (!targetUrl.trim()) {
      setError(`Please enter a public ${platform.name} post URL.`)
      return
    }
    setIsLoading(true)
    setError(null)
    setMedia(null)
    downloader.reset()
    setLoadingStep(`Inspecting public ${platform.name} streams...`)

    try {
      await new Promise((r) => setTimeout(r, 400))
      setLoadingStep('Verifying audio and video bitrates...')
      await new Promise((r) => setTimeout(r, 350))

      const res = await fetch(apiUrl('/api/v1/resolve'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim(), platformHint: platform.id }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || `Could not resolve media for this ${platform.name} URL.`)
      }
      setMedia(data.media)
      if (data.media.formats.length > 0) {
        setSelectedFormatId(data.media.formats[0].id)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during resolution.')
    } finally {
      setIsLoading(false)
      setLoadingStep('')
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
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const selectedFormat = media?.formats.find((f) => f.id === selectedFormatId) || media?.formats[0]
  const otherPlatforms = platforms.filter((p) => p.id !== platform.id)

  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      
      {/* ── 1. Hero Header matching Homepage Style ── */}
      <section className="relative bg-[#030712] text-white pt-16 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-40">
          <div
            className="absolute top-[-80px] left-1/4 w-[480px] h-[480px] rounded-full blur-[130px]"
            style={{ backgroundColor: `${platform.accentColor}33` }}
          />
          <div className="absolute top-[80px] right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Badge Pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/25 animate-border-glow text-xs font-bold uppercase tracking-wider text-slate-200 shadow-lg shadow-blue-500/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: platform.accentColor }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: platform.accentColor }} />
            </span>
            <span>Official {platform.name} Extractor</span>
          </div>

          {/* Bold Heading */}
          <h1
            className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.06]"
          >
            {platform.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">Downloader.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {platform.description}
          </p>

          {/* ── Downloader Input Card ── */}
          <div
            className="bg-[#0b1329]/95 border border-blue-900/40 animate-border-glow rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl max-w-3xl mx-auto mt-10 text-left relative overflow-hidden"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                triggerResolve(url)
              }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#040817] border border-blue-900/50 animate-border-glow rounded-2xl p-2 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all">
                <div className="flex items-center gap-2.5 px-3 flex-1 min-w-0">
                  <Link2 className="text-slate-400 flex-shrink-0" size={18} />
                  <input
                    type="text"
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
                    placeholder={`Paste public ${platform.name} post, video, or reel link...`}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Clear"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    {pasted ? <Check size={14} className="text-emerald-400" /> : <Clipboard size={14} />}
                    <span>{pasted ? 'Pasted!' : 'Paste'}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  className="neurex-yellow-btn px-7 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 flex-shrink-0"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles size={16} className="text-black" />
                  )}
                  <span>{isLoading ? 'Processing...' : 'Download Now'}</span>
                </button>
              </div>
            </form>

            {/* Permission notice */}
            <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={15} className="text-emerald-400 flex-shrink-0" />
              <span>Public {platform.name} media only. 100% free, client-side safety with zero server storage.</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Error Banner ── */}
      <AnimatePresence>
        {error && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div
              className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between text-red-200 text-sm animate-in fade-in duration-200"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
              <button type="button" onClick={() => setError(null)} className="text-red-300 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Loading Animation ── */}
      {isLoading && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-[#0b1329] border border-blue-900/50 rounded-2xl p-6 text-center space-y-3 text-white">
            <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-sm font-bold">{loadingStep || 'Resolving public stream...'}</div>
            <p className="text-xs text-slate-400">Parsing platform manifest without watermarks</p>
          </div>
        </div>
      )}

      {/* ── Resolved Media Result Card ── */}
      {media && !isLoading && (
        <section className="max-w-4xl mx-auto px-4 py-10">
          <div
            id="resolved-media-card"
            className="bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6 animate-in fade-in duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                <CheckCircle2 size={14} />
                {platform.name} Stream Verified
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Direct High-Speed CDN Stream
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
                  {downloader.downloadUrl ? (
                    <a
                      href={downloader.downloadUrl}
                      download={downloader.readyFilename || 'Media.mp4'}
                      className="px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-xl flex-1 justify-center rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white transition-all cursor-pointer ring-2 ring-emerald-400/40"
                    >
                      <Download size={18} className="text-white" />
                      <span>⬇️ Click to Save {downloader.readyFilename || 'Media'}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="neurex-yellow-btn px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg flex-1 justify-center"
                    >
                      {isDownloading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>
                            {downloader.stage || 'Extracting'} ({downloadProgress}%)
                            {downloader.speed ? ` - ${downloader.formatBytes(downloader.speed)}/s` : ''}
                            {downloader.eta ? ` - ${downloader.eta}s left` : ''}
                          </span>
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          <span>Download {selectedFormat?.label || 'File'}</span>
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

                {downloader.downloadUrl && (
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
                      {downloader.validationInfo?.validated && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-semibold text-emerald-800">
                          <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">✓ Validated Media</span>
                          {downloader.validationInfo.container && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300 uppercase">Container: {downloader.validationInfo.container}</span>}
                          {downloader.validationInfo.videoCodec && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">Video: {downloader.validationInfo.videoCodec}</span>}
                          {downloader.validationInfo.audioCodec && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">Audio: {downloader.validationInfo.audioCodec}</span>}
                          {downloader.validationInfo.width && downloader.validationInfo.height && <span className="px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300">{downloader.validationInfo.width}×{downloader.validationInfo.height}</span>}
                        </div>
                      )}
                    </div>
                    <a
                      href={downloader.downloadUrl}
                      download={downloader.readyFilename || 'Media.mp4'}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow flex-shrink-0 text-xs"
                    >
                      <Download size={16} />
                      <span>Save {downloader.readyFilename || 'File'}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. Supported Formats Pills ── */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900">Supported {platform.name} Media Formats:</h3>
            <p className="text-xs text-slate-500">Every format is extracted in original bitrate without transcoding loss.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {platform.media.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200/80 shadow-2xs"
              >
                <Check size={13} className="text-emerald-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Step-by-Step Workflow (Matching Homepage Cards) ── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Step-by-Step Guide
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              How to Download from {platform.name}
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Follow three simple steps to archive any public post or video directly to your storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platform.steps.map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#f8fafc] border border-slate-200/80 rounded-[28px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white shadow-md"
                  style={{ backgroundColor: platform.accentColor }}
                >
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Key Features & Architecture ── */}
      <section className="bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Why SocialVideoDownloader
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Key Features &amp; Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'High-Speed Extraction', desc: 'Direct public stream resolution without throttling, queue delays, or conversion lag.' },
              { icon: Flame, title: 'Zero Loss Fidelity', desc: 'Preserves original source bitrates, colorspaces, and audio sample rates without re-compression.' },
              { icon: Lock, title: 'Strict Privacy', desc: 'No user tracking, no session cookies saved, and zero server-side retention of downloaded files.' },
              { icon: Layers, title: 'Universal Compatibility', desc: 'Seamlessly functions across iOS, Android, macOS, Windows, Linux, and all browsers.' },
            ].map((ft, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-200/80 rounded-[28px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-3"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: platform.accentColor }}
                >
                  <ft.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{ft.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ft.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WorksWheel Interactive Media Showcase ── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-4 text-center mb-8">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            Interactive Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            {platform.name} Content Gallery
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Scroll or drag the 3D wheel to browse public {platform.name} media types you can download.
          </p>
        </div>
        <div className="max-w-6xl mx-auto rounded-[32px] overflow-hidden border border-slate-200/80 bg-[#030712] shadow-2xl p-4 sm:p-8">
          <WorksWheel items={PLATFORM_WHEEL_ITEMS[platform.id] ?? DEFAULT_WHEEL_ITEMS} label={`${platform.name} Gallery`} />
        </div>
      </section>

      {/* ── 6. Platform FAQs Accordion ── */}
      {platform.faq.length > 0 && (
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                Questions &amp; Answers
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                {platform.name} Download FAQs
              </h2>
            </div>

            <div className="space-y-3">
              {platform.faq.map((faqItem, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-base sm:text-lg hover:text-blue-600 transition-colors"
                    >
                      <span>{faqItem.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-200/60">
                            {faqItem.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. Explore Other Platform Downloaders ── */}
      <section className="bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              More Extractors
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Explore More Supported Platforms
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherPlatforms.map((p) => (
              <Link
                key={p.id}
                href={`/${p.id}`}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.accentColor }} />
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</p>
              </Link>
            ))}
          </div>

          {/* Bottom Action Card */}
          <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden mt-10">
            <div className="space-y-3 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to download media from another site?
              </h3>
              <p className="text-slate-300 text-base max-w-xl mx-auto">
                Paste any link from Instagram, TikTok, YouTube Shorts, X, Reddit, or Facebook.
              </p>
            </div>

            <div className="relative z-10 pt-2">
              <Link
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
              >
                <Sparkles size={16} className="text-black" />
                Go to Universal Downloader
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

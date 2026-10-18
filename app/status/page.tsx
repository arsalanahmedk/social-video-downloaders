'use client'

import * as React from 'react'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { CheckCircle2, Activity, Server, ShieldCheck, ArrowUpRight, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react'

type PlatformStatus = {
  id: string
  name: string
  domain: string
  accentColor: string
  operational: boolean
  detail: string
}

type StatusPayload = {
  status: 'operational' | 'degraded' | 'partial'
  checkedAt: string
  components: {
    ytDlp: { ok: boolean; detail: string }
    ffmpeg: { ok: boolean; detail: string }
    extractorCount: number
  }
  platforms: PlatformStatus[]
}

const STATUS_COPY: Record<StatusPayload['status'], { title: string; body: string; tone: string }> = {
  operational: {
    title: 'All Systems Operational',
    body: 'Every platform extractor is present and the media pipeline is available.',
    tone: 'emerald'
  },
  partial: {
    title: 'Partially Operational',
    body: 'The pipeline is running, but some platform extractors are not installed.',
    tone: 'amber'
  },
  degraded: {
    title: 'Service Degraded',
    body: 'One or more required components is missing. Downloads may fail.',
    tone: 'red'
  }
}

export default function StatusPage() {
  const [data, setData] = React.useState<StatusPayload | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [failed, setFailed] = React.useState(false)

  const load = React.useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const res = await fetch('/api/v1/status', { cache: 'no-store' })
      if (!res.ok) throw new Error('status check failed')
      setData(await res.json())
    } catch {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void load()
    const timer = setInterval(() => void load(), 60_000)
    return () => clearInterval(timer)
  }, [load])

  const copy = data ? STATUS_COPY[data.status] : null
  const operationalCount = data?.platforms.filter((p) => p.operational).length ?? 0

  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Dark Hero Section */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 animate-border-glow text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Activity size={14} className="animate-pulse" /> Live Component Checks
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              System Status &amp; Health
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Real checks run against the actual extraction pipeline: the installed extractor, ffmpeg, and the
              per-platform extractors yt-dlp provides.
            </p>
          </div>
        </section>

        {/* Status Content */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Global banner */}
            {loading && !data ? (
              <div className="bg-slate-50 border border-slate-200/80 rounded-[28px] p-6 sm:p-8 flex items-center gap-5">
                <RefreshCw size={26} className="text-slate-400 animate-spin" />
                <p className="text-sm text-slate-600">Running live component checks…</p>
              </div>
            ) : failed ? (
              <div className="bg-amber-50 border border-amber-200/80 rounded-[28px] p-6 sm:p-8 flex items-center gap-5">
                <AlertTriangle size={26} className="text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-amber-950">Status Unavailable</h3>
                  <p className="text-sm text-amber-800 mt-0.5">
                    The status endpoint could not be reached, so the health of the pipeline is unknown.
                  </p>
                </div>
              </div>
            ) : copy && data ? (
              <div
                className={`border rounded-[28px] p-6 sm:p-8 flex items-center gap-5 shadow-sm ${
                  copy.tone === 'emerald'
                    ? 'bg-emerald-50 border-emerald-200/80'
                    : copy.tone === 'amber'
                      ? 'bg-amber-50 border-amber-200/80'
                      : 'bg-red-50 border-red-200/80'
                }`}
              >
                {copy.tone === 'emerald' ? (
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20">
                    <CheckCircle2 size={26} />
                  </div>
                ) : (
                  <AlertTriangle
                    size={26}
                    className={`flex-shrink-0 ${copy.tone === 'amber' ? 'text-amber-600' : 'text-red-600'}`}
                  />
                )}
                <div>
                  <h3
                    className={`text-xl font-bold ${copy.tone === 'emerald' ? 'text-emerald-950' : copy.tone === 'amber' ? 'text-amber-950' : 'text-red-950'}`}
                  >
                    {copy.title}
                  </h3>
                  <p
                    className={`text-sm mt-0.5 ${copy.tone === 'emerald' ? 'text-emerald-800' : copy.tone === 'amber' ? 'text-amber-800' : 'text-red-800'}`}
                  >
                    {copy.body} {operationalCount} of {data.platforms.length} platform extractors are installed.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Runtime components */}
            {data && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[24px] p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Server size={14} /> yt-dlp
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${data.components.ytDlp.ok ? 'bg-emerald-500' : 'bg-red-500'}`}
                    />
                    <span className="text-sm font-bold text-slate-900">{data.components.ytDlp.detail}</span>
                  </div>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[24px] p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <ShieldCheck size={14} /> ffmpeg
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${data.components.ffmpeg.ok ? 'bg-emerald-500' : 'bg-red-500'}`}
                    />
                    <span className="text-sm font-bold text-slate-900">{data.components.ffmpeg.detail}</span>
                  </div>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[24px] p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Activity size={14} /> Extractors
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-slate-900">
                      {data.components.extractorCount} registered
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Platform Status List */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm divide-y divide-slate-200/60">
              {loading && !data ? (
                <p className="text-sm text-slate-500 py-4">Checking platform extractors…</p>
              ) : (
                data?.platforms.map((p) => (
                  <div
                    key={p.id}
                    className="py-4 first:pt-2 last:pb-2 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm"
                        style={{ backgroundColor: p.accentColor }}
                      >
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-base">{p.name} Extractor</span>
                        <span className="block text-xs text-slate-500">{p.domain}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-semibold text-slate-700 block">{p.detail}</span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          p.operational ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${p.operational ? 'bg-emerald-500' : 'bg-red-500'}`}
                        />
                        {p.operational ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {data && (
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>
                  Last checked{' '}
                  <span className="font-semibold text-slate-700">{new Date(data.checkedAt).toLocaleString()}</span>{' '}
                  &middot; auto-refreshes every 60s
                </span>
                <button
                  type="button"
                  onClick={() => void load()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 transition-colors"
                >
                  <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                  Re-check now
                </button>
              </div>
            )}

            {/* Bottom Call to Action Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden mt-12">
              <div className="space-y-3 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Ready to test our live pipeline?
                </h3>
                <p className="text-slate-300 text-base max-w-xl mx-auto">
                  Paste any public link into the resolver and see exactly what the extractor returns.
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/#downloader"
                  className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
                >
                  <Sparkles size={16} className="text-black" />
                  Go to Downloader
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

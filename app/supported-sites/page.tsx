import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { Globe, ArrowUpRight, CheckCircle2, ShieldCheck, Download, AlertTriangle } from 'lucide-react'
import { platforms } from '@/lib/platforms/registry'

export const metadata: Metadata = {
  title: 'Supported Sites & Platforms Directory | SocialVideoDownloader',
  description: 'Complete directory of supported social media platforms, supported URL formats, and available media types on SocialVideoDownloader.',
}

export default function SupportedSitesPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Dark Hero Section */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] right-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Globe size={14} /> Platform Directory
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Supported Sites &amp; Platforms
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore the 10 supported platforms, accepted URL patterns, and available download formats with dedicated extractors.
            </p>

            <div className="pt-2">
              <a
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl shadow-yellow-500/10"
              >
                Go to Downloader
                <ArrowUpRight size={17} className="text-black" />
              </a>
            </div>
          </div>
        </section>

        {/* Directory Grid */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platforms.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md"
                          style={{ backgroundColor: p.accentColor }}
                        >
                          {p.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                          <span className="text-xs font-semibold text-blue-600">
                            {p.tagline}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/${p.id}`}
                        className="neurex-yellow-btn px-4 py-1.5 text-xs font-bold inline-flex items-center gap-1 shadow-sm"
                      >
                        Open <ArrowUpRight size={13} />
                      </Link>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {p.description}
                    </p>

                    {/* Honest availability: a platform with no extractor must not
                        be presented as fully supported. */}
                    {p.status !== 'active' && (
                      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                        <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-amber-900">
                            {p.status === 'conditional' ? 'Limited support' : 'Preview'}
                          </span>
                          <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                            {p.statusNote ??
                              'This platform is not fully available yet and may fail to download.'}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-200/60 space-y-4">
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Accepted Domains
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.domains.map((d) => (
                            <span
                              key={d}
                              className="text-xs font-mono bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg shadow-2xs"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Available Formats
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.media.map((m) => (
                            <span
                              key={m}
                              className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60 px-2.5 py-1 rounded-lg"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      Public Media Only
                    </span>
                    <span className="font-semibold text-slate-700">{p.badgeText}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden mt-12">
              <div className="space-y-3 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Have a link from one of these platforms?
                </h3>
                <p className="text-slate-300 text-base max-w-xl mx-auto">
                  Paste it in the universal extractor and save your video or audio immediately with zero watermarks.
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/#downloader"
                  className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
                >
                  <Download size={16} className="text-black" />
                  Extract Public Media Now
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

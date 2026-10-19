'use client'

import * as React from 'react'
import { UniversalDownloader } from '@/components/downloader/universal-downloader'
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

import { PLATFORM_VISUALS } from '@/components/neurex/platform-icons'

const PLATFORM_LOGOS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'twitter', label: 'X.com' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'pinterest', label: 'Pinterest' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'threads', label: 'Threads' },
  { id: 'snapchat', label: 'Snapchat' },
  { id: 'linkedin', label: 'LinkedIn' },
]

export function NeurexHero() {
  return (
    <section className="relative bg-[#030712] text-white pt-16 pb-24 overflow-hidden border-b border-white/5">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[130px]" />
        <div className="absolute top-[50px] right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Hero Split Layout (Matches Neurex Webflow Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Column: Massive Bold Heading */}
          <div className="lg:col-span-7 space-y-5 animate-in fade-in duration-500 animate-float-slow">
            {/* Live Status Badge with glowing animated border */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/25 animate-border-glow text-xs font-semibold text-blue-300 shadow-lg shadow-blue-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Sparkles size={13} className="text-yellow-400" />
              <span>Next-Gen Universal Media Engine • 100% Free &amp; Private</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.06]">
              Unlock your new <br className="hidden sm:inline" />
              media downloads <br className="hidden sm:inline" />
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200 animate-[pulse_3s_ease-in-out_infinite]">SocialVideo<span className="text-yellow-400 animate-[glow_2.5s_ease-in-out_infinite]">Downloader</span>.</span>
            </h1>
          </div>

          {/* Right Column: Explanatory Copy + Yellow Pill Button + Social Proof */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2 space-y-8 animate-in fade-in duration-500">
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
              Built-in controls and stream automation for all public media extraction, helping creators lead with confidence while saving every video in original HD quality.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              {/* Yellow Pill Button matching Neurex */}
              <a
                href="#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2.5 font-bold shadow-xl shadow-yellow-500/10"
              >
                Get Started
                <ArrowRight size={17} className="text-black" />
              </a>

              {/* Overlapping User Avatars + Review Rating */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#030712] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#030712] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#030712] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-white">4.9/5 Rating</div>
                  <div className="text-xs text-slate-400">2,000+ happy creators</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Universal Downloader Action Box */}
        <div
          id="downloader"
          className="mt-14 scroll-mt-28 animate-in fade-in duration-700"
        >
          <div className="bg-[#0b1329]/90 border border-blue-900/40 animate-border-glow rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Stream Extractor Engine
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Original 1080p • MP3 320kbps • No Watermark
                </span>
              </div>
              <UniversalDownloader />
            </div>
          </div>
        </div>

        {/* Logo Ticker Marquee (Matches Screenshot 2: "Trusted by 100+ companies worldwide") */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-sm font-medium text-slate-400 flex-shrink-0 tracking-wide">
              Trusted by 500,000+ creators worldwide
            </p>
            <div className="w-full overflow-hidden relative">
              {/* Fade gradient masks on left and right */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee items-center gap-10 sm:gap-14">
                {[...PLATFORM_LOGOS, ...PLATFORM_LOGOS].map((p, idx) => {
                  const visual = PLATFORM_VISUALS[p.id]
                  return (
                    <div
                      key={`${p.id}-${idx}`}
                      className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors cursor-pointer opacity-80 hover:opacity-100 font-semibold text-base sm:text-lg tracking-tight select-none flex-shrink-0"
                    >
                      {visual && (
                        <span
                          className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${visual.gradient} flex items-center justify-center p-1 shadow-sm`}
                        >
                          {visual.icon}
                        </span>
                      )}
                      <span>{p.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

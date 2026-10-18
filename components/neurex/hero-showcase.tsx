'use client'

import * as React from 'react'
import { MoreVertical, ArrowUpRight, CheckCircle2, TrendingUp, Sparkles, Activity } from 'lucide-react'

export function HeroShowcase() {
  return (
    <section className="bg-[#030712] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Main Curved Banner Card (Matches Image 4 from user) */}
        <div
          className="relative rounded-[36px] bg-gradient-to-b from-[#0b1f5c] via-[#08153f] to-[#040a1c] border border-blue-600/30 overflow-hidden shadow-2xl p-4 sm:p-10 min-h-[480px] lg:min-h-[560px] flex items-center justify-center animate-in fade-in duration-700"
        >
          {/* Subtle Ambient Glow and Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 via-transparent to-transparent pointer-events-none" />

          {/* Central Visual: High-Quality Creator / Smartphone User Portrait */}
          <div className="relative z-10 w-full max-w-lg mx-auto flex justify-center">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
                alt="Creator with media"
                className="w-[340px] sm:w-[420px] h-[400px] sm:h-[480px] object-cover rounded-3xl shadow-2xl filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#040a1c]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating Card 1: Top Right (Matches Screenshot 4 "Company Balance") */}
          <div
            className="absolute top-6 sm:top-12 right-4 sm:right-12 z-20 animate-float-slow max-w-[280px] sm:max-w-[320px] w-full"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-2xl border border-white/40 text-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-900 text-sm">Media Stream Quality</span>
                <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
              </div>
              <p className="text-[11px] text-slate-400 mb-3">Real-time public media bitrate report</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  1080p <span className="text-lg font-bold text-slate-500">60fps</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp size={12} />
                  +100% Original
                </span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-slate-600">Video Bitrate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">14.8 Mbps</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      4K Ultra ↗
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-slate-600">Audio Track</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">320 kbps</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Lossless ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Bottom Left (Matches Screenshot 4 "Campaign Data") */}
          <div
            className="absolute bottom-6 sm:bottom-12 left-4 sm:left-12 z-20 animate-float-reverse max-w-[270px] sm:max-w-[310px] w-full"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-2xl border border-white/40 text-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-900 text-sm">Extraction Pipeline</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Details
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  0.4s
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Instant CDN
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <div className="text-[11px] text-slate-500">Video Format</div>
                  <div className="text-sm font-bold text-slate-900">MP4 (Clean)</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Watermark</div>
                  <div className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={13} /> None
                  </div>
                </div>
              </div>

              {/* Progress bar and audio frequency indicator */}
              <div className="mt-3.5 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>Stream Transfer Rate</span>
                  <span className="text-blue-600 font-semibold">45 MB/s</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[85%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

'use client'

import * as React from 'react'
import { Link2, Sparkles, Download, ArrowRight, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    badge: 'Step One',
    title: 'Copy Public Post Link',
    description:
      'Open Instagram, TikTok, YouTube, X, Reddit, or any supported social network. Tap Share and copy the public post or reel link.',
    icon: Link2,
    accent: 'from-blue-600 to-indigo-600',
    highlight: 'Works with Reels, Shorts, Videos & Audio'
  },
  {
    step: '02',
    badge: 'Step Two',
    title: 'Paste into SocialVideoDownloader',
    description:
      'Paste the link into the extractor input above. Our engine instantly validates the post and analyzes all available stream qualities.',
    icon: Sparkles,
    accent: 'from-amber-500 to-yellow-500',
    highlight: 'Instant stream resolution under 500ms'
  },
  {
    step: '03',
    badge: 'Step Three',
    title: 'Download Clean 1080p / MP3',
    description:
      'Select your preferred video resolution or audio format. Save the clean file directly to your device with zero added watermark.',
    icon: Download,
    accent: 'from-emerald-500 to-teal-600',
    highlight: 'Zero compression loss & 100% private'
  }
]

export function HowItWorksSection() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100" id="how-it-works">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
            How It Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Downloading public media has never been simpler. No browser extensions, no signups, and zero intrusive ads.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.step}
                className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Top Bar with Number Badge and Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-300 font-mono group-hover:text-blue-600 transition-colors">
                      {s.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.accent} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {s.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight */}
                <div className="mt-8 pt-5 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                  <span>{s.highlight}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Bar */}
        <div className="flex justify-center pt-2">
          <a
            href="#downloader"
            className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-lg shadow-yellow-500/10 font-bold"
          >
            <span>Paste a Link to Start</span>
            <ArrowRight size={17} className="text-black" />
          </a>
        </div>

      </div>
    </section>
  )
}

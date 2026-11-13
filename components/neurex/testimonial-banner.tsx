'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Link2, MousePointerClick, Download } from 'lucide-react'

const STEPS = [
  {
    icon: Link2,
    title: 'Copy the link',
    text: 'Open the public post on Instagram, TikTok, YouTube, Facebook or X and copy its link from the share menu.',
  },
  {
    icon: MousePointerClick,
    title: 'Paste it here',
    text: 'Paste the link into the downloader above and pick the video or audio format you want.',
  },
  {
    icon: Download,
    title: 'Save the file',
    text: 'Download the file to your device. Only save your own posts, or public content you have permission to keep.',
  },
]

export function TestimonialBanner() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* How it works, in three steps — replaces the previous invented testimonial */}
        <div className="relative rounded-[36px] bg-[#f8fafc] border border-slate-200/80 p-8 sm:p-14 overflow-hidden shadow-sm">
          <div className="space-y-10 relative z-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                No account · No app to install
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-snug">
                Save a public video in three steps.
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                The tool works with public posts only. It does not open private accounts,
                bypass logins or paywalls, or remove watermarks that are part of the
                original video. Step-by-step instructions for each platform are in our{' '}
                <Link href="/guides" className="text-blue-600 font-semibold underline">
                  guides
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.title} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Subtle decorative background blur */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Section Heading & Yellow Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
            Build a stronger future <br className="hidden sm:inline" />
            with smarter tools
          </h2>

          <a
            href="#downloader"
            className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center justify-center gap-2 self-start sm:self-auto shadow-lg shadow-yellow-500/10"
          >
            Get Started
            <ArrowRight size={17} className="text-black" />
          </a>
        </div>

      </div>
    </section>
  )
}

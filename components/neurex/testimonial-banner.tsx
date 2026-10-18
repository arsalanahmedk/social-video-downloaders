'use client'

import * as React from 'react'
import { ArrowRight, Quote } from 'lucide-react'

export function TestimonialBanner() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Giant Testimonial Rounded Card (Matches Screenshot 3) */}
        <div
          className="relative rounded-[36px] bg-[#f8fafc] border border-slate-200/80 p-8 sm:p-14 overflow-hidden shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Left Text Column */}
          <div className="lg:max-w-2xl space-y-6 z-10">
            {/* Double quote badge / slashes */}
            <div className="flex items-center gap-1 text-slate-300">
              <span className="text-4xl sm:text-5xl font-serif font-black leading-none select-none">
                “
              </span>
            </div>

            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-snug">
              SocialVideoDownloader&apos;s a super interesting way of marrying old ways (manual links) with new ways (instant automation) to get a magical tool.
            </p>

            <div className="pt-2">
              <p className="text-base font-bold text-slate-950">
                Alex Vance, <span className="font-normal text-slate-500">Digital Creator &amp; Video Producer</span>
              </p>
            </div>
          </div>

          {/* Right Portrait Image (Stylized 3D Creator) */}
          <div className="relative flex-shrink-0 flex justify-center lg:justify-end z-10">
            <div className="relative">
              <img
                src="/images/creator_testimonial.jpg"
                alt="Digital Creator and Video Producer"
                className="w-56 sm:w-72 h-64 sm:h-80 object-cover rounded-3xl shadow-xl filter contrast-105"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none" />
            </div>
          </div>

          {/* Subtle decorative background blur */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Section Heading & Yellow Button Row (Matches Screenshot 3 bottom banner) */}
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

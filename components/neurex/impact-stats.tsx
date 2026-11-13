'use client'

import * as React from 'react'

interface StatCardProps {
  value: string
  label: string
  subtext?: string
  delay: number
}

function StatCard({ value, label, subtext }: StatCardProps) {
  return (
    <div
      className="bg-[#f8fafc] border border-slate-200/70 rounded-[28px] p-8 sm:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div className="text-5xl sm:text-6xl font-extrabold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
        {value}
      </div>
      <div className="space-y-1 mt-6">
        <p className="text-base sm:text-lg font-medium text-slate-800 leading-snug">
          {label}
        </p>
        {subtext && (
          <p className="text-xs text-slate-400">
            {subtext}
          </p>
        )}
      </div>
    </div>
  )
}

export function ImpactStats() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Centered Heading (Matches Screenshot 1 from user) */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
            A free tool for saving public videos <br className="hidden sm:inline" />
            you have the right to keep
          </h2>
        </div>

        {/* 4 Clean Cards in Horizontal Grid (Exact match to Screenshot 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            value="Free"
            label="Free to use, no account needed"
            subtext="No sign-up or payment required"
            delay={0.1}
          />
          <StatCard
            value="HD"
            label="Save public videos in the quality the platform provides"
            subtext="MP4 video and MP3 audio where available"
            delay={0.2}
          />
          <StatCard
            value="Public"
            label="Public posts only — no private accounts, logins or DRM"
            subtext="Permission-first by design"
            delay={0.3}
          />
          <StatCard
            value="10"
            label="Major platforms supported"
            subtext="Instagram, TikTok, YouTube, Facebook, X, Reddit and more"
            delay={0.4}
          />
        </div>

      </div>
    </section>
  )
}

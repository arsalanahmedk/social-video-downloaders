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
            The impact we’ve created <br className="hidden sm:inline" />
            for businesses &amp; creators
          </h2>
        </div>

        {/* 4 Clean Cards in Horizontal Grid (Exact match to Screenshot 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            value="99%"
            label="Annual efficiency savings that drive results"
            subtext="99.9% extraction success rate"
            delay={0.1}
          />
          <StatCard
            value="90M"
            label="Yearly efficiency gains that truly matter"
            subtext="Over 150M+ files downloaded"
            delay={0.2}
          />
          <StatCard
            value="100%"
            label="Goal completion rate on initial execution"
            subtext="Zero watermark guarantee"
            delay={0.3}
          />
          <StatCard
            value="12+"
            label="Key yearly efficiency savings that count"
            subtext="Major platforms supported"
            delay={0.4}
          />
        </div>

      </div>
    </section>
  )
}

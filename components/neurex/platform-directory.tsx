'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { platforms } from '@/lib/platforms/registry'
import { PLATFORM_VISUALS } from '@/components/neurex/platform-icons'

export function PlatformDirectory() {
  return (
    <section className="bg-[#f8fafc] py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60" id="platforms">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5">
              <Sparkles size={14} />
              Dedicated Extractors
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
              Supported Social Platforms
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-base leading-relaxed">
            Choose your target platform for dedicated instructions, quality presets, and custom stream extractors.
          </p>
        </div>

        {/* Platforms Grid in Neurex Card Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.map((platform) => {
            const visual = PLATFORM_VISUALS[platform.id]

            return (
              <div key={platform.id}>
                <Link
                  href={`/${platform.id}`}
                  className="group flex flex-col justify-between h-full bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    {/* Header: Platform Brand Icon & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-13 h-13 p-3 rounded-2xl bg-gradient-to-tr ${
                          visual?.gradient || 'from-blue-600 to-indigo-600'
                        } flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${
                          visual?.hoverRotate || 'group-hover:rotate-6'
                        }`}
                        style={{
                          boxShadow: `0 8px 18px -4px ${visual?.glowColor || 'rgba(59,130,246,0.3)'}`,
                        }}
                      >
                        {visual?.icon || (
                          <span className="text-white font-bold text-base">
                            {platform.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {platform.badgeText}
                      </span>
                    </div>

                    {/* Platform Title */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{platform.name}</span>
                      <ArrowUpRight
                        size={18}
                        className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </h3>

                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {platform.tagline}
                    </p>

                    <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>

                  {/* Media Format Pills */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {platform.media.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                      <span>Open {platform.name} Downloader</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

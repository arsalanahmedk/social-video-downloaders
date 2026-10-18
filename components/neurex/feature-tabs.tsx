'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShieldCheck, Zap, Sparkles } from 'lucide-react'

type TabKey = 'MANAGE' | 'OPTIMISE' | 'PERFORMANCE'

interface TabContent {
  heading: string
  subtitle: string
  bullets: string[]
  badge: string
}

const TAB_DATA: Record<TabKey, TabContent> = {
  MANAGE: {
    heading: 'Manage your media smartly and securely',
    subtitle: 'Empowering you to make archival and content decisions with accurate information and powerful tools.',
    badge: 'Media Control',
    bullets: [
      '12+ social networks: Instagram Reels, TikTok, YouTube Shorts, X & Reddit',
      'Lossless audio extraction to 320kbps MP3 and high-clarity AAC',
      'Priority access to highest available resolution without watermark injection'
    ]
  },
  OPTIMISE: {
    heading: 'Optimise format, quality, and bitrate in one click',
    subtitle: 'Extract the exact format you need for video editing, offline listening, or mobile presentations.',
    badge: 'Smart Encoding',
    bullets: [
      'Instant separation of background music, podcasts, and speech tracks',
      'Automatic container remuxing to standard MP4, WebM, and MP3 files',
      'Zero quality degradation and zero re-encoding artifacts'
    ]
  },
  PERFORMANCE: {
    heading: 'Lightning-fast delivery with client-first privacy',
    subtitle: 'Engineered for sub-second responses with zero logs and zero server storage of personal data.',
    badge: 'High Performance',
    bullets: [
      'Sub-500ms URL stream inspection and format discovery',
      'Direct peer streaming via global low-latency CDN edge nodes',
      'SSRF-hardened sandbox with complete compliance with public access rules'
    ]
  }
}

export function FeatureTabs() {
  const [activeTab, setActiveTab] = React.useState<TabKey>('MANAGE')

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Split Grid (Matches Screenshot 5 from user) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Rounded Portrait of 3D Stylized Creator */}
          <div
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <img
                src="/images/feature_tabs_creator.jpg"
                alt="Digital Media Creator and Artist"
                className="w-full h-[420px] sm:h-[500px] object-cover rounded-[32px] shadow-2xl filter contrast-105"
              />
              <div className="absolute inset-0 rounded-[32px] ring-1 ring-black/5 pointer-events-none" />

              {/* Floating micro badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Format: 1080p Ultra HD</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pill Tabs + Dynamic Content + Styled Bullets */}
          <div className="lg:col-span-6 space-y-8">

            {/* Pill Tab Switcher (Matches [MANAGE] [OPTIMISE] [PERFORMANCE] from Screenshot 5) */}
            <div className="inline-flex p-1.5 rounded-full bg-slate-100/90 border border-slate-200/60 shadow-inner">
              {(['MANAGE', 'OPTIMISE', 'PERFORMANCE'] as TabKey[]).map((tab) => {
                const isActive = activeTab === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${isActive
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'text-slate-500 hover:text-slate-900'
                      }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            {/* Tab Content with Framer Motion AnimatePresence */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
                    {TAB_DATA[activeTab].heading}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                    {TAB_DATA[activeTab].subtitle}
                  </p>
                </div>

                {/* Custom Styled Bullet Points (Matching Screenshot 5) */}
                <ul className="space-y-3.5 pt-2">
                  {TAB_DATA[activeTab].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-800 text-sm sm:text-base font-medium">
                      <span className="w-2 h-2 rounded-full bg-slate-950 flex-shrink-0 mt-2" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <a
                    href="#downloader"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors group"
                  >
                    <span>Try the downloader now</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  )
}

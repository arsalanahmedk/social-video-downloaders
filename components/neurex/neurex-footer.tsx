'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  ArrowUpRight,
  Home,
  Sparkles,
  Compass,
  HelpCircle,
} from 'lucide-react'
import { platforms } from '@/lib/platforms/registry'

// Custom animated SVG brand icons for each supported extractor platform
const platformIcons: Record<
  string,
  {
    gradient: string
    glowColor: string
    hoverRotate?: string
    icon: React.ReactNode
  }
> = {
  instagram: {
    gradient: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
    glowColor: 'rgba(225, 48, 108, 0.45)',
    hoverRotate: 'group-hover:rotate-6',
    icon: (
      <svg
        className="w-4 h-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  tiktok: {
    gradient: 'from-[#00f2fe] via-[#000000] to-[#fe0979]',
    glowColor: 'rgba(0, 242, 254, 0.45)',
    hoverRotate: 'group-hover:-rotate-6',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.89-4.47V8.7a8.28 8.28 0 0 0 4.88 1.58V6.85a4.84 4.84 0 0 1-1-.16z" />
      </svg>
    ),
  },
  youtube: {
    gradient: 'from-[#FF0000] to-[#b20710]',
    glowColor: 'rgba(255, 0, 0, 0.5)',
    hoverRotate: 'group-hover:scale-125',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  facebook: {
    gradient: 'from-[#1877F2] to-[#0e5a8a]',
    glowColor: 'rgba(24, 119, 242, 0.5)',
    hoverRotate: 'group-hover:-rotate-6',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  twitter: {
    gradient: 'from-slate-800 to-slate-950',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    hoverRotate: 'group-hover:rotate-12',
    icon: (
      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  pinterest: {
    gradient: 'from-[#E60023] to-[#b8001b]',
    glowColor: 'rgba(230, 0, 35, 0.5)',
    hoverRotate: 'group-hover:-translate-y-0.5',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
  reddit: {
    gradient: 'from-[#FF4500] to-[#d63a00]',
    glowColor: 'rgba(255, 69, 0, 0.5)',
    hoverRotate: 'group-hover:rotate-6',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-4.466 3.99a.327.327 0 0 0-.231.096.35.35 0 0 0 0 .486c.725.727 1.83 1.077 2.947 1.077s2.222-.35 2.947-1.077a.343.343 0 0 0 0-.486.347.347 0 0 0-.486 0c-.579.579-1.503.856-2.461.856-.958 0-1.882-.277-2.461-.856a.35.35 0 0 0-.255-.096z" />
      </svg>
    ),
  },
  linkedin: {
    gradient: 'from-[#0A66C2] to-[#004182]',
    glowColor: 'rgba(10, 102, 194, 0.5)',
    hoverRotate: 'group-hover:scale-120',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  snapchat: {
    gradient: 'from-[#FFFC00] to-[#ffe600]',
    glowColor: 'rgba(255, 252, 0, 0.5)',
    hoverRotate: 'group-hover:-translate-y-0.5',
    icon: (
      <svg className="w-4 h-4 fill-slate-950" viewBox="0 0 24 24">
        <path d="M12.046 0C7.151 0 4.88 3.518 4.88 6.438c0 1.25.334 2.724.846 3.864.183.411.082.723-.19.992-.476.47-.946.862-1.413 1.253-.404.341-.75.631-.75 1.08 0 .42.302.77.779 1.047.458.266 1.077.464 1.79.57.172.025.263.155.228.324-.262 1.25-.436 2.05-.522 2.399-.071.288-.003.541.203.754.215.22.535.342.952.362.482.024 1.054-.082 1.698-.316.634-.23 1.32-.476 2.042-.476.326 0 .66.05 1 .15 1.002.296 1.83.693 2.537 1.218.423.314.885.556 1.37.72.398.134.802.202 1.201.202.399 0 .803-.068 1.2-.202.486-.164.948-.406 1.372-.72.707-.525 1.535-.922 2.536-1.218.34-.1.674-.15 1-.15.722 0 1.408.246 2.042.476.644.234 1.216.34 1.698.316.417-.02.737-.142.952-.362.206-.213.274-.466.203-.754-.086-.349-.26-1.149-.522-2.399-.035-.169.056-.299.228-.324.713-.106 1.332-.304 1.79-.57.477-.277.779-.627.779-1.047 0-.449-.346-.739-.75-1.08-.467-.391-.937-.783-1.413-1.253-.272-.269-.373-.581-.19-.992.512-1.14.846-2.614.846-3.864C19.213 3.518 16.942 0 12.046 0z" />
      </svg>
    ),
  },
  threads: {
    gradient: 'from-slate-800 to-black',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    hoverRotate: 'group-hover:rotate-12',
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M12.186 24h-.007c-3.581-.024-6.33-1.222-8.172-3.56C2.28 18.2 1.5 15.344 1.5 11.946c0-3.511.83-6.42 2.467-8.647C5.78 1.094 8.657 0 12.193 0c3.55 0 6.435 1.095 8.219 3.299 1.637 2.227 2.467 5.136 2.467 8.647 0 .524-.022 1.043-.064 1.554a.999.999 0 0 1-1.077.915.998.998 0 0 1-.914-1.076c.038-.456.057-.923.057-1.393 0-3.136-.719-5.69-2.138-7.592-1.458-1.954-3.896-2.944-7.054-2.944-3.15 0-5.584.99-7.038 2.944-1.418 1.902-2.137 4.456-2.137 7.592 0 3.037.697 5.59 2.072 7.59 1.416 2.058 3.738 3.109 6.901 3.124h.01c2.476 0 4.417-.676 5.768-2.008 1.258-1.242 1.942-2.99 2.035-5.197H12.2v-1.996h9.096c.068.513.104 1.05.104 1.605 0 2.808-.857 5.17-2.548 7.02C17.067 22.99 14.858 24 12.186 24z" />
      </svg>
    ),
  },
}

export function NeurexFooter() {
  return (
    <footer className="relative bg-[#030712] text-slate-300 border-t border-white/10 pt-20 pb-14 overflow-hidden">
      {/* Ambient background glow accents with pulsing aura */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-transparent blur-[140px] rounded-full animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 right-1/4 w-[450px] h-[300px] bg-gradient-to-r from-purple-600/15 via-pink-600/10 to-transparent blur-[140px] rounded-full animate-pulse-glow"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Footer Grid with animated entrance */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12"
        >
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300 animate-float-slow">
                <div className="w-full h-full rounded-2xl bg-[#0b0f19] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v6.7l-7-3.5V9.6zm9 9.8v-6.7l7-3.1v6.3l-7 3.5z" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
                SocialVideo<span className="text-yellow-400">Downloader</span>
              </span>
            </Link>

            <p className="text-[15px] text-slate-400 max-w-md leading-relaxed font-normal">
              Fast, ethical, and permission-first public media extractor for creators, researchers, and editors worldwide.
            </p>

            {/* Privacy trust pill with live ping animation */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 shadow-sm shadow-emerald-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
              <span>Zero server storage • 100% Client privacy</span>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Navigation
              </h4>
            </div>
            
            <ul className="space-y-1.5">
              {[
                { label: 'Home', href: '/', icon: Home, gradient: 'from-blue-600 to-cyan-500' },
                { label: 'How It Works', href: '/how-it-works', icon: Sparkles, gradient: 'from-indigo-600 to-purple-500' },
                { label: 'Supported Sites', href: '/supported-sites', icon: Compass, gradient: 'from-cyan-500 to-emerald-500' },
                { label: 'FAQ & Help', href: '/faq', icon: HelpCircle, gradient: 'from-amber-500 to-orange-500' },
              ].map((nav, i) => {
                const IconComponent = nav.icon
                return (
                  <li key={nav.href}>
                    <Link
                      href={nav.href}
                      className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${nav.gradient} flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-float-slow`}
                        style={{ animationDelay: `${i * 0.4}s` }}
                      >
                        <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <span className="text-[15px] font-medium text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                        {nav.label}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 ml-auto text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-400 transition-all duration-300"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 2: Extractors */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Extractors
              </h4>
            </div>

            <ul className="space-y-1.5">
              {platforms.slice(0, 5).map((p, i) => {
                const iconMeta = platformIcons[p.id]
                return (
                  <li key={p.id}>
                    <Link
                      href={`/${p.id}`}
                      className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${iconMeta?.gradient || 'from-blue-600 to-indigo-600'} flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-115 ${iconMeta?.hoverRotate || 'group-hover:rotate-6'} animate-float-slow`}
                        style={{
                          boxShadow: `0 2px 8px -2px ${p.accentColor}33`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      >
                        {iconMeta?.icon || (
                          <span className="text-xs font-bold">
                            {p.name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[15px] font-medium text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                        {p.name} Downloader
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 ml-auto text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-pink-400 transition-all duration-300"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 3: More Formats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                More Formats
              </h4>
            </div>

            <ul className="space-y-1.5">
              {platforms.slice(5, 10).map((p, i) => {
                const iconMeta = platformIcons[p.id]
                return (
                  <li key={p.id}>
                    <Link
                      href={`/${p.id}`}
                      className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${iconMeta?.gradient || 'from-blue-600 to-indigo-600'} flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-115 ${iconMeta?.hoverRotate || 'group-hover:rotate-6'} animate-float-slow`}
                        style={{
                          boxShadow: `0 2px 8px -2px ${p.accentColor}33`,
                          animationDelay: `${(i + 5) * 0.25}s`,
                        }}
                      >
                        {iconMeta?.icon || (
                          <span className="text-xs font-bold">
                            {p.name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[15px] font-medium text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                        {p.name} Downloader
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 ml-auto text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-400 transition-all duration-300"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} SocialVideoDownloader. All trademarks and logos belong to their respective owners.
          </p>
          <div className="flex items-center gap-8 font-medium">
            <Link
              href="/terms"
              className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Terms &amp; Fair Use
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}



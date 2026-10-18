'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'
import { platforms } from '@/lib/platforms/registry'
import { motion, AnimatePresence } from 'framer-motion'

export function NeurexNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const pathname = usePathname()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  React.useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Hexagon Icon + Brand Title matching Neurex style */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v6.7l-7-3.5V9.6zm9 9.8v-6.7l7-3.1v6.3l-7 3.5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
              SocialVideo<span className="text-yellow-400">Downloader</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-300">
          <Link href="/" className={`hover:text-white transition-colors ${pathname === '/' ? 'text-white' : ''}`}>
            Home
          </Link>

          {/* Downloaders Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-expanded={dropdownOpen}
            >
              Downloaders
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-yellow-400' : ''}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 w-80 bg-[#070e22] border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-50 grid grid-cols-2 gap-1.5"
                >
                  {platforms.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${p.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors group/item"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: p.accentColor }}
                      />
                      <span className="text-sm font-medium text-slate-200 group-hover/item:text-white">
                        {p.name}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/how-it-works" className={`hover:text-white transition-colors ${pathname === '/how-it-works' ? 'text-white' : ''}`}>
            How It Works
          </Link>
          <Link href="/supported-sites" className={`hover:text-white transition-colors ${pathname === '/supported-sites' ? 'text-white' : ''}`}>
            Supported Sites
          </Link>
          <Link href="/faq" className={`hover:text-white transition-colors ${pathname === '/faq' ? 'text-white' : ''}`}>
            Resources
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/faq"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <a
            href="#downloader"
            className="neurex-yellow-btn px-6 py-2.5 text-sm inline-flex items-center gap-2 shadow-lg"
          >
            <Sparkles size={14} className="text-black" />
            Get Started
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="#downloader"
            className="neurex-yellow-btn px-4 py-1.5 text-xs font-semibold"
          >
            Get Started
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#070e24] px-4 pt-4 pb-6 space-y-4"
          >
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/5"
              >
                Home
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-white/5"
              >
                How It Works
              </Link>
              <Link
                href="/supported-sites"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-white/5"
              >
                Supported Sites
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-white/5"
              >
                FAQ &amp; Resources
              </Link>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Platforms
              </div>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {platforms.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.accentColor }}
                    />
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

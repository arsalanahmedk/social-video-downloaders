'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { platforms } from '@/lib/platforms/registry'

export function Navbar() {
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
    <header className="header-nav">
      <div className="shell nav-inner">
        <Link href="/" className="brand" aria-label="SocialVideoDownloader Home">
          <div className="brand-logo">
            <span>SVD</span>
          </div>
          <div className="brand-name">
            <strong>SOCIALVIDEODOWNLOADER</strong>
            <span className="brand-badge">PUBLIC</span>
          </div>
        </Link>

        <nav className="desktop-links" aria-label="Main Navigation">
          <div className="dropdown-container" ref={dropdownRef}>
            <button
              type="button"
              className={`nav-link dropdown-btn ${dropdownOpen ? 'is-active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Downloaders <ChevronDown size={14} className={`chevron ${dropdownOpen ? 'rotate' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-grid">
                  {platforms.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${p.id}`}
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="dropdown-indicator" style={{ backgroundColor: p.accentColor }} />
                      <div>
                        <div className="dropdown-item-title">{p.name}</div>
                        <div className="dropdown-item-desc">{p.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/#platforms" className="nav-link">
            Platforms
          </Link>
          <Link href="/how-it-works" className={`nav-link ${pathname === '/how-it-works' ? 'current' : ''}`}>
            How It Works
          </Link>
          <Link href="/supported-sites" className={`nav-link ${pathname === '/supported-sites' ? 'current' : ''}`}>
            Supported Sites
          </Link>
          <Link href="/faq" className={`nav-link ${pathname === '/faq' ? 'current' : ''}`}>
            FAQ
          </Link>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/#resolver" className="nav-cta">
            <Sparkles size={14} /> Paste Link
          </Link>
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div className="mobile-drawer-header">
            <div className="brand">
              <div className="brand-logo"><span>SVD</span></div>
              <span className="brand-text">SOCIALVIDEODOWNLOADER</span>
            </div>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <div className="drawer-section-title">Navigation</div>
            <Link href="/" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/how-it-works" className="mobile-link" onClick={() => setMobileOpen(false)}>
              How It Works
            </Link>
            <Link href="/supported-sites" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Supported Sites
            </Link>
            <Link href="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link href="/faq" className="mobile-link" onClick={() => setMobileOpen(false)}>
              FAQ & Help
            </Link>

            <div className="drawer-section-title">Platform Downloaders</div>
            <div className="mobile-platforms-list">
              {platforms.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.id}`}
                  className="mobile-platform-item"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="platform-dot" style={{ backgroundColor: p.accentColor }} />
                  <span>{p.name} Downloader</span>
                  <ArrowUpRight size={14} className="mobile-item-arrow" />
                </Link>
              ))}
            </div>

            <div className="drawer-footer-note">
              <ShieldCheck size={16} />
              <span>Permission-first public video downloader.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

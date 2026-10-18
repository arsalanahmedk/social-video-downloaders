import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { platforms } from '@/lib/platforms/registry'

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="shell footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <div className="brand-logo">
                <span>SVD</span>
              </div>
              <div className="brand-name">
                <strong>SOCIALVIDEODOWNLOADER</strong>
              </div>
            </Link>
            <p className="footer-desc">
              socialvideodownloader — The standard, high-speed web platform for downloading publicly accessible social media videos, reels, stories, and audio tracks with zero watermarks.
            </p>
            <div className="footer-badge">
              <ShieldCheck size={16} /> Strict Public Access Only
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-col">
              <h4>Popular Downloaders</h4>
              <ul>
                <li><Link href="/instagram-reels">Instagram Reels</Link></li>
                <li><Link href="/tiktok-no-watermark">TikTok No Watermark</Link></li>
                <li><Link href="/youtube-shorts">YouTube Shorts</Link></li>
                <li><Link href="/youtube-to-mp3">YouTube to MP3</Link></li>
                <li><Link href="/twitter-video">X / Twitter Video</Link></li>
                <li><Link href="/reddit-video">Reddit with Audio</Link></li>
                <li><Link href="/audio-extractor">Universal Audio</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>More Tools</h4>
              <ul>
                <li><Link href="/instagram-stories">Instagram Stories</Link></li>
                <li><Link href="/instagram-photo">Instagram Photos</Link></li>
                <li><Link href="/tiktok-audio">TikTok MP3 Sounds</Link></li>
                <li><Link href="/facebook-reels">Facebook Reels</Link></li>
                <li><Link href="/pinterest-video">Pinterest Video</Link></li>
                <li><Link href="/snapchat-spotlight">Snapchat Spotlight</Link></li>
                <li><Link href="/threads-video">Threads Video</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Platform Hubs</h4>
              <ul>
                {platforms.slice(0, 7).map((p) => (
                  <li key={p.id}>
                    <Link href={`/${p.id}`}>{p.name} Downloader</Link>
                  </li>
                ))}
                <li><Link href="/supported-sites">All Supported Sites →</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources & Legal</h4>
              <ul>
                <li><Link href="/how-it-works">How It Works</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/api-docs">API Documentation</Link></li>
                <li><Link href="/security">Security & SSRF</Link></li>
                <li><Link href="/status">System Status</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/dmca">DMCA Guidelines</Link></li>
                <li><Link href="/contact">Contact Support</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} SOCIALVIDEODOWNLOADER. All rights reserved. Designed for permitted, publicly accessible content.
          </div>
          <div className="footer-meta-links">
            <Link href="/privacy">Privacy</Link>
            <span>•</span>
            <Link href="/terms">Terms</Link>
            <span>•</span>
            <Link href="/dmca">DMCA</Link>
            <span>•</span>
            <Link href="/security">Security</Link>
            <span>•</span>
            <Link href="/status">Status</Link>
            <span>•</span>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

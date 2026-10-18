import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { Sparkles, ShieldCheck, Zap, Download, Layers, CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | SocialVideoDownloader',
  description: 'Understand how SocialVideoDownloader resolves and extracts publicly accessible social media content with permission-first compliance.',
}

export default function HowItWorksPage() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to download public social media media',
    description: 'Use SocialVideoDownloader to resolve, validate, and save publicly accessible videos, photos, and audio.',
    totalTime: 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'Web browser' }],
    step: [
      { '@type': 'HowToStep', name: 'Copy a public link', text: 'Copy the URL of a publicly accessible video, Reel, Short, photo, or audio post.' },
      { '@type': 'HowToStep', name: 'Paste the link', text: 'Paste the link into the SocialVideoDownloader input and submit it.' },
      { '@type': 'HowToStep', name: 'Choose a format', text: 'Review the available public formats and choose HD video, MP3 audio, or an image.' },
      { '@type': 'HowToStep', name: 'Save the file', text: 'Start the download and save the validated media file to your device.' }
    ]
  }

  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <Script
        id="how-to-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <NeurexNavbar />

      <main>
        {/* Hero Section */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles size={14} /> Architecture &amp; Workflow
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              How SocialVideoDownloader Works
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Learn how our modular resolution pipeline parses, validates, and delivers media from publicly accessible posts across the web in original quality.
            </p>

            <div className="pt-2">
              <a
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl shadow-yellow-500/10"
              >
                Try the Downloader Now
                <ArrowRight size={17} className="text-black" />
              </a>
            </div>
          </div>
        </section>

        {/* 4 Steps Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Step 1 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                01
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  1. Client-Side Input &amp; Telemetry Sanitization
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  When you paste a social media link, SocialVideoDownloader cleans tracking telemetry (such as UTM codes, click identifiers, and platform referral tags). The clean URL is parsed to extract the canonical host and post identifier.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Strips ad &amp; telemetry tags automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Identifies source platform instantly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                02
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  2. Server-Side SSRF &amp; Hostname Validation
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Security is paramount. Before any outbound connection is initiated, the URL is checked against our strict platform domain allowlist. Private IPv4/IPv6 ranges, loopbacks (127.0.0.1, localhost), and internal network hosts are completely blocked to eliminate SSRF attack vectors.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Enforces strict hostname allowlist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Rejects non-HTTP(S) protocols and loopback targets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white font-extrabold text-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
                03
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  3. Public Stream Inspection &amp; Format Discovery
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Our platform adapters query public CDN endpoints and Open Graph metadata to verify that the media is unrestricted and publicly visible. We discover available qualities (1080p Full HD, 720p, 480p, MP3 Audio, High-Res Thumbnails) and prepare them for download.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Never accesses private accounts or bypasses authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Respects platform rate limits and security policies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-extrabold text-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                04
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  4. High-Speed Direct Stream Delivery
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  When you select your format and hit download, SocialVideoDownloader streams the media directly to your browser with appropriate attachment headers. The media is saved cleanly to your device without watermarks or file corruption.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Zero permanent file retention on our servers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Native browser attachment handling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden mt-12">
              <div className="space-y-3 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Ready to extract your public media?
                </h3>
                <p className="text-slate-300 text-base max-w-xl mx-auto">
                  Try the universal downloader now or explore platform-specific guides for Instagram, TikTok, and YouTube.
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/#downloader"
                  className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
                >
                  <Download size={16} className="text-black" />
                  Go to Downloader
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

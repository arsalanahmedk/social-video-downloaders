import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { Terminal, ArrowRight, Code, Server, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'API Documentation | SocialVideoDownloader Developer Reference',
  description: 'Integrate SocialVideoDownloader media resolution and platform metadata endpoints into your applications and services.',
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Live Animated Hero Header */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] right-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[130px] animate-pulse-glow" />
            <div className="absolute top-[60px] left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Terminal size={14} /> REST API &amp; DEVELOPER REFERENCE
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              API Documentation
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore high-performance endpoints for querying platform metadata, resolving public media streams, and checking system health.
            </p>

            <div className="pt-2">
              <Link
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl shadow-yellow-500/10"
              >
                Try in Browser
                <ArrowRight size={17} className="text-black" />
              </Link>
            </div>
          </div>
        </section>

        {/* Documentation Content */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Endpoint 1 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-xs font-bold">GET</span>
                <code className="text-slate-900 font-bold text-base sm:text-lg">/api/v1/platforms</code>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Returns an array of all currently supported platforms, their allowed domain patterns, media formats, and status.
              </p>
              <pre className="bg-[#030712] text-slate-200 p-4 rounded-2xl overflow-x-auto font-mono text-xs border border-white/10 shadow-inner">
{`// Example Response: GET /api/v1/platforms
{
  "success": true,
  "total": 10,
  "platforms": [
    {
      "id": "instagram",
      "name": "Instagram",
      "domains": ["instagram.com", "instagr.am"],
      "media": ["Reels", "Photos", "Stories"],
      "status": "active"
    }
  ]
}`}
              </pre>
            </div>

            {/* Endpoint 2 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono text-xs font-bold">POST</span>
                <code className="text-slate-900 font-bold text-base sm:text-lg">/api/v1/resolve</code>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Accepts a public social media post URL in JSON format, validates SSRF security rules, and returns resolved media metadata with direct download links.
              </p>
              <pre className="bg-[#030712] text-slate-200 p-4 rounded-2xl overflow-x-auto font-mono text-xs border border-white/10 shadow-inner">
{`// Request Payload: POST /api/v1/resolve
{
  "url": "https://www.youtube.com/shorts/abc123xyz"
}

// Successful Response
{
  "success": true,
  "media": {
    "id": "abc123xyz",
    "platformName": "YouTube",
    "title": "YouTube Short Spotlight",
    "author": "Official Channel",
    "duration": "0:58",
    "formats": [
      {
        "id": "1080p-video",
        "quality": "1080p",
        "ext": "mp4",
        "downloadUrl": "/api/v1/download?..."
      }
    ]
  }
}`}
              </pre>
            </div>

            {/* Endpoint 3 */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-purple-600 text-white font-mono text-xs font-bold">GET</span>
                <code className="text-slate-900 font-bold text-base sm:text-lg">/api/v1/health</code>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Returns real-time service health, uptime statistics, and security guardrail verification.
              </p>
              <pre className="bg-[#030712] text-slate-200 p-4 rounded-2xl overflow-x-auto font-mono text-xs border border-white/10 shadow-inner">
{`// Example Response: GET /api/v1/health
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": "1420s",
  "components": {
    "urlValidator": "operational",
    "ssrfProtection": "active",
    "mediaResolver": "operational"
  }
}`}
              </pre>
            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

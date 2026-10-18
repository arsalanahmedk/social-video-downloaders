import type { Metadata } from 'next'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ShieldCheck, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security Architecture & SSRF Guardrails | SocialVideoDownloader',
  description: 'Understand the security principles, SSRF protections, and defensive safeguards built into SocialVideoDownloader.',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Dark Hero Section */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Lock size={14} /> Defense in Depth
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Security Architecture
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              How SocialVideoDownloader enforces strict Server-Side Request Forgery (SSRF) protections, domain allowlists, and least-privilege transient routing.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-14 shadow-sm space-y-8 text-slate-700 leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">1. Strict Server-Side Request Forgery (SSRF) Controls</h2>
              <p className="text-slate-600 text-base">
                Inbound URL submissions undergo strict multi-phase filtering before any network connection is opened:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong className="text-slate-900">Protocol Enforcement:</strong> Only standard <code>http:</code> and <code>https:</code> schemes are parsed. Dangerous schemes like <code>file:</code>, <code>gopher:</code>, <code>data:</code>, and <code>ftp:</code> are blocked at entry.</li>
                <li><strong className="text-slate-900">Private Subnet Disallowal:</strong> Loopback (<code>127.0.0.0/8</code>), private RFC 1918 subnets (<code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>), link-local addresses (<code>169.254.0.0/16</code>), and IPv6 local unicast (<code>fc00::/7</code>, <code>fe80::/10</code>) are automatically rejected.</li>
                <li><strong className="text-slate-900">Domain Allowlisting:</strong> Outbound requests are limited strictly to verified platform domain regexes. Arbitrary web endpoints cannot be probed.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">2. Telemetry &amp; Parameter Stripping</h2>
              <p className="text-slate-600 text-base">
                Submitted URLs are sanitized to strip referral tokens, click identifiers, and user tracking parameters (e.g. <code>utm_*</code>, <code>fbclid</code>, <code>igsh</code>, <code>si</code>) to protect user anonymity and prevent telemetry leakage.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">3. Rate Limiting &amp; Abuse Prevention</h2>
              <p className="text-slate-600 text-base">
                API routes employ rate limiting to mitigate DDoS vectors, brute-force scraping attempts, and platform API quota exhaustion.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">4. Zero Persistent Media Storage</h2>
              <p className="text-slate-600 text-base">
                Downloaded media is processed through volatile streaming buffers and streamed directly to the requesting client. No media files or user credentials are stored on disk.
              </p>
            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

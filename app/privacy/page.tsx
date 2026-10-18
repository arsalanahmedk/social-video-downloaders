import type { Metadata } from 'next'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | SocialVideoDownloader',
  description: 'Learn about our data minimization, zero-logging, and privacy safeguards.',
}

export default function PrivacyPage() {
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
              <Lock size={14} /> Privacy First Architecture
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Privacy Policy
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Last Updated: September 2026. SocialVideoDownloader operates under strict principles of Data Minimization and Zero Persistent Logging.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-14 shadow-sm space-y-8 text-slate-700 leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">1. Information We Do Not Collect</h2>
              <p className="text-slate-600 text-base">
                SocialVideoDownloader does not require you to create an account, register, or provide your name, email address, password, or payment information. We do not use third-party behavioral ad trackers or sell data to brokers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">2. URL Processing &amp; Transient Memory</h2>
              <p className="text-slate-600 text-base">
                When you submit a URL for media resolution:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>The URL is processed in ephemeral server memory solely to extract public media streams.</li>
                <li>URLs are not permanently logged, recorded, or tied to your personal identity.</li>
                <li>Downloaded media files pass through temporary streaming buffers and are immediately discarded. We do not host, store, or archive copies of user-downloaded media on our persistent storage.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">3. Browser Storage &amp; Cookies</h2>
              <p className="text-slate-600 text-base">
                We only use essential local browser storage (such as your preferred Dark/Light theme mode). No persistent profiling cookies or cross-site tracking cookies are stored.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">4. Network Security &amp; SSRF Safeguards</h2>
              <p className="text-slate-600 text-base">
                To protect our users and infrastructure, inbound requests are filtered against malicious payloads. Our servers block access to private subnets, local hostnames, and unauthorized third-party destinations.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">5. Changes to This Policy</h2>
              <p className="text-slate-600 text-base">
                If we update our privacy practices, changes will be posted directly to this page with an updated revision date.
              </p>
            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

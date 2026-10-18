import type { Metadata } from 'next'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ShieldCheck, Scale, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DMCA & Copyright Policy | SocialVideoDownloader',
  description: 'Learn about our DMCA compliance, copyright holder protections, and takedown notice procedures.',
}

export default function DmcaPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Dark Hero Section */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] right-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Scale size={14} /> Copyright Compliance
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              DMCA &amp; Copyright Guidelines
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              SocialVideoDownloader is committed to respecting the intellectual property rights of creators and content owners worldwide.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-14 shadow-sm space-y-8 text-slate-700 leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">1. Service Architecture &amp; Ephemeral Nature</h2>
              <p className="text-slate-600 text-base">
                SocialVideoDownloader does not host, store, or archive any media files, video streams, or audio tracks on its servers. The service functions strictly as a client-initiated technical router and format converter connecting users to publicly available CDN endpoints hosted by third-party social platforms.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">2. Personal &amp; Fair Use Notice</h2>
              <p className="text-slate-600 text-base">
                Users are legally responsible for verifying that their downloads conform with applicable fair use, personal archiving, educational, and commentary rights under local copyright jurisdictions.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">3. DMCA Takedown Procedure</h2>
              <p className="text-slate-600 text-base">
                If you are a copyright owner or an authorized agent representing a copyright owner, and you believe content accessible via SocialVideoDownloader infringes upon your copyright, you may submit a formal notification containing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>A physical or electronic signature of the authorized representative.</li>
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>Identification of the specific URL(s) or material claimed to be infringing.</li>
                <li>Your contact information (name, mailing address, telephone number, and email address).</li>
                <li>A statement of good-faith belief that use of the material is not authorized by the copyright owner.</li>
                <li>A statement under penalty of perjury that the information in the notification is accurate.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">4. Domain &amp; Host Restrictions</h2>
              <p className="text-slate-600 text-base">
                Upon receiving a valid notification, SocialVideoDownloader will promptly review and take appropriate action, including domain-level blacklisting of specific endpoints or hosts from our resolver service.
              </p>
            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

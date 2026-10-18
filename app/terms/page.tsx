import type { Metadata } from 'next'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ShieldCheck, Scale, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service & Fair Use | SocialVideoDownloader',
  description: 'Understand the terms of service, public access policy, and copyright guidelines for SocialVideoDownloader.',
}

export default function TermsPage() {
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
              <Scale size={14} /> Legal &amp; Usage Terms
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Terms of Service
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Last Updated: September 2026. Please read these terms carefully before utilizing the SocialVideoDownloader platform.
            </p>
          </div>
        </section>

        {/* Legal Content Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-14 shadow-sm space-y-8 text-slate-700 leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">1. Acceptance of Terms</h2>
              <p className="text-slate-600 text-base">
                By accessing or using SocialVideoDownloader, you agree to be bound by these Terms of Service and all applicable local, national, and international laws. If you do not agree with any part of these terms, you are prohibited from using the service.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight" id="fair-use">2. Permitted Use &amp; Fair Use Policy</h2>
              <p className="text-slate-600 text-base">
                SocialVideoDownloader is provided exclusively for personal, educational, non-commercial archiving, and fair-use research purposes. You agree to only download content for which you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Are the copyright holder or authorized licensee; or</li>
                <li>Have obtained explicit permission from the copyright owner; or</li>
                <li>Are exercising recognized legal fair use or fair dealing rights under applicable law.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">3. Absolute Technical Limitations</h2>
              <p className="text-slate-600 text-base">
                SocialVideoDownloader strictly prohibits and does not facilitate:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Bypassing or attempting to bypass account authentication, passwords, or paywalls.</li>
                <li>Accessing content from private, unlisted, or restricted accounts.</li>
                <li>Circumventing Digital Rights Management (DRM) or technical protection measures.</li>
                <li>Automated scraping or mass-harvesting in violation of platform terms.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight" id="dmca">4. DMCA &amp; Copyright Infringement Notice</h2>
              <p className="text-slate-600 text-base">
                SocialVideoDownloader does not host any media on its servers; it operates as an ephemeral routing tool connecting to publicly accessible content. If you believe that your copyrighted work is being referenced improperly, copyright owners may submit takedown requests to our designated agent.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">5. Disclaimer of Warranties</h2>
              <p className="text-slate-600 text-base">
                SocialVideoDownloader is provided &ldquo;as is&rdquo; without warranties of any kind, whether express or implied. We do not guarantee uninterrupted access, absence of platform rate limits, or availability of specific resolution streams.
              </p>
            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

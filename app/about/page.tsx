import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ShieldCheck, Heart, Users, Target, ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | SocialVideoDownloader',
  description: 'Learn about the mission, values, and permission-first philosophy behind SocialVideoDownloader.',
}

export default function AboutPage() {
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
              <Heart size={14} /> Our Mission &amp; Ethos
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              About SocialVideoDownloader
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Building a clean, ethical, and modern platform for archiving and saving public social content without dark patterns, intrusive ads, or permission violations.
            </p>

            <div className="pt-2">
              <a
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl shadow-yellow-500/10"
              >
                Start Downloading
                <ArrowRight size={17} className="text-black" />
              </a>
            </div>
          </div>
        </section>

        {/* 3 Pillars Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-16">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  The Mission
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Every day, creators, researchers, journalists, and students need to reference and archive public social media. Most downloader tools are plagued with pop-up ads, malware risks, and sketchy redirects. SocialVideoDownloader provides a modern, fast, secure alternative that puts user safety first.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Permission-First Ethos
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  We believe in the open web and personal responsibility. SocialVideoDownloader strictly operates on content made publicly visible by creators. We do not bypass logins, DRM, or private accounts, ensuring our platform remains compliant and respectful of digital rights.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
                  <Users size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Who We Serve
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  From content creators collecting inspiration to educators preparing classroom materials and analysts tracking cultural trends, SocialVideoDownloader empowers users worldwide with professional-grade media handling tools.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden mt-12">
              <div className="space-y-3 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Start using SocialVideoDownloader today
                </h3>
                <p className="text-slate-300 text-base max-w-xl mx-auto">
                  100% free, no registration required, and designed for speed and quality.
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/#downloader"
                  className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
                >
                  <Sparkles size={16} className="text-black" />
                  Explore Downloaders
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

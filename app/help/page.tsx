import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center & Support | SocialVideoDownloader',
  description: 'Troubleshoot common issues, find answers to frequently asked questions, or contact the SocialVideoDownloader team.',
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Live Animated Hero Header */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[130px] animate-pulse-glow" />
            <div className="absolute top-[60px] right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <HelpCircle size={14} /> SUPPORT &amp; DOCUMENTATION
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Help Center &amp; Support
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about downloading public social media, troubleshooting URLs, and format compatibility.
            </p>

            <div className="pt-2">
              <Link
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl shadow-yellow-500/10"
              >
                Go to Downloader
                <ArrowRight size={17} className="text-black" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Grid */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  q: 'What platforms can I download from?',
                  a: 'SocialVideoDownloader supports Instagram, TikTok, YouTube Shorts, X (Twitter), Pinterest, Reddit, LinkedIn, Snapchat, Threads, and direct public video URLs with zero watermarks.',
                },
                {
                  q: 'Why did my download fail?',
                  a: 'Downloads may fail if the original post was deleted, set to private, or region-locked. Ensure the URL is accessible in a private/incognito window without signing in.',
                },
                {
                  q: 'How do I download on iPhone / iOS?',
                  a: 'In Safari, tap Download and confirm the download prompt. The saved MP4 or MP3 file will appear directly in your Safari downloads manager and Files app.',
                },
                {
                  q: 'How do I download on Android?',
                  a: 'In Chrome, Edge, or Firefox, clicking Download automatically saves the file to your Downloads folder and makes it accessible in your Gallery.',
                },
                {
                  q: 'Are there any daily download limits?',
                  a: 'No! SocialVideoDownloader is completely free with no daily limits or required registration.',
                },
                {
                  q: 'Can I extract audio as MP3?',
                  a: 'Yes! When available, select the MP3 Audio format option from the format selector to save only the soundtrack.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 space-y-3"
                >
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            {/* Need More Help Box */}
            <div className="bg-[#040817] border border-blue-900/40 animate-border-glow rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Still have questions or found an issue?</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Reach out to our support team or check our platform uptime and status.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <Link
                  href="/contact"
                  className="neurex-yellow-btn px-6 py-3 text-sm font-bold inline-flex items-center gap-2"
                >
                  Contact Support <ArrowRight size={16} />
                </Link>
                <Link
                  href="/status"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
                >
                  System Status
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

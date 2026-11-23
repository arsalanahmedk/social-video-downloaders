import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center & Support',
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

            {/* Troubleshooting, step by step */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Troubleshooting, step by step
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                When a link fails, work through these checks in order before assuming
                the site is broken. First, open the link in a private or incognito
                browser window without signing in: if it asks you to log in, the post
                is login-walled and cannot be downloaded by any web tool. Second,
                confirm the post is still there and still public — deleted posts and
                posts switched to private fail for every downloader. Third, copy a
                clean link from the post&apos;s own page, without tracking
                parameters, and paste that instead of a shortened share link.
                Fourth, check the platform: TikTok videos, LinkedIn, Reddit, and
                Snapchat are all unreliable from a cloud server, for the reasons
                explained on their tool pages, so a failure there usually means the
                platform blocked the request. Finally, wait an hour and try once
                more — platforms rate-limit requests, and a short wait often clears
                a temporary block. Retrying ten times in a row does not help and can
                make a rate limit worse.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                If a download finishes but the file is wrong — silent, frozen, or
                only a few seconds long — the download itself was interrupted or the
                platform served an incomplete stream. Re-download on stable Wi-Fi,
                and play the file through once before closing the tab. If a video
                has no sound, check whether the original post has sound at all:
                GIFs are always silent, some Reels lose their licensed music, and
                Reddit videos only carry sound when the audio stream resolves
                alongside the video stream.
              </p>
            </div>

            {/* Platform reliability, honestly */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Which platforms work reliably — and which do not
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                YouTube, Instagram Reels and photos, Facebook videos and Reels,
                X / Twitter, and Pinterest resolve reliably for public posts, in
                the resolutions those platforms serve. TikTok photo posts work
                reliably through a dedicated proxy; TikTok videos frequently fail
                because TikTok blocks requests from cloud server addresses.
                LinkedIn video is mostly behind a login wall and usually cannot be
                downloaded. Reddit videos are unreliable for the same cloud-blocking
                reason. Snapchat Spotlight clips time out frequently. Threads has
                no dedicated download extractor, so many Threads posts fail — the
                Instagram version of the same post, which most creators cross-post,
                usually resolves without trouble. Each tool page states its own
                reliability plainly, so check the page for the platform you are
                using before relying on it.
              </p>
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

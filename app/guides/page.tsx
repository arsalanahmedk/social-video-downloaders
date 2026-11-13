import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { BookOpen, ArrowRight } from 'lucide-react'
import { GUIDE_LINKS } from './guide-layout'

export const metadata: Metadata = {
  title: 'Guides: How to Download Videos from Instagram, TikTok, YouTube & Facebook | SocialVideoDownloader',
  description:
    'Step-by-step guides to downloading public Instagram Reels, TikTok videos, YouTube Shorts and Facebook videos — and how to save videos for offline viewing legally.',
  alternates: { canonical: '/guides' },
}

const GUIDE_DESCRIPTIONS: Record<string, string> = {
  'how-to-download-instagram-reels':
    'Copy the Reel link, paste it into the downloader, and save the MP4 on iPhone, Android or desktop — plus what to do when a Reel will not download.',
  'how-to-download-tiktok-videos-without-watermark':
    'Save the clean original file TikTok streams to viewers, instead of the watermarked copy from TikTok’s own save button. Includes the rules on reposting.',
  'how-to-download-youtube-shorts':
    'Save a public Short as MP4 or MP3, when YouTube Premium is the better option, and why re-uploading someone else’s Short gets channels strikes.',
  'how-to-download-facebook-videos':
    'Download a public Facebook video or Reel as an MP4 — and why private groups, friends-only videos and stories cannot, and should not, be downloaded.',
  'how-to-save-videos-for-offline-viewing-legally':
    'What you may save, what you must not, fair use in plain language, and how to credit a creator properly. Read this one first if you plan to repost.',
}

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />
      <main>
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px]" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-300">
              <BookOpen size={14} /> Step-by-step guides
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
              Guides
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              How to download public videos from each platform — and how to do it legally.
              Every guide covers phone and desktop, the mistakes that stop downloads working,
              and the rules on crediting creators.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
            {GUIDE_LINKS.map((g, i) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group bg-[#f8fafc] border border-slate-200/80 rounded-[28px] p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-start gap-5"
              >
                <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-extrabold text-lg">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {g.title}
                  </span>
                  <span className="block text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    {GUIDE_DESCRIPTIONS[g.slug]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 mt-3">
                    Read the guide <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Prefer to just download?{' '}
              <a href="/#downloader" className="text-blue-600 font-semibold underline">
                Paste a public link into the downloader
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <NeurexFooter />
    </div>
  )
}

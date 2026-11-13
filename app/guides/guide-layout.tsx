import type { ReactNode } from 'react'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ArrowRight, BookOpen, ShieldCheck } from 'lucide-react'

export const GUIDE_LINKS = [
  { slug: 'how-to-download-instagram-reels', title: 'How to Download Instagram Reels' },
  { slug: 'how-to-download-tiktok-videos-without-watermark', title: 'How to Download TikTok Videos Without Watermark' },
  { slug: 'how-to-download-youtube-shorts', title: 'How to Download YouTube Shorts' },
  { slug: 'how-to-download-facebook-videos', title: 'How to Download Facebook Videos' },
  { slug: 'how-to-save-videos-for-offline-viewing-legally', title: 'How to Save Videos for Offline Viewing Legally' },
]

export function GuideLayout({
  title,
  description,
  children,
  currentSlug,
}: {
  title: string
  description: string
  children: ReactNode
  currentSlug: string
}) {
  const related = GUIDE_LINKS.filter((g) => g.slug !== currentSlug)
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />
      <main>
        <section className="relative bg-[#030712] text-white pt-16 pb-16 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px]" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
            <Link href="/guides" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white">
              <BookOpen size={14} /> All guides
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed">{description}</p>
            <p className="text-xs text-slate-400">
              A practical, step-by-step guide. Only public posts can be downloaded — private
              accounts, paywalled videos and DRM-protected content are out of scope.
            </p>
          </div>
        </section>

        <article className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-700 text-base leading-relaxed guide-article">
            {children}
          </div>

          <div className="max-w-3xl mx-auto mt-14 rounded-[28px] bg-slate-900 text-white p-8 space-y-4">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} /> Use it responsibly
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Downloading a video does not give you the rights to it. Save your own posts,
              or public content you have permission to keep, for personal offline use. If
              you want to repost or reuse someone else&apos;s video, ask the creator first
              and credit them. See our{' '}
              <Link href="/guides/how-to-save-videos-for-offline-viewing-legally" className="text-blue-300 font-semibold underline">
                legal offline-viewing guide
              </Link>{' '}
              for the full picture.
            </p>
            <a href="/#downloader" className="neurex-yellow-btn px-6 py-3 text-sm inline-flex items-center gap-2 font-bold">
              Try the downloader <ArrowRight size={15} className="text-black" />
            </a>
          </div>

          <div className="max-w-3xl mx-auto mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">More guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600">{g.title}</span>
                  <span className="block text-xs text-slate-500 mt-1">Read the guide →</span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <NeurexFooter />
    </div>
  )
}

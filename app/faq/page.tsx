import type { Metadata } from 'next'
import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { HelpCircle, ChevronRight, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | SocialVideoDownloader',
  description: 'Find clear answers to common questions about downloading social media videos, quality formats, privacy, and mobile usage.',
}

const faqs = [
  {
    category: 'General Questions',
    items: [
      {
        q: 'What is SocialVideoDownloader?',
        a: 'SocialVideoDownloader is a modern, permission-first web application designed to help users download publicly accessible social media (videos, reels, shorts, photos, and audio) across 10 major platforms without logging in.'
      },
      {
        q: 'Is SocialVideoDownloader free?',
        a: 'Yes, 100% free with no monthly subscription, credit card requirement, or download quotas.'
      },
      {
        q: 'Do I need to install any app or browser extension?',
        a: 'No. SocialVideoDownloader is entirely browser-based and works seamlessly on Windows, macOS, Linux, iOS (Safari), and Android (Chrome/Firefox).'
      }
    ]
  },
  {
    category: 'Quality & Formats',
    items: [
      {
        q: 'What video quality can I download?',
        a: 'We offer available public stream resolutions up to 1080p Full HD (and 4K where supported by the source platform).'
      },
      {
        q: 'Can I extract MP3 audio tracks?',
        a: 'Yes, we provide direct 320kbps MP3 audio extraction for YouTube, TikTok, Instagram Reels, X/Twitter, and Reddit.'
      },
      {
        q: 'Are TikTok videos downloaded with or without watermarks?',
        a: 'Whenever permitted by the underlying public video stream, TikTok videos are delivered without the bouncing watermark.'
      }
    ]
  },
  {
    category: 'Privacy & Permissions',
    items: [
      {
        q: 'Can SocialVideoDownloader download from private accounts or private groups?',
        a: 'No. SocialVideoDownloader strictly operates on public content. We never bypass passwords, paywalls, DRM protections, or private account security controls.'
      },
      {
        q: 'Do you store copies of downloaded videos on your servers?',
        a: 'No. SocialVideoDownloader operates as a transient streaming router. No user-downloaded media or personally identifiable logs are stored permanently.'
      }
    ]
  },
  {
    category: 'Troubleshooting',
    items: [
      {
        q: 'Why did my URL fail to resolve?',
        a: 'Common causes include: the post is set to private, the creator deleted the video, the platform changed its URL format, or the URL contained broken tracking parameters. Try copying the clean link again.'
      },
      {
        q: 'How do I download on iPhone or iPad (iOS)?',
        a: 'Open SocialVideoDownloader in Safari. Once the download link appears, tap it. Safari will prompt you to download the file. You can then access it in the Files app or save it directly to your Camera Roll.'
      }
    ]
  }
]

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((category) =>
      category.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    )
  }

  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
              <HelpCircle size={14} /> Knowledge Base &amp; FAQ
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Find clear answers to common questions about downloading social media videos, quality formats, privacy, and mobile usage.
            </p>

            <div className="pt-2">
              <a
                href="/#downloader"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl shadow-yellow-500/10"
              >
                Go to Downloader
                <ArrowRight size={17} className="text-black" />
              </a>
            </div>
          </div>
        </section>

        {/* Categorized FAQs Section */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {faqs.map((cat, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {cat.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-[#f8fafc] border border-slate-200/80 rounded-[28px] p-7 shadow-sm hover:shadow-md transition-shadow space-y-3"
                    >
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.q}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom Call to Action Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden mt-12">
              <div className="space-y-3 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Still have questions or need assistance?
                </h3>
                <p className="text-slate-300 text-base max-w-xl mx-auto">
                  Check out our platform guides, how-it-works page, or start downloading right now.
                </p>
              </div>

              <div className="relative z-10 pt-2 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  href="/#downloader"
                  className="neurex-yellow-btn px-8 py-3 text-sm inline-flex items-center gap-2 shadow-xl"
                >
                  <Sparkles size={16} className="text-black" />
                  Try Downloader
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexHero } from '@/components/neurex/neurex-hero'
import { HeroShowcase } from '@/components/neurex/hero-showcase'
import { ImpactStats } from '@/components/neurex/impact-stats'
import { TestimonialBanner } from '@/components/neurex/testimonial-banner'
import { FeatureTabs } from '@/components/neurex/feature-tabs'
import { PlatformDirectory } from '@/components/neurex/platform-directory'
import { HowItWorksSection } from '@/components/neurex/how-it-works-section'
import { ComplianceAndFAQ } from '@/components/neurex/compliance-and-faq'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { GUIDE_LINKS } from './guides/guide-layout'

// Guides featured on the homepage, in display order.
const HOMEPAGE_GUIDE_SLUGS = [
  'how-to-download-youtube-shorts',
  'how-to-download-instagram-reels',
  'how-to-download-tiktok-videos-without-watermark',
  'how-to-download-facebook-videos',
  'how-to-download-x-twitter-videos',
  'how-to-download-pinterest-videos',
]

export const metadata: Metadata = {
  title: 'Free Social Media Video Downloader | MP4, MP3 & HD',
  description:
    'Download public Instagram Reels, TikTok videos, YouTube Shorts, Facebook videos, X clips, Reddit videos, photos, and audio in HD. Free, fast, and no registration.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      {/* 1. Neurex Sticky Dark Navbar */}
      <NeurexNavbar />

      <main>
        {/* 2. Neurex Hero Section (Screenshot 2: Split Headline, Subtext, Yellow Pill CTA, Avatars, Live Downloader, Logo Marquee) */}
        <NeurexHero />

        {/* 3. Hero Visual Showcase Banner (Screenshot 4: Royal Blue Container, Creator Portrait, Floating Balance/Metrics Cards with Animations) */}
        <HeroShowcase />

        {/* 4. What the tool does — honest feature cards, no usage statistics */}
        <ImpactStats />

        {/* 5. 3-Step Process: Copy -> Paste -> Download */}
        <HowItWorksSection />

        {/* 6. Testimonial Banner & Action Bar (Screenshot 3: Courtney Founder Card + "Build a stronger future with smarter tools" + Yellow Button) */}
        <TestimonialBanner />

        {/* 7. Feature Tabs Split Section (Screenshot 5: Creator Photo + [MANAGE] [OPTIMISE] [PERFORMANCE] Tabs + Custom Bullets) */}
        <FeatureTabs />

        {/* 8. Dedicated Platform Extractors Directory */}
        <PlatformDirectory />

        {/* Guides — links from the highest-traffic page to individual guides */}
        <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                Learn How
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Guides
              </h2>
              <p className="text-slate-600 text-base max-w-xl mx-auto">
                Step-by-step, for every platform — phone and desktop.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOMEPAGE_GUIDE_SLUGS.map((slug) => {
                const guide = GUIDE_LINKS.find((g) => g.slug === slug)
                if (!guide) return null
                return (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group bg-[#f8fafc] border border-slate-200/80 rounded-[28px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <span className="block text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 mt-3">
                      Read the guide <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="text-center">
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-blue-600 hover:text-blue-700"
              >
                View all 10 guides <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* 9. Compliance & FAQ Accordion */}
        <ComplianceAndFAQ />
      </main>

      {/* 9. Neurex Dark Footer */}
      <NeurexFooter />
    </div>
  )
}
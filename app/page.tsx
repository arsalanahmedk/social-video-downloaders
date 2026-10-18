import type { Metadata } from 'next'
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

        {/* 4. The Impact Section (Screenshot 1: 99%, 90M, 100%, 12+ Cards in Clean Grid) */}
        <ImpactStats />

        {/* 5. 3-Step Process: Copy -> Paste -> Download */}
        <HowItWorksSection />

        {/* 6. Testimonial Banner & Action Bar (Screenshot 3: Courtney Founder Card + "Build a stronger future with smarter tools" + Yellow Button) */}
        <TestimonialBanner />

        {/* 7. Feature Tabs Split Section (Screenshot 5: Creator Photo + [MANAGE] [OPTIMISE] [PERFORMANCE] Tabs + Custom Bullets) */}
        <FeatureTabs />

        {/* 8. Dedicated Platform Extractors Directory */}
        <PlatformDirectory />

        {/* 9. Compliance & FAQ Accordion */}
        <ComplianceAndFAQ />
      </main>

      {/* 9. Neurex Dark Footer */}
      <NeurexFooter />
    </div>
  )
}
import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader | Idea Pins & Clips in HD MP4 | SocialVideoDownloader',
  description: 'Download public Pinterest videos, Idea Pins, and animated clips in 1080p Full HD MP4 directly to your device.',
}

const config: ToolPageConfig = {
  slug: 'pinterest-video',
  title: 'Pinterest Video Downloader',
  headline: 'Pinterest Video & Idea Pins Downloader',
  subtitle: 'Save inspiring video pins, DIY tutorials, and Idea Pins from Pinterest in high definition MP4.',
  badge: 'PINTEREST VIDEO EXTRACTOR',
  accentColor: '#E60023',
  targetPlatformId: 'pinterest',
  targetPlatformName: 'Pinterest',
  sampleUrl: 'https://www.pinterest.com/pin/123456789012345/',
  inputPlaceholder: 'Paste Pinterest pin link (pinterest.com or pin.it)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Supports pin.it Shortlinks', desc: 'Directly accepts mobile shortlinks and resolves canonical pin videos.' },
    { title: 'Full 1080p Resolution', desc: 'Saves video pins in their highest resolution without downscaling.' },
    { title: 'Audio Synchronized', desc: 'Includes full audio tracks for tutorials, recipes, and aesthetic videos.' },
    { title: 'No Watermark Added', desc: 'Clean video file output without branding overlays.' }
  ],
  steps: [
    { step: '01', title: 'Copy Pin Link', desc: 'Tap the share button on the Pinterest pin and select "Copy Link".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the pin link into the downloader field above.' },
    { step: '03', title: 'Download MP4', desc: 'Select HD Video and click Download to save the file.' }
  ],
  faqs: [
    { q: 'Can I download private secret board pins?', a: 'No. Only pins publicly visible on public boards are accessible.' },
    { q: 'Does this support shortened pin.it URLs?', a: 'Yes, mobile pin.it links are fully supported.' }
  ],
  relatedTools: [
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'High-Res JPG' },
    { title: 'TikTok Video Downloader', href: '/tiktok-no-watermark', badge: 'Short Videos' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Aesthetic Reels' }
  ]
}

export default function PinterestVideoPage() {
  return <SpecializedToolPage config={config} />
}

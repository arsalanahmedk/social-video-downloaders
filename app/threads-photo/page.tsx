import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Threads Photo Downloader | Original Resolution JPG | SocialVideoDownloader',
  description: 'Download high-resolution photos and image galleries from Meta Threads posts in original quality.',
}

const config: ToolPageConfig = {
  slug: 'threads-photo',
  title: 'Threads Photo Downloader',
  headline: 'Threads Photo & Image Downloader',
  subtitle: 'Retrieve original full-resolution photos, galleries, and illustrations from Meta Threads posts.',
  badge: 'THREADS IMAGE SAVER',
  accentColor: '#ffffff',
  targetPlatformId: 'threads',
  targetPlatformName: 'Threads',
  sampleUrl: 'https://www.threads.net/@zuck/post/CxYz1234567',
  inputPlaceholder: 'Paste Threads image post URL...',
  primaryMediaType: 'image',
  features: [
    { title: 'Full Resolution JPG', desc: 'Saves full size images up to 1440x1440 and beyond.' },
    { title: 'Multi-Image Gallery Support', desc: 'Inspects posts with multiple photos easily.' },
    { title: 'Lossless Compression', desc: 'Retains vibrant colors and sharp details.' },
    { title: '100% Free & Fast', desc: 'Direct saving without annoying ads or signups.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Tap Share on the Threads post and copy link.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the link to inspect public images.' },
    { step: '03', title: 'Save Photo', desc: 'Click Download to receive the original JPG file.' }
  ],
  faqs: [
    { q: 'Can I download photos on mobile?', a: 'Yes! Tapping download saves the photo directly to your camera roll.' },
    { q: 'Is it completely free?', a: 'Yes, no credit cards or subscriptions required.' }
  ],
  relatedTools: [
    { title: 'Threads Video Downloader', href: '/threads-video', badge: '1080p MP4' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Instagram JPG' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Pinterest Pins' }
  ]
}

export default function ThreadsPhotoPage() {
  return <SpecializedToolPage config={config} />
}

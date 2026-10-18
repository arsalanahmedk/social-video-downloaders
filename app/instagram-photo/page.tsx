import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Instagram Photo & Carousel Downloader | High Resolution JPG | SocialVideoDownloader',
  description: 'Download full-resolution public Instagram photos, multi-image carousel albums, and high-res cover pictures.',
}

const config: ToolPageConfig = {
  slug: 'instagram-photo',
  title: 'Instagram Photo Downloader',
  headline: 'Instagram Photo & Carousel Downloader',
  subtitle: 'Retrieve uncompressed, full-fidelity Instagram photos and multi-slide carousel albums in original high resolution.',
  badge: 'HIGH-RES PHOTO SAVER',
  accentColor: '#fd1d1d',
  targetPlatformId: 'instagram',
  targetPlatformName: 'Instagram',
  sampleUrl: 'https://www.instagram.com/p/C9ABC5678/',
  inputPlaceholder: 'Paste Instagram post or photo link (e.g., https://instagram.com/p/...)',
  primaryMediaType: 'image',
  features: [
    { title: 'Maximum Resolution JPG', desc: 'Saves full 1080x1350 and 1080x1080 source photos without downscaling.' },
    { title: 'Multi-Image Carousels', desc: 'Inspects public carousel posts with multiple photos in a single submission.' },
    { title: 'Lossless Visual Quality', desc: 'No recompression artifacts or quality degradation.' },
    { title: '100% Free & Unlimited', desc: 'Save as many public photos as you need without caps.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Tap Share on the Instagram photo or carousel post and copy link.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the photo downloader box above.' },
    { step: '03', title: 'Save High-Res Image', desc: 'Click Download to receive the original resolution JPG image.' }
  ],
  faqs: [
    { q: 'Will this download multiple photos from a carousel post?', a: 'Yes! Carousel posts are resolved so you can select and download individual slides or all photos.' },
    { q: 'Can I download photos on iPhone or Android?', a: 'Yes, files save directly to your mobile device gallery or downloads folder.' }
  ],
  relatedTools: [
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels MP4' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Aesthetic Pins' },
    { title: 'Threads Photo Downloader', href: '/threads-photo', badge: 'Threads JPG' }
  ]
}

export default function InstagramPhotoPage() {
  return <SpecializedToolPage config={config} />
}

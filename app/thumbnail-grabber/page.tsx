import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Universal Thumbnail Grabber | High-Res Video Covers | SocialVideoDownloader',
  description: 'Download full-resolution video cover posters and thumbnails from YouTube, TikTok, Facebook, and Instagram.',
}

const config: ToolPageConfig = {
  slug: 'thumbnail-grabber',
  title: 'Universal Thumbnail Grabber',
  headline: 'Universal Thumbnail & Poster Grabber',
  subtitle: 'Retrieve original high-definition cover images and video thumbnails across YouTube, TikTok, Instagram, and Reddit.',
  badge: 'UNIVERSAL COVER GRABBER',
  accentColor: '#c6f135',
  targetPlatformId: 'youtube',
  targetPlatformName: 'Multi-Platform',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste any public video link to fetch its thumbnail poster...',
  primaryMediaType: 'image',
  features: [
    { title: 'Full 1080p & 4K Covers', desc: 'Fetches raw uncompressed poster images uploaded by creators.' },
    { title: 'Multi-Platform Engine', desc: 'Extracts covers from YouTube, TikTok, Instagram, and Facebook.' },
    { title: 'Clean Un-Watermarked JPG', desc: 'No play button stamp or duration badge baked into the image.' },
    { title: 'Design & Presentation Ready', desc: 'Ideal for mockups, blogs, editorial reviews, and archives.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the URL from any supported social video platform.' },
    { step: '02', title: 'Paste in Grabber', desc: 'Insert the link to extract all available thumbnail resolutions.' },
    { step: '03', title: 'Save Cover JPG', desc: 'Download the full-resolution thumbnail poster immediately.' }
  ],
  faqs: [
    { q: 'Can I download thumbnails from YouTube Shorts?', a: 'Yes! YouTube Shorts covers are extracted in full vertical resolution.' },
    { q: 'Will the image have a play button on it?', a: 'No! You get the clean source poster without overlays.' }
  ],
  relatedTools: [
    { title: 'YouTube Thumbnail Downloader', href: '/youtube-thumbnail', badge: 'MaxRes YouTube' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Pinterest JPG' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Instagram High-Res' }
  ]
}

export default function ThumbnailGrabberPage() {
  return <SpecializedToolPage config={config} />
}

import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Facebook Reels Downloader | HD MP4 Video | SocialVideoDownloader',
  description: 'Download public Facebook Reels in Full HD 1080p MP4 directly to your device without quality loss.',
}

const config: ToolPageConfig = {
  slug: 'facebook-reels',
  title: 'Facebook Reels Downloader',
  headline: 'Facebook Reels Downloader',
  subtitle: 'Save public Facebook Reels and short videos in 1080p Full HD MP4 directly to your mobile phone or PC.',
  badge: 'FB REELS HD EXTRACTOR',
  accentColor: '#1877F2',
  targetPlatformId: 'facebook',
  targetPlatformName: 'Facebook',
  sampleUrl: 'https://www.facebook.com/watch/?v=1234567890',
  inputPlaceholder: 'Paste public Facebook Reel link (facebook.com or fb.watch)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Full HD 1080p & 720p', desc: 'Select high definition or standard data-saver resolution.' },
    { title: 'Supports fb.watch Links', desc: 'Automatically decodes mobile share links and short links.' },
    { title: 'Synchronized Audio', desc: 'Full stereo audio stream integrated into the output MP4 container.' },
    { title: 'Zero Login Needed', desc: 'Works purely via public Facebook Graph and CDN endpoints.' }
  ],
  steps: [
    { step: '01', title: 'Copy Reel Link', desc: 'Tap Share on the public Facebook Reel and click "Copy Link".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the field above.' },
    { step: '03', title: 'Save Reel Video', desc: 'Click Download to receive your HD video instantly.' }
  ],
  faqs: [
    { q: 'Can I download Reels from private Facebook groups?', a: 'No, only publicly posted Reels with the globe "Public" icon are accessible.' },
    { q: 'Does this tool work on iPhone and Android?', a: 'Yes, it works smoothly in Safari, Chrome, and all modern mobile web browsers.' }
  ],
  relatedTools: [
    { title: 'Facebook Video Downloader', href: '/facebook-video', badge: 'Watch Streams' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'IG Reels' },
    { title: 'TikTok Video Downloader', href: '/tiktok-no-watermark', badge: 'No Watermark' }
  ]
}

export default function FacebookReelsPage() {
  return <SpecializedToolPage config={config} />
}

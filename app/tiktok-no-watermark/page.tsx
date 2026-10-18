import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'TikTok Downloader Without Watermark | HD MP4 | SocialVideoDownloader',
  description: 'Download public TikTok videos in full 1080p HD without the floating watermark. Clean, fast, and free.',
}

const config: ToolPageConfig = {
  slug: 'tiktok-no-watermark',
  title: 'TikTok Downloader Without Watermark',
  headline: 'TikTok Video Downloader Without Watermark',
  subtitle: 'Save clean, watermark-free TikTok videos in Full HD MP4 directly to your computer or smartphone.',
  badge: 'ZERO WATERMARK TIKTOK',
  accentColor: '#00f2fe',
  targetPlatformId: 'tiktok',
  targetPlatformName: 'TikTok',
  sampleUrl: 'https://www.tiktok.com/@creator/video/723456789012345',
  inputPlaceholder: 'Paste TikTok video link (tiktok.com or vm.tiktok.com)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Zero Bouncing Watermark', desc: 'Retrieves the clean video source without platform logos or usernames.' },
    { title: 'Original 1080p Quality', desc: 'Preserves high frame rate vertical video fidelity.' },
    { title: 'Short Link Compatibility', desc: 'Supports both standard desktop URLs and vm.tiktok.com mobile share links.' },
    { title: 'Instant Processing', desc: 'No queue or conversion wait times — resolves in under a second.' }
  ],
  steps: [
    { step: '01', title: 'Copy TikTok Share Link', desc: 'Open TikTok, click the Share arrow on the video and click Copy Link.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the field above and tap Download Now.' },
    { step: '03', title: 'Download No-Watermark MP4', desc: 'Select "HD Video (No Watermark)" to save the clean video file.' }
  ],
  faqs: [
    { q: 'Is it really completely watermark-free?', a: 'Yes! Our extractor queries the direct video stream before the overlay is applied by mobile apps.' },
    { q: 'Do I need to install an app or extension?', a: 'No, SocialVideoDownloader is 100% web-based and runs in any browser.' }
  ],
  relatedTools: [
    { title: 'TikTok Audio & Sound Extractor', href: '/tiktok-audio', badge: 'MP3 Sounds' },
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: 'Shorts 1080p' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels MP4' }
  ]
}

export default function TikTokNoWatermarkPage() {
  return <SpecializedToolPage config={config} />
}

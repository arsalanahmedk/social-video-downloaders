import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader | HD MP4 Without Watermark | SocialVideoDownloader',
  description: 'Download public Instagram Reels in original 1080p Full HD video or audio track. Fast, free, and no login required.',
}

const config: ToolPageConfig = {
  slug: 'instagram-reels',
  title: 'Instagram Reels Downloader',
  headline: 'Instagram Reels Downloader',
  subtitle: 'Save public Instagram Reels in full 1080p HD resolution with synchronized audio and zero watermark overlays.',
  badge: 'INSTAGRAM REELS EXTRACTOR',
  accentColor: '#E1306C',
  targetPlatformId: 'instagram',
  targetPlatformName: 'Instagram',
  sampleUrl: 'https://www.instagram.com/reel/C8XYZ1234/',
  inputPlaceholder: 'Paste Instagram Reel link (e.g., https://instagram.com/reel/...)',
  primaryMediaType: 'video',
  features: [
    { title: 'Full 1080p Resolution', desc: 'Retains original upload bitrate and 1080x1920 vertical dimensions.' },
    { title: 'Direct MP4 Stream', desc: 'Saves directly as standard MP4 playable on iOS, Android, and PC.' },
    { title: 'Zero Overlay Watermarks', desc: 'Extracts the source stream directly from public CDN endpoints.' },
    { title: 'Instant Mobile Support', desc: 'Works effortlessly in Safari, Chrome, and all mobile browsers.' }
  ],
  steps: [
    { step: '01', title: 'Copy Reel Link', desc: 'In Instagram, tap Share on any public Reel and click "Copy Link".' },
    { step: '02', title: 'Paste in Downloader', desc: 'Paste the Reel URL into the input field above and click Download Now.' },
    { step: '03', title: 'Save Video', desc: 'Select 1080p Full HD and the MP4 video will be downloaded instantly.' }
  ],
  faqs: [
    { q: 'Can I download Reels from private accounts?', a: 'No. SocialVideoDownloader strictly operates on public posts and does not bypass private account protections.' },
    { q: 'Is there a limit on how many Reels I can download?', a: 'No, you can download unlimited public Reels completely free of charge.' },
    { q: 'Can I extract the audio track as MP3?', a: 'Yes! Select the Audio MP3 option after resolving any Reel to extract the soundtrack.' }
  ],
  relatedTools: [
    { title: 'Instagram Stories Downloader', href: '/instagram-stories', badge: 'Stories & Highlights' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'High-Res JPG' },
    { title: 'TikTok Video Downloader', href: '/tiktok-no-watermark', badge: 'Zero Watermark' }
  ]
}

export default function InstagramReelsPage() {
  return <SpecializedToolPage config={config} />
}

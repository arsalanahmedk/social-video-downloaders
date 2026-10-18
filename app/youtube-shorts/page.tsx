import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'YouTube Shorts Downloader | 1080p Vertical Video | SocialVideoDownloader',
  description: 'Download public YouTube Shorts in Full HD MP4 or extract audio track as MP3. Fast, free, and no software required.',
}

const config: ToolPageConfig = {
  slug: 'youtube-shorts',
  title: 'YouTube Shorts Downloader',
  headline: 'YouTube Shorts Downloader',
  subtitle: 'Save vertical YouTube Shorts in crystal clear 1080p Full HD video or download audio as MP3.',
  badge: 'YOUTUBE SHORTS HD',
  accentColor: '#FF0000',
  targetPlatformId: 'youtube',
  targetPlatformName: 'YouTube',
  sampleUrl: 'https://www.youtube.com/shorts/abc123xyz',
  inputPlaceholder: 'Paste YouTube Shorts link (youtube.com/shorts/...)',
  primaryMediaType: 'video',
  features: [
    { title: 'True 1080p 60FPS', desc: 'Retains maximum vertical resolution and smooth high frame rate.' },
    { title: 'Direct MP4 File', desc: 'Universal video container playable on all platforms and editing suites.' },
    { title: 'MP3 Soundtrack Extraction', desc: 'Extract background songs and narration with a single tap.' },
    { title: 'Mobile & Desktop Friendly', desc: 'Easily save Shorts directly to your iPhone camera roll or PC.' }
  ],
  steps: [
    { step: '01', title: 'Copy Shorts URL', desc: 'Tap Share on the YouTube Short and select "Copy Link".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the Shorts URL into the input field above.' },
    { step: '03', title: 'Save 1080p Short', desc: 'Select 1080p Full HD to begin the direct file download.' }
  ],
  faqs: [
    { q: 'Can I download age-restricted Shorts?', a: 'No, content requiring login or age-verification is not accessible.' },
    { q: 'Does this support shortened youtu.be links?', a: 'Yes, both youtube.com/shorts/... and youtu.be URLs are supported.' }
  ],
  relatedTools: [
    { title: 'YouTube to MP3 Converter', href: '/youtube-to-mp3', badge: '320kbps Audio' },
    { title: 'YouTube Thumbnail Saver', href: '/youtube-thumbnail', badge: 'MaxRes JPG' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels MP4' }
  ]
}

export default function YouTubeShortsPage() {
  return <SpecializedToolPage config={config} />
}

import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Universal Social Audio & MP3 Extractor | 320kbps Audio | SocialVideoDownloader',
  description: 'Extract and download MP3 audio from any public video on YouTube, TikTok, Instagram, Twitter, and Reddit.',
}

const config: ToolPageConfig = {
  slug: 'audio-extractor',
  title: 'Universal Audio & MP3 Extractor',
  headline: 'Universal Social Audio & MP3 Extractor',
  subtitle: 'Extract studio-quality 320kbps MP3 audio tracks from any public video across YouTube, TikTok, Instagram, X, and Reddit.',
  badge: 'UNIVERSAL MP3 CONVERTER',
  accentColor: '#38bdf8',
  targetPlatformId: 'youtube',
  targetPlatformName: 'Multi-Platform',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste any public video link from YouTube, TikTok, Instagram, X, or Reddit...',
  primaryMediaType: 'audio',
  features: [
    { title: 'Multi-Platform Audio Ripping', desc: 'Works across all 10 supported platforms seamlessly.' },
    { title: 'Crisp 320kbps Output', desc: 'High quality stereo MP3 with full acoustic fidelity.' },
    { title: 'Isolated Vocal & Instrumental', desc: 'Isolates the authentic audio stream directly from the video container.' },
    { title: 'Ringtone & Sample Friendly', desc: 'Perfect for video editors, music producers, and podcasts.' }
  ],
  steps: [
    { step: '01', title: 'Copy Any Video Link', desc: 'Copy the URL from YouTube, TikTok, Instagram, X, or Reddit.' },
    { step: '02', title: 'Paste in Extractor', desc: 'Paste the link into SocialVideoDownloader to analyze audio stream bitrates.' },
    { step: '03', title: 'Download MP3 Track', desc: 'Click Download to receive your high-quality MP3 audio file.' }
  ],
  faqs: [
    { q: 'Which platforms are supported for audio extraction?', a: 'YouTube, TikTok, Instagram Reels, Facebook Watch, X (Twitter), and Reddit are all supported.' },
    { q: 'Is the audio compressed or degraded?', a: 'No, we extract the stream at the highest bitrate permitted by the original upload.' }
  ],
  relatedTools: [
    { title: 'YouTube to MP3 Converter', href: '/youtube-to-mp3', badge: 'YouTube 320kbps' },
    { title: 'TikTok Sound Extractor', href: '/tiktok-audio', badge: 'TikTok MP3' },
    { title: 'Universal Thumbnail Grabber', href: '/thumbnail-grabber', badge: 'Covers JPG' }
  ]
}

export default function AudioExtractorPage() {
  return <SpecializedToolPage config={config} />
}

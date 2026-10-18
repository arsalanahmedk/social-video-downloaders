import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter | High Quality 320kbps Audio | SocialVideoDownloader',
  description: 'Convert and download public YouTube videos and Shorts to 320kbps MP3 audio tracks. Fast, secure, and free.',
}

const config: ToolPageConfig = {
  slug: 'youtube-to-mp3',
  title: 'YouTube to MP3 Converter',
  headline: 'YouTube to MP3 Converter',
  subtitle: 'Extract studio-quality 320kbps audio from public YouTube videos, podcasts, and speeches into universal MP3 format.',
  badge: 'STUDIO 320KBPS AUDIO',
  accentColor: '#b20710',
  targetPlatformId: 'youtube',
  targetPlatformName: 'YouTube',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste YouTube video link (youtube.com or youtu.be)...',
  primaryMediaType: 'audio',
  features: [
    { title: 'Crisp 320kbps Bitrate', desc: 'Highest audible audio quality with full stereo frequency response.' },
    { title: 'Universal MP3 Format', desc: 'Plays on any music app, MP3 player, phone, or audio workstation.' },
    { title: 'ID3 Tag Preservation', desc: 'Embeds track title, author metadata, and cover thumbnail automatically.' },
    { title: 'Unlimited Conversions', desc: 'No daily limits or artificial length throttles on public content.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the URL of the YouTube video you wish to convert to audio.' },
    { step: '02', title: 'Paste in Converter', desc: 'Paste the link into SocialVideoDownloader to analyze available audio streams.' },
    { step: '03', title: 'Save MP3', desc: 'Click "Download Audio (MP3)" to save the soundtrack file.' }
  ],
  faqs: [
    { q: 'Is there a limit on video duration?', a: 'SocialVideoDownloader converts standard public YouTube videos up to regular playlist lengths.' },
    { q: 'Is the conversion free?', a: 'Yes, 100% free with no subscription or hidden fees.' }
  ],
  relatedTools: [
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: '1080p Video' },
    { title: 'TikTok Audio Downloader', href: '/tiktok-audio', badge: 'TikTok Sounds' },
    { title: 'Universal Audio Extractor', href: '/audio-extractor', badge: 'Multi-Platform' }
  ]
}

export default function YouTubeToMp3Page() {
  return <SpecializedToolPage config={config} />
}

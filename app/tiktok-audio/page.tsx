import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'TikTok Sound & Audio Downloader | MP3 320kbps | SocialVideoDownloader',
  description: 'Extract and download original TikTok sounds, songs, and voice tracks directly into high-quality MP3 format.',
}

const config: ToolPageConfig = {
  slug: 'tiktok-audio',
  title: 'TikTok Audio & Sound Downloader',
  headline: 'TikTok Sound & Audio Downloader',
  subtitle: 'Rip and download background songs, viral sound clips, and audio tracks from any public TikTok video directly to MP3.',
  badge: 'TIKTOK MP3 SOUND EXTRACTOR',
  accentColor: '#fe0979',
  targetPlatformId: 'tiktok',
  targetPlatformName: 'TikTok',
  sampleUrl: 'https://www.tiktok.com/@creator/video/723456789012345',
  inputPlaceholder: 'Paste TikTok video URL to extract sound...',
  primaryMediaType: 'audio',
  features: [
    { title: 'High Bitrate MP3', desc: 'Outputs clear 320kbps stereo MP3 audio.' },
    { title: 'Sound Isolation', desc: 'Extracts the original audio stream independently from the video frame.' },
    { title: 'Ringtone & Sampling Ready', desc: 'Use extracted tracks for creative edits, ringtones, and offline listening.' },
    { title: 'Lightning Fast', desc: 'Instant conversion without lengthy server encoding delays.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the share link of the TikTok video featuring the sound you want.' },
    { step: '02', title: 'Paste URL', desc: 'Paste into SocialVideoDownloader and let our engine isolate the audio track.' },
    { step: '03', title: 'Download MP3', desc: 'Click "Original Sound (MP3)" to save the audio file directly.' }
  ],
  faqs: [
    { q: 'Will the audio file have good sound quality?', a: 'Yes, we extract the sound in the highest bitrate available on the TikTok CDN.' },
    { q: 'Can I extract sounds from private videos?', a: 'No, only publicly posted TikTok videos can have their audio extracted.' }
  ],
  relatedTools: [
    { title: 'TikTok No Watermark Video', href: '/tiktok-no-watermark', badge: 'HD MP4' },
    { title: 'YouTube to MP3 Downloader', href: '/youtube-to-mp3', badge: 'YouTube Audio' },
    { title: 'Universal Audio Extractor', href: '/audio-extractor', badge: 'All Platforms' }
  ]
}

export default function TikTokAudioPage() {
  return <SpecializedToolPage config={config} />
}

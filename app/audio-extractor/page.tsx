import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Universal Social Audio & MP3 Extractor | 320kbps Audio',
  description: 'Extract and download MP3 audio from any public video on YouTube, TikTok, Instagram, Twitter, and Reddit.',
}

const config: ToolPageConfig = {
  slug: 'audio-extractor',
  title: 'Universal Audio & MP3 Extractor',
  headline: 'Universal Social Audio & MP3 Extractor',
  subtitle: 'Extract the soundtrack from a public video on YouTube, Instagram, Facebook, or X and save it as an MP3 — for offline listening, lectures, podcasts, and editing reference. One page, every supported platform, no app to install. A few platforms resolve less reliably than others, and the FAQs below say which.',
  badge: 'UNIVERSAL MP3 CONVERTER',
  accentColor: '#38bdf8',
  targetPlatformId: 'youtube',
  targetPlatformName: 'Multi-Platform',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste any public video link from YouTube, TikTok, Instagram, X, or Reddit...',
  primaryMediaType: 'audio',
  features: [
    { title: 'Multi-Platform Audio Ripping', desc: 'Accepts links from YouTube, Instagram, Facebook, X, and TikTok in one input box, so you do not need a different tool — or a different page — for each platform’s audio.' },
    { title: 'Best Available Bitrate', desc: 'Extracts the audio stream at the highest bitrate the platform serves for that video, up to 320kbps stereo, rather than re-encoding it down to a smaller, flatter copy.' },
    { title: 'Original Audio Stream', desc: 'Pulls the authentic audio stream from the video container instead of recording playback, so there is no room tone, no notification sound, and no quality lost to a microphone.' },
    { title: 'Ringtone & Sample Friendly', desc: 'The MP3 drops straight into editors, samplers, and ringtone settings. Trim it in any audio editor, fade the ends, and it is ready to use.' },
    { title: 'Long-Form Friendly', desc: 'Handles lectures, podcasts, and long interviews as readily as three-minute songs. A two-hour talk becomes roughly 100 megabytes of audio — small enough to keep on a phone.' },
    { title: 'No Account, No Install', desc: 'Works entirely in the browser. Paste a public link, choose the MP3 option, and save the file — no login, no software, no payment at any point.' }
  ],
  steps: [
    { step: '01', title: 'Copy Any Video Link', desc: 'Copy the URL of the public video whose audio you want — from YouTube, Instagram, Facebook, X, or TikTok — using the share button or your browser’s address bar.' },
    { step: '02', title: 'Paste in Extractor', desc: 'Paste the link into the field above and press Download Now. The tool resolves the video first, then lists the audio streams it found.' },
    { step: '03', title: 'Choose the MP3 Option', desc: 'Select the audio (MP3) format from the list. If only video formats appear, the audio stream did not resolve — try again, or download the video and strip the audio afterwards.' },
    { step: '04', title: 'Download MP3 Track', desc: 'Save the MP3 to your device. On iPhone it lands in Files, on Android in Downloads, and on desktop in your browser download folder.' },
    { step: '05', title: 'Name and File It', desc: 'Rename the file with the title and creator while you remember them, and keep lectures, music, and ringtones in separate folders so a growing audio library stays searchable.' }
  ],
  faqs: [
    { q: 'Which platforms are supported for audio extraction?', a: 'YouTube, Instagram Reels, Facebook Watch, X (Twitter), and TikTok links are accepted. YouTube, Instagram, Facebook, and X resolve reliably; TikTok video links often fail because TikTok blocks requests from cloud server addresses, and Reddit links frequently fail for the same reason — see below.' },
    { q: 'Can I extract audio from a Facebook video?', a: 'Yes, from public Facebook Watch videos and public video posts: paste the link and choose the MP3 option. Friends-only videos, private-group videos, and anything behind a login wall cannot be extracted, because the audio is not publicly served.' },
    { q: 'Is the audio compressed or degraded?', a: 'No. The audio stream is extracted at the highest bitrate the platform serves for that video, up to 320kbps. Extraction cannot improve on the source, so a video uploaded with poor audio produces a poor MP3, however it is labelled.' },
    { q: 'Why do TikTok and Reddit links often fail?', a: 'Both platforms block automated requests from cloud server addresses, which is where web-based tools run. The same link plays fine in your browser because the platforms treat your phone’s address differently. There is no setting that fixes this from your side; retrying later sometimes helps.' },
    { q: 'Can I extract audio from a private or age-restricted video?', a: 'No. Videos that require a login, age verification, or membership are not publicly accessible, and no legitimate tool can extract their audio.' },
    { q: 'What can I legally do with extracted audio?', a: 'Listen privately, study it, and use short clips for commentary or review where fair use applies. Reusing music or a full podcast episode in your own public content requires a licence — extraction does not grant one.' },
    { q: 'Why is my MP3 quieter than the video?', a: 'Some platforms normalise streaming audio and download audio at different levels. The audio is all there, just quieter — raise the volume in your player or editor rather than re-downloading.' },
    { q: 'Can I split a long MP3 into chapters?', a: 'Yes, in any audio editor. Free tools like Audacity let you place markers and export sections separately, which is handy for lectures and long interviews. The downloaded file itself has no chapter markers.' },
    { q: 'Does the MP3 keep the video’s title and cover?', a: 'Usually the filename carries the video title, and many players show the video’s thumbnail as cover art. If your player shows a blank cover, that is cosmetic — the audio is unaffected.' }
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

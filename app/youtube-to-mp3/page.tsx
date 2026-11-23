import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter | High Quality 320kbps Audio',
  description: 'Convert and download public YouTube videos and Shorts to 320kbps MP3 audio tracks. Fast, secure, and free.',
}

const config: ToolPageConfig = {
  slug: 'youtube-to-mp3',
  guideSlug: 'how-to-extract-audio-from-videos',
  guideTitle: 'How to Extract Audio from Videos (MP3)',
  title: 'YouTube to MP3 Converter',
  headline: 'YouTube to MP3 Converter',
  subtitle: 'Convert any public YouTube video or Short into an MP3 audio file — podcasts, lectures, speeches, music, and ambient sound — at the best bitrate YouTube serves. The file plays everywhere: phones, cars, smart speakers, and every audio app, with no account and no software to install.',
  badge: 'STUDIO 320KBPS AUDIO',
  accentColor: '#b20710',
  targetPlatformId: 'youtube',
  targetPlatformName: 'YouTube',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste YouTube video link (youtube.com or youtu.be)...',
  primaryMediaType: 'audio',
  features: [
    { title: 'Best Available Bitrate', desc: 'Extracts the audio stream at the highest bitrate YouTube serves for that video, up to 320kbps stereo, preserving the detail of music and the clarity of speech instead of re-encoding it down.' },
    { title: 'Universal MP3 Format', desc: 'Plays on any music app, MP3 player, phone, car stereo, smart speaker, or audio workstation — no special player, codec pack, or conversion step required.' },
    { title: 'Title and Cover Preserved', desc: 'The downloaded file carries the video’s title in its filename, and players that show cover art display the video’s thumbnail, so your audio library stays recognisable.' },
    { title: 'Unlimited Conversions', desc: 'No daily limits, no artificial length throttles, and no payment for public content. Convert a three-minute song or a three-hour lecture with the same steps.' },
    { title: 'Shorts and Long Videos Alike', desc: 'Works for full-length videos, Shorts, podcasts, and live replays alike — anything public on YouTube with an audio stream can be converted.' },
    { title: 'No Login Required', desc: 'Public videos need no account. Age-restricted videos, members-only content, and private videos cannot be converted, because they are not publicly accessible.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the URL of the YouTube video you wish to convert to audio, from the share button, the address bar, or a youtu.be short link.' },
    { step: '02', title: 'Paste in Converter', desc: 'Paste the link into the field above and press Download Now. The tool analyses the available audio streams and lists the MP3 option.' },
    { step: '03', title: 'Pick the Audio Option', desc: 'Select the MP3 audio format. If several bitrates are offered, take the highest — it costs a little more storage and never sounds worse.' },
    { step: '04', title: 'Save MP3', desc: 'Click the download button to save the soundtrack file. On a phone it lands in Downloads; on desktop in your browser download folder.' },
    { step: '05', title: 'File It Properly', desc: 'Rename the file with the title and creator, and keep music, podcasts, and lectures in separate folders. A hundred files named after video IDs are unfindable within weeks.' }
  ],
  faqs: [
    { q: 'Is there a limit on video duration?', a: 'No fixed limit. Very long videos produce proportionally larger MP3s — a three-hour lecture is roughly 150 to 400 megabytes depending on bitrate — so download long conversions on Wi-Fi and check your free storage first.' },
    { q: 'Is the conversion free?', a: 'Yes, 100% free with no subscription or hidden fees, for public YouTube content. There is no account to create and nothing to install.' },
    { q: 'Is the audio really 320kbps?', a: 'The MP3 is delivered at the highest bitrate YouTube serves for that video, up to 320kbps. If the original upload’s audio was lower quality, the file matches the source — conversion cannot add detail that was never uploaded.' },
    { q: 'Can I convert age-restricted or members-only videos?', a: 'No. Videos that require sign-in, age verification, or membership are not publicly accessible, and no legitimate converter can reach them.' },
    { q: 'Can I use converted music in my own videos?', a: 'Not without a licence. The music belongs to its rights holder, and reusing it in public content triggers copyright claims even with credit. Convert for private listening and study; license audio properly for anything you publish.' },
    { q: 'Why is my MP3 quieter than the video?', a: 'YouTube normalises streaming audio and download audio at different levels on some videos. The audio is all present, just quieter — raise the volume in your player or editor rather than re-converting.' },
    { q: 'Does it work for YouTube Shorts?', a: 'Yes. Shorts convert exactly like full-length videos, and their audio is usually a song or a short voiceover. The resulting MP3 is small — often under a megabyte.' },
    { q: 'What if the video has no audio?', a: 'Silent videos have nothing to convert, and the tool will say so or return an empty file. Check whether the original video plays sound on YouTube before retrying.' }
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

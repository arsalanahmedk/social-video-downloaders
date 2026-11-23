import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'YouTube Shorts Downloader | 1080p Vertical Video',
  description: 'Download public YouTube Shorts in Full HD MP4 or extract audio track as MP3. Fast, free, and no software required.',
}

const config: ToolPageConfig = {
  slug: 'youtube-shorts',
  guideSlug: 'how-to-download-youtube-shorts',
  guideTitle: 'How to Download YouTube Shorts',
  title: 'YouTube Shorts Downloader',
  headline: 'YouTube Shorts Downloader',
  subtitle: 'Save public vertical YouTube Shorts as Full HD MP4 files or MP3 audio, on your phone or computer, with no app to install and no account to create. Pick the quality that fits your screen: crisp 1080p for editing and big displays, or a smaller file for quick phone viewing.',
  badge: 'YOUTUBE SHORTS HD',
  accentColor: '#FF0000',
  targetPlatformId: 'youtube',
  targetPlatformName: 'YouTube',
  sampleUrl: 'https://www.youtube.com/shorts/abc123xyz',
  inputPlaceholder: 'Paste YouTube Shorts link (youtube.com/shorts/...)',
  primaryMediaType: 'video',
  features: [
    { title: 'True 1080p 60FPS', desc: 'Keeps the highest vertical resolution YouTube serves, including smoother 60-frame-per-second versions for dance, sport, and fast camera work, so motion stays sharp instead of smearing.' },
    { title: 'Direct MP4 File', desc: 'Delivers a standard MP4 that plays on iPhone, Android, Windows, Mac, and every video editor, with no conversion step and no proprietary format to wrestle with afterwards.' },
    { title: 'MP3 Soundtrack Extraction', desc: 'Pulls just the audio from a Short — a song, a speech, a podcast clip — as a small MP3 file that is easy to keep, share, and play in any music app or car stereo.' },
    { title: 'Mobile & Desktop Friendly', desc: 'Works in any modern browser on any device. On iPhone the file lands in the Files app, on Android in Downloads, and on desktop in your browser download folder.' },
    { title: 'Short Links Supported', desc: 'Accepts youtube.com/shorts links, youtu.be short links, and full watch-page links that point at a Short, so you can paste whatever form of link you copied.' },
    { title: 'No Sign-Up, No Software', desc: 'Nothing to install, no account to create, and no payment at any point. Paste a public link, choose a format, and save the file.' }
  ],
  steps: [
    { step: '01', title: 'Copy Shorts URL', desc: 'Open the Short in the YouTube app or in your browser, tap Share, and select Copy Link. On desktop you can also copy the address straight from the address bar while the Short is playing.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the Shorts URL into the input field above and press Download Now. The tool reads the public page and lists the video and audio formats YouTube makes available for that Short.' },
    { step: '03', title: 'Choose a Format', desc: 'Pick 1080p Full HD for editing or big screens, a smaller resolution for phone viewing or slow connections, or the MP3 option if you only need the soundtrack.' },
    { step: '04', title: 'Save 1080p Short', desc: 'Tap the download button next to your chosen format. The file saves to your device — check that it plays through fully, with sound in sync, before you rely on it.' },
    { step: '05', title: 'Rename and Organise', desc: 'Give the file a descriptive name right away, such as the creator and the topic, and move your own Shorts into a separate folder from clips downloaded from other creators.' }
  ],
  faqs: [
    { q: 'Can I download age-restricted Shorts?', a: 'No, content requiring login or age-verification is not accessible. Shorts that demand a signed-in, age-verified viewer cannot be resolved by any legitimate web downloader, because the video itself is not publicly accessible without that check.' },
    { q: 'Does this support shortened youtu.be links?', a: 'Yes, both youtube.com/shorts/... and youtu.be URLs are supported, as are full watch-page links that point at a Short. Paste whichever form of link you copied — the tool follows it to the same video.' },
    { q: 'What is the highest quality available?', a: '1080p Full HD, which is the highest resolution YouTube serves for Shorts. There is no 4K option, because YouTube does not serve Shorts above 1080p, and any site promising one is upscaling the same file rather than adding detail.' },
    { q: 'Can I download a Short longer than 60 seconds?', a: 'Yes. YouTube now allows Shorts up to three minutes, and the same steps apply. Longer Shorts simply produce larger files, so check your free storage and prefer Wi-Fi for the download.' },
    { q: 'Why does my downloaded Short have no sound?', a: 'Either the Shorts audio track failed to resolve, or the original uses music that YouTube muted in some regions. Try downloading again, and try the MP3 option separately — if the MP3 has sound, the video download simply missed its audio stream.' },
    { q: 'Is downloading a Short legal?', a: 'Downloading a public Short for personal offline viewing is widely tolerated, but the creator still owns it. Reposting, re-uploading, or using it commercially without permission violates YouTube rules and copyright law. See our legal offline-viewing guide for the full picture.' },
    { q: 'Do I need YouTube Premium?', a: 'No. Premium offers offline saving inside the YouTube app, which is convenient and legal, but it does not give you a file. Use this downloader when you need the file itself — for editing, archiving your own work, or watching where the app is unavailable.' },
    { q: 'Will the download work on iPhone?', a: 'Yes. In Safari the file saves to the Downloads folder in the Files app; open it there, tap share, and choose Save Video to move it into Photos. If Safari opens the video in its player instead, long-press the download link and choose Download Linked File.' }
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

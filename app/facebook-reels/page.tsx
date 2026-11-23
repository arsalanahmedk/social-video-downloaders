import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Facebook Reels Downloader | HD MP4 Video',
  description: 'Download public Facebook Reels in Full HD 1080p MP4 directly to your device without quality loss.',
}

const config: ToolPageConfig = {
  slug: 'facebook-reels',
  guideSlug: 'how-to-download-facebook-reels',
  guideTitle: 'How to Download Facebook Reels',
  title: 'Facebook Reels Downloader',
  headline: 'Facebook Reels Downloader',
  subtitle: 'Save public Facebook Reels — the short vertical videos filling the Facebook feed — as MP4 files in Full HD 1080p, with the soundtrack included. Paste a facebook.com or fb.watch link; no account, no app, no payment. Reels from private groups cannot be downloaded, and the FAQs below explain why.',
  badge: 'FB REELS HD EXTRACTOR',
  accentColor: '#1877F2',
  targetPlatformId: 'facebook',
  targetPlatformName: 'Facebook',
  sampleUrl: 'https://www.facebook.com/watch/?v=1234567890',
  inputPlaceholder: 'Paste public Facebook Reel link (facebook.com or fb.watch)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Full HD 1080p & 720p', desc: 'Select high definition for editing and big screens, or standard definition for phone viewing and slow connections. A ninety-second Reel at 1080p is typically 15 to 30 megabytes.' },
    { title: 'Supports fb.watch Links', desc: 'Automatically follows fb.watch short links, mobile m.facebook.com links, and links with tracking parameters, resolving each to the real Reel page before fetching the video.' },
    { title: 'Synchronized Audio', desc: 'The full stereo audio stream — music, voiceover, and effects — is integrated into the output MP4 container, in sync with the picture, exactly as Facebook serves it.' },
    { title: 'Zero Login Needed', desc: 'Works purely through Facebook’s public pages, with no account and no login. Only Reels marked public, with the globe icon, can be downloaded.' },
    { title: 'Audio-Only Option', desc: 'When only the sound matters — a song, a piece of advice, a voiceover — the audio-only option saves a small MP3 instead of the whole video file.' },
    { title: 'Phone and Desktop Ready', desc: 'Works in Safari, Chrome, and all modern mobile browsers. On iPhone the file lands in Files; on Android in Downloads; on desktop in your browser download folder.' }
  ],
  steps: [
    { step: '01', title: 'Copy Reel Link', desc: 'Open the Reel so it plays on its own page, tap Share, and choose Copy Link. Check for the globe “Public” icon under the poster’s name — friends-only and group-only Reels cannot be downloaded.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the field above and press Download Now. The tool reads the public Reel page and lists the video formats Facebook makes available.' },
    { step: '03', title: 'Choose a Quality', desc: 'Pick 1080p Full HD for editing or large screens, or 720p for phone viewing. If you only need the sound, choose the audio-only option instead.' },
    { step: '04', title: 'Save Reel Video', desc: 'Click Download to receive your HD video. Rename the file right away with the creator and subject, because Facebook’s default filenames are strings of numbers.' },
    { step: '05', title: 'Play It Through Once', desc: 'Check that the sound is in sync and the whole Reel downloaded, not just the first seconds. If it stutters, re-download on stable Wi-Fi — the fault is usually the connection.' }
  ],
  faqs: [
    { q: 'Can I download Reels from private Facebook groups?', a: 'No, only publicly posted Reels with the globe "Public" icon are accessible. Private group content requires membership and a login, so it is not public, and any tool claiming to download it wants your Facebook password — never hand that over.' },
    { q: 'Does this tool work on iPhone and Android?', a: 'Yes, it works smoothly in Safari, Chrome, and all modern mobile web browsers. On iPhone, move the file from Files to Photos with the share button; on Android, find it in Downloads or your gallery.' },
    { q: 'What is the difference between a Reel and a regular Facebook video?', a: 'A Reel is short (under ninety seconds) and vertical, made for the feed. Regular Facebook videos can be long and landscape. Both download the same way; Reels are vertical 1080p, while longer videos may offer several resolutions.' },
    { q: 'Why does my fb.watch link not work?', a: 'Usually because it points to a feed, a post, or a deleted Reel rather than the Reel itself. Open the link, check the Reel plays on its own page, then copy the link from the Reel’s own page and try again.' },
    { q: 'Can I download a Reel without the music?', a: 'Not separately. The audio is part of the video file. The audio-only option gives you the whole soundtrack including any voiceover — there is no way to split music from speech in the downloaded file.' },
    { q: 'Does downloading notify the creator?', a: 'No. Facebook does not notify creators about downloads through web tools. Viewing the Reel in the app counts only as an anonymous view.' },
    { q: 'The same Reel is on Instagram too. Which should I download?', a: 'Whichever resolves. Cross-posted Reels are the same video, and the Instagram version often resolves without trouble when the Facebook one does not. Credit the same creator either way, and do not keep both copies.' },
    { q: 'Can I repost a downloaded Reel?', a: 'Only with the creator’s permission. Downloading does not give you publishing rights, and re-uploading can trigger copyright claims that mute the audio or block the video. Share the original post instead, which keeps the creator, the licence, and the link attached.' }
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

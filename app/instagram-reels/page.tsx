import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader | HD MP4 Without Watermark',
  description: 'Download public Instagram Reels in original 1080p Full HD video or audio track. Fast, free, and no login required.',
}

const config: ToolPageConfig = {
  slug: 'instagram-reels',
  guideSlug: 'how-to-download-instagram-reels',
  guideTitle: 'How to Download Instagram Reels',
  title: 'Instagram Reels Downloader',
  headline: 'Instagram Reels Downloader',
  subtitle: 'Save public Instagram Reels as Full HD MP4 files with synchronised audio, or extract just the soundtrack as MP3. You get the original file Instagram streams to viewers — no extra watermark, no app install, no login — on iPhone, Android, or desktop.',
  badge: 'INSTAGRAM REELS EXTRACTOR',
  accentColor: '#E1306C',
  targetPlatformId: 'instagram',
  targetPlatformName: 'Instagram',
  sampleUrl: 'https://www.instagram.com/reel/C8XYZ1234/',
  inputPlaceholder: 'Paste Instagram Reel link (e.g., https://instagram.com/reel/...)',
  primaryMediaType: 'video',
  features: [
    { title: 'Full 1080p Resolution', desc: 'Retains the original upload bitrate and 1080x1920 vertical dimensions Instagram serves, so the downloaded file looks exactly as sharp as the Reel does in the app.' },
    { title: 'Direct MP4 Stream', desc: 'Saves the video as a standard MP4 that plays on iOS, Android, and PC and drops straight into any editor, with no conversion step and no proprietary wrapper.' },
    { title: 'Zero Overlay Watermarks', desc: 'Extracts the source stream Instagram serves to viewers, without the extra watermark and username stamp its built-in download button adds. The creator’s own on-screen text stays, as it should.' },
    { title: 'Audio Track Extraction', desc: 'Save just the Reel’s soundtrack as an MP3 — a trending sound, a voiceover, a song — as a small file that is easy to keep and use as an editing reference.' },
    { title: 'Instant Mobile Support', desc: 'Works in Safari, Chrome, and all modern mobile browsers. On iPhone the file lands in the Files app; on Android it appears in Downloads and your gallery.' },
    { title: 'Public Posts Only', desc: 'Only Reels from public accounts can be downloaded. Private accounts, close-friends posts, and deleted Reels are out of reach, by design, and no login is ever requested.' }
  ],
  steps: [
    { step: '01', title: 'Copy Reel Link', desc: 'In Instagram, tap the share icon (paper plane) on the public Reel and choose Copy Link. On desktop, copy the link from the address bar while the Reel is open.' },
    { step: '02', title: 'Paste in Downloader', desc: 'Paste the Reel URL into the input field above and press Download Now. The tool reads the public page and lists the video and audio formats available for that Reel.' },
    { step: '03', title: 'Pick a Quality', desc: 'Choose the highest resolution offered for editing or big screens, or the smaller option for phone viewing. No tool can exceed the quality Instagram itself serves.' },
    { step: '04', title: 'Save Video', desc: 'Tap the download button next to your chosen format. On iPhone, move the file from Files to Photos with the share button; on Android, find it in Downloads.' },
    { step: '05', title: 'Check Before You Rely On It', desc: 'Play the file once: sound in sync, full length, correct resolution. If it stutters, re-download on stable Wi-Fi — the fault is usually the connection, not the Reel.' }
  ],
  faqs: [
    { q: 'Can I download Reels from private accounts?', a: 'No. SocialVideoDownloader strictly operates on public posts and does not bypass private account protections. If the account is private, or the Reel was shared only with close friends, no legitimate tool can fetch it.' },
    { q: 'Is there a limit on how many Reels I can download?', a: 'No, you can download unlimited public Reels completely free of charge. The practical limit is your own storage: a hundred 1080p Reels can easily pass one gigabyte, so check your free space before a big session.' },
    { q: 'Can I extract the audio track as MP3?', a: 'Yes! Select the Audio MP3 option after resolving any Reel to extract the soundtrack. It is a small file, ideal for studying a trending sound or using as a reference while editing your own version.' },
    { q: 'Why does the downloaded Reel look worse than in the app?', a: 'Usually because the Reel was uploaded at a lower resolution, or you picked the smaller format. Try the highest resolution offered. If the original upload was soft, the download will be soft too — it is the same file Instagram streams.' },
    { q: 'What is the difference from Instagram’s own download button?', a: 'Instagram’s built-in download adds a watermark and the creator’s username across the video, and only appears when the creator allows downloads. Copying the link and downloading here gives you the original file without that stamp.' },
    { q: 'Can I repost a downloaded Reel?', a: 'Only with the creator’s permission. Downloading does not transfer any rights. Credit the creator, link the original post, and ask first — most creators agree when asked properly and credited visibly.' },
    { q: 'Why will a Reel not download?', a: 'The most common reasons are that the Reel is not public, it was deleted, or the link is incomplete. Open the link in a private browser window: if Instagram shows “Sorry, this page isn’t available”, the Reel is gone. Otherwise, copy the link again directly from the Reel.' },
    { q: 'Does this work for Instagram stories too?', a: 'Stories use a separate page. Use the Instagram Stories downloader for public stories and highlights, and save them while they are still live — stories disappear after 24 hours unless saved as highlights.' }
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

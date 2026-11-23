import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader | Idea Pins & Clips in HD MP4',
  description: 'Download public Pinterest videos, Idea Pins, and animated clips in 1080p Full HD MP4 directly to your device.',
}

const config: ToolPageConfig = {
  slug: 'pinterest-video',
  guideSlug: 'how-to-download-pinterest-videos',
  guideTitle: 'How to Download Pinterest Videos',
  title: 'Pinterest Video Downloader',
  headline: 'Pinterest Video & Idea Pins Downloader',
  subtitle: 'Save public Pinterest video Pins, DIY tutorials, recipes, and multi-page Idea Pins as MP4 files in the highest resolution Pinterest serves. Paste a pin link or a pin.it short link — no account, no app, no payment — and keep the video with its soundtrack intact.',
  badge: 'PINTEREST VIDEO EXTRACTOR',
  accentColor: '#E60023',
  targetPlatformId: 'pinterest',
  targetPlatformName: 'Pinterest',
  sampleUrl: 'https://www.pinterest.com/pin/123456789012345/',
  inputPlaceholder: 'Paste Pinterest pin link (pinterest.com or pin.it)...',
  primaryMediaType: 'video',
  features: [
    { title: 'Supports pin.it Shortlinks', desc: 'Directly accepts mobile shortlinks and resolves them to the canonical Pin, so links shared from the Pinterest app work without any manual editing.' },
    { title: 'Full 1080p Resolution', desc: 'Saves video Pins in their highest served resolution without downscaling, so tutorials stay readable and aesthetic videos keep their detail on larger screens.' },
    { title: 'Audio Synchronized', desc: 'Includes the full audio track with the video — voiceovers for tutorials, music for aesthetic clips, and narration for recipes — in a single MP4 file.' },
    { title: 'No Watermark Added', desc: 'Returns the clean video file Pinterest serves, with no branding overlay or stamp added by the downloader. The creator’s own on-screen text stays in the file.' },
    { title: 'Idea Pins Handled', desc: 'Resolves multi-page Idea Pins page by page, so you can save the video pages you need from a Pin that mixes video and images.' },
    { title: 'Public Boards Only', desc: 'Only Pins on public boards can be downloaded. Secret boards are private by definition, and their content is not accessible to any legitimate tool.' }
  ],
  steps: [
    { step: '01', title: 'Copy Pin Link', desc: 'Open the Pin, tap the share button, and select Copy Link. On desktop, copy the address from the address bar. A pin.it short link copied from the app works exactly the same way.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the Pin link into the downloader field above and press Download Now. The tool reads the public Pin page and lists the video formats available.' },
    { step: '03', title: 'Pick a Format', desc: 'Choose the HD video option for the sharpest result, or the smaller option for phone viewing. For multi-page Idea Pins, check which pages carry video before you download.' },
    { step: '04', title: 'Download MP4', desc: 'Select HD Video and click Download to save the file. On a phone it lands in Downloads; on desktop it lands in your browser download folder.' },
    { step: '05', title: 'Keep the Credit Trail', desc: 'Save the Pin’s link alongside the file — a note with the creator and the board name — so you know where the video came from and whether you may reuse it.' }
  ],
  faqs: [
    { q: 'Can I download private secret board pins?', a: 'No. Only pins publicly visible on public boards are accessible. Secret boards are private, and if a Pin is yours, use Pinterest’s own features to save or export it.' },
    { q: 'Does this support shortened pin.it URLs?', a: 'Yes, mobile pin.it links are fully supported. The tool resolves the short link to the canonical Pin before fetching the video, so paste the short link exactly as copied.' },
    { q: 'What is the difference between a video Pin and an Idea Pin?', a: 'A video Pin is a single video attached to a Pin. An Idea Pin is a multi-page format that can mix video pages and image pages. The downloader lists the video pages it finds; image pages download as photos through the Pinterest photo page.' },
    { q: 'Why does a video Pin download without sound?', a: 'Some video Pins are silent by design — Pinterest autoplays many videos muted. Others carry music that Pinterest restricts. Check whether the Pin plays sound on Pinterest itself before retrying.' },
    { q: 'Why does Pinterest sometimes fail to resolve?', a: 'Pinterest changes how its pages are served regularly, and a downloader can need a short while to adapt. If a public Pin fails, wait an hour and try again, and make sure you copied the full Pin link rather than a board or search link.' },
    { q: 'Can I download a Pin that links to a shop or article?', a: 'Only if the Pin itself carries a video. A Pin that is just an image linking elsewhere has no video to download — use the Pinterest photo downloader for the image instead.' },
    { q: 'Can I repost a downloaded Pinterest video?', a: 'Only with the creator’s permission. Downloading does not transfer rights, and Pinterest creators — especially tutorial and recipe creators — rely on traffic to their original Pins. Repin the original instead.' },
    { q: 'Are GIF Pins supported?', a: 'Animated Pins are usually stored as short video files, and they download as MP4s. The animation plays the same way in every modern app, and you can convert the MP4 to a GIF in an editor if a destination requires that format.' }
  ],
  relatedTools: [
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'High-Res JPG' },
    { title: 'TikTok Video Downloader', href: '/tiktok-no-watermark', badge: 'Short Videos' },
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Aesthetic Reels' }
  ]
}

export default function PinterestVideoPage() {
  return <SpecializedToolPage config={config} />
}

import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Universal Thumbnail Grabber | High-Res Video Covers',
  description: 'Download full-resolution video cover posters and thumbnails from YouTube, TikTok, Facebook, and Instagram.',
}

const config: ToolPageConfig = {
  slug: 'thumbnail-grabber',
  title: 'Universal Thumbnail Grabber',
  headline: 'Universal Thumbnail & Poster Grabber',
  subtitle: 'Download the original cover image of any public video — the poster frame the creator uploaded — at full resolution, as a clean JPG with no play button, no duration badge, and no interface clutter. Ideal for reference boards, presentations, video essays, and design mockups.',
  badge: 'UNIVERSAL COVER GRABBER',
  accentColor: '#c6f135',
  targetPlatformId: 'youtube',
  targetPlatformName: 'Multi-Platform',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste any public video link to fetch its thumbnail poster...',
  primaryMediaType: 'image',
  features: [
    { title: 'Full Resolution Covers', desc: 'Fetches the raw poster image the creator uploaded — up to 1920x1080 on YouTube, full vertical resolution on Shorts and Reels — rather than the small preview your browser shows.' },
    { title: 'Multi-Platform Engine', desc: 'Accepts links from YouTube, Instagram, Facebook, and X in one input box, returning the cover image each platform serves for that video.' },
    { title: 'Clean Un-Watermarked JPG', desc: 'Returns the source poster with no play button stamp, duration badge, or interface overlay baked in — just the image itself, ready to use as reference.' },
    { title: 'Multiple Sizes Where Offered', desc: 'Where a platform serves several thumbnail sizes, the available options are listed so you can take the largest for design work or a smaller one for a quick mockup.' },
    { title: 'Design & Presentation Ready', desc: 'The JPG drops straight into slide decks, documents, mood boards, and editors, with no conversion step and no account needed.' },
    { title: 'Instant Preview', desc: 'Inspect the cover at full size before you download, so you know you have the right frame and the right resolution before the file ever reaches your device.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the URL of the public video whose cover you want, from any supported platform, using the share button or your browser’s address bar.' },
    { step: '02', title: 'Paste in Grabber', desc: 'Insert the link into the field above and press Download Now. The tool extracts every thumbnail size the platform serves for that video.' },
    { step: '03', title: 'Choose a Size', desc: 'Pick the largest size for design and presentation work, or a smaller one for quick reference. The largest is the creator’s uploaded cover; smaller ones are platform-generated previews.' },
    { step: '04', title: 'Save Cover JPG', desc: 'Download the full-resolution thumbnail poster immediately. It saves as a JPG to your Downloads folder, ready to drop into a deck, document, or board.' },
    { step: '05', title: 'Credit the Creator', desc: 'A thumbnail is the creator’s artwork. If it appears anywhere public — a blog, a video essay, a presentation — credit the creator and link the original video.' }
  ],
  faqs: [
    { q: 'Can I download thumbnails from YouTube Shorts?', a: 'Yes! YouTube Shorts covers are extracted in full vertical resolution, matching the Short itself, rather than a cropped landscape preview.' },
    { q: 'Will the image have a play button on it?', a: 'No! You get the clean source poster without overlays. The play button and duration badge you see on video pages are interface elements drawn on top of the image, not part of the file.' },
    { q: 'What is the highest thumbnail resolution available?', a: 'On YouTube, the MaxRes cover is 1920x1080 when the creator uploaded an HD cover. On Instagram and Facebook, covers match the video’s own resolution. If only a small size is offered, the creator uploaded a small cover and nothing larger exists.' },
    { q: 'Why do some videos have no thumbnail option?', a: 'A small number of videos carry no separate cover image — the platform generates the preview from a video frame instead. In that case, downloading the video and screenshotting a frame gives you the same picture.' },
    { q: 'Can I use a downloaded thumbnail in my own video or article?', a: 'For private reference and study, yes. For anything public, the thumbnail is the creator’s artwork: credit them, link the original, and prefer making your own cover image for commercial use.' },
    { q: 'Does this work for TikTok videos?', a: 'TikTok video links often fail to resolve because TikTok blocks requests from cloud server addresses. TikTok photo posts resolve reliably, and their images download through the photo flow. If a TikTok link fails here, that blocking is the usual cause.' },
    { q: 'Is the thumbnail the same as a screenshot?', a: 'No, and it is better. A screenshot captures your screen at screen resolution, complete with interface elements. A downloaded thumbnail is the original uploaded file, sharper and cleaner than any screenshot.' },
    { q: 'Can I download thumbnails in bulk?', a: 'One video at a time. Paste each link, save its cover, and move on. Bulk downloading would require automation that platforms treat as scraping, which this tool does not do.' }
  ],
  relatedTools: [
    { title: 'YouTube Thumbnail Downloader', href: '/youtube-thumbnail', badge: 'MaxRes YouTube' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Pinterest JPG' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Instagram High-Res' }
  ]
}

export default function ThumbnailGrabberPage() {
  return <SpecializedToolPage config={config} />
}

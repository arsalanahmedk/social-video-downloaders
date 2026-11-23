import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader | MaxRes 4K & HD JPG',
  description: 'Download original full-resolution YouTube video and Shorts cover thumbnails in Maximum Resolution (1080p / 4K).',
}

const config: ToolPageConfig = {
  slug: 'youtube-thumbnail',
  title: 'YouTube Thumbnail Downloader',
  headline: 'YouTube Thumbnail Downloader',
  subtitle: 'Download the original cover image of any public YouTube video or Short — the MaxRes poster the creator uploaded — as a clean JPG at up to 1920x1080, with no play button, no duration badge, and no interface clutter. Perfect for reference boards, video essays, and design mockups.',
  badge: 'MAXRES THUMBNAIL GRABBER',
  accentColor: '#FF0000',
  targetPlatformId: 'youtube',
  targetPlatformName: 'YouTube',
  sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  inputPlaceholder: 'Paste YouTube video link to extract thumbnail...',
  primaryMediaType: 'image',
  features: [
    { title: 'MaxRes 1080p JPG', desc: 'Fetches the raw 1920x1080 cover image the channel uploaded, when one exists — the sharpest thumbnail YouTube holds, far better than any screenshot of the video page.' },
    { title: 'Multiple Resolution Options', desc: 'Lists every size YouTube serves for the video — MaxRes, High Quality, Standard, and Medium — so you can take the largest for design work or a smaller one for a quick mockup.' },
    { title: 'No Text Watermarks', desc: 'Returns the direct image file with no third-party stamps, borders, or overlays added. The only text in the image is what the creator put there.' },
    { title: 'Instant Preview', desc: 'Inspect the cover at full size before downloading, so you confirm the right video, the right frame, and the right resolution before the file reaches your device.' },
    { title: 'Shorts Covers Included', desc: 'Extracts vertical covers from YouTube Shorts at their full vertical resolution, not a cropped landscape version of the same image.' },
    { title: 'No Account Needed', desc: 'Works for any public video in the browser, with no sign-in and no install. Age-restricted and private videos cannot be processed, because their pages are not public.' }
  ],
  steps: [
    { step: '01', title: 'Copy Video Link', desc: 'Copy the YouTube link from your browser’s address bar, the share button, or a youtu.be short link. Any public video or Short link works.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the URL into the field above and press Download Now. The tool extracts every thumbnail size YouTube serves for that video.' },
    { step: '03', title: 'Choose a Resolution', desc: 'Pick MaxRes (1920x1080) for design and presentation work, or a smaller size for quick reference. If MaxRes is missing, the creator uploaded a smaller cover and nothing larger exists.' },
    { step: '04', title: 'Save MaxRes Cover', desc: 'Click Download Thumbnail to save the highest resolution available. The JPG lands in your Downloads folder, ready to drop into a deck, document, or board.' },
    { step: '05', title: 'Credit the Creator', desc: 'A thumbnail is the creator’s artwork. If it appears anywhere public, credit the creator and link the original video — and prefer making your own cover for commercial use.' }
  ],
  faqs: [
    { q: 'What is the highest thumbnail resolution available?', a: 'MaxResDefault offers 1920x1080 resolution if the creator uploaded an HD cover. Many videos only have smaller covers, because the creator uploaded a 1280x720 or smaller image — in that case the largest offered size is the largest that exists.' },
    { q: 'Can I download thumbnails from YouTube Shorts?', a: 'Yes! YouTube Shorts thumbnails can also be extracted, at their full vertical resolution. A Short’s cover is the vertical frame the creator chose, not a cropped landscape image.' },
    { q: 'Why is there no 4K thumbnail option?', a: 'YouTube’s largest thumbnail size is 1920x1080, regardless of the video’s resolution. A “4K thumbnail” does not exist on YouTube’s servers, and any site offering one is upscaling the 1080p image.' },
    { q: 'Will the image have a play button or timestamp on it?', a: 'No. You receive the clean source poster. The play button, duration badge, and other interface elements are drawn by the YouTube page on top of the image and are not part of the file.' },
    { q: 'Can I use a downloaded thumbnail in my own video?', a: 'For private reference and study, yes. For anything public, the thumbnail is the creator’s artwork: credit them and link the original, and make your own thumbnail for commercial projects rather than reusing theirs.' },
    { q: 'What if the video is age-restricted or private?', a: 'Its page is not publicly accessible, so the thumbnail cannot be fetched either. The same rule that blocks the video blocks its cover image.' },
    { q: 'Is a downloaded thumbnail better than a screenshot?', a: 'Yes, noticeably. A screenshot captures your screen at screen resolution with interface elements included. A downloaded thumbnail is the original uploaded file — sharper, cleaner, and free of overlays.' },
    { q: 'Can I download thumbnails from live streams?', a: 'Yes, once the stream has a cover image on its public page. For a stream currently live, the cover is usually the scheduled thumbnail; for a finished stream, it is the replay’s cover.' }
  ],
  relatedTools: [
    { title: 'YouTube Shorts Downloader', href: '/youtube-shorts', badge: '1080p MP4' },
    { title: 'Universal Thumbnail Grabber', href: '/thumbnail-grabber', badge: 'All Platforms' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Pins JPG' }
  ]
}

export default function YouTubeThumbnailPage() {
  return <SpecializedToolPage config={config} />
}

import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Threads Photo Downloader | Original Resolution JPG',
  description: 'Download high-resolution photos and image galleries from Meta Threads posts in original quality.',
}

const config: ToolPageConfig = {
  slug: 'threads-photo',
  title: 'Threads Photo Downloader',
  headline: 'Threads Photo & Image Downloader',
  subtitle: 'Save photos from public Threads posts as JPG files at the full resolution Threads serves — up to 1440 pixels on the long side for most images. Honest note: Threads has no dedicated download extractor, so many posts fail to resolve here. When a post will not resolve, the Instagram version of the same post usually will.',
  badge: 'THREADS IMAGE SAVER',
  accentColor: '#ffffff',
  targetPlatformId: 'threads',
  targetPlatformName: 'Threads',
  sampleUrl: 'https://www.threads.net/@zuck/post/CxYz1234567',
  inputPlaceholder: 'Paste Threads image post URL...',
  primaryMediaType: 'image',
  features: [
    { title: 'Full Resolution JPG', desc: 'Saves the largest version Threads serves for each photo — up to 1440x1440 and beyond for images uploaded at full size — instead of the small preview shown in the feed.' },
    { title: 'Multi-Image Gallery Support', desc: 'Inspects posts with multiple photos and lists each image separately, so you can download one photo from a gallery without saving the rest.' },
    { title: 'Colour and Detail Preserved', desc: 'Returns the image file as Threads serves it, with its colour and detail intact, and no watermark or interface overlay added by the downloader.' },
    { title: 'Carousel Posts Included', desc: 'Mixed carousels of photos and videos list their photos alongside the videos, so a photo inside a carousel is just as downloadable as a photo in a single-image post.' },
    { title: 'No Account Required', desc: 'Attempts public posts without logging in, and never asks for your Meta account or password. Only public posts from public accounts can be attempted.' },
    { title: 'Phone and Desktop Ready', desc: 'Works in any modern browser. On iPhone the JPG lands in Files and moves to Photos with one tap; on Android it appears in Downloads and your gallery.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Open the post on its own page, tap Share, and copy the link. Confirm the link follows the threads.net/@username/post/ID pattern and that the account is public.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Insert the link into the field above and press Download Now. The tool attempts to resolve the post’s images — note that Threads posts often fail here, for the reason explained in the FAQs.' },
    { step: '03', title: 'Pick the Photos', desc: 'If the photos appear, download the ones you want, each as its own JPG. If the page reports no media found, the post could not be resolved — try the Instagram version of the same post.' },
    { step: '04', title: 'Save Photo', desc: 'Click Download to receive the original JPG file. Rename it with the creator and subject right away, because Threads’ default filenames are anonymous strings of characters.' },
    { step: '05', title: 'Credit the Creator', desc: 'Keep a note of who posted the photo and the post link, especially if you plan to use the image anywhere. Photos are copyrighted work, and credit does not replace permission for commercial use.' }
  ],
  faqs: [
    { q: 'Can I download photos on mobile?', a: 'Yes! Tapping download saves the photo directly to your device. On iPhone it lands in Files and moves to Photos with the share button; on Android it appears in Downloads and your gallery.' },
    { q: 'Is it completely free?', a: 'Yes, no credit cards or subscriptions required. Every download on this site is free, with no account and no daily limit.' },
    { q: 'Why does this tool so often fail on Threads?', a: 'Honestly, Threads has no dedicated download extractor, and its pages are hard for server-side tools to read. Many posts return no media even when they are public. The tool is offered for the posts it can resolve, and the Instagram version of the same post — which most creators cross-post — usually resolves without trouble.' },
    { q: 'What resolution will the photo be?', a: 'The largest version Threads serves — up to 1440 pixels on the long side for most photos. That is the sharpest version Threads displays, though it is still a compressed version of the creator’s original upload.' },
    { q: 'Can I download photos from private Threads accounts?', a: 'No. Private account posts are visible only to approved followers, and no legitimate tool can fetch them.' },
    { q: 'Can I download a Threads profile picture?', a: 'Profile pictures are served at low resolution by design. The downloader returns the largest version available, which is still small. For a high-quality portrait, ask the person for the original file.' },
    { q: 'Can I use a downloaded photo on my website?', a: 'Only with the creator’s permission. Photographs are copyrighted, and commercial use without permission is infringement even with credit. Ask first, get the answer in writing, and pay if they ask.' },
    { q: 'The photo looks soft. Is something wrong?', a: 'Probably not. It was likely uploaded soft, or Threads compressed it heavily. The download preserves Threads’ version faithfully. For print quality, find the creator’s own portfolio or the Instagram version of the same photo.' }
  ],
  relatedTools: [
    { title: 'Threads Video Downloader', href: '/threads-video', badge: '1080p MP4' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Instagram JPG' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Pinterest Pins' }
  ]
}

export default function ThreadsPhotoPage() {
  return <SpecializedToolPage config={config} />
}

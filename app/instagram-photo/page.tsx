import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Instagram Photo & Carousel Downloader | High Resolution JPG',
  description: 'Download full-resolution public Instagram photos, multi-image carousel albums, and high-res cover pictures.',
}

const config: ToolPageConfig = {
  slug: 'instagram-photo',
  title: 'Instagram Photo Downloader',
  headline: 'Instagram Photo & Carousel Downloader',
  subtitle: 'Download public Instagram photos and multi-slide carousels at the full resolution Instagram serves — up to 1080x1350 for portraits and 1080x1080 for squares — as clean JPG files. Save one photo or every slide of a carousel, on your phone or computer, with no login and no app.',
  badge: 'HIGH-RES PHOTO SAVER',
  accentColor: '#fd1d1d',
  targetPlatformId: 'instagram',
  targetPlatformName: 'Instagram',
  sampleUrl: 'https://www.instagram.com/p/C9ABC5678/',
  inputPlaceholder: 'Paste Instagram post or photo link (e.g., https://instagram.com/p/...)',
  primaryMediaType: 'image',
  features: [
    { title: 'Maximum Resolution JPG', desc: 'Saves full 1080x1350 portrait and 1080x1080 square source photos without downscaling, so the file you get is the sharpest version Instagram displays — far better than a screenshot.' },
    { title: 'Multi-Image Carousels', desc: 'Inspects public carousel posts slide by slide, listing every photo in the album so you can download the whole set or just the slides you want, each as its own JPG.' },
    { title: 'Original Quality Preserved', desc: 'Returns the image file Instagram serves, with no recompression, no watermark stamp, and no interface overlay added by the downloader.' },
    { title: 'Cover Photos Included', desc: 'The cover frame of a Reel or video post can be saved as a still image too, which is handy for studying how creators design their hooks and thumbnails.' },
    { title: 'Phone and Desktop Ready', desc: 'Works in any modern browser. On iPhone the JPG lands in Files and moves to Photos with one tap; on Android it appears in Downloads and your gallery.' },
    { title: 'Public Posts Only', desc: 'Only photos from public accounts can be downloaded. Private accounts, close-friends posts, and archived content are out of reach, and no login is ever requested.' }
  ],
  steps: [
    { step: '01', title: 'Copy Post Link', desc: 'Open the photo or carousel post, tap the share icon (paper plane), and choose Copy Link. On desktop, copy the link from the address bar while the post is open.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the photo downloader box above and press Download Now. The tool reads the public post and lists the photos it found, slide by slide.' },
    { step: '03', title: 'Pick the Slides', desc: 'Download every slide of a carousel, or just the ones you need. Each slide saves as its own JPG at full resolution, so a ten-slide carousel gives you ten files.' },
    { step: '04', title: 'Save High-Res Image', desc: 'Click Download to receive the original resolution JPG image. On iPhone, move it from Files to Photos; on Android, find it in Downloads or your gallery.' },
    { step: '05', title: 'Keep Carousels Together', desc: 'Save all slides from one post in a single folder named after the creator and subject, so the set stays in order and you know where every image came from.' }
  ],
  faqs: [
    { q: 'Will this download multiple photos from a carousel post?', a: 'Yes! Carousel posts are resolved so you can select and download individual slides or all photos. Each slide is listed separately, at full resolution, in the order it appears in the post.' },
    { q: 'Can I download photos on iPhone or Android?', a: 'Yes, files save directly to your mobile device gallery or downloads folder. On iPhone, use the share button in Files to move a JPG into Photos; on Android, your gallery usually picks it up automatically.' },
    { q: 'What resolution will the photo be?', a: 'The resolution Instagram serves: up to 1080 pixels on the long side for most photos, 1080x1350 for portraits, 1080x1080 for squares. That is the sharpest version Instagram displays, though it is still a compressed version of the creator’s original upload.' },
    { q: 'Can I download photos from private accounts?', a: 'No. Private account photos are not publicly accessible, and no legitimate tool can fetch them. Ask the account owner to share the photo with you directly.' },
    { q: 'Is this better than taking a screenshot?', a: 'Yes, noticeably. A screenshot captures your screen at screen resolution, complete with interface elements and compression. A downloaded JPG is the original file Instagram serves — sharper, cleaner, and free of overlays.' },
    { q: 'Can I use downloaded photos on my website or shop?', a: 'Only with the creator’s permission. Photographs are copyrighted work, and commercial use without permission is infringement even with credit. Ask first, get the answer in writing, and pay if they ask.' },
    { q: 'Why does a photo look soft after downloading?', a: 'It was probably uploaded soft, or Instagram compressed it heavily. The download preserves Instagram’s version faithfully. For print quality, find the creator’s own portfolio or shop, which the post usually links to.' },
    { q: 'Can I download a profile picture?', a: 'Profile pictures are small by design — Instagram serves them at low resolution. The downloader returns the largest version available, which is still small. For a high-quality portrait, ask the person for the original file.' }
  ],
  relatedTools: [
    { title: 'Instagram Reels Downloader', href: '/instagram-reels', badge: 'Reels MP4' },
    { title: 'Pinterest Photo Downloader', href: '/pinterest-photo', badge: 'Aesthetic Pins' },
    { title: 'Threads Photo Downloader', href: '/threads-photo', badge: 'Threads JPG' }
  ]
}

export default function InstagramPhotoPage() {
  return <SpecializedToolPage config={config} />
}

import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Pinterest Image & Photo Downloader | Original Full-Res JPG',
  description: 'Download original full-resolution Pinterest image pins, wallpapers, and aesthetic photos in maximum quality.',
}

const config: ToolPageConfig = {
  slug: 'pinterest-photo',
  title: 'Pinterest Photo Downloader',
  headline: 'Pinterest Image & Photo Downloader',
  subtitle: 'Download the original full-size image behind any public Pinterest Pin — photography, design, art, and wallpapers — at the largest resolution the creator uploaded, instead of the small compressed preview your browser shows. Paste a pin link or a pin.it short link; no account, no app, no payment.',
  badge: 'ORIGINAL RESOLUTION PIN SAVER',
  accentColor: '#ad081b',
  targetPlatformId: 'pinterest',
  targetPlatformName: 'Pinterest',
  sampleUrl: 'https://www.pinterest.com/pin/123456789012345/',
  inputPlaceholder: 'Paste Pinterest photo pin link...',
  primaryMediaType: 'image',
  features: [
    { title: 'Full Resolution Files', desc: 'Bypasses the low-resolution 236-pixel and 564-pixel previews Pinterest shows while browsing, fetching the raw original upload — 736 pixels wide at minimum, often 1000 pixels or more.' },
    { title: 'Wallpaper & Poster Quality', desc: 'The original file is sharp enough for phone wallpapers, design references, mood boards, and small prints — far better than a right-click save of the preview thumbnail.' },
    { title: 'Colour and Detail Preserved', desc: 'Returns the image as Pinterest serves it, with its original colour reproduction and detail intact, and no recompression or watermark added by the downloader.' },
    { title: 'pin.it Links Supported', desc: 'Accepts full pinterest.com links and shortened pin.it links shared from the Pinterest app, resolving each to the canonical Pin before fetching the image.' },
    { title: 'Animated Pins Included', desc: 'Animated GIF Pins are extracted in their original form, so a moving Pin downloads as the animation Pinterest serves rather than a frozen frame.' },
    { title: 'Public Pins Only', desc: 'Only Pins on public boards can be downloaded. Secret boards are private by definition, and their content is not accessible to any legitimate tool.' }
  ],
  steps: [
    { step: '01', title: 'Copy Image Pin Link', desc: 'Open the Pin, click Share, and select Copy Link. On desktop, copy the address from the address bar. A pin.it short link copied from the app works exactly the same way.' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the photo grabber above and press Download Now. The tool locates the original full-size upload behind the Pin.' },
    { step: '03', title: 'Check the Size', desc: 'The offered file is the largest version Pinterest holds for that Pin. If it is smaller than you hoped, the creator uploaded a small image, and nothing larger exists on Pinterest.' },
    { step: '04', title: 'Download Full-Res JPG', desc: 'Click Download to receive the highest resolution original image. It saves as a JPG to your Downloads folder, ready for wallpapers, boards, and design work.' },
    { step: '05', title: 'Keep the Source Link', desc: 'Save the Pin link alongside the file — a note with the creator and board name — so you know where the image came from and whether you may reuse it.' }
  ],
  faqs: [
    { q: 'Why is this better than right-clicking "Save Image As"?', a: 'Right-clicking in Pinterest often saves the compressed preview thumbnail. SocialVideoDownloader locates the original full-size upload, which can be several times larger and visibly sharper.' },
    { q: 'Can I download GIFs from Pinterest?', a: 'Yes! Animated GIF pins are also extracted in original quality. They arrive in the animated format Pinterest serves, so the motion is preserved rather than frozen into a still frame.' },
    { q: 'What resolution will I get?', a: 'The largest version the creator uploaded — 736 pixels wide at minimum, often 1000 pixels or more, sometimes the full camera resolution. Pinterest compresses uploads, so even the original is a compressed JPG, good for screens and small prints but not for large-format printing.' },
    { q: 'Can I download Pins from secret boards?', a: 'No. Secret boards are private, and their Pins are not publicly accessible. If a Pin is yours, use Pinterest’s own features to save or export it.' },
    { q: 'Can I use downloaded Pins commercially?', a: 'Only with the creator’s permission or a proper licence. Pin images are copyrighted photographs and artwork. For commercial projects, license stock images properly or commission original work.' },
    { q: 'Why did a Pin fail to resolve?', a: 'The Pin may have been removed, the board may have gone private, or Pinterest may have changed how its pages are served. Removed Pins show an error page and cannot be recovered. Otherwise, wait an hour and try again with the full Pin link.' },
    { q: 'Does the image keep its EXIF data?', a: 'Pinterest strips most metadata when it processes uploads, so the downloaded file rarely carries camera settings or location data. What you get is the image itself, at original resolution, without the creator’s metadata.' },
    { q: 'Is Pinterest’s own save feature better for collecting ideas?', a: 'For collecting ideas you only want to revisit, yes — saving a Pin to your board keeps it organised inside Pinterest with its source link intact. Download the file only when you need it outside Pinterest, for offline use, editing, or design work.' }
  ],
  relatedTools: [
    { title: 'Pinterest Video Downloader', href: '/pinterest-video', badge: 'HD MP4' },
    { title: 'Instagram Photo Downloader', href: '/instagram-photo', badge: 'Instagram JPG' },
    { title: 'Universal Thumbnail Grabber', href: '/thumbnail-grabber', badge: 'All Platforms' }
  ]
}

export default function PinterestPhotoPage() {
  return <SpecializedToolPage config={config} />
}

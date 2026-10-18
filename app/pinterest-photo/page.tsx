import type { Metadata } from 'next'
import { SpecializedToolPage, ToolPageConfig } from '@/components/downloader/specialized-tool-page'

export const metadata: Metadata = {
  title: 'Pinterest Image & Photo Downloader | Original Full-Res JPG | SocialVideoDownloader',
  description: 'Download original full-resolution Pinterest image pins, wallpapers, and aesthetic photos in maximum quality.',
}

const config: ToolPageConfig = {
  slug: 'pinterest-photo',
  title: 'Pinterest Photo Downloader',
  headline: 'Pinterest Image & Photo Downloader',
  subtitle: 'Retrieve uncompressed, full-size original photography, design pins, and art from Pinterest in maximum resolution.',
  badge: 'ORIGINAL RESOLUTION PIN SAVER',
  accentColor: '#ad081b',
  targetPlatformId: 'pinterest',
  targetPlatformName: 'Pinterest',
  sampleUrl: 'https://www.pinterest.com/pin/123456789012345/',
  inputPlaceholder: 'Paste Pinterest photo pin link...',
  primaryMediaType: 'image',
  features: [
    { title: 'Full Resolution Files', desc: 'Bypasses low-res 236x/564x thumbnails to fetch raw 736x/originals.' },
    { title: 'Wallpaper & Poster Quality', desc: 'Ideal for 4K phone wallpapers, graphic design assets, and prints.' },
    { title: 'Retains EXIF & Color Space', desc: 'Preserves original color reproduction and dynamic range.' },
    { title: 'Free & Instant', desc: 'One-click saving without requiring Pinterest registration or app install.' }
  ],
  steps: [
    { step: '01', title: 'Copy Image Pin Link', desc: 'Click Share on the pin and select "Copy Link".' },
    { step: '02', title: 'Paste in SocialVideoDownloader', desc: 'Paste the link into the photo grabber above.' },
    { step: '03', title: 'Download Full-Res JPG', desc: 'Click Download to receive the highest resolution original image.' }
  ],
  faqs: [
    { q: 'Why is this better than right-clicking "Save Image As"?', a: 'Right-clicking in Pinterest often saves the compressed preview thumbnail. SocialVideoDownloader locates the original full-size upload.' },
    { q: 'Can I download GIFs from Pinterest?', a: 'Yes! Animated GIF pins are also extracted in original quality.' }
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

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPlatform, platforms } from '@/lib/platforms/registry'
import { PlatformDownloader } from '@/components/downloader/platform-downloader'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'

export function generateStaticParams(): { platform: string }[] {
  const params: { platform: string }[] = platforms.map((platform) => ({ platform: platform.id }))
  params.push({ platform: 'x' })
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> | { platform: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  const platform = getPlatform(resolvedParams.platform)
  if (!platform) return {}

  return {
    title: `${platform.name} Downloader | High Quality Public Media | SocialVideoDownloader`,
    description: `Download public ${platform.name} videos, reels, photos, and audio in high quality without watermarks. Free, safe, and fast.`,
    alternates: {
      canonical: `/${platform.id}`
    },
    openGraph: {
      title: `${platform.name} Downloader | SocialVideoDownloader`,
      description: platform.description,
      url: `https://socialvideodownloader.com/${platform.id}`,
      siteName: 'SocialVideoDownloader',
      type: 'website'
    }
  }
}

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> | { platform: string } }) {
  const resolvedParams = await Promise.resolve(params)
  const platform = getPlatform(resolvedParams.platform)
  if (!platform) notFound()

  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />
      <main>
        <PlatformDownloader platform={platform} />
      </main>
      <NeurexFooter />
    </div>
  )
}
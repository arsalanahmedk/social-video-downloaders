import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import { AppToaster, DynamicViewportScript } from '@/components/ui/toaster'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#080a0c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.socialvideodownloader.online'),
  title: {
    default: 'SocialVideoDownloader | Free Public Video Downloader',
    template: '%s | SocialVideoDownloader'
  },
  description: 'Download public videos, Reels, Shorts, photos, and audio from Instagram, TikTok, YouTube, Facebook, X, Reddit, and more. Fast, free, and permission-first.',
  keywords: [
    'free social media downloader',
    'online video downloader',
    'social media video downloader',
    'instagram downloader',
    'tiktok no watermark',
    'youtube shorts downloader',
    'youtube to mp3',
    'facebook video downloader',
    'twitter video downloader',
    'reddit video downloader',
    'public media downloader'
  ],
  authors: [{ name: 'SocialVideoDownloader' }],
  creator: 'SocialVideoDownloader',
  publisher: 'SocialVideoDownloader',
  category: 'technology',
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    title: 'SocialVideoDownloader | Free Public Video Downloader',
    description: 'Download public videos, Reels, Shorts, photos, and audio in high quality. No registration required.',
    url: 'https://www.socialvideodownloader.online',
    siteName: 'SocialVideoDownloader',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/icon.svg', width: 512, height: 512, alt: 'SocialVideoDownloader' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialVideoDownloader | Free Public Video Downloader',
    description: 'Download public videos, Reels, Shorts, photos, and audio in high quality.'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Instrument Serif for hero italics */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense verification (publisher account) — required for the AdSense site review. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3329860361873436"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{
          fontFamily: `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif`,
        }}
      >
        <Script
          id="site-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.socialvideodownloader.online/#organization',
                  name: 'SocialVideoDownloader',
                  url: 'https://www.socialvideodownloader.online',
                  logo: 'https://www.socialvideodownloader.online/icon.svg',
                  description: 'A permission-first tool for downloading publicly accessible social media media.'
                },
                {
                  '@type': 'WebApplication',
                  '@id': 'https://www.socialvideodownloader.online/#application',
                  name: 'SocialVideoDownloader',
                  url: 'https://www.socialvideodownloader.online',
                  applicationCategory: 'MultimediaApplication',
                  operatingSystem: 'Web browser',
                  isAccessibleForFree: true,
                  publisher: { '@id': 'https://www.socialvideodownloader.online/#organization' }
                }
              ]
            })
          }}
        />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <DynamicViewportScript />
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
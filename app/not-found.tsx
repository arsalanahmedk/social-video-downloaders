import Link from 'next/link'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black flex flex-col justify-between">
      <NeurexNavbar />

      <main className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
          <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
        </div>

        <div className="text-center max-w-xl mx-auto space-y-6 relative z-10 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <Sparkles size={14} className="text-yellow-400" />
            404 • Resource Not Found
          </div>

          <div className="bg-[#0b1329]/90 border border-blue-900/40 animate-border-glow rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-indigo-200 to-indigo-600 tracking-tight">
              404
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Page Not Found
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              The page or downloader endpoint you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
              >
                <ArrowLeft size={16} className="text-black" />
                Back to Home
              </Link>
              <Link
                href="/supported-sites"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/10"
              >
                Browse Platforms
              </Link>
            </div>
          </div>
        </div>
      </main>

      <NeurexFooter />
    </div>
  )
}

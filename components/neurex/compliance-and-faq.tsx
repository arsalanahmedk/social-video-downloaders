'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ChevronDown, Sparkles, ArrowRight, HelpCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'How does SocialVideoDownloader extract public media?',
    a: 'Our engine parses publicly accessible video/audio manifest URLs using native web protocols. We never access private accounts, password-protected posts, or paywalled media.'
  },
  {
    q: 'Are downloaded videos free of watermarks?',
    a: 'Yes! When platforms like TikTok or Instagram deliver original stream files without watermarks, we preserve that stream directly so you receive clean, original-quality media.'
  },
  {
    q: 'Can I extract audio only (MP3) from videos?',
    a: 'Absolutely. Every supported video link provides an automatic audio extraction option (high-bitrate 320kbps MP3 or original AAC stream) suitable for editing or offline listening.'
  },
  {
    q: 'Do you store or log my downloaded files?',
    a: 'No. We operate under a strict zero-log architecture. Files are streamed directly to your browser memory or storage. We do not store user files, URLs, or personal data on persistent disks.'
  },
  {
    q: 'Is this service free to use?',
    a: 'Yes, 100% free with no account creation, no subscriptions, and no hidden credit card charges.'
  }
]

export function ComplianceAndFAQ() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100" id="faq">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Compliance Card */}
        <div
          className="rounded-[32px] bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center flex-shrink-0 text-blue-400">
              <ShieldCheck size={32} />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Ethical &amp; Transparent
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Permission-First Architecture &amp; Security Guardrails
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                SocialVideoDownloader strictly complies with modern web standards and fair-use principles:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h4 className="font-bold text-white text-sm">Public Content Only</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Only publicly visible posts are accessible. Private profiles are never inspected.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h4 className="font-bold text-white text-sm">Zero DRM Circumvention</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    We never bypass encryption keys, paid subscription paywalls, or digital rights locks.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h4 className="font-bold text-white text-sm">Zero Log Retention</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No files, personal IP addresses, or extraction logs are stored on disk.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h4 className="font-bold text-white text-sm">SSRF-Hardened Sandbox</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    All outbound network fetches are strictly verified against malicious domains and loopbacks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Help &amp; Answers
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-base sm:text-lg hover:text-blue-600 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div className="rounded-[32px] bg-gradient-to-r from-blue-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to download your first media stream?
            </h3>
            <p className="text-slate-300 text-base max-w-xl mx-auto">
              Paste any public Instagram, TikTok, YouTube Shorts, or X link and save the original file immediately.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <a
              href="#downloader"
              className="neurex-yellow-btn px-8 py-3.5 text-base inline-flex items-center gap-2 shadow-xl"
            >
              <Sparkles size={16} className="text-black" />
              Start Extracting Now
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

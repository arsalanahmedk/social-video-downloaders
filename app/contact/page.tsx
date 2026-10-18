'use client'

import * as React from 'react'
import { NeurexNavbar } from '@/components/neurex/neurex-navbar'
import { NeurexFooter } from '@/components/neurex/neurex-footer'
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react'

const SUPPORT_EMAIL = 'legal@socialvideodownloader.com'

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')

  /**
   * There is no mail provider or contact API behind this form, so it previously
   * displayed "Message Sent!" while transmitting nothing at all. It now hands
   * the composed message to the visitor's own mail client, which actually
   * delivers it to the address shown on this page.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !message) return

    const subject = encodeURIComponent(`Contact form: ${name || 'Visitor'}`)
    const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name || 'Visitor'}\nEmail: ${email}\n`)
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#030712] font-sans antialiased text-slate-900 selection:bg-yellow-400 selection:text-black">
      <NeurexNavbar />

      <main>
        {/* Dark Hero Section */}
        <section className="relative bg-[#030712] text-white pt-16 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
            <div className="absolute top-[-80px] left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse-glow" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 animate-border-glow text-xs font-semibold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Mail size={14} /> Get in Touch
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Contact Support &amp; Feedback
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Have questions, feedback, partnership inquiries, or need assistance? Send us a message and our team will respond promptly.
            </p>
          </div>
        </section>

        {/* Contact Form & Channel Grid */}
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Direct Info Cards */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Email Support</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Direct inquiries for technical questions, platform updates, or DMCA requests.
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    support@socialvideodownloader.com
                  </p>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Security &amp; Legal</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Report security advisories or copyright takedowns with expedited handling.
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">
                    legal@socialvideodownloader.com
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="md:col-span-7 bg-[#f8fafc] border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <CheckCircle2 size={54} className="text-emerald-500 mx-auto" />
                    <h3 className="text-2xl font-bold text-slate-900">Your Email Draft Is Ready</h3>
                    <p className="text-slate-600 text-sm max-w-sm mx-auto">
                      We opened your mail client with the message pre-filled. Press send there to deliver it. If nothing
                      opened, email us directly at{' '}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 font-semibold underline">
                        {SUPPORT_EMAIL}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="neurex-yellow-btn px-6 py-2.5 text-xs font-bold mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Message or Inquiry
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your issue or feedback..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="neurex-yellow-btn w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send size={15} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>
      </main>

      <NeurexFooter />
    </div>
  )
}

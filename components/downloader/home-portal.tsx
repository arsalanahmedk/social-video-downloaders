"use client";

import { UniversalDownloader } from "@/components/downloader/universal-downloader";
import { platforms } from "@/lib/platforms/registry";
import Link from "next/link";

export function HomePortal() {
  return (
    <section className="home-portal">
      <div className="home-hero shell">
        <div className="hero-rating"><span className="rating-stars">★★★★★</span> 4.9/5.0 · Trusted by creators worldwide</div>
        <h1>Save the moments<br /><em>worth keeping.</em></h1>
        <p className="hero-copy">Download public videos, reels, stories, and audio from the platforms you use every day. Simple, fast, and ready when you are.</p>
        <Link href="#resolver" className="hero-cta">Start downloading <span>↗</span></Link>
        <div className="hero-orbit" aria-hidden="true"><span>MP4</span><span>MP3</span><span>HD</span><span>↘</span></div>
      </div>

      <div className="resolver-band" id="resolver-band">
        <div className="shell resolver-layout">
          <div><p className="eyebrow">One link. Every platform.</p><h2>Bring your favorite<br />media with you.</h2><p>Paste a public link and we&apos;ll prepare the best available formats in seconds.</p></div>
          <div className="resolver-card"><UniversalDownloader /></div>
        </div>
      </div>

      <div className="home-platform-strip shell">
        <p className="eyebrow">Works with the platforms you already use</p>
        <div className="platform-pills">{platforms.slice(0, 8).map((p) => <Link key={p.id} href={`/${p.id}`} className="platform-pill"><span style={{ backgroundColor: p.accentColor }} />{p.name}</Link>)}</div>
      </div>
    </section>
  );
}

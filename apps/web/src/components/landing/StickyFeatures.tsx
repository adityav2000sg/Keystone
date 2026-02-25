"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  {
    badge: "Today Command Center",
    number: "01",
    headline: "Today,\nin 30 seconds.",
    sub: "Stop guessing what matters. Keystone reads your inbox and calendar and lines up your top priorities for the day—with clear reasons why each made the list. Deadlines, direct asks, meetings, follow-ups: all ranked, all explained.",
    accent: "#2dd4bf",
  },
  {
    badge: "Receipts-first summaries",
    number: "02",
    headline: "Every claim,\nbacked by proof.",
    sub: "When Keystone says &ldquo;Alex owes you a response&rdquo;—it shows you the exact email proving it. Every bullet is cited. If it's not in the thread, Keystone says so. No hallucinations. No guesswork.",
    accent: "#818cf8",
  },
  {
    badge: "Safe drafting",
    number: "03",
    headline: "Draft anything.\nSend nothing.",
    sub: "Generate polished follow-ups, replies, and meeting recaps in one click. Copy to clipboard or create a Gmail draft. But Keystone never hits Send without you—ever. That's not a limitation. It's the whole point.",
    accent: "#f59e0b",
  },
] as const;

export function StickyFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);
      if (progress < 0.33) setActive(0);
      else if (progress < 0.67) setActive(1);
      else setActive(2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sectionRef} id="features" className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Subtle divider top */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Feature copy ── */}
          <div className="flex flex-col gap-2">
            {/* Progress dots */}
            <div className="flex gap-2 mb-8">
              {FEATURES.map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 rounded-full transition-all duration-500"
                  style={{
                    width: active === i ? "32px" : "8px",
                    background: active === i ? FEATURES[i].accent : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="flex flex-col gap-5"
              >
                {/* Badge */}
                <span
                  className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border"
                  style={{
                    color: FEATURES[active].accent,
                    borderColor: `${FEATURES[active].accent}30`,
                    background: `${FEATURES[active].accent}0f`,
                  }}
                >
                  {FEATURES[active].badge}
                </span>

                {/* Number */}
                <span className="text-[11px] tracking-[0.2em] text-white/20 font-medium">
                  {FEATURES[active].number} / 03
                </span>

                {/* Headline */}
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.02em] leading-[1.08] text-white whitespace-pre-line">
                  {FEATURES[active].headline}
                </h2>

                {/* Body */}
                <p
                  className="text-lg leading-relaxed max-w-md"
                  style={{ color: "rgba(248,250,252,0.5)" }}
                  dangerouslySetInnerHTML={{ __html: FEATURES[active].sub }}
                />

                {/* CTA link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                  style={{ color: FEATURES[active].accent }}
                >
                  Get early access
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: Animated mockup ── */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                {active === 0 && <FeatureMockupToday />}
                {active === 1 && <FeatureMockupEvidence />}
                {active === 2 && <FeatureMockupDraft />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtle divider bottom */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}

/* ─── Mockup: Today Command Center ─── */
function FeatureMockupToday() {
  return (
    <div className="w-[400px] rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8),0_0_50px_-8px_rgba(45,212,191,0.1)]">
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-live-dot" />
          <span className="text-[11px] font-medium text-white/55">Today · 5 priorities</span>
        </div>
        <span className="text-[9px] text-[#2dd4bf]/60 font-medium tracking-wider uppercase">Live</span>
      </div>
      <div className="p-4 space-y-2.5">
        {[
          { badge: "⚡ Urgent", color: "#2dd4bf", title: "Reply to Sarah — Series A terms", tags: ["Direct ask", "Board call in 2h"], q: `"needs decision before 3pm..."` },
          { badge: "📅 Today", color: "#f59e0b", title: "Candidate offer — Mike Rodriguez", tags: ["Deadline today"], q: `"offer expires Friday..."` },
          { badge: "📌 Follow-up", color: "#818cf8", title: "Pitch deck → Sequoia", tags: ["Awaiting 5d"], q: `"would love to schedule..."` },
          { badge: "📆 In 90 min", color: "#34d399", title: "Investor sync prep", tags: ["Meeting"], q: "3 open threads to review" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl p-3 border transition-all"
            style={{
              background: i === 0 ? `${item.color}08` : "rgba(255,255,255,0.025)",
              borderColor: i === 0 ? `${item.color}20` : "rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: item.color }}>
                {item.badge}
              </span>
              {item.tags.map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-white/30 border border-white/[0.07]">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[11px] font-semibold text-white/85">{item.title}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{item.q}</p>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-white/[0.05]">
        <span className="text-[9px] text-white/20">Prioritized by recency · deadlines · asks</span>
      </div>
    </div>
  );
}

/* ─── Mockup: Evidence / Receipts ─── */
function FeatureMockupEvidence() {
  return (
    <div className="w-[400px] rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8),0_0_50px_-8px_rgba(129,140,248,0.1)]">
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <p className="text-[11px] font-semibold text-white/70">Thread summary</p>
        <p className="text-[10px] text-white/30 mt-0.5">Sarah Chen · Series A discussion</p>
      </div>
      <div className="p-4 space-y-3">
        {/* Summary bullets */}
        {[
          { claim: "Sarah needs a decision on term sheet by 3pm today.", cite: "Email · Feb 23, 9:14am" },
          { claim: "Outstanding question: board seat composition (2 investor, 1 founder).", cite: "Email · Feb 21, 4:02pm" },
          { claim: "Pro-rata rights confirmed for existing angels.", cite: "Email · Feb 19, 11:55am" },
        ].map((b, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex gap-2">
              <div className="mt-1.5 w-1 h-1 rounded-full bg-[#818cf8]/70 shrink-0" />
              <p className="text-[12px] text-white/80 leading-relaxed">{b.claim}</p>
            </div>
            {/* Evidence citation */}
            <div className="ml-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#818cf8]/08 border border-[#818cf8]/15">
              <svg className="w-3 h-3 text-[#818cf8]/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-[9px] text-[#818cf8]/70 font-medium">{b.cite}</span>
            </div>
          </div>
        ))}
        {/* Confidence */}
        <div className="pt-2 flex items-center gap-2 border-t border-white/[0.06]">
          <div className="flex gap-0.5">
            {[1,1,1,0].map((on, i) => (
              <div key={i} className="w-3 h-1 rounded-full" style={{ background: on ? "#818cf8" : "rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <span className="text-[9px] text-white/30">High confidence · 3 of 3 claims cited</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Draft ─── */
function FeatureMockupDraft() {
  return (
    <div className="w-[400px] rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8),0_0_50px_-8px_rgba(245,158,11,0.08)]">
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-white/70">Draft reply</p>
          <p className="text-[10px] text-white/30 mt-0.5">To: Sarah Chen</p>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b]/80 border border-[#f59e0b]/20 font-medium">
          Review before sending
        </span>
      </div>
      <div className="p-4 space-y-3">
        {/* Draft text */}
        <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.07] text-[12px] text-white/70 leading-relaxed">
          Hi Sarah,
          <br /><br />
          Thanks for the updated terms. I&apos;ve reviewed the sheet and can confirm we&apos;re aligned on the board composition—2 investor seats, 1 founder seat works for us.
          <br /><br />
          Happy to connect before your 3pm call. Does 1:30pm work?
        </div>

        {/* Risk flags */}
        <div className="space-y-1.5">
          <p className="text-[9px] text-white/30 font-medium tracking-wider uppercase">Risk checks</p>
          {[
            { flag: "Confirms board composition", ok: true },
            { flag: "Proposes meeting time — verify calendar", ok: false },
          ].map((r) => (
            <div key={r.flag} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${r.ok ? "bg-[#34d399]" : "bg-amber-400"}`} />
              <span className="text-[10px] text-white/45">{r.flag}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2 rounded-xl text-[11px] font-semibold bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20 hover:bg-[#f59e0b]/25 transition-colors">
            Copy to clipboard
          </button>
          <button className="flex-1 py-2 rounded-xl text-[11px] font-semibold bg-white/[0.06] text-white/60 border border-white/10 hover:bg-white/[0.09] transition-colors">
            Create Gmail draft
          </button>
        </div>

        {/* No autosend notice */}
        <p className="text-center text-[9px] text-white/20">
          🔒 Keystone never sends without your approval
        </p>
      </div>
    </div>
  );
}

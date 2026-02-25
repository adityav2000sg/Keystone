"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden">
      {/* Aurora — subtle, behind everything */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob aurora-teal" style={{ opacity: 0.18 }} />
        <div className="aurora-blob aurora-violet" style={{ opacity: 0.12 }} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(45,212,191,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-[-0.03em] leading-[1.04] text-white"
        >
          The AI chief of staff
          <br />
          <span className="liquid-metal">that keeps receipts.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-7 text-xl md:text-2xl text-white/45 leading-relaxed max-w-2xl mx-auto"
        >
          Keystone turns Gmail + Calendar into a prioritized command center—every summary
          cited, every draft approved by you. Zero hallucinations. Zero auto-sends.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-base
                       bg-[#2dd4bf] text-black hover:bg-[#2dd4bf]/90 transition-all duration-200
                       shadow-[0_0_40px_-8px_rgba(45,212,191,0.6)] hover:shadow-[0_0_56px_-8px_rgba(45,212,191,0.8)]
                       hover:scale-[1.02]"
          >
            Get early access
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-medium text-base
                       text-white/50 hover:text-white transition-colors duration-200
                       border border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
          >
            See it in action ↓
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-3 text-sm text-white/25"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-live-dot" />
            Private beta
          </span>
          <span>·</span>
          <span>Read-only scopes</span>
          <span>·</span>
          <span>No credit card</span>
        </motion.div>
      </div>

      {/* Scroll gradient into dashboard */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none" />
    </section>
  );
}

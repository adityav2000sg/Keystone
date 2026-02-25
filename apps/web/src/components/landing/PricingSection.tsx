"use client";

import { motion } from "framer-motion";

const FEATURES = [
  "Gmail + Google Calendar sync",
  "Today Command Center",
  "Receipts-first summaries",
  "Safe draft generation",
  "Evidence library",
  "Retention controls + delete my data",
  "PII-safe audit trail",
  "Incremental auth (drafts stay optional)",
];

const EA_DOWNSIDES = [
  "$4,000–$8,000/month",
  "HR, payroll, onboarding overhead",
  "Sick days, holidays, time zones",
  "No audit trail",
  "Can't process 200 emails/day",
  "Leaves when you need them most",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-medium mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            One plan. No payroll.
          </h2>
          <p className="mt-4 text-lg text-white/45">
            Everything Keystone does for less than your monthly Figma seat.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Keystone */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative rounded-2xl p-7 border border-[#2dd4bf]/25 bg-[#2dd4bf]/[0.04] overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2dd4bf]/10 blur-3xl pointer-events-none" />

            {/* Popular badge */}
            <div className="absolute top-4 right-4">
              <span className="text-[9px] px-2 py-1 rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf] font-bold tracking-wider uppercase border border-[#2dd4bf]/30">
                Early access
              </span>
            </div>

            <div className="relative">
              <p className="text-sm font-semibold text-white/70 mb-1">Keystone</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-white tracking-tight">$29</span>
                <span className="text-white/40 mb-1.5">/month</span>
              </div>
              <p className="text-xs text-[#2dd4bf]/70 mb-7">Billed monthly · Cancel anytime</p>

              <div className="space-y-3">
                {FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#2dd4bf] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-white/75">{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm
                           bg-[#2dd4bf] text-black hover:bg-[#2dd4bf]/90 transition-all duration-200
                           shadow-[0_0_28px_-6px_rgba(45,212,191,0.5)]"
              >
                Get early access
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Traditional EA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="rounded-2xl p-7 border border-white/[0.07] bg-white/[0.025]"
          >
            <p className="text-sm font-semibold text-white/40 mb-1">Traditional Executive Assistant</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-bold text-white/30 tracking-tight">$6k</span>
              <span className="text-white/25 mb-1.5">/month</span>
            </div>
            <p className="text-xs text-white/25 mb-7">Average US market rate + overhead</p>

            <div className="space-y-3">
              {EA_DOWNSIDES.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm text-white/30">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 py-3.5 rounded-xl border border-white/[0.07] text-center">
              <span className="text-sm text-white/25">Not for your stage.</span>
            </div>
          </motion.div>
        </div>

        <p className="text-center mt-8 text-xs text-white/25">
          No credit card required for beta · Read-only scopes by default · Cancel in one click
        </p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    accent: "#2dd4bf",
    badge: "Today Command Center",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Today, in 30 seconds.",
    body: "Keystone reads your inbox and calendar and lines up your top priorities—with clear reasons why each made the list. Deadlines, direct asks, meetings, follow-ups: ranked and explained.",
  },
  {
    accent: "#818cf8",
    badge: "Receipts-first summaries",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Every claim, backed by proof.",
    body: "When Keystone says \"Alex owes you a response\"—it shows you the exact email proving it. Every bullet is cited. If it's not in the thread, Keystone says so. No hallucinations.",
  },
  {
    accent: "#f59e0b",
    badge: "Safe drafting",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Draft anything. Send nothing.",
    body: "Generate polished follow-ups and replies in one click. Copy to clipboard or create a Gmail draft—but Keystone never hits Send without you. Ever. That's not a limitation. It's the point.",
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="py-28 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-medium mb-4">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Inbox + Calendar → <span className="text-[#2dd4bf]">command.</span>
          </h2>
        </div>

        {/* 3-col grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="rounded-2xl p-6 border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] transition-colors duration-200 group flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${f.accent}12`, color: f.accent }}
              >
                {f.icon}
              </div>

              {/* Badge */}
              <span
                className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: `${f.accent}90` }}
              >
                {f.badge}
              </span>

              <div>
                <h3 className="text-lg font-bold text-white/90 leading-snug mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

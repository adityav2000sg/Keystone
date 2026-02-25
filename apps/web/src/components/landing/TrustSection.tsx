"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 11.25c0 6.627 5.373 12 12 12s12-5.373 12-12c0-1.93-.455-3.756-1.262-5.371" />
      </svg>
    ),
    title: "Read-only by default",
    body: "Connect with minimal permissions. Keystone never touches your inbox. No write access unless you explicitly enable it.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "Zero auto-send. Ever.",
    body: "No email, no message, no calendar invite is sent without your explicit approval. That's not a setting—it's the architecture.",
    accent: "#818cf8",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Every claim, cited.",
    body: "Every summary bullet links back to the source email or event. No hallucinations. No 'I think.' Only what's actually in the thread.",
    accent: "#f59e0b",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: "Delete anytime.",
    body: "Wipe your tokens, cached data, and all derived artifacts in one click. For real. Keystone can't sync what it can't access.",
    accent: "#34d399",
  },
] as const;

export function TrustSection() {
  return (
    <section className="py-28 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-medium mb-4">
            Privacy & trust
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Built on trust, not&nbsp;hope.
          </h2>
          <p className="mt-4 text-lg text-white/45 leading-relaxed">
            Every privacy decision was made before writing a single line of business logic.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="rounded-2xl p-5 border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-200 group"
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${p.accent}15`, color: p.accent }}
              >
                {p.icon}
              </div>
              <h3 className="text-sm font-semibold text-white/90 mb-2">{p.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Compliance strip */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {["SOC 2 Type II (planned)", "GDPR", "CCPA", "Google API policy compliant"].map((badge) => (
            <span
              key={badge}
              className="text-[10px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/35 font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

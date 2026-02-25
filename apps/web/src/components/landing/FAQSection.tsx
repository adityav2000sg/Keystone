"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Does Keystone ever send emails on my behalf?",
    a: "Never. Keystone generates drafts that you can copy to clipboard or save as a Gmail draft—but it has no ability to send. The API endpoint for sending mail does not exist in Keystone. That's not a product limitation—it's a core architectural guarantee.",
  },
  {
    q: "What Google permissions does Keystone request?",
    a: "Read-only Gmail and Calendar scopes by default. Keystone cannot modify your mailbox, create events, or delete anything. If you want to enable 'Create Gmail Draft' (optional), you can grant that specific scope separately—it still requires your explicit action to create the draft.",
  },
  {
    q: "What happens if I delete my data?",
    a: "Everything is wiped: OAuth tokens, message metadata, calendar data, summaries, drafts, and all derived artifacts. Keystone also revokes its Google token. Future sync notifications are ignored. It's a real delete, not a soft disable.",
  },
  {
    q: "How does Keystone prioritize what matters?",
    a: "v1 uses transparent heuristics: recency, sender importance (pinned or frequent responders), direct asks (NLP classifier), calendar proximity, deadlines extracted from thread content, and thread length. Every item shows 'why ranked' tags so you can dispute and teach Keystone over time.",
  },
  {
    q: "How is my email data protected?",
    a: "OAuth tokens are stored with envelope encryption (per-user data keys, encrypted by a master key). No raw email subject or body appears in logs. Analytics events contain only feature usage counters—never content. Your data is never used to train models.",
  },
  {
    q: "What's the difference between Keystone and Merlin?",
    a: "Keystone is receipts-first: every summary bullet links back to the actual email or event proving it. There are no hallucinations, no 'I think...', and no auto-send. Keystone is also privacy-first—read-only by default, minimal retention, and a delete-my-data that actually deletes.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-medium mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Common questions.
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors duration-150"
              >
                <span className="text-sm font-medium text-white/80">{faq.q}</span>
                <div
                  className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <div className="px-5 pb-4 pt-0">
                      <div className="h-px bg-white/[0.06] mb-4" />
                      <p className="text-sm text-white/45 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

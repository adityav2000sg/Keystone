"use client";

import { useState, type ReactNode } from "react";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What exactly does Keystone do?",
    a: "Keystone connects your Gmail and Google Calendar and turns them into a single Today Command Center. You get prioritized items, receipts-first summaries (every claim tied to evidence), and safe drafts. Nothing sends without your approval.",
  },
  {
    q: "How is Keystone different from Merlin, Superhuman, or ChatGPT?",
    a: "Keystone is built for solo founders and operators who live in Gmail and Calendar. It focuses on sync correctness, receipts-first outputs (no unsupported claims), and no auto-send—drafts only, with optional Gmail draft creation when you enable it. One Today view, one place.",
  },
  {
    q: "How much time can I actually save?",
    a: "The goal is to start your day knowing exactly what matters: emails prioritized, action items flagged, and your day mapped out. Many users report reclaiming multiple hours per week by reducing context-switching and decision fatigue.",
  },
  {
    q: "Who is Keystone built for?",
    a: "Solo founders and startup operators (2–10 person teams) who run their day from Gmail and Google Calendar. Single-user first.",
  },
  {
    q: "How does Keystone handle my data?",
    a: "We use least-privilege Google scopes (read-only first). No human sees your email or calendar content. Logs are PII-safe—no subject/body. You control retention and can delete your data at any time.",
  },
  {
    q: "What security standards does Keystone meet?",
    a: "We’re designed for SOC 2–ready practices, GDPR/CCPA alignment, and strict data handling. OAuth tokens are stored with envelope encryption. Your data, your control.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-semibold text-keystone-ink md:text-3xl">
        Questions? We’re already three steps ahead.
      </h2>
      <p className="mt-2 text-keystone-ink-muted">
        Here’s everything you need to know — before you had to ask.
      </p>
      <dl className="mt-8 space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-keystone-border bg-keystone-bg-subtle/30 dark:bg-keystone-surface/20"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-keystone-ink"
            >
              {item.q}
              <span className="text-keystone-ink-muted">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="border-t border-keystone-border px-5 pb-4 pt-2 text-sm text-keystone-ink-muted">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}

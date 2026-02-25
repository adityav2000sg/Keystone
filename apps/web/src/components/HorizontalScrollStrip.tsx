"use client";

const CARDS = [
  { title: "Today", desc: "One view. Priorities first.", icon: "◇" },
  { title: "Receipts", desc: "Every claim linked to source.", icon: "▣" },
  { title: "Drafts", desc: "You approve. Nothing auto-sends.", icon: "○" },
];

export function HorizontalScrollStrip() {
  return (
    <section className="relative border-y border-keystone-border bg-keystone-bg py-14">
      {/* Scroll hint — Apple-style fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[var(--keystone-bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[var(--keystone-bg)] to-transparent" />
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-keystone-ink-muted">
        Scroll to explore
      </p>
      <div className="overflow-x-auto scroll-section-track pb-2">
        <div className="flex gap-6 px-6 py-4 min-w-max md:justify-center md:min-w-0">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="scroll-section-panel w-[300px] flex-shrink-0 rounded-2xl border border-keystone-border bg-keystone-surface p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-keystone-border-strong hover:bg-keystone-surface-hover hover:shadow-md"
            >
              <span className="text-2xl text-keystone-accent">{card.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-keystone-ink">{card.title}</h3>
              <p className="mt-1 text-sm text-keystone-ink-muted">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

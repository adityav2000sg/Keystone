"use client";

import { useRef, useState, useEffect } from "react";

const PANELS = [
  {
    title: "One view for today",
    body: "Priorities, follow-ups, and meetings in one place. No more digging through inbox.",
  },
  {
    title: "Summaries with receipts",
    body: "Every summary links back to the source. Trust what you read.",
  },
  {
    title: "Drafts you approve",
    body: "We suggest. You decide. Nothing sends without your click.",
  },
];

export function ScrollableSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const total = scrollHeight - clientHeight;
      if (total <= 0) {
        setActiveIndex(0);
        return;
      }
      const p = Math.min(scrollTop / total, 1);
      const segment = 1 / PANELS.length;
      const index = Math.min(Math.floor(p / segment), PANELS.length - 1);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-keystone-bg-subtle py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-keystone-accent">
          How it works
        </p>
        <h2 className="mb-16 text-3xl font-semibold tracking-tight text-keystone-ink md:text-4xl">
          Built for control, not chaos
        </h2>
      </div>

      {/* Apple-style: sticky content that updates as you scroll */}
      <div ref={containerRef} className="relative h-[400px] overflow-y-auto overflow-x-hidden">
        {PANELS.map((panel, i) => (
          <div
            key={panel.title}
            className="sticky top-0 flex min-h-[400px] flex-col items-center justify-center px-6 py-16"
            style={{ paddingTop: "calc(50vh - 120px)" }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="mb-4 text-2xl font-semibold text-keystone-ink md:text-3xl">
                {panel.title}
              </h3>
              <p className="text-lg text-keystone-ink-muted">{panel.body}</p>
            </div>
          </div>
        ))}
        {/* Spacer so last panel can scroll to top */}
        <div className="h-[50vh]" />
      </div>

      {/* Progress dots — Apple-style scroll indicator */}
      <div className="flex justify-center gap-2 pt-8">
        {PANELS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              const el = containerRef.current;
              if (!el) return;
              const panelHeight = el.scrollHeight / PANELS.length;
              el.scrollTo({ top: i * panelHeight, behavior: "smooth" });
            }}
            className="h-2 w-2 rounded-full transition-all duration-200"
            style={{
              width: activeIndex === i ? 24 : 8,
              backgroundColor: activeIndex === i ? "var(--keystone-accent)" : "var(--keystone-border)",
            }}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

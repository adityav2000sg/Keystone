"use client";

import { useEffect, useRef } from "react";

const WORDS = (
  "You were in six meetings. You replied to forty emails. " +
  "But did the deal advance? Did the candidate respond? " +
  "Did the investor commit? " +
  "Keystone makes sure you always know."
).split(" ");

export function StatementSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress 0→1 as section scrolls from entering viewport to exiting
      const scrolled = windowH - rect.top;
      const total = rect.height + windowH;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      wordRefs.current.forEach((span, i) => {
        if (!span) return;
        // Each word activates staggered as progress increases
        const wordProgress = Math.max(0, Math.min(1, progress * WORDS.length * 0.65 - i));
        const opacity = 0.1 + wordProgress * 0.9;
        span.style.color = `rgba(248,250,252,${opacity})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-36 px-6 overflow-hidden"
    >
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(45,212,191,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-medium mb-10">
          The reality check
        </p>

        {/* Word-reveal statement */}
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-[-0.02em] leading-[1.15]">
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="inline-block mr-[0.28em] last:mr-0 transition-none"
              style={{ color: "rgba(248,250,252,0.1)" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

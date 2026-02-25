"use client";

import { useEffect, useRef, useState } from "react";

const METRICS = [
  { value: 12, suffix: "h", label: "per week reclaimed", sub: "Average time founders save vs managing inbox manually", accent: "#2dd4bf" },
  { value: 0, suffix: "", label: "auto-sends. Ever.", sub: "Not a toggle. Not a setting. Hardcoded into the architecture.", accent: "#818cf8" },
  { value: 100, suffix: "%", label: "of claims cited", sub: "Every summary bullet links back to a real email or event.", accent: "#f59e0b" },
] as const;

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) { setCount(target); return; }
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
}

function MetricItem({
  value, suffix, label, sub, accent, index,
}: { value: number; suffix: string; label: string; sub: string; accent: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(value, 1600, triggered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3 p-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] transition-colors duration-200 relative overflow-hidden"
    >
      {/* Glow accent */}
      <div
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`, filter: "blur(40px)" }}
      />

      {/* Big number */}
      <div className="relative">
        <span
          className="text-6xl sm:text-7xl font-bold tracking-tight tabular-nums"
          style={{ color: accent }}
        >
          {count}
          {suffix}
        </span>
      </div>

      <div>
        <p className="text-base font-semibold text-white/80">{label}</p>
        <p className="mt-1 text-sm text-white/35 leading-relaxed">{sub}</p>
      </div>
    </div>
  );
}

export function MetricsSection() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-lg mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-medium mb-4">
            By the numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Results you can measure.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {METRICS.map((m, i) => (
            <MetricItem key={i} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

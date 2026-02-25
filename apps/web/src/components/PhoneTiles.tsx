"use client";

import { useEffect, useState } from "react";

const STATIC_TILES = [
  { label: "Follow-ups", sub: "5 pending", delay: 80 },
  { label: "Meetings", sub: "2 today", delay: 160 },
  { label: "Brief", sub: "Ready", delay: 240 },
];

// "Live" tile — cycles like Windows Phone / Revolut
const LIVE_TODAY_OPTIONS = ["3 priorities", "4 priorities", "2 due today", "1 overdue"];

export function PhoneTiles() {
  const [mounted, setMounted] = useState(false);
  const [liveIndex, setLiveIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  // Revolut/Windows Phone style: one tile that cycles content
  useEffect(() => {
    const id = setInterval(() => {
      setLiveIndex((i) => (i + 1) % LIVE_TODAY_OPTIONS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] flex-shrink-0">
      {/* Subtle float so the phone feels alive */}
      <div
        className="relative"
        style={{
          animation: mounted ? "float 4s ease-in-out infinite" : "none",
        }}
      >
        {/* "Live" pill — Revolut-style indicator */}
        <div className="absolute -top-2 right-4 z-10 flex items-center gap-1.5 rounded-full border border-keystone-border bg-keystone-surface px-2.5 py-1 text-[10px] font-medium text-keystone-ink-muted backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full bg-keystone-accent"
            style={{ animation: "liveDot 1.5s ease-in-out infinite" }}
          />
          Live
        </div>

        {/* Phone frame — continuous glow so it never looks static */}
        <div
          className="relative overflow-hidden rounded-[2.75rem] border-[10px] border-keystone-border bg-[var(--keystone-bg-subtle)]"
          style={{
            animation: mounted ? "phoneGlow 3s ease-in-out infinite" : "none",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
          }}
        >
          <div className="absolute left-1/2 top-5 h-6 w-24 -translate-x-1/2 rounded-full bg-keystone-ink/80 dark:bg-keystone-ink/90" />
          <div className="mt-10 min-h-[520px] px-4 pb-8 pt-2">
            <div className="mb-6 flex items-center justify-between px-1 text-[10px] text-keystone-ink-muted">
              <span>9:41</span>
              <span>Keystone</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* First tile: live-updating (Windows Phone style) */}
              <div
                className="flex flex-col justify-center rounded-2xl border border-keystone-border bg-keystone-surface px-4 py-4 backdrop-blur-md transition-all duration-200 hover:bg-keystone-surface-hover"
                style={{
                  animation: mounted ? "tileIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "none",
                  opacity: mounted ? 1 : 0,
                  animationDelay: "0ms",
                  animationFillMode: "backwards",
                }}
              >
                <span className="text-sm font-semibold text-keystone-ink">Today</span>
                <span
                  key={liveIndex}
                  className="animate-fade-in mt-0.5 inline-block text-xs text-keystone-ink-muted"
                >
                  {LIVE_TODAY_OPTIONS[liveIndex]}
                </span>
              </div>

              {STATIC_TILES.map((tile) => (
                <div
                  key={tile.label}
                  className="flex flex-col justify-center rounded-2xl border border-keystone-border bg-keystone-surface px-4 py-4 backdrop-blur-md transition-all duration-200 hover:bg-keystone-surface-hover"
                  style={{
                    animation: mounted ? "tileIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "none",
                    opacity: mounted ? 1 : 0,
                    animationDelay: `${tile.delay}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <span className="text-sm font-semibold text-keystone-ink">{tile.label}</span>
                  <span className="mt-0.5 text-xs text-keystone-ink-muted">{tile.sub}</span>
                </div>
              ))}
            </div>

            {/* Pulsing dots — clearly visible "live" feel */}
            <div className="mt-6 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 w-8 rounded-full bg-keystone-accent/40"
                  style={{
                    animation: "sealPulse 2s ease-in-out infinite",
                    animationDelay: `${i * 0.35}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

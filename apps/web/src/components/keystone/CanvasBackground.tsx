"use client";

import React from "react";

interface CanvasBackgroundProps {
  variant?: "grid" | "dots" | "none";
  className?: string;
}

export function CanvasBackground({ variant = "grid", className }: CanvasBackgroundProps) {
  if (variant === "none") return null;

  const dotPattern =
    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)";
  const gridPattern =
    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)";

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className ?? ""}`}
      style={{
        backgroundImage: variant === "dots" ? dotPattern : gridPattern,
        backgroundSize: variant === "dots" ? "24px 24px" : "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}

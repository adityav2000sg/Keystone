"use client";

import React from "react";
import { clsx } from "clsx";

interface DarkSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: "teal" | "violet" | "amber" | "none";
  borderTop?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const GLOW: Record<"teal" | "violet" | "amber" | "none", string> = {
  teal:   "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(45,212,191,0.08)_0%,transparent_70%)] before:pointer-events-none",
  violet: "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(129,140,248,0.07)_0%,transparent_70%)] before:pointer-events-none",
  amber:  "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.06)_0%,transparent_70%)] before:pointer-events-none",
  none:   "",
};

const MAX_WIDTH: Record<"sm" | "md" | "lg" | "xl" | "full", string> = {
  sm:   "max-w-3xl",
  md:   "max-w-4xl",
  lg:   "max-w-5xl",
  xl:   "max-w-[1240px]",
  full: "max-w-none",
};

export function DarkSection({
  children,
  className,
  id,
  glowColor = "none",
  borderTop = false,
  maxWidth = "xl",
}: DarkSectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full overflow-hidden py-20 md:py-28",
        borderTop && "border-t border-white/[0.05]",
        GLOW[glowColor],
        className
      )}
    >
      <div className={clsx("relative z-10 mx-auto w-full px-6 md:px-10", MAX_WIDTH[maxWidth])}>
        {children}
      </div>
    </section>
  );
}

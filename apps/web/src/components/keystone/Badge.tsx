"use client";

import React from "react";
import { clsx } from "clsx";

type BadgeVariant = "teal" | "violet" | "amber" | "ghost" | "red" | "success";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  teal:    "bg-teal-400/10 text-teal-300 ring-teal-400/20",
  violet:  "bg-violet-400/10 text-violet-300 ring-violet-400/20",
  amber:   "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  red:     "bg-red-400/10 text-red-300 ring-red-400/20",
  success: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  ghost:   "bg-white/[0.05] text-white/55 ring-white/10",
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  teal:    "bg-teal-400",
  violet:  "bg-violet-400",
  amber:   "bg-amber-400",
  red:     "bg-red-400",
  success: "bg-emerald-400",
  ghost:   "bg-white/40",
};

export function Badge({
  children,
  variant = "ghost",
  size = "md",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full ring-1 font-medium uppercase tracking-widest",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {dot && (
        <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", DOT_CLASSES[variant])} />
      )}
      {children}
    </span>
  );
}

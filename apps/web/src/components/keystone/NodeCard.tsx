"use client";

import React from "react";
import { clsx } from "clsx";

type NodeColor = "teal" | "violet" | "amber" | "blue" | "default";

interface NodeCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tags?: string[];
  color?: NodeColor;
  className?: string;
}

const COLOR_ICON: Record<NodeColor, string> = {
  teal:    "bg-teal-500/15 ring-teal-400/30 text-teal-400",
  violet:  "bg-violet-500/15 ring-violet-400/30 text-violet-400",
  amber:   "bg-amber-500/15 ring-amber-400/30 text-amber-400",
  blue:    "bg-blue-500/15 ring-blue-400/30 text-blue-400",
  default: "bg-white/[0.08] ring-white/10 text-white/60",
};

const COLOR_RING: Record<NodeColor, string> = {
  teal:    "ring-teal-400/20",
  violet:  "ring-violet-400/20",
  amber:   "ring-amber-400/20",
  blue:    "ring-blue-400/20",
  default: "ring-white/[0.10]",
};

const TAG_COLORS = ["bg-teal-400/10 text-teal-300", "bg-red-400/10 text-red-300"];

export function NodeCard({
  icon,
  title,
  subtitle,
  tags = [],
  color = "default",
  className,
}: NodeCardProps) {
  return (
    <div
      className={clsx(
        "rounded-[16px] bg-white/[0.03] ring-1 p-4 min-w-[200px]",
        "flex flex-col gap-3 backdrop-blur-[8px]",
        COLOR_RING[color],
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={clsx(
            "w-8 h-8 rounded-[10px] ring-1 flex items-center justify-center shrink-0",
            COLOR_ICON[color]
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-white/90 truncate">{title}</div>
          <div className="text-[10px] text-white/35 truncate">{subtitle}</div>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={clsx(
                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                TAG_COLORS[i % TAG_COLORS.length]
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

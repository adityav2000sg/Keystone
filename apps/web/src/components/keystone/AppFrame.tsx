"use client";

import React from "react";
import { clsx } from "clsx";

interface AppFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export function AppFrame({
  children,
  title,
  className,
  size = "md",
  glow = false,
}: AppFrameProps) {
  return (
    <div
      className={clsx(
        "relative rounded-[20px] ring-1 ring-white/[0.10]",
        "bg-[#0a0a12] overflow-hidden",
        glow && "shadow-[0_0_80px_-20px_rgba(45,212,191,0.25)]",
        !glow && "shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        {title && (
          <span className="flex-1 text-center text-[11px] text-white/35 font-medium -ml-10">
            {title}
          </span>
        )}
      </div>
      {/* Content */}
      <div className={clsx(size === "sm" ? "p-0" : size === "md" ? "p-0" : "p-0")}>
        {children}
      </div>
    </div>
  );
}

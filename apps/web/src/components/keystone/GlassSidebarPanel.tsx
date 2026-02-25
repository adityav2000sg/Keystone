"use client";

import React from "react";
import { clsx } from "clsx";

interface GlassSidebarPanelProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
}

export function GlassSidebarPanel({
  children,
  className,
  width = "w-[280px]",
}: GlassSidebarPanelProps) {
  return (
    <div
      className={clsx(
        "shrink-0 flex flex-col",
        "bg-white/[0.02] backdrop-blur-[14px]",
        "border-r border-white/[0.07]",
        "h-full",
        width,
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── Sub-components ────────────────────────────── */

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
}

export function SidebarSection({ label, children }: SidebarSectionProps) {
  return (
    <div className="px-4 pt-5 pb-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2 px-2">
        {label}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon, label, sublabel, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 w-full px-3 py-2.5 rounded-[10px] text-left",
        "transition-all duration-150",
        active
          ? "bg-teal-400/10 ring-1 ring-teal-400/20 text-teal-300"
          : "text-white/50 hover:bg-white/[0.05] hover:text-white/80"
      )}
    >
      <span className={clsx("shrink-0", active ? "text-teal-400" : "text-white/30")}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-xs font-medium truncate">{label}</div>
        {sublabel && <div className="text-[10px] text-white/30 truncate">{sublabel}</div>}
      </div>
    </button>
  );
}

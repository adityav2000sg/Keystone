"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type CardVariant = "dark" | "light" | "elevated";

interface GlassCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  delay?: number;
  padding?: "sm" | "md" | "lg";
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  dark:     "bg-white/[0.03] ring-1 ring-white/[0.08] backdrop-blur-[14px]",
  light:    "bg-[#F7F6F7] ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
  elevated: "bg-white/[0.07] ring-1 ring-white/[0.12] backdrop-blur-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
};

const PADDING: Record<"sm" | "md" | "lg", string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  children,
  variant = "dark",
  className,
  hover = true,
  animate = true,
  delay = 0,
  padding = "md",
}: GlassCardProps) {
  const base = clsx(
    "rounded-[16px] transition-all duration-200",
    VARIANT_CLASSES[variant],
    PADDING[padding],
    hover && variant === "dark" && "hover:bg-white/[0.06] hover:ring-white/[0.14]",
    hover && variant === "light" && "hover:shadow-[0_2px_8px_rgba(0,0,0,0.10)]",
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className={base}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={base}>{children}</div>;
}

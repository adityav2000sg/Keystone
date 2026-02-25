"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "ghost" | "subtle";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-teal-500 text-white ring-teal-400/30 hover:bg-teal-400",
  ghost:   "bg-transparent text-white/80 ring-white/15 hover:bg-white/[0.06] hover:text-white",
  subtle:  "bg-white/[0.06] text-white/80 ring-white/10 hover:bg-white/[0.10] hover:text-white",
};

const SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

export function PillButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
  disabled = false,
}: PillButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-xl ring-1 font-semibold",
    "transition-all duration-200 cursor-pointer select-none",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    VARIANT[variant],
    SIZE[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -1, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}

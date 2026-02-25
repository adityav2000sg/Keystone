"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Badge variant="ghost" size="sm" dot>
          {eyebrow}
        </Badge>
      )}
      <h2
        className={clsx(
          "font-bold tracking-tight leading-[1.08] text-white",
          "text-3xl md:text-[48px] lg:text-[52px]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          "text-white/50 leading-relaxed text-base md:text-lg",
          align === "center" && "max-w-xl"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

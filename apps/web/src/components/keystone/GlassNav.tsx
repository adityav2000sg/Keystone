"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV_LINKS = [
  { label: "Product",  href: "/product" },
  { label: "Pricing",  href: "/pricing" },
  { label: "Company",  href: "/company" },
  { label: "Blog",     href: "/blog" },
];

export function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <nav
          className={clsx(
            "max-w-[1240px] mx-auto flex items-center justify-between",
            "px-4 py-2.5 rounded-[16px]",
            "transition-all duration-400",
            scrolled
              ? "bg-black/70 backdrop-blur-[14px] ring-1 ring-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-white/[0.05] backdrop-blur-[10px] ring-1 ring-white/[0.08]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-[8px] bg-teal-500/20 ring-1 ring-teal-400/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <span className="text-sm font-bold text-white/90">Keystone</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={clsx(
                  "px-3.5 py-2 rounded-[10px] text-sm font-medium transition-colors duration-150",
                  pathname === href || (href !== "/" && pathname.startsWith(href))
                    ? "text-white bg-white/[0.08]"
                    : "text-white/50 hover:text-white/90 hover:bg-white/[0.05]"
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="#" className="text-sm font-medium text-white/50 hover:text-white/90 px-3 py-2 transition-colors">
              Sign in
            </Link>
            <Link
              href="#"
              className="flex items-center gap-1.5 px-4 py-2 rounded-[12px] bg-teal-500 text-white text-sm font-semibold hover:bg-teal-400 transition-colors ring-1 ring-teal-400/30"
            >
              Get started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/60 hover:text-white p-1.5 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[72px] z-40 rounded-[16px] bg-black/90 backdrop-blur-[14px] ring-1 ring-white/[0.09] p-4 flex flex-col gap-1 shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-3 rounded-[10px] text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/[0.07] mt-1 flex flex-col gap-2">
              <Link href="#" className="px-4 py-3 text-sm text-white/50 text-center">Sign in</Link>
              <Link
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] bg-teal-500 text-white text-sm font-semibold"
              >
                Get started free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

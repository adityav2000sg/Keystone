"use client";

import { useEffect, useState } from "react";
import { KeystoneSeal } from "@/components/KeystoneSeal";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <KeystoneSeal className="w-7 h-7 transition-opacity group-hover:opacity-80" />
          <span className="font-semibold text-white tracking-tight">Keystone</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {["Features", "Pricing", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:block text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            Sign in
          </a>
          <a
            href="#"
            className="text-sm px-4 py-2 rounded-xl font-medium bg-[#2dd4bf] text-black
                       transition-all duration-200 hover:bg-[#2dd4bf]/90 hover:scale-[1.02]
                       shadow-[0_0_20px_-4px_rgba(45,212,191,0.45)]
                       hover:shadow-[0_0_28px_-4px_rgba(45,212,191,0.65)]"
          >
            Get early access
          </a>
        </div>
      </nav>
    </header>
  );
}

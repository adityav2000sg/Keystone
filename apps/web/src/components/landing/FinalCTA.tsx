"use client";

import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden border-t border-white/[0.06]">
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 65%)",
            filter: "blur(80px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 65%)",
            filter: "blur(60px)",
            top: "20%",
            right: "10%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Label */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/[0.04] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-live-dot" />
            Private beta now open
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-white leading-tight">
            Nothing slips.
            <br />
            <span className="liquid-metal">Not ever.</span>
          </h2>

          <p className="text-lg text-white/45 max-w-xl leading-relaxed">
            Connect Gmail and Calendar in 60 seconds. Keystone does the rest—
            surfaces what matters, backs every claim, drafts your replies.
            You stay in control.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base
                         bg-[#2dd4bf] text-black hover:bg-[#2dd4bf]/90 transition-all duration-200
                         shadow-[0_0_40px_-8px_rgba(45,212,191,0.6)]
                         hover:shadow-[0_0_56px_-8px_rgba(45,212,191,0.8)]
                         hover:scale-[1.02]"
            >
              Connect Gmail in 60 seconds
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 text-xs text-white/25">
            <span>Read-only scopes by default</span>
            <span>·</span>
            <span>No credit card</span>
            <span>·</span>
            <span>Delete anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

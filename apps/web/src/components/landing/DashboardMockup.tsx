"use client";

import { motion } from "framer-motion";

export function DashboardMockup() {
  return (
    <section id="dashboard" className="relative px-6 pb-0 overflow-hidden">
      {/* Under-glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(45,212,191,0.10) 0%, transparent 70%)", filter: "blur(20px)" }}
      />

      <div className="max-w-[1180px] mx-auto" style={{ perspective: "1800px" }}>
        <motion.div
          id="mockup-shell"
          initial={{ opacity: 0, y: 80, rotateX: 14 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 6 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ transformOrigin: "top center" }}
          className="rounded-t-2xl overflow-hidden border border-white/10 border-b-0
                     shadow-[0_-4px_80px_-10px_rgba(45,212,191,0.08),0_40px_120px_-20px_rgba(0,0,0,0.9)]"
        >
          {/* Browser chrome */}
          <div className="bg-[#141414] border-b border-white/[0.07] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-10 py-1 rounded-md bg-white/[0.05] border border-white/[0.07] text-[11px] text-white/30 font-mono">
                app.keystone.ai
              </div>
            </div>
            {/* Spacer */}
            <div className="w-14 shrink-0" />
          </div>

          {/* App shell */}
          <div className="flex bg-[#0d0d0d]" style={{ height: "620px" }}>

            {/* ── Sidebar ── */}
            <aside className="w-52 shrink-0 border-r border-white/[0.05] bg-[#0a0a0a] flex flex-col">
              {/* Logo */}
              <div className="px-4 py-4 border-b border-white/[0.05] flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#2dd4bf]" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[13px] font-semibold text-white/80 tracking-tight">Keystone</span>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-2 py-3 space-y-0.5">
                {[
                  { label: "Today", icon: "◈", active: true, badge: "5" },
                  { label: "Inbox", icon: "◻", active: false },
                  { label: "Calendar", icon: "◷", active: false },
                  { label: "Drafts", icon: "◱", active: false, badge: "2" },
                  { label: "Weekly Brief", icon: "◫", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                      item.active
                        ? "bg-[#2dd4bf]/10 text-[#2dd4bf]"
                        : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px]">{item.icon}</span>
                      <span className="text-[12px] font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.active ? "bg-[#2dd4bf]/20 text-[#2dd4bf]" : "bg-white/[0.08] text-white/40"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </nav>

              {/* Bottom */}
              <div className="px-2 py-3 border-t border-white/[0.05] space-y-0.5">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-white/25 hover:text-white/50 cursor-pointer">
                  <span className="text-[12px]">⚙</span>
                  <span className="text-[12px]">Settings</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2dd4bf]/40 to-[#818cf8]/40 border border-white/10 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white/80">AV</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-white/60 truncate">Aditya V.</p>
                    <p className="text-[9px] text-white/25 truncate">Solo founder</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-[15px] font-semibold text-white/90 tracking-tight">Today</h1>
                    <p className="text-[11px] text-white/35 mt-0.5">Monday, February 23 · 9:24 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5 text-[10px] text-[#2dd4bf]/70 bg-[#2dd4bf]/08 border border-[#2dd4bf]/15 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-live-dot" />
                    Live sync
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center cursor-pointer hover:bg-white/[0.07] transition-colors">
                    <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Priority list */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] font-semibold text-white/30 tracking-[0.15em] uppercase">Top Priorities</p>
                  <span className="text-[10px] text-white/20 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">5 items</span>
                </div>

                {/* Item 1 — Urgent */}
                <div className="rounded-xl p-4 border border-[#2dd4bf]/18 bg-[#2dd4bf]/[0.04] hover:bg-[#2dd4bf]/[0.07] transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold tracking-wider text-[#2dd4bf] uppercase">⚡ Urgent</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/35 border border-white/[0.08]">Direct ask</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/35 border border-white/[0.08]">Board call in 2h</span>
                      </div>
                      <p className="text-[13px] font-semibold text-white/90 truncate">Reply to Sarah Chen — Series A term sheet</p>
                      <p className="text-[11px] text-white/35 mt-1 leading-relaxed">
                        &ldquo;...I need your decision on the board composition before our 3pm call today...&rdquo;
                      </p>
                      {/* Evidence citation */}
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#2dd4bf]/50">
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Evidence: Email from Sarah · Feb 23, 9:14am</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button className="text-[10px] px-3 py-1.5 rounded-lg bg-[#2dd4bf]/15 text-[#2dd4bf] font-semibold hover:bg-[#2dd4bf]/25 transition-colors whitespace-nowrap border border-[#2dd4bf]/20">
                        Draft reply →
                      </button>
                      <button className="text-[10px] px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:bg-white/[0.09] transition-colors whitespace-nowrap border border-white/[0.07]">
                        View thread
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 2 — Deadline */}
                <div className="rounded-xl p-4 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold tracking-wider text-amber-400/80 uppercase">📅 Today</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/35 border border-white/[0.08]">Deadline today</span>
                      </div>
                      <p className="text-[13px] font-semibold text-white/80 truncate">Candidate offer — Mike Rodriguez</p>
                      <p className="text-[11px] text-white/30 mt-1">&ldquo;...the offer expires this Friday, pending your approval...&rdquo;</p>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-amber-400/40">
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Evidence: HR thread · Feb 21, 2:30pm</span>
                      </div>
                    </div>
                    <button className="shrink-0 text-[10px] px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400/70 font-medium hover:bg-amber-400/15 transition-colors border border-amber-400/15 whitespace-nowrap">
                      Draft offer →
                    </button>
                  </div>
                </div>

                {/* Item 3 — Follow-up */}
                <div className="rounded-xl p-4 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold tracking-wider text-violet-400/80 uppercase">📌 Follow-up</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/35 border border-white/[0.08]">Awaiting reply · 5d</span>
                      </div>
                      <p className="text-[13px] font-semibold text-white/70 truncate">Pitch deck sent to Sequoia Capital</p>
                      <p className="text-[11px] text-white/25 mt-1">&ldquo;...would love to schedule a quick 30-minute call...&rdquo;</p>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-violet-400/40">
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Evidence: Email thread · Feb 18, 11:00am</span>
                      </div>
                    </div>
                    <button className="shrink-0 text-[10px] px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/35 font-medium hover:bg-white/[0.09] transition-colors border border-white/[0.07] whitespace-nowrap">
                      Send nudge →
                    </button>
                  </div>
                </div>

                {/* Item 4 — Meeting prep */}
                <div className="rounded-xl p-4 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold tracking-wider text-emerald-400/80 uppercase">📆 In 90 min</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/35 border border-white/[0.08]">Meeting prep</span>
                      </div>
                      <p className="text-[13px] font-semibold text-white/65 truncate">Investor sync — Series A update</p>
                      <p className="text-[11px] text-white/25 mt-1">3 open threads · 2 outstanding questions surfaced</p>
                    </div>
                    <button className="shrink-0 text-[10px] px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-400/60 font-medium hover:bg-emerald-400/15 transition-colors border border-emerald-400/15 whitespace-nowrap">
                      Prep pack →
                    </button>
                  </div>
                </div>
              </div>
            </main>

            {/* ── Right panel ── */}
            <aside className="w-[264px] shrink-0 border-l border-white/[0.05] bg-[#0b0b0b] flex flex-col overflow-hidden">
              {/* Calendar header */}
              <div className="px-4 py-4 border-b border-white/[0.05]">
                <p className="text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase mb-3">Coming up</p>
                <div className="space-y-2.5">
                  {[
                    { time: "10:30", label: "Investor sync (Series A)", color: "#2dd4bf", tag: "Prep ready" },
                    { time: "14:00", label: "Sales call — Acme Corp", color: "#818cf8", tag: "3 open items" },
                    { time: "16:30", label: "Team standup", color: "#f59e0b", tag: "" },
                  ].map((ev) => (
                    <div key={ev.time} className="flex items-center gap-2.5">
                      <div className="w-1 h-8 rounded-full shrink-0" style={{ background: ev.color }} />
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] font-mono font-medium text-white/40">{ev.time}</span>
                          {ev.tag && (
                            <span className="text-[8px] text-white/25 bg-white/[0.05] px-1.5 py-0.5 rounded-full">{ev.tag}</span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/60 truncate mt-0.5">{ev.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly summary */}
              <div className="px-4 py-4">
                <p className="text-[11px] font-semibold text-white/40 tracking-[0.15em] uppercase mb-3">This week</p>
                <div className="space-y-2">
                  {[
                    { label: "Urgent items", value: "3", color: "#2dd4bf" },
                    { label: "Open threads", value: "14", color: "#818cf8" },
                    { label: "Awaiting reply", value: "7", color: "#f59e0b" },
                    { label: "Drafts ready", value: "2", color: "#34d399" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: stat.color }} />
                        <span className="text-[11px] text-white/35">{stat.label}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-white/55">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence note */}
              <div className="mt-auto px-4 pb-4">
                <div className="rounded-xl p-3 bg-[#2dd4bf]/[0.05] border border-[#2dd4bf]/12">
                  <p className="text-[10px] text-[#2dd4bf]/60 leading-relaxed">
                    All priorities backed by evidence. No claim without a source.
                  </p>
                </div>
              </div>
            </aside>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

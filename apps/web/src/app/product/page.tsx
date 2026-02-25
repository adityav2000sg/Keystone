"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Mail,
  Calendar,
  MessageSquare,
  Zap,
  Shield,
  Eye,
  Send,
  Clock,
  BarChart3,
  CheckCircle2,
  Database,
} from "lucide-react";
import {
  GlassNav,
  DarkSection,
  GlassCard,
  PillButton,
  Badge,
  SectionHeader,
  AppFrame,
  WorkflowCanvas,
  CanvasBackground,
} from "@/components/keystone";

// ─────────────────────────────────────────────────────────────
// ANALYTICS MOCKUP
// ─────────────────────────────────────────────────────────────
function AnalyticsMockup() {
  const stats = [
    { label: "Total Threads", val: "12,847", delta: "+12.5%", up: true },
    { label: "AI Resolution Rate", val: "78.2%", delta: "+3.1%", up: true },
    { label: "Avg Response Time", val: "1.4s", delta: "-0.3s", up: true },
    { label: "CSAT Score", val: "4.7 / 5", delta: "+0.2", up: true },
  ];

  const tableRows = [
    { name: "Sequoia Capital", threads: 284, time: "1.2s", score: 96, w: "96%" },
    { name: "Acme Corp", threads: 267, time: "1.4s", score: 94, w: "94%" },
    { name: "AI Auto-handled", threads: 1847, time: "0.8s", score: 89, w: "89%" },
    { name: "Legal & Compliance", threads: 1023, time: "0.8s", score: 85, w: "85%" },
    { name: "Partner Outreach", threads: 712, time: "1.1s", score: 79, w: "79%" },
  ];

  return (
    <div className="bg-[#040408] rounded-b-[20px] overflow-hidden text-white/80">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="text-sm font-bold text-white mb-1">Analytics &amp; Insights</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] border-b border-white/[0.06]">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#040408] p-4">
            <div className="text-[10px] text-white/35 mb-1">{s.label}</div>
            <div className="text-xl font-bold text-white">{s.val}</div>
            <div className="text-[10px] text-teal-400 mt-0.5">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4">
        <div className="text-xs font-bold text-white mb-3">Performance Leaderboard</div>
        <div className="space-y-2.5">
          {tableRows.map((row) => (
            <div key={row.name} className="flex items-center gap-3 text-xs">
              <div className="w-32 text-white/60 truncate shrink-0">{row.name}</div>
              <div className="w-12 text-white/40 shrink-0">{row.threads}</div>
              <div className="w-10 text-white/40 shrink-0">{row.time}</div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/[0.06] rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: row.w }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-teal-500"
                    style={{ width: row.w }}
                  />
                </div>
                <span className="text-white/60 shrink-0 text-[10px] w-8">{row.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INTEGRATIONS MOCKUP
// ─────────────────────────────────────────────────────────────
function IntegrationsMockup() {
  const integrations = [
    { name: "Slack", desc: "Unify messages with email threads", status: "Connected", statusCls: "text-teal-400", threads: "2,847" },
    { name: "Gmail", desc: "Email integration and AI drafts", status: "Connected", statusCls: "text-teal-400", threads: "1,923" },
    { name: "HubSpot", desc: "Sync contacts and interactions", status: "Not configured", statusCls: "text-white/30", threads: null },
    { name: "Notion", desc: "Store and organize knowledge base", status: "Connected", statusCls: "text-teal-400", threads: "654" },
    { name: "Zapier", desc: "Automate with 5,000+ apps", status: "Not configured", statusCls: "text-white/30", threads: null },
    { name: "Linear", desc: "Link emails to engineering issues", status: "Connected", statusCls: "text-teal-400", threads: "421" },
  ];

  return (
    <div className="bg-[#040408] rounded-b-[20px] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <div className="text-sm font-bold text-white mb-3">Available Integrations</div>
        <div className="flex gap-2 flex-wrap">
          {["All", "AI Tools", "Communication", "CRM", "Storage"].map((f, i) => (
            <span
              key={f}
              className={`text-xs px-3 py-1 rounded-full ${
                i === 0
                  ? "bg-white/90 text-black font-semibold"
                  : "bg-white/[0.06] text-white/50 ring-1 ring-white/[0.08]"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/[0.04] p-px">
        {integrations.map((item) => (
          <div key={item.name} className="bg-[#040408] p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-[8px] bg-white/[0.07] ring-1 ring-white/[0.1] flex items-center justify-center text-xs font-black text-white">
                {item.name[0]}
              </div>
              <button
                className={`text-[10px] px-2.5 py-1 rounded-full ring-1 font-medium ${
                  item.status === "Connected"
                    ? "ring-teal-400/20 text-teal-400 bg-teal-400/10"
                    : "ring-white/[0.1] text-white/50 bg-white/[0.05]"
                }`}
              >
                {item.status === "Connected" ? "Manage" : "Connect"}
              </button>
            </div>
            <div className="text-xs font-semibold text-white/80">{item.name}</div>
            <div className="text-[10px] text-white/35 mt-0.5 leading-relaxed">{item.desc}</div>
            {item.threads && (
              <div className="text-[10px] text-white/25 mt-1">{item.threads} conversations</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURE DEEP-DIVES
// ─────────────────────────────────────────────────────────────
const FEATURE_SECTIONS = [
  {
    eyebrow: "Inbox Intelligence",
    title: <>Smart prioritization<br /><span className="text-white/40">that learns you</span></>,
    body: "Keystone builds a dynamic priority model from your email history, calendar, and Slack activity. It understands relationship depth, urgency signals, and communication patterns — then surfaces exactly what needs your attention today.",
    bullets: [
      "Priority score from 0–100 per thread, updated in real time",
      "Learns from your approval and skip patterns over time",
      "Filters noise automatically — newsletters, CC'd threads, FYIs",
      "Relationship graph: who you reply to fastest, most often",
    ],
    align: "right" as const,
    glow: "teal" as const,
    icon: <Sparkles className="w-5 h-5" />,
    color: "teal" as const,
    mockup: null,
  },
  {
    eyebrow: "Visual Automation",
    title: <>Workflow canvas<br /><span className="text-white/40">without engineering</span></>,
    body: "Build multi-step email and communication workflows on a visual canvas. Combine triggers, AI classification nodes, CRM updates, and timed follow-ups without writing a single line of code.",
    bullets: [
      "Drag-and-drop nodes: triggers, AI, send, delay, branch",
      "Color-coded success and fallback paths per node",
      "Live status: see which flows are running and what fired",
      "Template library: pre-built flows for common use cases",
    ],
    align: "left" as const,
    glow: "violet" as const,
    icon: <Zap className="w-5 h-5" />,
    color: "violet" as const,
    mockup: "workflow" as const,
  },
  {
    eyebrow: "Deep Analytics",
    title: <>Performance visibility<br /><span className="text-white/40">across every thread</span></>,
    body: "Track email volume, AI resolution rates, response times, and CSAT across all your teams and workflows. Understand exactly where hours are being spent and where Keystone is creating leverage.",
    bullets: [
      "Real-time dashboard: volume, resolution, response time, CSAT",
      "Agent performance leaderboard with engagement metrics",
      "Weekly digest: what improved, what needs attention",
      "Export to CSV or pipe directly into your BI tool",
    ],
    align: "right" as const,
    glow: "amber" as const,
    icon: <BarChart3 className="w-5 h-5" />,
    color: "amber" as const,
    mockup: "analytics" as const,
  },
  {
    eyebrow: "Integrations",
    title: <>Your entire stack,<br /><span className="text-white/40">one command center</span></>,
    body: "Connect Gmail, Slack, Notion, HubSpot, Salesforce, Linear and 200+ more tools in seconds. Keystone pipes context from every integration back into your priority model — so nothing important gets missed.",
    bullets: [
      "OAuth 2.0 connections — read-only where possible",
      "Bi-directional sync: Keystone reads and writes to CRMs",
      "Zapier and Make connectors for custom automation",
      "All integrations included in $29/mo — no add-on fees",
    ],
    align: "left" as const,
    glow: "teal" as const,
    icon: <Database className="w-5 h-5" />,
    color: "teal" as const,
    mockup: "integrations" as const,
  },
];

const COLOR_ICON: Record<"teal" | "violet" | "amber", string> = {
  teal: "bg-teal-500/10 ring-teal-400/20 text-teal-400",
  violet: "bg-violet-500/10 ring-violet-400/20 text-violet-400",
  amber: "bg-amber-500/10 ring-amber-400/20 text-amber-400",
};

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function ProductPage() {
  return (
    <>
      <GlassNav />
      <main className="flex flex-col bg-black text-white overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
          <div className="aurora-blob aurora-teal" />
          <div className="aurora-blob aurora-violet" />
          <CanvasBackground variant="grid" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Badge variant="ghost" dot>Product deep-dive</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl md:text-[64px] font-bold tracking-tight leading-[1.06] mb-6"
            >
              Built for people who
              <br />
              <span className="liquid-metal">live in their inbox</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed"
            >
              Every feature in Keystone was designed around one principle: you decide what sends, and when. The AI does the cognitive work. You keep total control.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="flex items-center justify-center gap-3"
            >
              <PillButton size="lg" variant="primary">
                Start free trial <ArrowRight className="w-4 h-4" />
              </PillButton>
              <PillButton size="lg" variant="ghost">
                Book a demo
              </PillButton>
            </motion.div>
          </div>
        </section>

        {/* Feature deep-dives */}
        {FEATURE_SECTIONS.map((section, idx) => (
          <DarkSection key={idx} borderTop glowColor={section.glow}>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
                section.align === "left" ? "" : "lg:[&>*:first-child]:order-2"
              }`}
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: section.align === "left" ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant={section.color} dot className="mb-5">
                  {section.eyebrow}
                </Badge>
                <h2 className="text-3xl md:text-[44px] font-bold text-white mb-5 tracking-tight leading-tight">
                  {section.title}
                </h2>
                <p className="text-white/45 leading-relaxed mb-8 max-w-md">{section.body}</p>
                <ul className="space-y-3">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/55">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: section.align === "left" ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {section.mockup === "workflow" ? (
                  <WorkflowCanvas />
                ) : section.mockup === "analytics" ? (
                  <AppFrame title="Keystone Analytics" glow>
                    <AnalyticsMockup />
                  </AppFrame>
                ) : section.mockup === "integrations" ? (
                  <AppFrame title="Keystone Integrations" glow>
                    <IntegrationsMockup />
                  </AppFrame>
                ) : (
                  <GlassCard animate={false} padding="lg">
                    <div
                      className={`w-10 h-10 rounded-[12px] ring-1 flex items-center justify-center mb-5 ${
                        COLOR_ICON[section.color]
                      }`}
                    >
                      {section.icon}
                    </div>
                    <div className="space-y-3">
                      {[
                        { dot: "bg-red-400", text: "Sequoia reply — urgent (draft ready)", score: 94 },
                        { dot: "bg-orange-400", text: "CTO incident report — high priority", score: 76 },
                        { dot: "bg-teal-400", text: "Q4 proposal revisions — medium", score: 55 },
                        { dot: "bg-white/20", text: "Newsletter digest — auto-filed", score: 12 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                            {item.text}
                            <span className="ml-auto text-white/30 shrink-0">{item.score}</span>
                          </div>
                          <div className="h-0.5 bg-white/[0.05] rounded-full ml-3.5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.score}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                              className="h-full rounded-full bg-teal-500/50"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            </div>
          </DarkSection>
        ))}

        {/* Security callout */}
        <DarkSection borderTop glowColor="violet">
          <SectionHeader
            eyebrow="Security & Trust"
            title={<>Built on a foundation<br /><span className="text-white/40">of trust</span></>}
            subtitle="Every architectural decision in Keystone starts with privacy, security, and user control."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Shield className="w-5 h-5 text-teal-400" />,
                title: "SOC 2 Type II",
                body: "Annual third-party audits across security, availability, and confidentiality controls.",
              },
              {
                icon: <Eye className="w-5 h-5 text-violet-400" />,
                title: "Zero auto-send",
                body: "Architecturally impossible to send anything without explicit user approval. Not a setting — a guarantee.",
              },
              {
                icon: <Send className="w-5 h-5 text-amber-400" />,
                title: "Read-only OAuth",
                body: "Gmail connection uses minimal scopes. We request write access only when you initiate a send action.",
              },
              {
                icon: <Clock className="w-5 h-5 text-teal-400" />,
                title: "Data retention controls",
                body: "Set custom retention windows. Request deletion at any time — we purge within 24 hours.",
              },
              {
                icon: <Mail className="w-5 h-5 text-violet-400" />,
                title: "No training on your data",
                body: "Your emails never train shared AI models. Your context stays yours, always.",
              },
              {
                icon: <Calendar className="w-5 h-5 text-amber-400" />,
                title: "GDPR & CCPA ready",
                body: "Full data portability, erasure rights, and processing agreements available for all accounts.",
              },
            ].map((item, i) => (
              <GlassCard key={i} delay={i * 0.08} padding="md">
                <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] ring-1 ring-white/[0.1] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
              </GlassCard>
            ))}
          </div>
        </DarkSection>

        {/* CTA */}
        <DarkSection borderTop>
          <div className="text-center">
            <SectionHeader
              title={<>Ready to take control<br /><span className="text-white/40">of your inbox?</span></>}
              subtitle="Start with a free 14-day trial. No credit card, no commitment, no auto-send."
              className="mb-8"
            />
            <div className="flex items-center justify-center gap-3">
              <PillButton size="lg" variant="primary">
                Start free trial <ArrowRight className="w-4 h-4" />
              </PillButton>
              <PillButton size="lg" variant="ghost">
                Talk to sales
              </PillButton>
            </div>
          </div>
        </DarkSection>
      </main>
    </>
  );
}

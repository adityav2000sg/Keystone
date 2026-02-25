"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Send,
  Zap,
  Star,
  Eye,
  Shield,
  BarChart3,
  Users,
  ChevronDown,
  ChevronUp,
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
// KEYSTONE STAR LOGO
// ─────────────────────────────────────────────────────────────
function KeystoneStar({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <radialGradient id="ks-star-grad" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="55%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      <path
        d="M24 1L27.5 20.5L47 24L27.5 27.5L24 47L20.5 27.5L1 24L20.5 20.5Z"
        fill="url(#ks-star-grad)"
        style={{ filter: "drop-shadow(0 0 10px rgba(45,212,191,0.5))" }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// INBOX DASHBOARD MOCKUP
// ─────────────────────────────────────────────────────────────
function InboxMockup() {
  const threads = [
    {
      name: "Sequoia Capital",
      subject: "Term sheet — Series A ready",
      time: "8:42 AM",
      badge: "Urgent",
      badgeCls: "text-red-400 bg-red-400/10",
      dot: "bg-red-400",
      score: 94,
    },
    {
      name: "CTO · Emma Torres",
      subject: "Production latency spike detected",
      time: "9:11 AM",
      badge: "High",
      badgeCls: "text-orange-400 bg-orange-400/10",
      dot: "bg-orange-400",
      score: 76,
    },
    {
      name: "Maya Patel · Acme",
      subject: "Q4 proposal — final revisions",
      time: "9:35 AM",
      badge: "Medium",
      badgeCls: "text-teal-400 bg-teal-400/10",
      dot: "bg-teal-400",
      score: 55,
    },
    {
      name: "Legal · James Kim",
      subject: "Contract review before Friday",
      time: "10:02 AM",
      badge: "Low",
      badgeCls: "text-white/30 bg-white/5",
      dot: "bg-white/20",
      score: 28,
    },
  ];

  return (
    <div className="bg-[#040408] rounded-b-[20px] overflow-hidden">
      {/* Nav tabs */}
      <div className="flex border-b border-white/[0.06] bg-[#06060e] px-4">
        {["Inbox", "Drafts", "Calendar", "Settings"].map((t, i) => (
          <div
            key={t}
            className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              i === 0
                ? "border-teal-400 text-teal-400"
                : "border-transparent text-white/30"
            }`}
          >
            {t}
          </div>
        ))}
      </div>

      {/* AI summary bar */}
      <div className="px-4 py-2.5 bg-teal-500/5 border-b border-teal-400/10">
        <p className="text-[11px] text-white/60 leading-relaxed">
          <span className="text-teal-400 font-semibold">Keystone:</span>{" "}
          3 threads need your attention. 1 investor reply is urgent — draft ready.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 border-b border-white/[0.04]">
        {[
          { label: "Processed", val: "1,247", delta: "+8%" },
          { label: "AI drafts", val: "31" },
          { label: "Response rate", val: "97%" },
        ].map((s) => (
          <div key={s.label} className="p-3 border-r border-white/[0.04] last:border-0">
            <div className="text-[9px] text-white/30 mb-0.5">{s.label}</div>
            <div className="text-sm font-bold text-white">
              {s.val}{" "}
              {s.delta && (
                <span className="text-[10px] text-teal-400 font-medium">{s.delta}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Email threads */}
      <div className="divide-y divide-white/[0.04]">
        {threads.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.025] transition-colors"
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${t.dot}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-xs font-semibold text-white/90 truncate">{t.name}</span>
                <span className="text-[10px] text-white/30 shrink-0">{t.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] text-white/40 truncate">{t.subject}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${t.badgeCls}`}
                >
                  {t.badge}
                </span>
              </div>
              <div className="h-0.5 w-full bg-white/[0.05] rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.score}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  className="h-full rounded-full bg-teal-500/50"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// METRIC COUNTER
// ─────────────────────────────────────────────────────────────
function MetricCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 1600 / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col gap-1"
    >
      <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-white/40">{label}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-24 pb-0">
      <div className="aurora-blob aurora-teal" />
      <div className="aurora-blob aurora-violet" />
      <CanvasBackground variant="grid" />

      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge variant="teal" dot>
            Now in open beta — 5,000+ teams onboarded
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-5xl md:text-[68px] lg:text-[76px] font-bold tracking-tight leading-[1.06] mb-6 max-w-4xl"
        >
          Your inbox,{" "}
          <span className="liquid-metal">finally under control</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-white/50 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Keystone is your AI command center — reads your inbox, surfaces what&apos;s
          critical, drafts replies that sound like you. Nothing auto-sends. Ever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-14"
        >
          <PillButton size="lg" variant="primary">
            Start free — 14 days <ArrowRight className="w-4 h-4" />
          </PillButton>
          <PillButton size="lg" variant="ghost">
            See how it works
          </PillButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-14 text-white/30 text-xs"
        >
          <span className="flex items-center gap-1.5">
            <span className="flex -space-x-1">
              {["bg-teal-500", "bg-violet-500", "bg-amber-500", "bg-blue-500"].map(
                (c, i) => (
                  <span key={i} className={`w-5 h-5 rounded-full ${c} ring-2 ring-black`} />
                )
              )}
            </span>
            5,000+ professionals
          </span>
          <span className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1">4.9 / 5</span>
          </span>
          <span>SOC 2 compliant · Zero auto-send</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <AppFrame title="Keystone — Inbox Command Center" glow>
            <InboxMockup />
          </AppFrame>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// METRICS
// ─────────────────────────────────────────────────────────────
function MetricsSection() {
  return (
    <DarkSection borderTop glowColor="teal">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <MetricCounter target={5000} suffix="+" label="Active teams" delay={0} />
        <MetricCounter target={97} suffix="%" label="Avg response rate" delay={0.1} />
        <MetricCounter target={60} suffix="%" label="Time saved daily" delay={0.2} />
        <MetricCounter target={14} suffix="s" label="Avg draft time" delay={0.3} />
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      n: "01",
      icon: <Zap className="w-5 h-5 text-teal-400" />,
      title: "Connect in 60 seconds",
      body: "Link Gmail or Outlook with read-only access. Nothing writes without your review.",
      visual: (
        <div className="space-y-2">
          {[
            { label: "Gmail connected", icon: <Mail className="w-3.5 h-3.5" />, done: true },
            { label: "Google Calendar synced", icon: <Calendar className="w-3.5 h-3.5" />, done: true },
            { label: "Slack (optional)", icon: <MessageSquare className="w-3.5 h-3.5" />, done: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] ring-1 ${
                item.done
                  ? "bg-teal-400/[0.07] ring-teal-400/20 text-teal-300"
                  : "bg-white/[0.03] ring-white/[0.08] text-white/30"
              }`}
            >
              <span className={item.done ? "text-teal-400" : "text-white/20"}>
                {item.icon}
              </span>
              <span className="text-xs font-medium flex-1">{item.label}</span>
              {item.done && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />}
            </div>
          ))}
        </div>
      ),
    },
    {
      n: "02",
      icon: <Sparkles className="w-5 h-5 text-violet-400" />,
      title: "AI learns your context",
      body: "Keystone maps your relationships, learns your tone, and calibrates a priority model unique to you.",
      visual: (
        <div className="space-y-2">
          {[
            { label: "Contact graph built", val: "1,247 contacts", done: true },
            { label: "Priority model trained", val: "Learning patterns", done: true },
            { label: "Draft tone calibrated", val: "Matches your voice", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ring-1 ${
                  item.done
                    ? "bg-teal-500/15 ring-teal-400/30"
                    : "bg-white/[0.04] ring-white/[0.08]"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="w-3 h-3 text-teal-400" />
                ) : (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-white/30"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-white/80">{item.label}</div>
                <div className="text-[10px] text-white/35">{item.val}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      n: "03",
      icon: <Eye className="w-5 h-5 text-amber-400" />,
      title: "You always review first",
      body: "AI drafts land in your queue. You review, edit, approve — then send. Total control, architecturally enforced.",
      visual: (
        <div className="space-y-2">
          <div className="bg-white/[0.04] ring-1 ring-white/[0.08] rounded-[12px] p-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-white/90">
                Investor reply — urgent
              </span>
              <span className="text-[10px] text-red-400 font-bold">HIGH</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed mb-2.5">
              &ldquo;Thank you for the updated terms. We&apos;re aligned on valuation and can
              move forward...&rdquo;
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 rounded-[8px] bg-teal-500 text-white text-[11px] font-semibold text-center">
                Review &amp; Send
              </button>
              <button className="flex-1 py-1.5 rounded-[8px] bg-white/[0.06] text-white/40 text-[11px] text-center">
                Edit draft
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/25">
            <Eye className="w-3 h-3" /> You always review before anything sends
          </div>
        </div>
      ),
    },
  ];

  return (
    <DarkSection id="how-it-works" borderTop glowColor="violet">
      <SectionHeader
        eyebrow="How it works"
        title={
          <>
            Up and running in{" "}
            <span className="text-white/40">three steps</span>
          </>
        }
        subtitle="No complex setup. No IT ticket. No training. Just connect and let Keystone handle the cognitive overhead."
        className="mb-16"
      />

      <div className="hidden md:block relative mb-8">
        <div className="absolute top-0 left-[16%] right-[16%] h-px bg-gradient-to-r from-teal-500/15 via-teal-400/50 to-teal-500/15" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((s, i) => (
          <GlassCard key={i} delay={i * 0.12} padding="md">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] ring-1 ring-white/[0.1] flex items-center justify-center">
                {s.icon}
              </div>
              <span className="text-2xl font-bold text-white/10">{s.n}</span>
            </div>
            <div className="mb-5">{s.visual}</div>
            <h3 className="text-white font-bold text-base mb-1.5">{s.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{s.body}</p>
          </GlassCard>
        ))}
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// WORKFLOW CANVAS SECTION
// ─────────────────────────────────────────────────────────────
function WorkflowSection() {
  return (
    <DarkSection id="product" borderTop glowColor="teal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
        <SectionHeader
          eyebrow="Visual Automation"
          title={
            <>
              Build workflows visually,{" "}
              <span className="text-white/40">not in code</span>
            </>
          }
          subtitle="Wire up multi-step automations — email triggers, AI classification, CRM updates, timed follow-ups — with a visual canvas. No engineering required."
          align="left"
        />
        <div className="flex flex-col gap-4">
          {[
            {
              icon: <Zap className="w-4 h-4" />,
              title: "Event-driven triggers",
              body: "New email, inbound chat, or scheduled — start any workflow instantly.",
            },
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: "AI classification nodes",
              body: "Classify intent, extract priority, and route threads with smart logic.",
            },
            {
              icon: <Send className="w-4 h-4" />,
              title: "Controlled sending",
              body: "Every outbound action sits in review before it fires. Always.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-[10px] bg-teal-500/10 ring-1 ring-teal-400/20 flex items-center justify-center shrink-0 text-teal-400 mt-0.5">
                {f.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90 mb-0.5">{f.title}</div>
                <div className="text-sm text-white/40 leading-relaxed">{f.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
      >
        <WorkflowCanvas />
      </motion.div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SMART INBOX SECTION
// ─────────────────────────────────────────────────────────────
function SmartInboxSection() {
  return (
    <DarkSection borderTop glowColor="violet">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="teal" dot className="mb-5">
            Smart Inbox
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            Gmail, Calendar &amp; Slack —
            <br />
            <span className="text-white/40">one command center</span>
          </h2>
          <p className="text-white/45 leading-relaxed mb-8 max-w-md">
            Stop context-switching between six tabs. Keystone surfaces what matters, queues
            what can wait, and silences everything else — all from one interface.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Priority scoring using urgency, context, and relationship depth",
              "AI drafts that match your tone — never generic templates",
              "One-click scheduling that reads your calendar automatically",
              "Slack DMs and email threads unified in a single feed",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/55">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <PillButton variant="primary">
            Start 14-day trial <ArrowRight className="w-4 h-4" />
          </PillButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <AppFrame title="Keystone — Inbox" glow>
            <InboxMockup />
          </AppFrame>
        </motion.div>
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// FEATURES 2×2
// ─────────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      color: "teal" as const,
      title: "AI That Thinks Ahead",
      body: "Keystone reads context across threads, contacts, and calendar — predicting what needs action before you open your inbox.",
      detail: (
        <div className="mt-4 space-y-2">
          {[
            { dot: "bg-red-400", text: "Sequoia reply — urgent (draft ready)" },
            { dot: "bg-teal-400", text: "Team standup prep complete" },
            { dot: "bg-violet-400", text: "14 follow-ups queued for 9 AM" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-white/50">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
              {item.text}
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      color: "violet" as const,
      title: "Zero Auto-Send. Always.",
      body: "Every outbound message requires explicit approval. We built this into the architecture — not just the settings.",
      detail: (
        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-violet-400/[0.07] ring-1 ring-violet-400/15 rounded-[10px]">
          <Eye className="w-3.5 h-3.5 text-violet-400 shrink-0" />
          <span className="text-[11px] text-violet-300">
            You always review before anything sends
          </span>
        </div>
      ),
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      color: "amber" as const,
      title: "Real-Time Analytics",
      body: "Track email volume, response rates, and AI performance. Know exactly where you&apos;re spending hours and what&apos;s moving the needle.",
      detail: (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: "Avg response time", val: "1.4s" },
            { label: "AI resolution", val: "78.2%" },
            { label: "Threads handled", val: "12,847" },
            { label: "CSAT score", val: "4.7 / 5" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.03] ring-1 ring-white/[0.07] rounded-[10px] p-2"
            >
              <div className="text-[9px] text-white/30 mb-0.5">{s.label}</div>
              <div className="text-sm font-bold text-white/90">{s.val}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <Users className="w-5 h-5" />,
      color: "teal" as const,
      title: "200+ Integrations",
      body: "Gmail, Slack, Notion, HubSpot, Salesforce, Linear and more. Keystone speaks every tool your team already uses.",
      detail: (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Gmail", "Slack", "Notion", "HubSpot", "Linear", "Salesforce", "Calendar", "Stripe"].map(
            (app) => (
              <span
                key={app}
                className="text-[10px] px-2 py-1 rounded-full bg-white/[0.05] ring-1 ring-white/[0.08] text-white/50"
              >
                {app}
              </span>
            )
          )}
        </div>
      ),
    },
  ];

  const COLOR_ICON: Record<"teal" | "violet" | "amber", string> = {
    teal: "bg-teal-500/10 ring-teal-400/20 text-teal-400",
    violet: "bg-violet-500/10 ring-violet-400/20 text-violet-400",
    amber: "bg-amber-500/10 ring-amber-400/20 text-amber-400",
  };

  return (
    <DarkSection id="features" borderTop glowColor="teal">
      <SectionHeader
        eyebrow="AI-Driven Features"
        title={
          <>
            Everything your inbox{" "}
            <span className="text-white/40">was missing</span>
          </>
        }
        subtitle="Purpose-built for founders, operators, and anyone who lives in email. Keystone handles cognitive overhead so you focus on work that moves the needle."
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((f, i) => (
          <GlassCard key={i} delay={i * 0.1} padding="lg">
            <div
              className={`w-10 h-10 rounded-[12px] ring-1 flex items-center justify-center mb-5 ${
                COLOR_ICON[f.color]
              }`}
            >
              {f.icon}
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-white/45 text-sm leading-relaxed">{f.body}</p>
            {f.detail}
          </GlassCard>
        ))}
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Keystone cut our response time by 60%. Setup took 3 minutes. We handle twice the volume without the stress.",
      name: "Priya Mehta",
      role: "Head of Growth · Series B startup",
      emoji: "🚀",
    },
    {
      quote:
        "The AI drafts sound exactly like me. Follow-up automation alone boosted our reply rate by 35% with zero extra headcount.",
      name: "Marcus Webb",
      role: "Chief Revenue Officer · Enterprise SaaS",
      emoji: "📈",
    },
    {
      quote:
        "Priority scoring means nothing critical slips. We close deals 2× faster because the right threads get attention at the right time.",
      name: "Amara Collins",
      role: "Founder & CEO · B2B fintech",
      emoji: "⚡",
    },
  ];

  return (
    <DarkSection borderTop glowColor="violet">
      <SectionHeader
        eyebrow="What teams say"
        title={
          <>
            Real results,{" "}
            <span className="text-white/40">real teams</span>
          </>
        }
        className="mb-16"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <GlassCard key={i} delay={i * 0.1} padding="lg">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">{t.emoji}</span>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-violet-700 shrink-0" />
              <div>
                <div className="text-white text-sm font-semibold">{t.name}</div>
                <div className="text-white/35 text-xs">{t.role}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────
function PricingSection() {
  const ksFeatures = [
    "Available 24/7 — monitors inbox, calendar & Slack continuously",
    "AI drafts that match your exact tone and communication style",
    "Priority scoring by urgency, context, and relationship depth",
    "Gmail, Calendar & Slack synced in under 60 seconds",
    "SOC 2 compliant — no human ever reads your emails",
    "One-click scheduling reads your calendar automatically",
    "200+ integrations: HubSpot, Notion, Linear, Salesforce",
    "Start immediately — no interviews or onboarding lag",
    "Cancel anytime — no contracts, no exit interviews",
    "$29/month flat — all features, no hidden tiers",
  ];
  const eaProblems = [
    "Works office hours only — misses urgent after-hours threads",
    "Every draft needs review cycles before it sounds right",
    "Weeks of context-building before delivering real value",
    "Separate tools for email, scheduling, and contact intelligence",
    "Data privacy depends on one person's discretion",
    "Calendar conflicts require manual back-and-forth coordination",
    "Limited integrations — still requires manual copy-paste",
    "4–8 weeks to hire, vet, and onboard before impact starts",
    "HR processes, transition plans, notice periods required",
    "$4K–$8K/month plus benefits, equipment, and software",
  ];

  return (
    <DarkSection id="pricing" borderTop glowColor="teal">
      <SectionHeader
        eyebrow="Pricing"
        title="One flat rate. No surprises."
        subtitle="Get the full power of an AI command center at a fraction of the cost."
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {/* Keystone column */}
        <div className="bg-white/[0.03] ring-2 ring-teal-400/30 rounded-[16px] overflow-hidden">
          <div className="px-6 py-5 border-b border-teal-400/15 bg-teal-500/5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-white font-bold">Keystone AI</span>
            </div>
            <div className="text-4xl font-black text-white">
              $29
              <span className="text-white/40 text-base font-normal">/mo</span>
            </div>
            <div className="text-xs text-teal-400 mt-1">
              14-day free trial · No credit card
            </div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {ksFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-sm text-white/70 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
          <div className="p-5 border-t border-teal-400/10">
            <PillButton variant="primary" size="lg" className="w-full justify-center">
              Start free trial <ArrowRight className="w-4 h-4" />
            </PillButton>
          </div>
        </div>

        {/* EA column */}
        <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-[16px] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.05] text-center">
            <div className="text-white/40 font-bold mb-2">Traditional EA</div>
            <div className="text-4xl font-black text-white/25">
              $4K–8K
              <span className="text-white/20 text-base font-normal">/mo</span>
            </div>
            <div className="text-xs text-white/25 mt-1">Plus benefits &amp; overhead</div>
          </div>
          <ul className="divide-y divide-white/[0.03]">
            {eaProblems.map((f, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3">
                <XCircle className="w-4 h-4 text-red-500/40 shrink-0 mt-0.5" />
                <span className="text-sm text-white/30 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Does Keystone ever send emails automatically?",
    a: "Never. This is a hard architectural constraint — not just a setting. Every outbound message requires your explicit approval before it sends. We built it this way intentionally.",
  },
  {
    q: "What email clients does Keystone support?",
    a: "Gmail and Google Workspace are fully supported. Outlook / Microsoft 365 is in private beta. We're expanding throughout 2026.",
  },
  {
    q: "Is my email data private and secure?",
    a: "Keystone is SOC 2 Type II compliant. We use read-only OAuth scopes, encrypt all data at rest and in transit, and no human on our team ever reads your emails.",
  },
  {
    q: "How long does setup take?",
    a: "Under 60 seconds to connect. Keystone starts surfacing priorities immediately. The AI calibrates its model over the first few days as it learns your patterns.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — no contracts, no notice periods, no exit interviews. Cancel from settings at any time and you won't be charged again.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <DarkSection id="faq" borderTop glowColor="violet">
      <SectionHeader eyebrow="FAQ" title="Common questions" className="mb-12" />

      <div className="max-w-2xl mx-auto space-y-2">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className="bg-white/[0.03] ring-1 ring-white/[0.08] rounded-[14px] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="text-sm font-semibold text-white/85">{item.q}</span>
              {openIdx === i ? (
                <ChevronUp className="w-4 h-4 text-white/30 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 text-sm text-white/45 leading-relaxed border-t border-white/[0.05] pt-3">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <DarkSection borderTop>
      <div className="relative rounded-[24px] bg-white/[0.03] ring-1 ring-white/[0.09] overflow-hidden py-20 px-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(45,212,191,0.09)_0%,transparent_70%)] pointer-events-none" />
        <CanvasBackground variant="dots" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-6">
            <KeystoneStar size={52} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 leading-tight tracking-tight">
            Take back your focus.
            <br />
            <span className="text-white/40">Start free today.</span>
          </h2>
          <p className="text-white/45 max-w-md mx-auto mb-8 leading-relaxed">
            14-day free trial. No credit card. No auto-send. Just a command center that
            makes your inbox feel manageable again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PillButton size="lg" variant="primary">
              Start free trial <ArrowRight className="w-4 h-4" />
            </PillButton>
            <PillButton size="lg" variant="ghost">
              Book a live demo
            </PillButton>
          </div>
          <p className="text-white/25 text-xs mt-6">
            Trusted by 5,000+ founders, operators, and growth teams.
          </p>
        </motion.div>
      </div>
    </DarkSection>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-8 px-6 md:px-10 bg-black">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-[8px] bg-teal-500/20 ring-1 ring-teal-400/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <span className="font-bold text-white/90">Keystone</span>
          </div>
          <p className="text-white/35 text-sm max-w-xs leading-relaxed mb-5">
            AI command center for your inbox and calendar. Nothing auto-sends. Total
            clarity, total control.
          </p>
          <div className="text-xs text-white/20">© 2026 Keystone. All rights reserved.</div>
        </div>

        {[
          {
            title: "Product",
            links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
          },
          {
            title: "Company",
            links: ["About", "Blog", "Privacy Policy", "Terms of Service", "Security"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-white/80 font-semibold mb-4 text-sm">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/35 hover:text-white/70 transition-colors text-sm"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/[0.04] text-white/20 text-xs gap-3">
        <p>Made with care in San Francisco</p>
        <p className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-teal-500 text-teal-500" /> SOC 2 · GDPR ·
          Zero auto-send
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <GlassNav />
      <main className="flex flex-col bg-black text-white overflow-x-hidden">
        <HeroSection />
        <MetricsSection />
        <HowItWorksSection />
        <WorkflowSection />
        <SmartInboxSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}

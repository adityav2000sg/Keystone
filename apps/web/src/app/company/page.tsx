"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Eye, Users, Star } from "lucide-react";
import {
  GlassNav,
  DarkSection,
  GlassCard,
  PillButton,
  Badge,
  SectionHeader,
  CanvasBackground,
} from "@/components/keystone";

// ─────────────────────────────────────────────────────────────
// TEAM
// ─────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Aisha Okafor",
    role: "Co-founder & CEO",
    bio: "Former Head of Product at two Series B startups. Spent 6 years buried in email before deciding to build her way out.",
    gradient: "from-teal-600 to-violet-700",
  },
  {
    name: "Lucas Reyes",
    role: "Co-founder & CTO",
    bio: "Built large-scale NLP systems at a major research lab. Obsessed with making AI feel human without removing humans from the loop.",
    gradient: "from-violet-600 to-blue-700",
  },
  {
    name: "Nadia Kim",
    role: "Head of Design",
    bio: "Designed products used by 50M+ people. Believes the best interface is one that disappears — Keystone earns your trust by staying invisible.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Omar Hassan",
    role: "Head of Engineering",
    bio: "Infrastructure engineer who has scaled systems to millions of users. Architected the zero auto-send guarantee from the ground up.",
    gradient: "from-teal-700 to-emerald-600",
  },
  {
    name: "Priya Sundaram",
    role: "Head of Growth",
    bio: "Led growth at three startups, two acquisitions. Uses Keystone every day and writes the changelog herself.",
    gradient: "from-violet-700 to-pink-600",
  },
  {
    name: "James Whitfield",
    role: "Head of Security",
    bio: "Previously led security at a Fortune 500. Owns the SOC 2 program and reviews every data-access pattern before it ships.",
    gradient: "from-slate-600 to-slate-800",
  },
];

// ─────────────────────────────────────────────────────────────
// VALUES
// ─────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: <Eye className="w-5 h-5 text-teal-400" />,
    title: "You decide what sends",
    body: "We built zero auto-send as an architectural constraint, not a checkbox. The AI assists. You remain in control. This is non-negotiable.",
  },
  {
    icon: <Shield className="w-5 h-5 text-violet-400" />,
    title: "Privacy is the default",
    body: "Read-only access where possible, minimal scopes, no training on your data, full deletion on request. We don't make trade-offs with trust.",
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    title: "Speed compounds",
    body: "A 10-second improvement per email, 50 times a day, is 8 hours returned each month. We obsess over the marginal performance gains others ignore.",
  },
  {
    icon: <Users className="w-5 h-5 text-teal-400" />,
    title: "Ship to learn, not to ship",
    body: "Every feature in Keystone was born from direct user conversations. We don't build roadmaps in a vacuum — we build what we hear is missing.",
  },
];

// ─────────────────────────────────────────────────────────────
// MILESTONES
// ─────────────────────────────────────────────────────────────
const MILESTONES = [
  { year: "2024 Q1", event: "Idea formed: what if your inbox could think?" },
  { year: "2024 Q3", event: "First 100 beta users. Response: 'This is what Gmail should have been.'" },
  { year: "2024 Q4", event: "Seed round closed. Team of 6 assembled. SOC 2 audit started." },
  { year: "2025 Q2", event: "Workflow canvas launched. 1,000 teams onboarded." },
  { year: "2025 Q4", event: "Slack & Calendar sync shipped. Series A closed." },
  { year: "2026 Q1", event: "Open beta. 5,000+ teams. $29/mo pricing goes live." },
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function CompanyPage() {
  return (
    <>
      <GlassNav />
      <main className="flex flex-col bg-black text-white overflow-x-hidden">

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-black">
          <div className="aurora-blob aurora-teal" />
          <div className="aurora-blob aurora-violet" />
          <CanvasBackground variant="grid" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Badge variant="ghost" dot>Our story</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl md:text-[64px] font-bold tracking-tight leading-[1.06] mb-6 max-w-4xl mx-auto"
            >
              We built the inbox tool
              <br />
              <span className="liquid-metal">we needed ourselves</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Keystone started with a simple observation: knowledge workers spend 28% of their week on email — most of it low-value. We built an AI that handles the overhead without removing humans from the decisions that matter.
            </motion.p>
          </div>
        </section>

        {/* Manifesto */}
        <DarkSection borderTop glowColor="teal">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="Our Manifesto"
              title={<>Email should be a tool,<br /><span className="text-white/40">not a trap</span></>}
              align="left"
              className="mb-10"
            />
            <div className="space-y-6 text-white/55 leading-[1.8] text-base">
              <p>
                The average knowledge worker receives 121 emails per day. They spend 28% of
                their week reading and responding to them. A significant portion of that time
                is spent on messages that could have been triaged, replied to, or filed
                automatically — if only there were an intelligent system doing the work.
              </p>
              <p>
                We built Keystone because the tools available today — email clients, smart
                inboxes, AI writing assistants — all treat the symptom without addressing
                the cause. The cause is that humans are doing work machines should handle,
                and machines are being given decisions that humans should make.
              </p>
              <p>
                Keystone inverts this. The AI handles priority scoring, context understanding,
                draft generation, and schedule optimization. You handle the decisions:
                what to send, when to respond, and what to ignore. Nothing leaves your
                outbox without your explicit approval. This is not a setting. It is the
                architecture.
              </p>
              <p>
                We believe the best productivity tool is one you trust completely — and that
                trust is earned through radical transparency, minimal permissions, and the
                consistent delivery of the right information at the right time.
              </p>
              <p className="text-white/80 font-semibold">
                That&apos;s what we&apos;re building. Not a smarter inbox. A command center.
              </p>
            </div>
          </div>
        </DarkSection>

        {/* Values */}
        <DarkSection borderTop glowColor="violet">
          <SectionHeader
            eyebrow="How we work"
            title={<>Four values that<br /><span className="text-white/40">drive every decision</span></>}
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <GlassCard key={i} delay={i * 0.1} padding="lg">
                <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] ring-1 ring-white/[0.1] flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.body}</p>
              </GlassCard>
            ))}
          </div>
        </DarkSection>

        {/* Timeline */}
        <DarkSection borderTop glowColor="teal">
          <SectionHeader
            eyebrow="History"
            title={<>From idea to<br /><span className="text-white/40">5,000 teams</span></>}
            className="mb-14"
          />

          <div className="max-w-2xl mx-auto">
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/[0.08]" />

              {MILESTONES.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-black" />
                  <div className="text-[11px] font-bold text-teal-400 mb-1 uppercase tracking-widest">
                    {m.year}
                  </div>
                  <div className="text-white/70 text-sm leading-relaxed">{m.event}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </DarkSection>

        {/* Team */}
        <DarkSection borderTop glowColor="violet">
          <SectionHeader
            eyebrow="The team"
            title={<>The people behind<br /><span className="text-white/40">Keystone</span></>}
            subtitle="Six people obsessed with reclaiming the hours knowledge workers lose to email every week."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <GlassCard key={i} delay={i * 0.08} padding="md">
                <div
                  className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${member.gradient} mb-4`}
                />
                <h3 className="text-white font-bold text-sm mb-0.5">{member.name}</h3>
                <div className="text-teal-400 text-xs font-semibold mb-3">{member.role}</div>
                <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
              </GlassCard>
            ))}
          </div>
        </DarkSection>

        {/* Investors / trust */}
        <DarkSection borderTop>
          <div className="text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-6">
              Trusted by professionals at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {["Sequoia", "Andreessen", "McKinsey", "Harvard", "HubSpot", "Salesforce"].map(
                (name) => (
                  <span key={name} className="text-white/20 text-sm font-semibold">
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </DarkSection>

        {/* CTA */}
        <DarkSection borderTop glowColor="teal">
          <div className="relative rounded-[24px] bg-white/[0.03] ring-1 ring-white/[0.09] overflow-hidden py-16 px-8 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(45,212,191,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-center gap-0.5 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                Come build with us.
              </h2>
              <p className="text-white/45 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                We&apos;re a small team with big ambitions. If you believe email is broken and know how to fix it, we want to hear from you.
              </p>
              <div className="flex items-center justify-center gap-3">
                <PillButton variant="primary">
                  See open roles <ArrowRight className="w-4 h-4" />
                </PillButton>
                <PillButton variant="ghost">Get in touch</PillButton>
              </div>
            </div>
          </div>
        </DarkSection>
      </main>
    </>
  );
}

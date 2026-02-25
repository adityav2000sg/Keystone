"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
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
// PLANS
// ─────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    tagline: "14-day trial, no card required",
    cta: "Start free",
    highlighted: false,
    features: [
      "Gmail connection (read-only)",
      "AI priority scoring — up to 500 threads/mo",
      "5 AI drafts per day",
      "Basic inbox summary",
      "Email support",
    ],
    limits: [
      "No workflow canvas",
      "No Slack or Calendar sync",
      "No analytics dashboard",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    tagline: "Everything. No tiers, no limits.",
    cta: "Start free trial",
    highlighted: true,
    features: [
      "Gmail + Outlook (read/write)",
      "Unlimited AI priority scoring",
      "Unlimited AI drafts",
      "Google Calendar & Slack sync",
      "Visual workflow canvas",
      "200+ integrations",
      "Real-time analytics dashboard",
      "Contact relationship graph",
      "Priority phone & chat support",
      "SOC 2 compliant",
    ],
    limits: [],
  },
  {
    name: "Team",
    price: "$79",
    period: "/mo per seat",
    tagline: "For ops teams handling shared inboxes",
    cta: "Contact sales",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Shared team inbox view",
      "Role-based access control",
      "Centralized analytics across seats",
      "Team workflow templates",
      "Dedicated onboarding call",
      "SLA-backed support",
      "Custom data retention policies",
    ],
    limits: [],
  },
];

// ─────────────────────────────────────────────────────────────
// COMPARISON TABLE
// ─────────────────────────────────────────────────────────────
const COMPARISON_ROWS = [
  { feature: "AI priority scoring", starter: true, pro: true, team: true },
  { feature: "AI draft generation", starter: "5/day", pro: "Unlimited", team: "Unlimited" },
  { feature: "Gmail connection", starter: true, pro: true, team: true },
  { feature: "Outlook / Microsoft 365", starter: false, pro: true, team: true },
  { feature: "Google Calendar sync", starter: false, pro: true, team: true },
  { feature: "Slack integration", starter: false, pro: true, team: true },
  { feature: "Visual workflow canvas", starter: false, pro: true, team: true },
  { feature: "200+ integrations", starter: false, pro: true, team: true },
  { feature: "Analytics dashboard", starter: false, pro: true, team: true },
  { feature: "Shared team inbox", starter: false, pro: false, team: true },
  { feature: "Role-based access", starter: false, pro: false, team: true },
  { feature: "Custom data retention", starter: false, pro: false, team: true },
  { feature: "SOC 2 compliant", starter: true, pro: true, team: true },
  { feature: "Zero auto-send guarantee", starter: true, pro: true, team: true },
];

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <CheckCircle2 className="w-4 h-4 text-teal-400 mx-auto" />;
  if (val === false) return <XCircle className="w-4 h-4 text-white/15 mx-auto" />;
  return <span className="text-xs text-white/70 font-medium">{val}</span>;
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "Is there a free plan?",
    a: "We offer a 14-day free trial with full Pro access — no credit card required. After the trial, you can continue on the free Starter tier or upgrade to Pro at $29/mo.",
  },
  {
    q: "What happens after the 14-day trial?",
    a: "You'll be prompted to choose a plan. If you do nothing, you'll automatically move to the free Starter tier. No charges without your explicit action.",
  },
  {
    q: "Can I change plans anytime?",
    a: "Yes. Upgrade or downgrade instantly from your account settings. Upgrades are prorated; downgrades take effect at the next billing cycle.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes — annual billing saves 20% (Pro at $23/mo, Team at $63/seat/mo). Switch to annual from your billing settings at any time.",
  },
  {
    q: "What's included in the free Starter plan?",
    a: "Starter includes Gmail read access, priority scoring for up to 500 threads/month, and 5 AI drafts per day. It's useful for evaluating whether Keystone fits your workflow.",
  },
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <GlassNav />
      <main className="flex flex-col bg-black text-white overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-black text-center">
          <div className="aurora-blob aurora-teal" />
          <div className="aurora-blob aurora-violet" />
          <CanvasBackground variant="dots" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Badge variant="ghost" dot>Simple pricing</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl md:text-[64px] font-bold tracking-tight leading-[1.06] mb-4"
            >
              One price.{" "}
              <span className="liquid-metal">Everything included.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="text-white/50 text-lg max-w-md mx-auto mb-10"
            >
              No feature tiers, no per-seat nonsense on Pro. Start free for 14 days, then $29/mo for everything.
            </motion.p>

            {/* Billing toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="inline-flex items-center gap-1 p-1 rounded-[12px] bg-white/[0.05] ring-1 ring-white/[0.08] mb-14"
            >
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 rounded-[10px] text-sm font-semibold transition-all duration-200 ${
                    billing === b
                      ? "bg-white/10 text-white ring-1 ring-white/15"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {b === "monthly" ? "Monthly" : "Annual"}
                  {b === "annual" && (
                    <span className="ml-1.5 text-[10px] font-bold text-teal-400">-20%</span>
                  )}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <DarkSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[16px] overflow-hidden flex flex-col ${
                  plan.highlighted
                    ? "ring-2 ring-teal-400/40 bg-white/[0.04]"
                    : "ring-1 ring-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-teal-500/15 border-b border-teal-400/20 px-5 py-2 text-center">
                    <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-3">
                    {plan.highlighted && (
                      <Sparkles className="w-4 h-4 text-teal-400" />
                    )}
                    <span className="font-bold text-white">{plan.name}</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-0.5">
                    {billing === "annual" && plan.price !== "$0"
                      ? plan.name === "Pro" ? "$23" : "$63"
                      : plan.price}
                    <span className="text-white/35 text-base font-normal">{plan.period}</span>
                  </div>
                  {billing === "annual" && plan.price !== "$0" && (
                    <div className="text-[11px] text-white/30 mb-1">
                      Billed annually (
                      {plan.name === "Pro" ? "$276" : "$756"}/yr)
                    </div>
                  )}
                  <div className="text-xs text-white/40 mt-1">{plan.tagline}</div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                    {plan.limits.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/25">
                        <XCircle className="w-4 h-4 text-white/15 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <PillButton
                      variant={plan.highlighted ? "primary" : "ghost"}
                      className="w-full justify-center"
                      size="md"
                    >
                      {plan.cta}{" "}
                      {plan.highlighted && <ArrowRight className="w-4 h-4" />}
                    </PillButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/25 text-xs mt-6">
            All plans include zero auto-send guarantee, SOC 2 compliance, and cancel-anytime.
          </p>
        </DarkSection>

        {/* Comparison table */}
        <DarkSection borderTop glowColor="teal">
          <SectionHeader
            eyebrow="Compare plans"
            title={<>Full feature<br /><span className="text-white/40">comparison</span></>}
            className="mb-12"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 pr-6 text-sm font-semibold text-white/50 w-1/2">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.name}
                      className={`py-3 text-center text-sm font-semibold ${
                        p.highlighted ? "text-teal-400" : "text-white/50"
                      }`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/[0.05] ${
                      i % 2 === 0 ? "" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="py-3 pr-6 text-sm text-white/60">{row.feature}</td>
                    <td className="py-3 text-center">
                      <CellValue val={row.starter} />
                    </td>
                    <td className="py-3 text-center">
                      <CellValue val={row.pro} />
                    </td>
                    <td className="py-3 text-center">
                      <CellValue val={row.team} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DarkSection>

        {/* Enterprise callout */}
        <DarkSection borderTop glowColor="violet">
          <GlassCard animate padding="lg" className="max-w-2xl mx-auto text-center">
            <div className="w-10 h-10 rounded-[12px] bg-violet-500/10 ring-1 ring-violet-400/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Need an enterprise plan?</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              We offer custom contracts for teams with 25+ seats, SAML SSO, custom SLAs, on-premise deployment, and dedicated engineering support.
            </p>
            <div className="flex items-center justify-center gap-3">
              <PillButton variant="primary">
                Talk to sales <ArrowRight className="w-4 h-4" />
              </PillButton>
              <PillButton variant="ghost">Book a call</PillButton>
            </div>
          </GlassCard>
        </DarkSection>

        {/* FAQ */}
        <DarkSection borderTop glowColor="teal">
          <SectionHeader
            eyebrow="Pricing FAQ"
            title="Questions about billing"
            className="mb-12"
          />

          <div className="max-w-2xl mx-auto space-y-2">
            {FAQ.map((item, i) => (
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
                      transition={{ duration: 0.2 }}
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
      </main>
    </>
  );
}

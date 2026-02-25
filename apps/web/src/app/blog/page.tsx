"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
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
// POSTS
// ─────────────────────────────────────────────────────────────
const POSTS = [
  {
    slug: "why-zero-auto-send",
    tag: "Philosophy",
    tagVariant: "violet" as const,
    title: "Why we made zero auto-send an architectural guarantee, not a setting",
    excerpt:
      "Every AI email tool promises you'll stay in control. Most don't mean it. Here's why we built the constraint into the system rather than the preferences panel.",
    readTime: "5 min",
    date: "Feb 18, 2026",
    featured: true,
  },
  {
    slug: "inbox-zero-myth",
    tag: "Productivity",
    tagVariant: "teal" as const,
    title: "Inbox zero is the wrong goal. Here's what to optimize for instead.",
    excerpt:
      "The obsession with empty inboxes has produced a generation of productivity theater. We built Keystone around a different north star: decision clarity.",
    readTime: "7 min",
    date: "Feb 10, 2026",
    featured: false,
  },
  {
    slug: "ai-draft-tone-matching",
    tag: "Engineering",
    tagVariant: "amber" as const,
    title: "How we trained Keystone's drafting model to match your exact tone",
    excerpt:
      "Generic AI replies are easy to spot — and easy to delete. This is the technical story of how we built per-user tone calibration without training on your private data.",
    readTime: "9 min",
    date: "Jan 28, 2026",
    featured: false,
  },
  {
    slug: "priority-scoring-model",
    tag: "Engineering",
    tagVariant: "amber" as const,
    title: "Inside Keystone's priority scoring model",
    excerpt:
      "A deep dive into the signals, weights, and feedback loops that power our 0–100 priority score — and how it gets smarter every time you use it.",
    readTime: "11 min",
    date: "Jan 14, 2026",
    featured: false,
  },
  {
    slug: "soc2-journey",
    tag: "Security",
    tagVariant: "ghost" as const,
    title: "What SOC 2 Type II actually means for your email data",
    excerpt:
      "We completed our SOC 2 Type II audit last quarter. Here's a plain-English breakdown of what that means, what it doesn't mean, and why we think it matters.",
    readTime: "6 min",
    date: "Dec 20, 2025",
    featured: false,
  },
  {
    slug: "workflow-canvas-design",
    tag: "Product",
    tagVariant: "teal" as const,
    title: "Designing the workflow canvas: trading power for clarity",
    excerpt:
      "Building a visual workflow editor for non-technical users is a challenge of reduction. Here's every design decision we made — and the ones we reversed.",
    readTime: "8 min",
    date: "Dec 5, 2025",
    featured: false,
  },
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <>
      <GlassNav />
      <main className="flex flex-col bg-black text-white overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-black">
          <div className="aurora-blob aurora-teal" />
          <CanvasBackground variant="dots" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Badge variant="ghost" dot>Keystone Journal</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl md:text-[60px] font-bold tracking-tight leading-[1.06] mb-4"
            >
              Ideas on productivity,
              <br />
              <span className="text-white/40">AI, and how we work</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/45 max-w-md mx-auto text-base"
            >
              Engineering deep dives, product philosophy, and honest writing about building AI tools that respect your time.
            </motion.p>
          </div>
        </section>

        <DarkSection>
          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="block group mb-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] ring-1 ring-white/[0.09] rounded-[20px] p-8 md:p-10 hover:ring-white/[0.16] hover:bg-white/[0.05] transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Badge variant={featured.tagVariant} size="sm">{featured.tag}</Badge>
                  <span className="text-white/25 text-xs">Featured</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-teal-200 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/50 leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-white/30 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </div>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1 text-teal-400 group-hover:gap-2 transition-all ml-auto">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <GlassCard delay={i * 0.08} padding="md" className="h-full flex flex-col hover:ring-white/[0.16]">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={post.tagVariant} size="sm">{post.tag}</Badge>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-teal-200 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-white/25 text-xs pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <span>{post.date}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </DarkSection>

        {/* Newsletter */}
        <DarkSection borderTop glowColor="teal">
          <div className="text-center max-w-lg mx-auto">
            <SectionHeader
              eyebrow="Stay updated"
              title={<>New posts,<br /><span className="text-white/40">no noise</span></>}
              subtitle="We publish roughly twice a month. Engineering deep dives, product decisions, and honest writing about AI and productivity."
              className="mb-8"
            />
            <div className="flex items-center gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-4 py-2.5 rounded-[12px] bg-white/[0.05] ring-1 ring-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-teal-400/30"
              />
              <PillButton variant="primary" size="sm">
                Subscribe
              </PillButton>
            </div>
            <p className="text-white/20 text-xs mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </DarkSection>
      </main>
    </>
  );
}

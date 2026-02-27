'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileText,
  Layers3,
  Mail,
  Shield,
  Sparkles,
  X,
} from 'lucide-react';

// ─── Easing ────────────────────────────────────────────────────────────────────
const E_OUT:    [number, number, number, number] = [0.22, 1, 0.36, 1];
const E_SMOOTH: [number, number, number, number] = [0.16, 1, 0.30, 1];
const E_SWIFT:  [number, number, number, number] = [0.33, 1, 0.68, 1];

// ─── Data ──────────────────────────────────────────────────────────────────────
const painSignals = [
  { text: 'Teams spend too much time on repetitive tasks.',     pos: 'left-[5%] top-[14%]'    },
  { text: 'Leads slip away without consistent follow-up.',      pos: 'right-[7%] top-[21%]'   },
  { text: 'Scattered tools create blind spots and delays.',     pos: 'left-[10%] bottom-[23%]' },
  { text: 'Meetings happen before context is assembled.',       pos: 'right-[12%] bottom-[31%]'},
  { text: 'Important decisions get buried in recency.',         pos: 'left-[23%] top-[37%]'   },
  { text: 'Reactive work keeps replacing deliberate work.',     pos: 'right-[23%] top-[57%]'  },
];

const features = [
  { title: 'Daily Command Center', body: 'A single surface for today\'s priorities, meetings, open loops, and follow-through.',                              icon: Layers3     },
  { title: 'Inbox Triage',         body: 'Convert recency-driven inbox chaos into ranked actions and cleaner execution paths.',                              icon: Mail        },
  { title: 'Meeting Briefing',     body: 'Arrive prepared with context, history, stakeholders, decisions, and risk signals.',                               icon: CalendarDays},
  { title: 'Follow-up Tracking',   body: 'Keep promises visible after the meeting ends so important threads do not die quietly.',                           icon: Clock3      },
  { title: 'Decision Capture',     body: 'Track what changed, what was decided, and what must happen next.',                                               icon: FileText    },
  { title: 'Trust & Control',      body: 'Draft-first behavior, approvals, and oversight for high-context, high-stakes work.',                             icon: Shield      },
];

const processSteps = [
  { idx: '01', title: 'Discover', shape: 'discover', body: 'Keystone pulls the day into one live field of view so you can spot pressure, momentum, and hidden risk instantly.'                                      },
  { idx: '02', title: 'Plan',     shape: 'plan',     body: 'It ranks what matters using timing, relationships, decision state, and execution weight — not noise.'                                                 },
  { idx: '03', title: 'Build',    shape: 'build',    body: 'Before important moments, Keystone assembles briefs, talking points, past context, and the right next moves.'                                        },
  { idx: '04', title: 'Move',     shape: 'move',     body: 'After every meeting or thread, execution stays visible through summaries, responsibilities, and follow-through.' },
];

const compareKeystone = ['One place for priorities', 'Grounded in real context', 'Briefs before you ask', 'Follow-ups that stay alive', 'Execution over chatbot theater', 'Trust, control, and review'];
const compareOther    = ['Scattered across tools',   'Thin summaries with no depth', 'Reactive instead of proactive', 'Easy to forget what matters', 'Feels like another AI tab', 'Weak control over actions'];

const scenarios = [
  { title: 'Before an investor meeting', body: 'Get a one-screen brief with thread history, stakeholder context, open questions, and the smartest next move.',  metric: '7 min saved'       },
  { title: 'After a sales call',         body: 'Capture decisions, owners, and follow-ups before the context evaporates across tools.',                          metric: '3× cleaner follow-up'},
  { title: 'Start of day',              body: 'Begin with the few actions that will change the day instead of drowning in recency.',                             metric: 'Focus first'       },
];

const plans = [
  { name: 'Personal',  price: '$24',    desc: 'For individual operators who want daily clarity.',                                  features: ['Daily briefing','Inbox triage','Meeting prep','Decision log']                                                              },
  { name: 'Pro',       price: '$59',    desc: 'For founders and high-leverage operators running fast teams.',                      features: ['Everything in Personal','Priority intelligence','Relationship memory','Follow-up tracking'], featured: true               },
  { name: 'Executive', price: 'Custom', desc: 'For leadership teams that need approvals and shared execution.',                    features: ['Shared team views','Review workflows','Admin controls','White-glove onboarding']                                          },
];

const faqs = [
  { q: 'Does Keystone act automatically?',               a: 'Keystone is built around trust. Teams can keep it draft-first, require approvals, or selectively enable actions where it makes sense.'                         },
  { q: 'Who is it for?',                                 a: 'Founders, executives, chiefs of staff, operators, and teams handling high-context work across email, meetings, and execution.'                                    },
  { q: 'What makes it different from a generic assistant?', a: 'Keystone is designed for prioritization and follow-through. It focuses on what matters, why it matters, and what should happen next.'                       },
  { q: 'Can teams use it together?',                     a: 'Yes. Shared views, approvals, and visibility can be layered in for collaborative execution.'                                                                       },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const Container = React.forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className = '', children }, ref) => (
    <div ref={ref} className={cn('mx-auto w-full max-w-[1440px]', className)}>{children}</div>
  )
);
Container.displayName = 'Container';

function SectionWrap({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn('px-5 md:px-8 lg:px-12', className)}>{children}</section>;
}

// ─── SVG Primitives ────────────────────────────────────────────────────────────
function HatchDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="5" y2="0" stroke="#BEBEBE" strokeWidth="0.85" />
      </pattern>
    </defs>
  );
}

// ─── HERO ASSET ────────────────────────────────────────────────────────────────
// Two interlocking isometric rectangular rings
function HeroLinkAsset() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[480px] w-full items-center justify-center md:h-[600px]">
      {/* Ambient glow */}
      <motion.div
        animate={reduce ? undefined : { opacity: [0.14, 0.28, 0.14], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.20),rgba(152,254,0,0.04)_52%,transparent_78%)] blur-3xl"
      />
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full max-w-[620px]"
      >
        <svg viewBox="0 0 620 420" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.09)]">
          <HatchDefs id="hero-hatch" />
          {/* ── BACK RING (upper-right) ── */}
          {/* Depth / side face of back ring */}
          <path d="M310 80 L540 80 Q570 80 570 108 L570 108 L570 132 Q570 160 540 160 L536 160 L536 185 Q566 185 566 157 L566 108 Q566 55 538 55 L312 55 Q282 55 280 83 L280 83 L280 108 L306 108 Q310 108 310 80Z"
            fill="url(#hero-hatch)" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Top face of back ring - outer */}
          <path d="M312 55 L538 55 Q570 55 570 83 L570 108 Q570 135 538 135 L530 135 L530 110 L538 110 Q545 110 545 100 L545 83 Q545 77 538 77 L316 77 Q307 77 307 84 L307 108 L280 108 L280 83 Q280 55 312 55Z"
            fill="#FAFAFA" stroke="#121212" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Top face of back ring - inner gap */}
          <path d="M335 77 L515 77 Q530 77 530 92 L530 110 L505 110 L505 98 Q505 98 505 98 L338 98 Q332 98 332 105 L332 120 L307 120 L307 105 Q307 77 335 77Z"
            fill="#EDEDED" stroke="#121212" strokeWidth="1.3" strokeLinejoin="round" />

          {/* ── FRONT RING (lower-left) ── */}
          {/* Bottom depth face */}
          <path d="M82 222 L82 258 Q82 290 112 290 L380 290 Q410 290 410 258 L410 258 L410 222 L384 222 L384 258 Q384 264 376 264 L116 264 Q110 264 110 258 L110 222Z"
            fill="url(#hero-hatch)" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Top face of front ring - outer */}
          <path d="M112 170 L376 170 Q410 170 410 200 L410 222 L384 222 L384 200 Q384 194 376 194 L116 194 Q110 194 110 200 L110 222 L82 222 L82 200 Q82 170 112 170Z"
            fill="#FAFAFA" stroke="#121212" strokeWidth="1.7" strokeLinejoin="round" />
          {/* Inner hole of front ring */}
          <path d="M138 194 L350 194 Q374 194 374 218 L374 240 Q374 260 350 260 L138 260 Q114 260 114 238 L114 218 Q114 194 138 194Z"
            fill="#EDEDED" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
          {/* Overlap connector (visual interlocking hint at crossing) */}
          <path d="M307 108 L307 135 L335 135 L335 110 L332 108Z"
            fill="#FAFAFA" stroke="#121212" strokeWidth="1.4" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── DISCOVER ASSET ─────────────────────────────────────────────────────────────
// Isometric magnifier — lime ring, white lens, dark handle
function DiscoverAsset() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex h-[300px] w-[300px] items-center justify-center md:h-[380px] md:w-[380px]"
    >
      {/* Glow */}
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.30),rgba(152,254,0,0.06)_50%,transparent_80%)] blur-2xl" />
      <svg viewBox="0 0 280 300" fill="none" className="relative z-10 w-[82%]">
        <HatchDefs id="disc-hatch" />
        {/* Handle depth */}
        <path d="M188 230 L208 250 L220 238 L200 218Z" fill="url(#disc-hatch)" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Handle top */}
        <path d="M176 218 L196 238 L208 226 L188 206Z" fill="#2A2A2A" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Handle connector */}
        <rect x="160" y="200" width="20" height="28" rx="8" fill="#888" stroke="#121212" strokeWidth="1.4" transform="rotate(-45 160 200)" />
        {/* Outer lime ring depth */}
        <ellipse cx="122" cy="144" rx="92" ry="58" fill="url(#disc-hatch)" stroke="#121212" strokeWidth="1.6" />
        {/* Outer lime ring top */}
        <ellipse cx="122" cy="126" rx="92" ry="58" fill="#98FE00" stroke="#121212" strokeWidth="1.8" />
        {/* Inner white lens depth */}
        <ellipse cx="122" cy="144" rx="68" ry="42" fill="#E8FFC0" stroke="#121212" strokeWidth="1.3" />
        {/* Inner white lens top */}
        <ellipse cx="122" cy="126" rx="68" ry="42" fill="white" stroke="#121212" strokeWidth="1.5" />
        {/* Lens highlight */}
        <ellipse cx="104" cy="112" rx="18" ry="12" fill="rgba(255,255,255,0.85)" />
      </svg>
    </motion.div>
  );
}

// ─── PLAN ASSET ─────────────────────────────────────────────────────────────────
// Gears + discs + flat pieces arrangement (isometric)
function PlanAsset() {
  return (
    <div className="relative flex h-[300px] w-[340px] items-center justify-center md:h-[360px] md:w-[420px]">
      <svg viewBox="0 0 420 340" fill="none" className="w-full">
        <HatchDefs id="plan-hatch" />
        {/* Flat base piece left */}
        <path d="M40 190 L180 190 Q200 190 200 210 L200 210 L200 240 Q200 250 190 250 L180 250 L180 270 Q195 268 200 258 L200 240 L200 210 L204 256 Q198 278 180 278 L50 278 Q30 278 30 258 L30 230 L30 210 Q30 190 50 190 L40 190Z" fill="url(#plan-hatch)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M50 170 L180 170 Q200 170 200 190 L200 210 L180 210 L180 190 Q180 188 176 188 L54 188 Q44 188 44 196 L44 210 L30 210 L30 190 Q30 170 50 170Z" fill="#FAFAFA" stroke="#121212" strokeWidth="1.6" strokeLinejoin="round" />

        {/* Small disc left */}
        <ellipse cx="88" cy="158" rx="30" ry="19" fill="url(#plan-hatch)" stroke="#121212" strokeWidth="1.3" />
        <ellipse cx="88" cy="140" rx="30" ry="19" fill="white" stroke="#121212" strokeWidth="1.5" />

        {/* Gear (top right) - simplified as notched circle */}
        {/* Gear depth */}
        <ellipse cx="288" cy="148" rx="88" ry="56" fill="url(#plan-hatch)" stroke="#121212" strokeWidth="1.3" />
        {/* Gear top face */}
        <ellipse cx="288" cy="128" rx="88" ry="56" fill="#FAFAFA" stroke="#121212" strokeWidth="1.7" />
        {/* Gear inner hole depth */}
        <ellipse cx="288" cy="148" rx="42" ry="26" fill="#F0F0F0" stroke="#121212" strokeWidth="1.1" />
        {/* Gear inner hole top */}
        <ellipse cx="288" cy="128" rx="42" ry="26" fill="#E8E8E8" stroke="#121212" strokeWidth="1.3" />
        {/* Gear teeth (simplified as radial bumps) */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx  = 288 + Math.cos(rad) * 90;
          const cy  = 128 + Math.sin(rad) * 57;
          return <ellipse key={i} cx={cx} cy={cy} rx="10" ry="7" fill="#FAFAFA" stroke="#121212" strokeWidth="1.2" />;
        })}

        {/* Medium disc right-bottom */}
        <ellipse cx="190" cy="284" rx="38" ry="24" fill="url(#plan-hatch)" stroke="#121212" strokeWidth="1.3" />
        <ellipse cx="190" cy="262" rx="38" ry="24" fill="white" stroke="#121212" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── BUILD ASSET ─────────────────────────────────────────────────────────────────
// Isometric chat bubble with two pill elements inside
function BuildAsset() {
  return (
    <div className="relative flex h-[280px] w-[320px] items-center justify-center md:h-[360px] md:w-[400px]">
      <svg viewBox="0 0 400 320" fill="none" className="w-full">
        <HatchDefs id="build-hatch" />
        {/* Chat bubble tail depth */}
        <path d="M68 280 L50 300 L90 285 L90 268Z" fill="url(#build-hatch)" stroke="#121212" strokeWidth="1.3" strokeLinejoin="round" />
        {/* Chat bubble main depth */}
        <path d="M60 180 L60 240 Q60 270 88 270 L88 270 L68 280 L50 300 L90 268 L312 268 Q342 268 342 240 L342 218 L342 240 Q342 262 312 262 L90 262 Q72 262 68 248 L68 240 L68 180Z" fill="url(#build-hatch)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Chat bubble main top */}
        <path d="M88 120 L312 120 Q342 120 342 148 L342 218 Q342 246 312 246 L90 246 Q60 246 60 218 L60 148 Q60 120 88 120Z" fill="white" stroke="#121212" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Chat bubble tail top */}
        <path d="M68 240 L50 268 L90 252 L90 246Z" fill="white" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Inner pill 1 (left) depth */}
        <rect x="88" y="168" width="94" height="34" rx="16" fill="url(#build-hatch)" stroke="#121212" strokeWidth="1.2" />
        {/* Inner pill 1 top */}
        <rect x="88" y="152" width="94" height="34" rx="16" fill="#F0F0F0" stroke="#121212" strokeWidth="1.4" />
        {/* Inner pill 2 (right) depth */}
        <rect x="204" y="196" width="110" height="30" rx="14" fill="url(#build-hatch)" stroke="#121212" strokeWidth="1.2" />
        {/* Inner pill 2 top */}
        <rect x="204" y="180" width="110" height="30" rx="14" fill="#F0F0F0" stroke="#121212" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

// ─── MOVE ASSET ─────────────────────────────────────────────────────────────────
// Isometric play button on rounded platform
function MoveAsset() {
  return (
    <div className="relative flex h-[280px] w-[360px] items-center justify-center md:h-[340px] md:w-[440px]">
      <svg viewBox="0 0 440 300" fill="none" className="w-full">
        <HatchDefs id="move-hatch" />
        {/* Platform depth */}
        <path d="M40 188 L40 230 Q40 258 72 258 L368 258 Q400 258 400 230 L400 188 L374 188 L374 224 Q374 234 364 234 L76 234 Q66 234 66 224 L66 188Z" fill="url(#move-hatch)" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Platform top */}
        <path d="M72 96 L368 96 Q400 96 400 128 L400 188 L374 188 L374 128 Q374 122 364 122 L76 122 Q66 122 66 128 L66 188 L40 188 L40 128 Q40 96 72 96Z" fill="white" stroke="#121212" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Inner inset border */}
        <rect x="80" y="110" width="280" height="88" rx="20" fill="none" stroke="#DADADA" strokeWidth="1.2" />
        {/* Play triangle depth */}
        <polygon points="186,188 186,222 250,208" fill="url(#move-hatch)" stroke="#121212" strokeWidth="1.3" strokeLinejoin="round" />
        {/* Play triangle top */}
        <polygon points="186,158 186,192 250,175" fill="#F0F0F0" stroke="#121212" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ProcessAsset({ shape }: { shape: string }) {
  if (shape === 'discover') return <DiscoverAsset />;
  if (shape === 'plan')     return <PlanAsset />;
  if (shape === 'build')    return <BuildAsset />;
  return <MoveAsset />;
}

// ─── BOOT SEQUENCE ─────────────────────────────────────────────────────────────
function BootSequence({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: E_OUT } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: E_OUT }}
          className="flex flex-col items-center gap-3"
        >
          <div className="mb-2 h-px w-12 bg-[#98FE00]" />
          <div className="text-6xl font-semibold tracking-[-0.07em] text-white md:text-8xl">
            Keystone
          </div>
        </motion.div>

        {/* Scan line */}
        <div className="relative h-px w-64 overflow-hidden rounded-full bg-white/8">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '160%' }}
            transition={{ duration: 1.1, repeat: 1, repeatDelay: 0.1, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#98FE00] to-transparent"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2, 0.6, 0.3] }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="text-[10px] uppercase tracking-[0.38em] text-white/38"
        >
          Command layer initializing
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── HEADER ────────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.div
      animate={{ borderBottomColor: scrolled ? 'rgba(0,0,0,0.07)' : 'transparent' }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 border-b bg-[#F3F3F3]/88 backdrop-blur-xl"
    >
      <Container className="flex items-center justify-between py-[14px]">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-5 rounded-full bg-[#98FE00]" />
          <span className="text-[22px] font-semibold tracking-[-0.055em] text-[#121212]">Keystone</span>
        </div>
        <nav className="hidden items-center gap-9 text-[13px] font-medium text-[#797979] md:flex">
          {['Product', 'Workflow', 'Security', 'Pricing'].map(label => (
            <button key={label} className="transition-colors duration-200 hover:text-[#121212]">{label}</button>
          ))}
        </nav>
        <button className="group flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
          Request access
          <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
        </button>
      </Container>
    </motion.div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const ref  = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY       = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const stats = [
    { big: '4.2×', small: 'Faster follow-through' },
    { big: '68%',  small: 'Less context switching' },
    { big: '1 view', small: 'For the day ahead'   },
  ];

  return (
    <SectionWrap className="relative overflow-hidden bg-[#F3F3F3] pb-20 pt-8 md:pb-32 md:pt-12">
      <Container ref={ref} className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        {/* Left: copy */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: E_OUT }}
            className="mb-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#797979]"
          >
            <span className="h-px w-6 bg-[#98FE00]" />
            AI executive command center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.75, ease: E_OUT }}
            className="max-w-[640px] text-[52px] font-semibold leading-[0.91] tracking-[-0.07em] text-[#121212] md:text-[80px] lg:text-[96px]"
          >
            Run the day with clarity,{' '}
            <span className="text-[#797979]">not noise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.65, ease: E_OUT }}
            className="mt-7 max-w-[520px] text-[18px] leading-[1.78] text-[#797979] md:text-[20px]"
          >
            Keystone turns inboxes, meetings, follow-ups, and decisions into one calm operating layer for founders and operators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6, ease: E_OUT }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#121212] px-6 py-3.5 text-[13px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
              Request access
              <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-[14px] border border-black/10 bg-white/80 px-6 py-3.5 text-[13px] font-medium text-[#121212] backdrop-blur transition duration-300 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              See product story
            </button>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid max-w-[540px] grid-cols-3 gap-3">
            {stats.map(({ big, small }, i) => (
              <motion.div
                key={big}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.55, ease: E_OUT }}
                className="rounded-[18px] border border-black/[0.07] bg-white/80 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] md:p-5"
              >
                <div className="text-[26px] font-semibold tracking-[-0.05em] text-[#121212] md:text-[30px]">{big}</div>
                <div className="mt-1 text-[12px] leading-[1.5] text-[#797979]">{small}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: asset */}
        <div className="relative z-10">
          <HeroLinkAsset />
        </div>
      </Container>

      {/* BG glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(152,254,0,0.14),transparent_22%),radial-gradient(circle_at_6%_90%,rgba(79,112,122,0.08),transparent_20%)]" />
    </SectionWrap>
  );
}

// ─── PAIN SECTION ──────────────────────────────────────────────────────────────
function PainSection() {
  const ref    = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.24 });
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const unsub = smooth.on('change', (v) => {
      setCurrent(Math.min(painSignals.length - 1, Math.floor(v * painSignals.length * 1.1) - 1));
    });
    return () => unsub();
  }, [smooth]);

  return (
    <SectionWrap className="bg-[#F3F3F3] py-16 md:py-20">
      <Container>
        <div ref={ref} className="relative h-[220vh]">
          <div className="sticky top-[72px] flex h-[calc(100vh-88px)] items-center justify-center overflow-hidden rounded-[2.8rem] bg-[#F0F0F0]">
            {/* Headline */}
            <div className="relative z-10 max-w-[1100px] px-6 text-center">
              <h2 className="text-[44px] font-semibold leading-[0.93] tracking-[-0.065em] text-[#121212] md:text-[82px] lg:text-[100px]">
                Eliminate the bottlenecks<br className="hidden md:block" /> that hold you back.
              </h2>
            </div>

            {/* Pain signal cards */}
            {painSignals.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={
                  current >= i
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 16, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.5, ease: E_OUT }}
                className={cn(
                  'absolute hidden items-center gap-3 rounded-[14px] border border-black/[0.07] bg-white/94 px-4 py-3 text-[13px] font-medium text-[#121212]/80 shadow-[0_8px_32px_rgba(0,0,0,0.07)] backdrop-blur-xl md:flex',
                  item.pos
                )}
              >
                <CircleAlert className="h-3.5 w-3.5 shrink-0 text-[#FF9500]" />
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── CAPABILITIES ──────────────────────────────────────────────────────────────
function Capabilities() {
  return (
    <SectionWrap className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        {/* Section header */}
        <div className="mb-14 grid gap-6 border-t border-black/[0.07] pt-5 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Capabilities</div>
            <h2 className="max-w-[860px] text-[42px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[72px]">
              A calmer system for high-stakes work.
            </h2>
          </div>
          <p className="max-w-[500px] justify-self-end text-[17px] leading-[1.82] text-[#797979]">
            Keystone is designed to reduce friction across the moments that decide whether work actually moves.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: i * 0.055, duration: 0.6, ease: E_OUT }}
                className="group rounded-[24px] border border-black/[0.07] bg-white/82 p-7 backdrop-blur-xl transition duration-350 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-8 flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border border-black/[0.07] bg-gradient-to-br from-white to-[#EEFFC0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition duration-350 group-hover:scale-[1.04]">
                  <Icon className="h-6 w-6 text-[#121212]" strokeWidth={1.6} />
                </div>
                <h3 className="text-[26px] font-semibold leading-[1.04] tracking-[-0.05em] text-[#121212]">{feature.title}</h3>
                <p className="mt-3.5 text-[15px] leading-[1.75] text-[#797979]">{feature.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── PROCESS PINNED ────────────────────────────────────────────────────────────
function GlitchSlices({ active }: { active: boolean }) {
  const slices = [
    'left-[10%] top-[16%] h-8 w-14',
    'right-[18%] top-[30%] h-9 w-12',
    'left-[30%] bottom-[22%] h-10 w-18',
    'right-[12%] bottom-[16%] h-7 w-16',
  ];
  return (
    <AnimatePresence>
      {active && slices.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0.8, x: i % 2 === 0 ? -14 : 14 }}
          animate={{ opacity: [0.8, 0.4, 0], x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, delay: i * 0.04, ease: E_OUT }}
          className={cn('absolute bg-[#F3F3F3]/92 backdrop-blur-[1px]', s)}
        />
      ))}
    </AnimatePresence>
  );
}

function ProcessPinned() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.24 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const unsub = smooth.on('change', (v) => {
      setCurrent(v < 0.25 ? 0 : v < 0.5 ? 1 : v < 0.75 ? 2 : 3);
    });
    return () => unsub();
  }, [smooth]);

  return (
    <SectionWrap className="bg-[#F3F3F3] py-10 md:py-16">
      <Container>
        <div className="mb-8 border-t border-black/[0.07] pt-5">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#797979]">Workflow</div>
        </div>
      </Container>

      {/* Step dots */}
      <Container className="mb-0">
        <div className="flex gap-2">
          {processSteps.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: current === i ? 24 : 6, backgroundColor: current === i ? '#121212' : '#D0D0D0' }}
              transition={{ duration: 0.35, ease: E_SMOOTH }}
              className="h-[5px] rounded-full"
            />
          ))}
        </div>
      </Container>

      <div ref={ref} className="relative h-[340vh]">
        <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-hidden">
          <Container className="grid h-full items-center gap-12 lg:grid-cols-[1fr_1fr]">
            {/* Asset side */}
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute left-[2%] top-[8%] select-none text-[80px] font-semibold tracking-[-0.06em] text-black/[0.06] md:text-[110px]">
                /{current + 1 < 10 ? `0${current + 1}` : current + 1}
              </div>
              <div className="relative flex h-[340px] w-[360px] items-center justify-center md:h-[420px] md:w-[460px]">
                {processSteps.map((step, i) => {
                  const start = i * 0.25;
                  const end   = Math.min(start + 0.25, 1);
                  const opacity = useTransform(smooth, [start, start + 0.06, end - 0.07, end], [0, 1, 1, 0]);
                  const scale   = useTransform(smooth, [start, start + 0.07, end], [0.96, 1, 1.02]);
                  return (
                    <motion.div key={step.title} style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center">
                      <ProcessAsset shape={step.shape} />
                      <GlitchSlices active={current === i} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Text side */}
            <div className="relative h-[360px] md:h-[440px]">
              {processSteps.map((step, i) => {
                const start = i * 0.25;
                const end   = Math.min(start + 0.25, 1);
                const opacity = useTransform(smooth, [start, start + 0.07, end - 0.08, end], [0, 1, 1, 0]);
                const y       = useTransform(smooth, [start, start + 0.09, end], [24, 0, -8]);
                return (
                  <motion.div key={step.title} style={{ opacity, y }} className="absolute inset-0 flex max-w-[640px] flex-col justify-center">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-black/46">Step {step.idx}</span>
                    </div>
                    <h2 className="text-[54px] font-semibold leading-[0.91] tracking-[-0.068em] text-[#121212] md:text-[80px]">
                      {step.title}
                    </h2>
                    <p className="mt-6 max-w-[520px] text-[18px] leading-[1.78] text-[#797979] md:text-[20px]">
                      {step.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </SectionWrap>
  );
}

// ─── HORIZONTAL COMPARISON ─────────────────────────────────────────────────────
function HorizontalComparison() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.24 });
  const x      = useTransform(smooth, [0, 1], ['0%', '-50%']);

  return (
    <SectionWrap className="bg-white py-20 md:py-28">
      <Container>
        <div className="border-t border-black/[0.07] pt-5">
          <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Comparison</div>
          <h2 className="max-w-[900px] text-[44px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[80px]">
            The difference is obvious.
          </h2>
        </div>
      </Container>

      <div ref={ref} className="relative mt-8 h-[240vh]">
        <div className="sticky top-[72px] overflow-hidden">
          <motion.div style={{ x }} className="flex w-[200vw] gap-5 px-5 md:px-8 lg:px-12">
            {/* Panel 1 */}
            <div className="w-[100vw] shrink-0">
              <Container className="grid h-[calc(100vh-110px)] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
                <div>
                  <p className="max-w-[460px] text-[18px] leading-[1.82] text-[#797979] md:text-[20px]">
                    Move from scattered, reactive work toward a system that prepares you early and keeps execution visible.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Keystone card */}
                  <div className="rounded-[24px] bg-[#121212] p-7 text-white shadow-[0_32px_96px_rgba(0,0,0,0.18)]">
                    <div className="mb-2 h-px w-8 bg-[#98FE00]" />
                    <div className="mb-7 mt-4 text-[28px] font-semibold tracking-[-0.05em]">Keystone</div>
                    <div className="space-y-4">
                      {compareKeystone.map(row => (
                        <div key={row} className="flex items-start gap-3 text-[15px] text-white/88">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#98FE00]" strokeWidth={2} />
                          <span>{row}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Other card */}
                  <div className="rounded-[24px] border border-black/[0.07] bg-[#F5F5F5] p-7">
                    <div className="mb-2 h-px w-8 bg-black/20" />
                    <div className="mb-7 mt-4 text-[28px] font-semibold tracking-[-0.05em] text-black">Typical tools</div>
                    <div className="space-y-4">
                      {compareOther.map(row => (
                        <div key={row} className="flex items-start gap-3 text-[15px] text-black/52">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-black/24" strokeWidth={2} />
                          <span>{row}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            {/* Panel 2 */}
            <div className="w-[100vw] shrink-0">
              <Container className="grid h-[calc(100vh-110px)] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="max-w-[480px]">
                  <div className="mb-5 text-[11px] uppercase tracking-[0.26em] text-black/38">What this changes</div>
                  <h3 className="text-[38px] font-semibold leading-[0.96] tracking-[-0.06em] text-[#121212] md:text-[58px]">
                    Fewer tabs. Fewer dropped threads. More momentum.
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ['Before meetings', 'Briefing comes to you'],
                    ['After decisions', 'Owners stay visible'],
                    ['Across the day',  'Priority stays stable'],
                  ].map(([title, desc], i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.06, duration: 0.52, ease: E_OUT }}
                      className="rounded-[22px] border border-black/[0.07] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                    >
                      <div className="text-[22px] font-semibold tracking-[-0.05em] text-[#121212]">{title}</div>
                      <div className="mt-3 text-[14px] leading-[1.72] text-[#797979]">{desc}</div>
                    </motion.div>
                  ))}
                </div>
              </Container>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrap>
  );
}

// ─── PREMIUM DASHBOARD MOCK ────────────────────────────────────────────────────
function DashboardMock() {
  const reduce = useReducedMotion();
  const rows = [
    { label: 'Reply to Nadia — term sheet',       tag: 'Needs call prep',     dot: '#FF9500' },
    { label: 'Investor board notes',               tag: '7 points surfaced',   dot: '#98FE00' },
    { label: 'Follow up with Pine Ridge',          tag: '2 days idle',         dot: '#FF9500' },
    { label: 'Draft to leadership team',           tag: 'Approval suggested',  dot: '#797979' },
  ];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/50 bg-gradient-to-br from-white/72 via-white/28 to-[#f2ffcf] p-[1px] shadow-[0_40px_120px_rgba(0,0,0,0.10)]">
      <div className="relative rounded-[27px] bg-[#faf9f6]/90 p-6 backdrop-blur-2xl">
        {/* Header row */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-black/36">Today — Feb 27</div>
            <div className="mt-1.5 text-[28px] font-semibold leading-none tracking-[-0.06em] text-black md:text-[32px]">Command Center</div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#98FE00]/30 bg-[#E8FFC0] px-3 py-1.5 text-[11px] font-medium text-black/72">
            <span className="h-1.5 w-1.5 rounded-full bg-[#98FE00]" />
            High leverage
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left col */}
          <div className="space-y-3">
            {/* Brief card */}
            <div className="rounded-[20px] bg-[#121212] p-5 text-white shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
              <div className="mb-3 flex items-center gap-2 text-[11px] text-white/44">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="uppercase tracking-[0.18em]">Brief ready</span>
              </div>
              <div className="space-y-2.5 text-[13px] leading-[1.72] text-white/84">
                <p>Board review in 43 minutes.</p>
                <p>Nadia is likely to push on rollout timing and support ownership.</p>
                <p className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#98FE00]" />
                  Best move: confirm launch owner first, then show revised timeline.
                </p>
              </div>
            </div>
            {/* Stat chips */}
            <div className="grid grid-cols-2 gap-3">
              {[['Open loops', '12'], ['Decisions', '4']].map(([label, val]) => (
                <div key={label} className="rounded-[18px] border border-black/[0.07] bg-white/80 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-black/36">{label}</div>
                  <div className="mt-1.5 text-[30px] font-semibold leading-none tracking-[-0.06em] text-black">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col: action rows */}
          <div className="space-y-2.5">
            {rows.map((row, i) => (
              <motion.div
                key={row.label}
                animate={reduce ? undefined : { x: [0, i % 2 ? 2 : -2, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-between rounded-[18px] border border-black/[0.06] bg-white/76 px-4 py-3.5 transition duration-300 hover:bg-white hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: row.dot }} />
                  <span className="text-[13px] font-medium text-black/84">{row.label}</span>
                </div>
                <span className="text-[11px] text-black/38">{row.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shimmer ring */}
        <motion.div
          animate={reduce ? undefined : { opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 rounded-[27px] border border-white/60"
        />
      </div>
    </div>
  );
}

// ─── PROOF SCENARIOS ───────────────────────────────────────────────────────────
function ProofScenarios() {
  return (
    <SectionWrap className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 grid gap-6 border-t border-black/[0.07] pt-5 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Product proof</div>
            <h2 className="max-w-[840px] text-[42px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[70px]">
              Designed around real moments that matter.
            </h2>
          </div>
          <p className="max-w-[500px] justify-self-end text-[17px] leading-[1.82] text-[#797979]">
            Keystone is strongest before a meeting, after a decision, and during the messy middle of execution.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          {/* Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.65, ease: E_OUT }}
          >
            <DashboardMock />
          </motion.div>

          {/* Scenario cards */}
          <div className="grid gap-4 content-start">
            {scenarios.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.54, ease: E_OUT }}
                className="rounded-[22px] border border-black/[0.07] bg-white/82 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[22px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#121212]">{s.title}</h3>
                  <span className="mt-1 shrink-0 rounded-full bg-[#121212] px-3 py-1 text-[11px] font-medium text-white">{s.metric}</span>
                </div>
                <p className="mt-3 text-[14px] leading-[1.75] text-[#797979]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── PRICING ───────────────────────────────────────────────────────────────────
function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <SectionWrap className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-8 border-t border-black/[0.07] pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Pricing</div>
            <h2 className="text-[44px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[76px]">
              Choose your plan.
            </h2>
          </div>
          {/* Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#797979]">Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={cn(
                'relative h-7 w-12 rounded-full border transition-colors duration-300',
                yearly ? 'border-[#98FE00] bg-[#98FE00]' : 'border-black/14 bg-white'
              )}
            >
              <motion.div
                animate={{ x: yearly ? 20 : 2 }}
                transition={{ duration: 0.28, ease: E_SMOOTH }}
                className="absolute top-1 h-5 w-5 rounded-full bg-[#121212] shadow-sm"
              />
            </button>
            <span className="text-[13px] text-[#797979]">
              Yearly <span className="ml-1 rounded-full bg-[#E8FFC0] px-2 py-0.5 text-[11px] font-medium text-black/72">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: E_OUT }}
              className={cn(
                'group rounded-[26px] border p-7 transition duration-350',
                plan.featured
                  ? 'border-[#121212] bg-[#121212] text-white shadow-[0_32px_96px_rgba(0,0,0,0.20)]'
                  : 'border-black/[0.07] bg-white/82 text-black backdrop-blur-xl hover:-translate-y-1.5 hover:shadow-[0_24px_72px_rgba(0,0,0,0.08)]'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="text-[26px] font-semibold tracking-[-0.05em]">{plan.name}</div>
                {plan.featured && (
                  <div className="rounded-full bg-[#98FE00] px-3 py-1 text-[11px] font-medium text-black">Recommended</div>
                )}
              </div>
              <p className={cn('mt-3 text-[13px] leading-[1.72]', plan.featured ? 'text-white/55' : 'text-[#797979]')}>{plan.desc}</p>

              <div className="mt-8 flex items-end gap-2">
                <div className="text-[48px] font-semibold leading-none tracking-[-0.06em]">{plan.price}</div>
                {plan.price !== 'Custom' && (
                  <div className={cn('pb-1 text-[13px]', plan.featured ? 'text-white/46' : 'text-black/40')}>/ mo</div>
                )}
              </div>

              <div className="my-7 h-px w-full" style={{ background: plan.featured ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)' }} />

              <div className="space-y-3.5">
                {plan.features.map((f, idx) => (
                  <div key={f} className="flex items-start gap-3 text-[14px]">
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.featured ? 'text-[#98FE00]' : 'text-black/50')} strokeWidth={2.2} />
                    <span className={plan.featured ? 'text-white/84' : 'text-black/72'}>{f}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 text-[13px] font-medium transition duration-300',
                plan.featured
                  ? 'bg-white text-black hover:bg-white/92'
                  : 'bg-[#121212] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
              )}>
                Choose {plan.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWrap className="bg-[#F3F3F3] py-16 md:py-24">
      <Container>
        <div className="mb-12 border-t border-black/[0.07] pt-5">
          <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">FAQ</div>
          <h2 className="text-[44px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[74px]">
            Frequently asked.
          </h2>
        </div>

        <div className="grid gap-3">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: E_OUT }}
              className="rounded-[20px] border border-black/[0.07] bg-white/82 px-6 py-5 backdrop-blur-xl transition duration-300 hover:bg-white"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 text-left"
              >
                <div className="text-[20px] font-medium leading-[1.14] tracking-[-0.038em] text-[#121212] md:text-[24px]">{item.q}</div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.26, ease: E_SMOOTH }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-black/38" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: E_OUT }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[880px] pt-4 text-[15px] leading-[1.78] text-[#797979] md:text-[17px]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <SectionWrap className="bg-[#F3F3F3] pb-10 pt-4 md:pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: E_OUT }}
          className="relative overflow-hidden rounded-[32px] bg-[#121212] px-8 py-16 text-white md:px-14 md:py-24"
        >
          {/* Accent glow */}
          <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[70%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.14),transparent_68%)] blur-3xl" />

          <div className="relative z-10 max-w-[860px]">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#98FE00]" />
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/40">Keystone</div>
            </div>
            <h2 className="text-[42px] font-semibold leading-[0.93] tracking-[-0.065em] md:text-[78px]">
              Clarity compounds.<br className="hidden md:block" /> So does execution.
            </h2>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.82] text-white/60 md:text-[20px]">
              Give yourself a system that sees the day clearly, prepares you early, and keeps work moving after the meeting ends.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="group inline-flex items-center gap-2.5 rounded-[14px] bg-white px-6 py-3.5 text-[13px] font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,255,255,0.20)]">
                Request access
                <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-[14px] border border-white/12 px-6 py-3.5 text-[13px] font-medium text-white/88 transition duration-300 hover:bg-white/[0.06]">
                Book a walkthrough
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </SectionWrap>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function KeystoneLandingPage() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#121212]">
      <AnimatePresence>{!booted && <BootSequence onComplete={() => setBooted(true)} />}</AnimatePresence>
      <Header />
      <Hero />
      <PainSection />
      <Capabilities />
      <ProcessPinned />
      <HorizontalComparison />
      <ProofScenarios />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

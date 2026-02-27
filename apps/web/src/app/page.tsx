'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
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

// ─── Data ──────────────────────────────────────────────────────────────────────
const painSignals = [
  { text: 'Teams spend too much time on repetitive tasks.',    pos: 'left-[2%] top-[12%]'    },
  { text: 'Leads slip away without consistent follow-up.',     pos: 'right-[2%] top-[18%]'   },
  { text: 'Scattered tools create blind spots and delays.',    pos: 'left-[2%] bottom-[18%]'  },
  { text: 'Meetings happen before context is assembled.',      pos: 'right-[2%] bottom-[24%]' },
  { text: 'Important decisions get buried in recency.',        pos: 'left-[2%] top-[46%]'    },
  { text: 'Reactive work keeps replacing deliberate work.',    pos: 'right-[2%] top-[62%]'   },
];

const features = [
  { idx: '01', title: 'Daily Command Center', body: 'A single surface for today\'s priorities, meetings, open loops, and follow-through.',              icon: Layers3      },
  { idx: '02', title: 'Inbox Triage',         body: 'Convert recency-driven inbox chaos into ranked actions and cleaner execution paths.',              icon: Mail         },
  { idx: '03', title: 'Meeting Briefing',     body: 'Arrive prepared with context, history, stakeholders, decisions, and risk signals.',               icon: CalendarDays },
  { idx: '04', title: 'Follow-up Tracking',   body: 'Keep promises visible after the meeting ends so important threads do not die quietly.',           icon: Clock3       },
  { idx: '05', title: 'Decision Capture',     body: 'Track what changed, what was decided, and what must happen next.',                                icon: FileText     },
  { idx: '06', title: 'Trust & Control',      body: 'Draft-first behavior, approvals, and oversight for high-context, high-stakes work.',             icon: Shield       },
];

const processSteps = [
  { idx: '01', title: 'Discover', shape: 'discover', body: 'Keystone pulls the day into one live field of view so you can spot pressure, momentum, and hidden risk instantly.'           },
  { idx: '02', title: 'Plan',     shape: 'plan',     body: 'It ranks what matters using timing, relationships, decision state, and execution weight — not noise.'                       },
  { idx: '03', title: 'Build',    shape: 'build',    body: 'Before important moments, Keystone assembles briefs, talking points, past context, and the right next moves.'               },
  { idx: '04', title: 'Move',     shape: 'move',     body: 'After every meeting or thread, execution stays visible through summaries, responsibilities, and follow-through.'            },
];

const compareKeystone = ['One place for priorities', 'Grounded in real context', 'Briefs before you ask', 'Follow-ups that stay alive', 'Execution over chatbot theater', 'Trust, control, and review'];
const compareOther    = ['Scattered across tools',   'Thin summaries with no depth', 'Reactive instead of proactive', 'Easy to forget what matters', 'Feels like another AI tab', 'Weak control over actions'];

const scenarios = [
  { title: 'Before an investor meeting', body: 'Get a one-screen brief with thread history, stakeholder context, open questions, and the smartest next move.',  metric: '7 min saved'        },
  { title: 'After a sales call',         body: 'Capture decisions, owners, and follow-ups before the context evaporates across tools.',                          metric: '3× cleaner follow-up'},
  { title: 'Start of day',               body: 'Begin with the few actions that will change the day instead of drowning in recency.',                            metric: 'Focus first'        },
];

const plans = [
  { name: 'Personal',  priceMonthly: '$24', priceYearly: '$19', desc: 'For individual operators who want daily clarity.',             features: ['Daily briefing', 'Inbox triage', 'Meeting prep', 'Decision log']                                            },
  { name: 'Pro',       priceMonthly: '$59', priceYearly: '$47', desc: 'For founders and operators running fast teams.',              features: ['Everything in Personal', 'Priority intelligence', 'Relationship memory', 'Follow-up tracking'], featured: true },
  { name: 'Executive', priceMonthly: 'Custom', priceYearly: 'Custom', desc: 'For leadership teams that need approvals and execution.', features: ['Shared team views', 'Review workflows', 'Admin controls', 'White-glove onboarding']                     },
];

const faqs = [
  { q: 'Does Keystone act automatically?',                  a: 'Keystone is built around trust. Teams can keep it draft-first, require approvals, or selectively enable actions where it makes sense.'  },
  { q: 'Who is it for?',                                    a: 'Founders, executives, chiefs of staff, operators, and teams handling high-context work across email, meetings, and execution.'             },
  { q: 'What makes it different from a generic assistant?', a: 'Keystone is designed for prioritization and follow-through. It focuses on what matters, why it matters, and what should happen next.'      },
  { q: 'Can teams use it together?',                        a: 'Yes. Shared views, approvals, and visibility can be layered in for collaborative execution.'                                                },
];

const NAV_LINKS = [
  { label: 'Product',   href: '#capabilities' },
  { label: 'Workflow',  href: '#workflow'      },
  { label: 'Security',  href: '#proof'         },
  { label: 'Pricing',   href: '#pricing'       },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const Container = React.forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className = '', children }, ref) => (
    <div ref={ref} className={cn('mx-auto w-full max-w-[1440px]', className)}>{children}</div>
  )
);
Container.displayName = 'Container';

function SectionWrap({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return <section id={id} className={cn('px-5 md:px-8 lg:px-12', className)}>{children}</section>;
}

// ─── SVG Defs ─────────────────────────────────────────────────────────────────
function HatchDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="5" y2="0" stroke="#C0C0C0" strokeWidth="0.9" />
      </pattern>
    </defs>
  );
}

// ─── HERO ASSET ────────────────────────────────────────────────────────────────
function HeroLinkAsset() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[460px] w-full items-center justify-center md:h-[580px]">
      <motion.div
        animate={reduce ? undefined : { opacity: [0.12, 0.24, 0.12], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.18),rgba(152,254,0,0.02)_58%,transparent_82%)] blur-3xl"
      />
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full max-w-[580px]"
      >
        <svg viewBox="0 0 580 400" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="w-full drop-shadow-[0_32px_56px_rgba(0,0,0,0.08)]">
          <HatchDefs id="hero-h" />

          {/* ── RING A (upper-right) ─────────────────────────────── */}
          {/* Side depth face */}
          <path
            d="M178 172 L178 200 Q178 226 204 226 L516 226 Q542 226 542 200 L542 172 L514 172 L514 200 Q514 202 512 202 L208 202 Q206 202 206 200 L206 172Z"
            fill="url(#hero-h)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round"
          />
          {/* Top ring face — outer rect minus inner hole (evenodd) */}
          <path
            fillRule="evenodd"
            d="M204 44 L516 44 Q544 44 544 72 L544 172 L514 172 L514 72 Q514 70 512 70 L208 70 Q206 70 206 72 L206 172 L178 172 L178 72 Q178 44 204 44 Z
               M232 70 L488 70 Q514 70 514 96 L514 148 Q514 172 488 172 L236 172 L236 148 L486 148 Q486 148 486 148 Q488 148 488 144 L488 96 Q488 70 484 70 L236 70 Q232 70 232 74 L232 96 L206 96 L206 74 Q206 70 232 70 Z"
            fill="#FAFAFA" stroke="#121212" strokeWidth="1.6" strokeLinejoin="round"
          />

          {/* ── RING B (lower-left, interlocking) ────────────────── */}
          {/* Side depth face */}
          <path
            d="M36 258 L36 288 Q36 316 64 316 L376 316 Q404 316 404 288 L404 258 L376 258 L376 288 Q376 290 372 290 L68 290 Q66 290 66 288 L66 258Z"
            fill="url(#hero-h)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round"
          />
          {/* Top ring face */}
          <path
            fillRule="evenodd"
            d="M64 166 L376 166 Q404 166 404 194 L404 258 L376 258 L376 194 Q376 192 372 192 L68 192 Q66 192 66 194 L66 258 L36 258 L36 194 Q36 166 64 166 Z
               M92 192 L348 192 Q376 192 376 218 L376 234 Q376 258 348 258 L96 258 L96 234 L346 234 Q348 234 348 230 L348 218 Q348 192 344 192 L96 192 Q94 192 94 196 L94 218 L66 218 L66 196 Q66 192 92 192 Z"
            fill="#FAFAFA" stroke="#121212" strokeWidth="1.6" strokeLinejoin="round"
          />

          {/* Interlock bridge — Ring A's arm passing through Ring B's hole */}
          <rect x="178" y="172" width="28" height="22" fill="#FAFAFA" />
          <line x1="178" y1="172" x2="178" y2="194" stroke="#121212" strokeWidth="1.6" />
          <line x1="206" y1="172" x2="206" y2="192" stroke="#121212" strokeWidth="1.6" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── DISCOVER ASSET ────────────────────────────────────────────────────────────
function DiscoverAsset() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex h-[300px] w-[300px] items-center justify-center md:h-[380px] md:w-[380px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.28),rgba(152,254,0,0.04)_54%,transparent_82%)] blur-2xl" />
      <svg viewBox="0 0 260 290" fill="none" className="relative z-10 w-[80%]">
        <HatchDefs id="disc-h" />
        {/* Handle — dark cylinder */}
        <path d="M175 222 L193 240 L205 228 L187 210Z" fill="url(#disc-h)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M163 210 L181 228 L193 216 L175 198Z" fill="#1E1E1E" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Handle connector / neck */}
        <path d="M148 196 L160 208 Q166 214 172 208 L162 196 Q156 188 148 196Z" fill="#888" stroke="#121212" strokeWidth="1.3" />
        {/* Outer lime ring — side depth */}
        <ellipse cx="112" cy="140" rx="88" ry="55" fill="url(#disc-h)" stroke="#121212" strokeWidth="1.5" />
        {/* Outer lime ring — top face */}
        <ellipse cx="112" cy="120" rx="88" ry="55" fill="#98FE00" stroke="#121212" strokeWidth="1.7" />
        {/* Inner lens — side depth */}
        <ellipse cx="112" cy="140" rx="64" ry="40" fill="#C8F860" stroke="#121212" strokeWidth="1.2" />
        {/* Inner lens — top face */}
        <ellipse cx="112" cy="120" rx="64" ry="40" fill="white" stroke="#121212" strokeWidth="1.4" />
        {/* Highlight */}
        <ellipse cx="94" cy="106" rx="16" ry="11" fill="rgba(255,255,255,0.70)" />
      </svg>
    </motion.div>
  );
}

// ─── PLAN ASSET ────────────────────────────────────────────────────────────────
function PlanAsset() {
  return (
    <div className="relative flex h-[300px] w-[340px] items-center justify-center md:h-[360px] md:w-[420px]">
      <svg viewBox="0 0 420 320" fill="none" className="w-full">
        <HatchDefs id="plan-h" />
        {/* Flat left piece — depth */}
        <path d="M30 202 L30 232 Q30 254 52 254 L188 254 Q202 254 202 232 L202 214 L180 214 L180 232 Q180 234 176 234 L56 234 Q54 234 54 232 L54 202Z" fill="url(#plan-h)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Flat left piece — top */}
        <path d="M52 172 L176 172 Q202 172 202 194 L202 214 L180 214 L180 194 Q180 192 176 192 L56 192 Q54 192 54 194 L54 214 L30 214 L30 194 Q30 172 52 172Z" fill="#FAFAFA" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Disc left — depth */}
        <ellipse cx="82" cy="154" rx="28" ry="18" fill="url(#plan-h)" stroke="#121212" strokeWidth="1.3" />
        {/* Disc left — top */}
        <ellipse cx="82" cy="136" rx="28" ry="18" fill="white" stroke="#121212" strokeWidth="1.5" />
        {/* Gear — depth ring */}
        <ellipse cx="292" cy="148" rx="84" ry="52" fill="url(#plan-h)" stroke="#121212" strokeWidth="1.2" />
        {/* Gear — top face */}
        <ellipse cx="292" cy="124" rx="84" ry="52" fill="#FAFAFA" stroke="#121212" strokeWidth="1.6" />
        {/* Gear inner hole — depth */}
        <ellipse cx="292" cy="148" rx="40" ry="25" fill="#EBEBEB" stroke="#121212" strokeWidth="1.0" />
        {/* Gear inner hole — top */}
        <ellipse cx="292" cy="124" rx="40" ry="25" fill="#E4E4E4" stroke="#121212" strokeWidth="1.2" />
        {/* Gear teeth — 8 evenly spaced bumps */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          const cx = 292 + Math.cos(r) * 87;
          const cy = 124 + Math.sin(r) * 54;
          return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="6" fill="#FAFAFA" stroke="#121212" strokeWidth="1.2" />;
        })}
        {/* Small disc right-bottom — depth */}
        <ellipse cx="198" cy="276" rx="36" ry="22" fill="url(#plan-h)" stroke="#121212" strokeWidth="1.3" />
        {/* Small disc right-bottom — top */}
        <ellipse cx="198" cy="254" rx="36" ry="22" fill="white" stroke="#121212" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── BUILD ASSET ───────────────────────────────────────────────────────────────
function BuildAsset() {
  return (
    <div className="relative flex h-[280px] w-[320px] items-center justify-center md:h-[360px] md:w-[400px]">
      <svg viewBox="0 0 380 310" fill="none" className="w-full">
        <HatchDefs id="build-h" />
        {/* Tail depth */}
        <path d="M66 268 L48 290 L88 276 L88 258Z" fill="url(#build-h)" stroke="#121212" strokeWidth="1.3" strokeLinejoin="round" />
        {/* Body depth */}
        <path d="M58 176 L58 236 Q58 266 86 266 L66 268 L48 290 L88 258 L308 258 Q338 258 338 230 L338 220 L338 230 Q338 254 308 254 L88 254 Q74 254 68 244 L68 236 L68 176Z" fill="url(#build-h)" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Body top face */}
        <path d="M86 114 L308 114 Q338 114 338 142 L338 214 Q338 242 308 242 L88 242 Q58 242 58 214 L58 142 Q58 114 86 114Z" fill="white" stroke="#121212" strokeWidth="1.7" strokeLinejoin="round" />
        {/* Tail top */}
        <path d="M66 236 L48 262 L88 248 L88 242Z" fill="white" stroke="#121212" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Pill 1 depth */}
        <rect x="86" y="164" width="96" height="32" rx="15" fill="url(#build-h)" stroke="#121212" strokeWidth="1.2" />
        {/* Pill 1 top */}
        <rect x="86" y="148" width="96" height="32" rx="15" fill="#EFEFEF" stroke="#121212" strokeWidth="1.4" />
        {/* Pill 2 depth */}
        <rect x="200" y="194" width="106" height="28" rx="13" fill="url(#build-h)" stroke="#121212" strokeWidth="1.2" />
        {/* Pill 2 top */}
        <rect x="200" y="178" width="106" height="28" rx="13" fill="#EFEFEF" stroke="#121212" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

// ─── MOVE ASSET ────────────────────────────────────────────────────────────────
function MoveAsset() {
  return (
    <div className="relative flex h-[270px] w-[350px] items-center justify-center md:h-[330px] md:w-[430px]">
      <svg viewBox="0 0 430 290" fill="none" className="w-full">
        <HatchDefs id="move-h" />
        {/* Platform depth */}
        <path d="M38 182 L38 224 Q38 252 68 252 L362 252 Q392 252 392 224 L392 182 L364 182 L364 218 Q364 228 356 228 L74 228 Q66 228 66 218 L66 182Z" fill="url(#move-h)" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Platform top */}
        <path d="M68 88 L362 88 Q392 88 392 118 L392 182 L364 182 L364 118 Q364 114 356 114 L74 114 Q66 114 66 118 L66 182 L38 182 L38 118 Q38 88 68 88Z" fill="white" stroke="#121212" strokeWidth="1.7" strokeLinejoin="round" />
        {/* Inner inset */}
        <rect x="78" y="102" width="274" height="86" rx="18" fill="none" stroke="#D8D8D8" strokeWidth="1.1" />
        {/* Play triangle depth */}
        <polygon points="178,184 178,216 242,202" fill="url(#move-h)" stroke="#121212" strokeWidth="1.3" strokeLinejoin="round" />
        {/* Play triangle top */}
        <polygon points="178,154 178,186 242,170" fill="#EFEFEF" stroke="#121212" strokeWidth="1.5" strokeLinejoin="round" />
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

// ─── Process step sub-components (fix: hooks cannot be called inside .map()) ──
function ProcessAssetStep({ smooth, stepIndex, shape }: {
  smooth: MotionValue<number>;
  stepIndex: number;
  shape: string;
}) {
  const s = stepIndex * 0.25;
  const e = Math.min(s + 0.25, 1);
  const opacity = useTransform(smooth, [s, s + 0.07, e - 0.08, e], [0, 1, 1, 0]);
  const scale   = useTransform(smooth, [s, s + 0.07, e], [0.97, 1, 1.015]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center">
      <ProcessAsset shape={shape} />
    </motion.div>
  );
}

function ProcessTextStep({ smooth, stepIndex, step }: {
  smooth: MotionValue<number>;
  stepIndex: number;
  step: typeof processSteps[0];
}) {
  const s = stepIndex * 0.25;
  const e = Math.min(s + 0.25, 1);
  const opacity = useTransform(smooth, [s, s + 0.08, e - 0.09, e], [0, 1, 1, 0]);
  const y       = useTransform(smooth, [s, s + 0.1, e], [22, 0, -8]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex max-w-[640px] flex-col justify-center">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-7 items-center rounded-full border border-black/10 bg-white px-3 text-[11px] uppercase tracking-[0.24em] text-black/44">
          Step {step.idx}
        </span>
      </div>
      <h2 className="text-[52px] font-semibold leading-[0.91] tracking-[-0.068em] text-[#121212] md:text-[78px]">
        {step.title}
      </h2>
      <p className="mt-6 max-w-[520px] text-[17px] leading-[1.82] text-[#797979] md:text-[19px]">
        {step.body}
      </p>
    </motion.div>
  );
}

// ─── BOOT SEQUENCE ─────────────────────────────────────────────────────────────
function BootSequence({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: E_OUT } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
    >
      <div className="flex flex-col items-center gap-7">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, ease: E_OUT }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-px w-10 bg-[#98FE00]" />
          <div className="text-[60px] font-semibold tracking-[-0.07em] text-white md:text-[80px]">
            Keystone
          </div>
        </motion.div>
        <div className="relative h-px w-56 overflow-hidden rounded-full bg-white/8">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '160%' }}
            transition={{ duration: 1.05, repeat: 1, repeatDelay: 0.08, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#98FE00] to-transparent"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0.18, 0.52, 0.28] }}
          transition={{ duration: 1.5, delay: 0.25 }}
          className="text-[10px] uppercase tracking-[0.40em] text-white/36"
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
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#F3F3F3]/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-[#F3F3F3]/0 backdrop-blur-0'
    )}>
      <Container className="flex items-center justify-between px-5 py-3.5 md:px-8 lg:px-12">
        <div className="flex items-center gap-2.5">
          <div className="h-[18px] w-[18px] rounded-full bg-[#98FE00]" />
          <span className="text-[21px] font-semibold tracking-[-0.055em] text-[#121212]">Keystone</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href.slice(1))}
              className="text-[13px] font-medium text-[#797979] transition-colors duration-200 hover:text-[#121212]"
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => scrollTo('pricing')}
          className="group flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.09)]"
        >
          Request access
          <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
        </button>
      </Container>
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY       = useTransform(scrollYProgress, [0, 1], [0, 52]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.38]);

  return (
    <SectionWrap className="relative overflow-hidden bg-[#F3F3F3] pb-20 pt-6 md:pb-28 md:pt-10">
      <Container ref={ref} className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
        {/* Copy */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6, ease: E_OUT }}
            className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#797979]"
          >
            <span className="h-px w-5 bg-[#98FE00]" />
            AI executive command center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.75, ease: E_OUT }}
            className="max-w-[620px] text-[50px] font-semibold leading-[0.91] tracking-[-0.07em] text-[#121212] md:text-[76px] lg:text-[90px]"
          >
            Run the day with clarity,{' '}
            <span className="text-[#797979]">not noise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.65, ease: E_OUT }}
            className="mt-6 max-w-[500px] text-[17px] leading-[1.80] text-[#797979] md:text-[19px]"
          >
            Keystone turns inboxes, meetings, follow-ups, and decisions into one calm operating layer for founders and operators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.58, ease: E_OUT }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => scrollTo('pricing')}
              className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#121212] px-6 py-3.5 text-[13px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.20)]"
            >
              Request access
              <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo('workflow')}
              className="inline-flex items-center gap-2 rounded-[14px] border border-black/10 bg-white/80 px-6 py-3.5 text-[13px] font-medium text-[#121212] backdrop-blur transition duration-300 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)]"
            >
              See product story
            </button>
          </motion.div>

          {/* Stats */}
          <div className="mt-11 grid max-w-[520px] grid-cols-3 gap-2.5">
            {[
              { big: '4.2×',   small: 'Faster follow-through' },
              { big: '68%',    small: 'Less context switching' },
              { big: '1 view', small: 'For the day ahead'      },
            ].map(({ big, small }, i) => (
              <motion.div
                key={big}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 + i * 0.08, duration: 0.52, ease: E_OUT }}
                className="rounded-[18px] border border-black/[0.07] bg-white/80 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] md:p-5"
              >
                <div className="text-[24px] font-semibold tracking-[-0.05em] text-[#121212] md:text-[28px]">{big}</div>
                <div className="mt-1 text-[12px] leading-[1.5] text-[#797979]">{small}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Asset */}
        <div className="relative z-10 lg:pl-4">
          <HeroLinkAsset />
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(152,254,0,0.12),transparent_20%),radial-gradient(circle_at_5%_92%,rgba(79,112,122,0.07),transparent_18%)]" />
    </SectionWrap>
  );
}

// ─── PAIN SECTION ──────────────────────────────────────────────────────────────
function PainSection() {
  const ref    = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 68, damping: 22, mass: 0.26 });
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    return smooth.on('change', (v) => {
      setCurrent(Math.min(painSignals.length - 1, Math.floor(v * painSignals.length * 1.05) - 1));
    });
  }, [smooth]);

  return (
    <SectionWrap className="bg-[#F3F3F3] py-14 md:py-20">
      <Container>
        <div ref={ref} className="relative h-[220vh]">
          <div className="sticky top-[56px] flex h-[calc(100vh-72px)] items-center justify-center overflow-hidden rounded-[2.6rem] bg-[#EFEFEF]">
            {/* Central headline — always on top */}
            <div className="relative z-20 max-w-[960px] px-6 text-center">
              <h2 className="text-[42px] font-semibold leading-[0.93] tracking-[-0.065em] text-[#121212] md:text-[76px] lg:text-[92px]">
                Eliminate the bottlenecks<br className="hidden md:block" /> that hold you back.
              </h2>
            </div>

            {/* Pain cards — strictly to the periphery, z-index below headline */}
            {painSignals.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={
                  current >= i
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 12, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.48, ease: E_OUT }}
                className={cn(
                  'absolute z-10 hidden items-center gap-2.5 rounded-[13px] border border-black/[0.07] bg-white/96 px-3.5 py-2.5 text-[12.5px] font-medium text-[#121212]/76 shadow-[0_6px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl md:flex',
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
    <SectionWrap id="capabilities" className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-16 grid gap-6 border-t border-black/[0.07] pt-5 md:grid-cols-[1.12fr_0.88fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Capabilities</div>
            <h2 className="max-w-[820px] text-[40px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[68px]">
              A calmer system for high-stakes work.
            </h2>
          </div>
          <p className="max-w-[480px] justify-self-end text-[16px] leading-[1.82] text-[#797979]">
            Keystone is designed to reduce friction across the moments that decide whether work actually moves.
          </p>
        </div>

        <div className="grid gap-px border border-black/[0.07] rounded-[24px] overflow-hidden bg-black/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: E_OUT }}
                className="group flex flex-col bg-[#F3F3F3] p-7 transition duration-300 hover:bg-white"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] border border-black/[0.07] bg-white transition duration-300 group-hover:border-[#98FE00]/40 group-hover:bg-[#F6FFE0]">
                    <Icon className="h-[22px] w-[22px] text-[#121212]" strokeWidth={1.6} />
                  </div>
                  <span className="text-[12px] font-medium tabular-nums text-black/20">{feature.idx}</span>
                </div>
                <h3 className="text-[22px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#121212]">{feature.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.75] text-[#797979]">{feature.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── PROCESS PINNED ────────────────────────────────────────────────────────────
function ProcessPinned() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 68, damping: 22, mass: 0.26 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    return smooth.on('change', (v) => {
      setCurrent(v < 0.25 ? 0 : v < 0.5 ? 1 : v < 0.75 ? 2 : 3);
    });
  }, [smooth]);

  return (
    <SectionWrap id="workflow" className="bg-[#F3F3F3] py-10 md:py-14">
      <Container>
        <div className="mb-7 border-t border-black/[0.07] pt-5">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#797979]">Workflow</div>
        </div>
        {/* Step progress pills */}
        <div className="flex gap-2 pb-0">
          {processSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  width: current === i ? 28 : 6,
                  backgroundColor: current === i ? '#121212' : '#D4D4D4',
                }}
                transition={{ duration: 0.32, ease: E_SMOOTH }}
                className="h-[5px] rounded-full"
              />
              {current === i && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] uppercase tracking-[0.22em] text-black/40"
                >
                  {step.title}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </Container>

      <div ref={ref} className="relative h-[340vh]">
        <div className="sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden">
          <Container className="grid h-full items-center gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Asset panel */}
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute left-0 top-[6%] select-none text-[88px] font-semibold tracking-[-0.06em] text-black/[0.05] md:text-[116px]">
                {`0${current + 1}`}
              </div>
              <div className="relative h-[320px] w-[340px] md:h-[400px] md:w-[440px]">
                {processSteps.map((step, i) => (
                  <ProcessAssetStep key={step.title} smooth={smooth} stepIndex={i} shape={step.shape} />
                ))}
              </div>
            </div>

            {/* Text panel */}
            <div className="relative h-[340px] md:h-[420px]">
              {processSteps.map((step, i) => (
                <ProcessTextStep key={step.title} smooth={smooth} stepIndex={i} step={step} />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </SectionWrap>
  );
}

// ─── HORIZONTAL COMPARISON ─────────────────────────────────────────────────────
function HorizontalComparison() {
  const ref    = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 68, damping: 22, mass: 0.26 });
  // Translate the inner track by -100vw (half of 200vw) at progress=1
  const x = useTransform(smooth, [0, 1], ['0vw', '-100vw']);

  return (
    <SectionWrap className="bg-white py-20 md:py-28">
      <Container>
        <div className="border-t border-black/[0.07] pt-5">
          <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Comparison</div>
          <h2 className="max-w-[860px] text-[42px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[76px]">
            The difference is obvious.
          </h2>
        </div>
      </Container>

      <div ref={ref} className="relative mt-8 h-[240vh]">
        <div className="sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full"
            // two panels, each 100vw wide
          >
            {/* Panel 1: Keystone vs Typical */}
            <div className="flex h-full w-screen shrink-0 items-center px-5 md:px-8 lg:px-12">
              <Container className="grid w-full items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
                <div>
                  <p className="max-w-[440px] text-[17px] leading-[1.82] text-[#797979] md:text-[19px]">
                    Move from scattered, reactive work toward a system that prepares you early and keeps execution visible.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] bg-[#121212] p-7 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
                    <div className="mb-2 h-px w-8 bg-[#98FE00]" />
                    <div className="mb-6 mt-4 text-[26px] font-semibold tracking-[-0.05em]">Keystone</div>
                    <div className="space-y-3.5">
                      {compareKeystone.map(row => (
                        <div key={row} className="flex items-start gap-3 text-[14px] text-white/86">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#98FE00]" strokeWidth={2} />
                          <span>{row}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-black/[0.07] bg-[#F5F5F5] p-7">
                    <div className="mb-2 h-px w-8 bg-black/20" />
                    <div className="mb-6 mt-4 text-[26px] font-semibold tracking-[-0.05em] text-black">Typical tools</div>
                    <div className="space-y-3.5">
                      {compareOther.map(row => (
                        <div key={row} className="flex items-start gap-3 text-[14px] text-black/50">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-black/22" strokeWidth={2} />
                          <span>{row}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            {/* Panel 2: "Fewer tabs" outcome */}
            <div className="flex h-full w-screen shrink-0 items-center px-5 md:px-8 lg:px-12">
              <Container className="grid w-full items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="max-w-[460px]">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.26em] text-black/36">What this changes</div>
                  <h3 className="text-[36px] font-semibold leading-[0.96] tracking-[-0.06em] text-[#121212] md:text-[54px]">
                    Fewer tabs. Fewer dropped threads. More momentum.
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { title: 'Before meetings', desc: 'Briefing comes to you'   },
                    { title: 'After decisions',  desc: 'Owners stay visible'     },
                    { title: 'Across the day',   desc: 'Priority stays stable'   },
                  ].map(({ title, desc }, i) => (
                    <div
                      key={title}
                      className="rounded-[22px] border border-black/[0.07] bg-white p-6 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
                    >
                      <div className="mb-3 h-px w-6 bg-[#98FE00]" />
                      <div className="text-[21px] font-semibold tracking-[-0.045em] text-[#121212]">{title}</div>
                      <div className="mt-2.5 text-[13px] leading-[1.72] text-[#797979]">{desc}</div>
                    </div>
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

// ─── DASHBOARD MOCK ────────────────────────────────────────────────────────────
function DashboardMock() {
  const reduce = useReducedMotion();
  const rows = [
    { label: 'Reply to Nadia — term sheet',  tag: 'Needs call prep',    dot: '#FF9500' },
    { label: 'Investor board notes',          tag: '7 points surfaced',  dot: '#98FE00' },
    { label: 'Follow up with Pine Ridge',     tag: '2 days idle',        dot: '#FF9500' },
    { label: 'Draft to leadership team',      tag: 'Approval suggested', dot: '#A0A0A0' },
  ];
  return (
    <div className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-white shadow-[0_32px_96px_rgba(0,0,0,0.08)]">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-black/32">Today — Feb 27</div>
          <div className="mt-1 text-[22px] font-semibold tracking-[-0.055em] text-black">Command Center</div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#98FE00]/28 bg-[#EDFFC0] px-3 py-1.5 text-[11px] font-medium text-black/68">
          <span className="h-1.5 w-1.5 rounded-full bg-[#98FE00]" />
          High leverage
        </div>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-[0.94fr_1.06fr]">
        {/* Left: brief + stats */}
        <div className="space-y-3">
          <div className="rounded-[18px] bg-[#121212] p-5 text-white">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.20em] text-white/40">
              <Sparkles className="h-3 w-3" />
              Brief ready
            </div>
            <div className="space-y-2 text-[12.5px] leading-[1.76] text-white/82">
              <p>Board review in 43 minutes.</p>
              <p>Nadia will push on rollout timing and support ownership.</p>
              <p className="flex items-start gap-2">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#98FE00]" />
                Confirm launch owner first, then show revised timeline.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[['Open loops', '12'], ['Decisions', '4']].map(([label, val]) => (
              <div key={label} className="rounded-[16px] border border-black/[0.07] bg-[#F8F8F8] p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] text-black/32">{label}</div>
                <div className="mt-1.5 text-[28px] font-semibold leading-none tracking-[-0.06em] text-black">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: action rows */}
        <div className="space-y-2">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              animate={reduce ? undefined : { x: [0, i % 2 ? 1.5 : -1.5, 0] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-between rounded-[16px] border border-black/[0.06] bg-[#F8F8F8] px-4 py-3 transition duration-250 hover:bg-white hover:shadow-[0_4px_18px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: row.dot }} />
                <span className="text-[12.5px] font-medium text-black/82">{row.label}</span>
              </div>
              <span className="text-[11px] text-black/36">{row.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROOF SCENARIOS ───────────────────────────────────────────────────────────
function ProofScenarios() {
  return (
    <SectionWrap id="proof" className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 grid gap-6 border-t border-black/[0.07] pt-5 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Product proof</div>
            <h2 className="max-w-[800px] text-[40px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[68px]">
              Designed around real moments that matter.
            </h2>
          </div>
          <p className="max-w-[480px] justify-self-end text-[16px] leading-[1.82] text-[#797979]">
            Keystone is strongest before a meeting, after a decision, and during the messy middle of execution.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: E_OUT }}
          >
            <DashboardMock />
          </motion.div>

          <div className="flex flex-col gap-4">
            {scenarios.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.52, ease: E_OUT }}
                className="flex-1 rounded-[22px] border border-black/[0.07] bg-white/82 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[20px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#121212]">{s.title}</h3>
                  <span className="mt-0.5 shrink-0 rounded-full bg-[#121212] px-3 py-1 text-[11px] font-medium text-white">{s.metric}</span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.76] text-[#797979]">{s.body}</p>
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

  const getPrice = (plan: typeof plans[0]) => yearly ? plan.priceYearly : plan.priceMonthly;

  return (
    <SectionWrap id="pricing" className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-8 border-t border-black/[0.07] pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Pricing</div>
            <h2 className="text-[42px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[72px]">
              Choose your plan.
            </h2>
          </div>
          {/* Billing toggle */}
          <div className="flex items-center gap-3">
            <span className={cn('text-[13px] transition-colors', !yearly ? 'text-[#121212]' : 'text-[#797979]')}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              aria-label="Toggle billing period"
              className={cn(
                'relative h-7 w-12 rounded-full border transition-colors duration-300',
                yearly ? 'border-[#98FE00] bg-[#98FE00]' : 'border-black/14 bg-white'
              )}
            >
              <motion.div
                animate={{ x: yearly ? 20 : 2 }}
                transition={{ duration: 0.26, ease: E_SMOOTH }}
                className="absolute top-1 h-5 w-5 rounded-full bg-[#121212] shadow-sm"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn('text-[13px] transition-colors', yearly ? 'text-[#121212]' : 'text-[#797979]')}>Yearly</span>
              <AnimatePresence>
                {yearly && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.88, x: -6 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.88, x: -6 }}
                    transition={{ duration: 0.22, ease: E_OUT }}
                    className="rounded-full bg-[#E8FFC0] px-2 py-0.5 text-[11px] font-medium text-black/70"
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ delay: i * 0.07, duration: 0.58, ease: E_OUT }}
              className={cn(
                'rounded-[26px] border p-7 transition duration-350',
                plan.featured
                  ? 'border-[#121212] bg-[#121212] text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)]'
                  : 'border-black/[0.07] bg-white/84 text-black backdrop-blur-xl hover:-translate-y-1.5 hover:shadow-[0_20px_64px_rgba(0,0,0,0.07)]'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="text-[24px] font-semibold tracking-[-0.05em]">{plan.name}</div>
                {plan.featured && (
                  <div className="rounded-full bg-[#98FE00] px-3 py-1 text-[11px] font-medium text-black">Recommended</div>
                )}
              </div>
              <p className={cn('mt-2.5 text-[13px] leading-[1.70]', plan.featured ? 'text-white/52' : 'text-[#797979]')}>{plan.desc}</p>

              <div className="mt-7 flex items-end gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${plan.name}-${yearly}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: E_OUT }}
                    className="text-[44px] font-semibold leading-none tracking-[-0.06em]"
                  >
                    {getPrice(plan)}
                  </motion.div>
                </AnimatePresence>
                {getPrice(plan) !== 'Custom' && (
                  <div className={cn('pb-1.5 text-[12px]', plan.featured ? 'text-white/44' : 'text-black/38')}>/&nbsp;mo</div>
                )}
              </div>
              {yearly && getPrice(plan) !== 'Custom' && (
                <div className={cn('mt-1 text-[11px]', plan.featured ? 'text-white/36' : 'text-black/36')}>
                  Billed annually
                </div>
              )}

              <div className={cn('my-6 h-px', plan.featured ? 'bg-white/10' : 'bg-black/[0.06]')} />

              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-[13px]">
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.featured ? 'text-[#98FE00]' : 'text-black/48')} strokeWidth={2.2} />
                    <span className={plan.featured ? 'text-white/82' : 'text-black/70'}>{f}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                'mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 text-[13px] font-medium transition duration-300',
                plan.featured
                  ? 'bg-white text-black hover:bg-white/93'
                  : 'bg-[#121212] text-white hover:shadow-[0_8px_22px_rgba(0,0,0,0.16)]'
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
        <div className="mb-11 border-t border-black/[0.07] pt-5">
          <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">FAQ</div>
          <h2 className="text-[42px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[70px]">
            Frequently asked.
          </h2>
        </div>
        <div className="grid gap-2.5">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.04, duration: 0.48, ease: E_OUT }}
              className="rounded-[20px] border border-black/[0.07] bg-white/84 px-6 py-5 backdrop-blur-xl transition duration-250 hover:bg-white"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 text-left"
              >
                <span className="text-[19px] font-medium leading-[1.16] tracking-[-0.036em] text-[#121212] md:text-[22px]">{item.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: E_SMOOTH }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-[18px] w-[18px] text-black/36" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: E_OUT }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[860px] pt-4 text-[14px] leading-[1.80] text-[#797979] md:text-[16px]">{item.a}</p>
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
    <SectionWrap className="bg-[#F3F3F3] pb-10 pt-2 md:pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.68, ease: E_OUT }}
          className="relative overflow-hidden rounded-[30px] bg-[#121212] px-8 py-14 text-white md:px-12 md:py-20"
        >
          <div className="pointer-events-none absolute right-[-8%] top-[-18%] h-[60%] w-[44%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.13),transparent_66%)] blur-3xl" />
          <div className="relative z-10 max-w-[820px]">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#98FE00]" />
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/38">Keystone</div>
            </div>
            <h2 className="text-[40px] font-semibold leading-[0.93] tracking-[-0.065em] md:text-[72px]">
              Clarity compounds.<br className="hidden md:block" /> So does execution.
            </h2>
            <p className="mt-5 max-w-[580px] text-[16px] leading-[1.82] text-white/56 md:text-[18px]">
              Give yourself a system that sees the day clearly, prepares you early, and keeps work moving after the meeting ends.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('pricing')}
                className="group inline-flex items-center gap-2.5 rounded-[14px] bg-white px-6 py-3.5 text-[13px] font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)]"
              >
                Request access
                <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-[14px] border border-white/11 px-6 py-3.5 text-[13px] font-medium text-white/86 transition duration-300 hover:bg-white/[0.06]">
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

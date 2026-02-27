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
const E_OUT:    [number,number,number,number] = [0.22, 1, 0.36, 1];
const E_SMOOTH: [number,number,number,number] = [0.16, 1, 0.30, 1];

// ─── Data ──────────────────────────────────────────────────────────────────────
const painSignals = [
  'Teams spend too much time on repetitive tasks.',
  'Leads slip away without consistent follow-up.',
  'Meetings happen before context is assembled.',
  'Scattered tools create blind spots and delays.',
  'Important decisions get buried in recency.',
  'Reactive work keeps replacing deliberate work.',
];

const features = [
  { idx:'01', title:'Daily Command Center', body:'A single surface for today\'s priorities, meetings, open loops, and follow-through.',           icon:Layers3      },
  { idx:'02', title:'Inbox Triage',         body:'Convert recency-driven inbox chaos into ranked actions and cleaner execution paths.',           icon:Mail         },
  { idx:'03', title:'Meeting Briefing',     body:'Arrive prepared with context, history, stakeholders, decisions, and risk signals.',            icon:CalendarDays },
  { idx:'04', title:'Follow-up Tracking',   body:'Keep promises visible after the meeting ends so important threads do not die quietly.',        icon:Clock3       },
  { idx:'05', title:'Decision Capture',     body:'Track what changed, what was decided, and what must happen next.',                            icon:FileText     },
  { idx:'06', title:'Trust & Control',      body:'Draft-first behavior, approvals, and oversight for high-context, high-stakes work.',          icon:Shield       },
];

const processSteps = [
  { idx:'01', title:'Discover', shape:'discover', body:'Keystone pulls the day into one live field of view so you can spot pressure, momentum, and hidden risk instantly.'           },
  { idx:'02', title:'Plan',     shape:'plan',     body:'It ranks what matters using timing, relationships, decision state, and execution weight — not noise.'                       },
  { idx:'03', title:'Build',    shape:'build',    body:'Before important moments, Keystone assembles briefs, talking points, past context, and the right next moves.'               },
  { idx:'04', title:'Move',     shape:'move',     body:'After every meeting or thread, execution stays visible through summaries, responsibilities, and follow-through.'            },
];

const compareKeystone = ['One place for priorities','Grounded in real context','Briefs before you ask','Follow-ups that stay alive','Execution over chatbot theater','Trust, control, and review'];
const compareOther    = ['Scattered across tools',  'Thin summaries with no depth','Reactive instead of proactive','Easy to forget what matters','Feels like another AI tab','Weak control over actions'];

const scenarios = [
  { title:'Before an investor meeting', body:'Get a one-screen brief with thread history, stakeholder context, open questions, and the smartest next move.', metric:'7 min saved'         },
  { title:'After a sales call',         body:'Capture decisions, owners, and follow-ups before the context evaporates across tools.',                         metric:'3× cleaner follow-up' },
  { title:'Start of day',               body:'Begin with the few actions that will change the day instead of drowning in recency.',                           metric:'Focus first'          },
];

const plans = [
  { name:'Personal',  mo:'$24', yr:'$19', desc:'For individual operators who want daily clarity.',             features:['Daily briefing','Inbox triage','Meeting prep','Decision log'],                                            },
  { name:'Pro',       mo:'$59', yr:'$47', desc:'For founders and operators running fast teams.',               features:['Everything in Personal','Priority intelligence','Relationship memory','Follow-up tracking'], featured:true },
  { name:'Executive', mo:'Custom', yr:'Custom', desc:'For leadership teams that need approvals and execution.',features:['Shared team views','Review workflows','Admin controls','White-glove onboarding'],                         },
];

const faqs = [
  { q:'Does Keystone act automatically?',                  a:'Keystone is built around trust. Teams can keep it draft-first, require approvals, or selectively enable actions where it makes sense.' },
  { q:'Who is it for?',                                    a:'Founders, executives, chiefs of staff, operators, and teams handling high-context work across email, meetings, and execution.'           },
  { q:'What makes it different from a generic assistant?', a:'Keystone is designed for prioritization and follow-through. It focuses on what matters, why it matters, and what should happen next.'    },
  { q:'Can teams use it together?',                        a:'Yes. Shared views, approvals, and visibility can be layered in for collaborative execution.'                                              },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function cn(...c: Array<string|false|null|undefined>) { return c.filter(Boolean).join(' '); }
function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }); }

const Container = React.forwardRef<HTMLDivElement,{className?:string;children:React.ReactNode}>(
  ({ className='', children }, ref) => <div ref={ref} className={cn('mx-auto w-full max-w-[1440px]', className)}>{children}</div>
);
Container.displayName = 'Container';

function Wrap({ id, className='', children }: { id?:string; className?:string; children:React.ReactNode }) {
  return <section id={id} className={cn('px-5 md:px-8 lg:px-12', className)}>{children}</section>;
}

// ─── HERO ASSET ────────────────────────────────────────────────────────────────
// Premium interlocking rectangular rings — gradient surfaces, highlight edges, drop shadow
function HeroAsset() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[460px] w-full items-center justify-center md:h-[560px]">
      {/* Ambient glow */}
      <motion.div
        animate={reduce ? undefined : { opacity:[0.10,0.22,0.10], scale:[1,1.06,1] }}
        transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
        className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.16),rgba(152,254,0,0.02)_58%,transparent_84%)] blur-3xl"
      />
      <motion.div
        animate={reduce ? undefined : { y:[0,-10,0] }}
        transition={{ duration:7.5, repeat:Infinity, ease:'easeInOut' }}
        className="relative z-10 w-full max-w-[600px]"
      >
        <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="w-full" style={{ filter:'drop-shadow(0 20px 48px rgba(0,0,0,0.11)) drop-shadow(0 4px 8px rgba(0,0,0,0.06))' }}>
          <defs>
            {/* Top face gradient: bright white to soft warm */}
            <linearGradient id="hg-top-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EBEBEB" />
            </linearGradient>
            {/* Side face gradient: medium gray to dark */}
            <linearGradient id="hg-side-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#D8D8D8" />
              <stop offset="100%" stopColor="#B8B8B8" />
            </linearGradient>
            <linearGradient id="hg-top-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EFEFEF" />
            </linearGradient>
            <linearGradient id="hg-side-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#D4D4D4" />
              <stop offset="100%" stopColor="#B4B4B4" />
            </linearGradient>
            {/* Inner hole face — slightly darker to recede */}
            <linearGradient id="hg-hole" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#E4E4E4" />
              <stop offset="100%" stopColor="#D0D0D0" />
            </linearGradient>
          </defs>

          {/* ── RING A (upper-right) ──────────────────────────── */}
          {/* Side / depth face — drawn below the top face for correct z */}
          <path d="M185 170 L185 200 Q185 228 211 228 L525 228 Q551 228 551 200 L551 170 L521 170 L521 200 Q521 202 519 202 L215 202 Q213 202 213 200 L213 170Z"
            fill="url(#hg-side-a)" stroke="#0E0E0E" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Top ring face — evenodd outer minus inner hole */}
          <path fillRule="evenodd"
            d="M211 44 L519 44 Q549 44 551 70 L551 170 L521 170 L521 70 Q521 68 519 68 L215 68 Q213 68 213 70 L213 170 L185 170 L185 70 Q185 44 211 44 Z
               M239 68 L491 68 Q519 68 521 94 L521 144 Q521 170 491 170 L243 170 L243 144 L489 144 Q491 144 491 140 L491 94 Q491 68 487 68 L243 68 Q239 68 239 72 L239 94 L213 94 L213 72 Q213 68 239 68 Z"
            fill="url(#hg-top-a)" stroke="#0E0E0E" strokeWidth="1.8" strokeLinejoin="round"/>
          {/* Inner hole face — visible recession */}
          <path d="M239 68 L487 68 Q491 68 491 72 L491 94 L521 94 L521 68 L491 68Z"
            fill="url(#hg-hole)" stroke="none"/>
          {/* Leading-edge highlight — thin bright line at top rim */}
          <path d="M213 44 L519 44 Q549 44 551 70 L551 72" fill="none" stroke="rgba(255,255,255,0.80)" strokeWidth="1.2"/>

          {/* ── RING B (lower-left, interlocking) ────────────── */}
          {/* Side face */}
          <path d="M48 252 L48 284 Q48 312 76 312 L390 312 Q418 312 418 284 L418 252 L388 252 L388 284 Q388 286 386 286 L80 286 Q78 286 78 284 L78 252Z"
            fill="url(#hg-side-b)" stroke="#0E0E0E" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Top ring face */}
          <path fillRule="evenodd"
            d="M76 166 L386 166 Q416 166 418 192 L418 252 L388 252 L388 192 Q388 190 386 190 L80 190 Q78 190 78 192 L78 252 L48 252 L48 192 Q48 166 76 166 Z
               M104 190 L358 190 Q388 190 388 216 L388 228 Q388 252 358 252 L108 252 L108 228 L356 228 Q358 228 358 224 L358 216 Q358 190 354 190 L108 190 Q106 190 106 194 L106 216 L78 216 L78 194 Q78 190 104 190 Z"
            fill="url(#hg-top-b)" stroke="#0E0E0E" strokeWidth="1.8" strokeLinejoin="round"/>
          {/* Leading-edge highlight */}
          <path d="M78 166 L386 166 Q416 166 418 192 L418 194" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="1.2"/>

          {/* Interlock bridge: Ring A's vertical arm passes through Ring B */}
          <rect x="185" y="170" width="28" height="22" fill="url(#hg-top-a)"/>
          <line x1="185" y1="170" x2="185" y2="192" stroke="#0E0E0E" strokeWidth="1.8"/>
          <line x1="213" y1="170" x2="213" y2="190" stroke="#0E0E0E" strokeWidth="1.8"/>

          {/* Corner accent — lime dot */}
          <circle cx="551" cy="44" r="5" fill="#98FE00" stroke="#0E0E0E" strokeWidth="1.2"/>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── WORKFLOW ASSETS — premium gradient illustration family ───────────────────

// 01 DISCOVER — precision magnifier with lime lens ring
function DiscoverAsset() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y:[0,-8,0] }}
      transition={{ duration:6.4, repeat:Infinity, ease:'easeInOut' }}
      className="relative flex h-[320px] w-[320px] items-center justify-center md:h-[400px] md:w-[400px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.24),rgba(152,254,0,0.02)_56%,transparent_84%)] blur-2xl"/>
      <svg viewBox="0 0 300 310" fill="none" className="relative z-10 w-[78%]"
        style={{ filter:'drop-shadow(0 14px 32px rgba(0,0,0,0.10))' }}>
        <defs>
          <linearGradient id="dsc-lime-top" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%"   stopColor="#B4FF20"/>
            <stop offset="100%" stopColor="#7ED600"/>
          </linearGradient>
          <linearGradient id="dsc-lime-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7ACC00"/>
            <stop offset="100%" stopColor="#5C9E00"/>
          </linearGradient>
          <linearGradient id="dsc-lens-top" x1="0.3" y1="0.1" x2="0.7" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF"/>
            <stop offset="60%"  stopColor="#F4F4F4"/>
            <stop offset="100%" stopColor="#E8E8E8"/>
          </linearGradient>
          <linearGradient id="dsc-handle-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3A3A3A"/>
            <stop offset="100%" stopColor="#1A1A1A"/>
          </linearGradient>
          <linearGradient id="dsc-handle-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#242424"/>
            <stop offset="100%" stopColor="#0E0E0E"/>
          </linearGradient>
        </defs>
        {/* Handle side depth */}
        <path d="M193 224 L211 244 L225 232 L207 212Z" fill="url(#dsc-handle-side)" stroke="#0E0E0E" strokeWidth="1.4" strokeLinejoin="round"/>
        {/* Handle top */}
        <path d="M180 212 L198 232 L211 220 L193 200Z" fill="url(#dsc-handle-top)" stroke="#0E0E0E" strokeWidth="1.4" strokeLinejoin="round"/>
        {/* Neck connector */}
        <path d="M162 196 L174 208 Q180 214 186 209 L180 200 Q174 191 165 194Z" fill="#555" stroke="#0E0E0E" strokeWidth="1.3"/>
        {/* Lime ring — side depth */}
        <ellipse cx="118" cy="144" rx="90" ry="57" fill="url(#dsc-lime-side)" stroke="#0E0E0E" strokeWidth="1.5"/>
        {/* Lime ring — top face */}
        <ellipse cx="118" cy="122" rx="90" ry="57" fill="url(#dsc-lime-top)" stroke="#0E0E0E" strokeWidth="1.8"/>
        {/* Lens — side depth */}
        <ellipse cx="118" cy="144" rx="66" ry="42" fill="#C4E880" stroke="#0E0E0E" strokeWidth="1.2"/>
        {/* Lens — top face */}
        <ellipse cx="118" cy="122" rx="66" ry="42" fill="url(#dsc-lens-top)" stroke="#0E0E0E" strokeWidth="1.5"/>
        {/* Lens highlight — specular */}
        <ellipse cx="96" cy="106" rx="18" ry="12" fill="rgba(255,255,255,0.68)"/>
        <ellipse cx="138" cy="130" rx="8"  ry="5"  fill="rgba(255,255,255,0.32)"/>
        {/* Lime ring highlight edge */}
        <path d="M36 104 Q60 68 118 66 Q176 64 200 100" fill="none" stroke="rgba(200,255,80,0.45)" strokeWidth="1.4"/>
      </svg>
    </motion.div>
  );
}

// 02 PLAN — schematic layered board with nodes
function PlanAsset() {
  return (
    <div className="relative flex h-[300px] w-[340px] items-center justify-center md:h-[380px] md:w-[440px]">
      <svg viewBox="0 0 440 340" fill="none" className="w-full"
        style={{ filter:'drop-shadow(0 12px 28px rgba(0,0,0,0.09))' }}>
        <defs>
          <linearGradient id="plan-board-top" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#EBEBEB"/>
          </linearGradient>
          <linearGradient id="plan-board-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D8D8D8"/>
            <stop offset="100%" stopColor="#BCBCBC"/>
          </linearGradient>
          <linearGradient id="plan-node" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#E8E8E8"/>
          </linearGradient>
          <linearGradient id="plan-accent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#B4FF20"/>
            <stop offset="100%" stopColor="#88D400"/>
          </linearGradient>
        </defs>

        {/* Main board — side depth */}
        <path d="M30 188 L30 226 Q30 254 58 254 L382 254 Q410 254 410 226 L410 188 L380 188 L380 226 Q380 228 376 228 L62 228 Q60 228 60 226 L60 188Z"
          fill="url(#plan-board-side)" stroke="#0E0E0E" strokeWidth="1.4" strokeLinejoin="round"/>
        {/* Main board — top face */}
        <path d="M58 100 L376 100 Q406 100 410 126 L410 188 L380 188 L380 126 Q380 124 376 124 L62 124 Q60 124 60 126 L60 188 L30 188 L30 126 Q30 100 58 100Z"
          fill="url(#plan-board-top)" stroke="#0E0E0E" strokeWidth="1.6" strokeLinejoin="round"/>
        {/* Board inner ruled lines — subtle grid */}
        {[148,162,176].map(y => (
          <line key={y} x1="75" y1={y} x2="365" y2={y} stroke="#E0E0E0" strokeWidth="0.8"/>
        ))}
        {/* Connector lines */}
        <line x1="112" y1="136" x2="200" y2="136" stroke="#C8C8C8" strokeWidth="1.2"/>
        <line x1="200" y1="136" x2="290" y2="136" stroke="#98FE00" strokeWidth="1.4"/>
        <line x1="290" y1="136" x2="365" y2="136" stroke="#C8C8C8" strokeWidth="1.2"/>
        {/* Node A — side */}
        <ellipse cx="112" cy="155" rx="26" ry="17" fill="#D0D0D0" stroke="#0E0E0E" strokeWidth="1.2"/>
        {/* Node A — top */}
        <ellipse cx="112" cy="138" rx="26" ry="17" fill="url(#plan-node)" stroke="#0E0E0E" strokeWidth="1.4"/>
        {/* Node B — accent (lime) */}
        <ellipse cx="220" cy="157" rx="26" ry="17" fill="#7ACC00" stroke="#0E0E0E" strokeWidth="1.2"/>
        <ellipse cx="220" cy="140" rx="26" ry="17" fill="url(#plan-accent)" stroke="#0E0E0E" strokeWidth="1.4"/>
        <ellipse cx="214" cy="135" rx="8"  ry="5"  fill="rgba(255,255,255,0.45)"/>
        {/* Node C — side */}
        <ellipse cx="328" cy="155" rx="26" ry="17" fill="#D0D0D0" stroke="#0E0E0E" strokeWidth="1.2"/>
        {/* Node C — top */}
        <ellipse cx="328" cy="138" rx="26" ry="17" fill="url(#plan-node)" stroke="#0E0E0E" strokeWidth="1.4"/>

        {/* Top board highlight */}
        <path d="M62 100 L376 100 Q406 100 410 126 L410 128" fill="none" stroke="rgba(255,255,255,0.70)" strokeWidth="1.2"/>
      </svg>
    </div>
  );
}

// 03 BUILD — layered document stack
function BuildAsset() {
  return (
    <div className="relative flex h-[300px] w-[340px] items-center justify-center md:h-[380px] md:w-[430px]">
      <svg viewBox="0 0 430 330" fill="none" className="w-full"
        style={{ filter:'drop-shadow(0 12px 28px rgba(0,0,0,0.09))' }}>
        <defs>
          <linearGradient id="bld-top-1" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#EBEBEB"/>
          </linearGradient>
          <linearGradient id="bld-top-2" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%"   stopColor="#F6F6F6"/>
            <stop offset="100%" stopColor="#E2E2E2"/>
          </linearGradient>
          <linearGradient id="bld-top-3" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%"   stopColor="#F0F0F0"/>
            <stop offset="100%" stopColor="#DADADA"/>
          </linearGradient>
          <linearGradient id="bld-side-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D6D6D6"/>
            <stop offset="100%" stopColor="#B8B8B8"/>
          </linearGradient>
          <linearGradient id="bld-side-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#C8C8C8"/>
            <stop offset="100%" stopColor="#ABABAB"/>
          </linearGradient>
          <linearGradient id="bld-lime-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#98FE00"/>
            <stop offset="100%" stopColor="#6FC800"/>
          </linearGradient>
        </defs>

        {/* Layer 3 (bottom) — side */}
        <path d="M60 222 L60 250 Q60 272 84 272 L370 272 Q394 272 394 250 L394 222 L366 222 L366 250 Q366 250 364 250 L88 250 Q86 250 86 248 L86 222Z"
          fill="url(#bld-side-2)" stroke="#0E0E0E" strokeWidth="1.3" strokeLinejoin="round"/>
        {/* Layer 3 — top */}
        <path d="M84 194 L364 194 Q390 194 394 216 L394 222 L366 222 L366 216 Q366 216 364 216 L88 216 Q86 216 86 218 L86 222 L60 222 L60 218 Q60 194 84 194Z"
          fill="url(#bld-top-3)" stroke="#0E0E0E" strokeWidth="1.4" strokeLinejoin="round"/>
        {/* Layer 3 rule lines */}
        <line x1="102" y1="202" x2="262" y2="202" stroke="#D4D4D4" strokeWidth="0.9"/>
        <line x1="102" y1="210" x2="210" y2="210" stroke="#D4D4D4" strokeWidth="0.9"/>

        {/* Layer 2 (middle) — side */}
        <path d="M40 170 L40 200 Q40 224 66 224 L380 224 Q406 224 406 200 L406 170 L378 170 L378 200 Q378 202 374 202 L70 202 Q68 202 68 200 L68 170Z"
          fill="url(#bld-side-1)" stroke="#0E0E0E" strokeWidth="1.3" strokeLinejoin="round"/>
        {/* Layer 2 — top */}
        <path d="M66 140 L374 140 Q402 140 406 164 L406 170 L378 170 L378 164 Q378 164 374 164 L70 164 Q68 164 68 166 L68 170 L40 170 L40 166 Q40 140 66 140Z"
          fill="url(#bld-top-2)" stroke="#0E0E0E" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Layer 2 rule lines */}
        <line x1="84" y1="149" x2="290" y2="149" stroke="#D0D0D0" strokeWidth="0.9"/>
        <line x1="84" y1="157" x2="226" y2="157" stroke="#D0D0D0" strokeWidth="0.9"/>
        {/* Layer 2 accent lime pill */}
        <rect x="84" y="150" width="56" height="8" rx="4" fill="url(#bld-lime-line)" opacity="0.85"/>

        {/* Layer 1 (top) — side */}
        <path d="M20 116 L20 148 Q20 174 48 174 L390 174 Q418 174 418 148 L418 116 L388 116 L388 148 Q388 150 384 150 L52 150 Q50 150 50 148 L50 116Z"
          fill="url(#bld-side-1)" stroke="#0E0E0E" strokeWidth="1.4" strokeLinejoin="round"/>
        {/* Layer 1 — top face */}
        <path d="M48 84 L384 84 Q414 84 418 110 L418 116 L388 116 L388 110 Q388 108 384 108 L52 108 Q50 108 50 110 L50 116 L20 116 L20 110 Q20 84 48 84Z"
          fill="url(#bld-top-1)" stroke="#0E0E0E" strokeWidth="1.6" strokeLinejoin="round"/>
        {/* Layer 1 content */}
        <line x1="66" y1="94"  x2="318" y2="94"  stroke="#C8C8C8" strokeWidth="1.0"/>
        <line x1="66" y1="103" x2="248" y2="103" stroke="#DEDEDE" strokeWidth="0.9"/>
        {/* Top layer leading highlight */}
        <path d="M52 84 L384 84 Q414 84 418 110 L418 112" fill="none" stroke="rgba(255,255,255,0.78)" strokeWidth="1.3"/>
      </svg>
    </div>
  );
}

// 04 MOVE — launch platform with directional momentum
function MoveAsset() {
  return (
    <div className="relative flex h-[280px] w-[360px] items-center justify-center md:h-[350px] md:w-[450px]">
      <svg viewBox="0 0 450 300" fill="none" className="w-full"
        style={{ filter:'drop-shadow(0 12px 28px rgba(0,0,0,0.09))' }}>
        <defs>
          <linearGradient id="mv-top" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#EBEBEB"/>
          </linearGradient>
          <linearGradient id="mv-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D4D4D4"/>
            <stop offset="100%" stopColor="#B4B4B4"/>
          </linearGradient>
          <linearGradient id="mv-arrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#98FE00"/>
            <stop offset="100%" stopColor="#6FC800"/>
          </linearGradient>
          <linearGradient id="mv-arrow-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6FC800"/>
            <stop offset="100%" stopColor="#4E9600"/>
          </linearGradient>
        </defs>

        {/* Platform — side depth */}
        <path d="M40 184 L40 224 Q40 252 68 252 L382 252 Q410 252 410 224 L410 184 L380 184 L380 224 Q380 226 376 226 L72 226 Q70 226 70 224 L70 184Z"
          fill="url(#mv-side)" stroke="#0E0E0E" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Platform — top face */}
        <path d="M68 88 L376 88 Q406 88 410 114 L410 184 L380 184 L380 114 Q380 112 376 112 L72 112 Q70 112 70 114 L70 184 L40 184 L40 114 Q40 88 68 88Z"
          fill="url(#mv-top)" stroke="#0E0E0E" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* Inner bezel */}
        <rect x="82" y="102" width="286" height="86" rx="16" fill="none" stroke="#D8D8D8" strokeWidth="1.0"/>
        {/* Arrow shaft — side */}
        <rect x="130" y="174" width="160" height="14" rx="5" fill="#4A9600" stroke="#0E0E0E" strokeWidth="1.2"/>
        {/* Arrow shaft — top */}
        <rect x="130" y="158" width="160" height="18" rx="6" fill="url(#mv-arrow)" stroke="#0E0E0E" strokeWidth="1.4"/>
        {/* Arrow head — side depth */}
        <polygon points="286,180 286,196 330,188" fill="#3A8000" stroke="#0E0E0E" strokeWidth="1.2" strokeLinejoin="round"/>
        {/* Arrow head — top */}
        <polygon points="286,152 286,168 330,160" fill="url(#mv-arrow)" stroke="#0E0E0E" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Arrow shaft highlight */}
        <rect x="134" y="159" width="144" height="4" rx="2" fill="rgba(200,255,60,0.55)"/>
        {/* Platform top highlight */}
        <path d="M72 88 L376 88 Q406 88 410 114 L410 116" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="1.2"/>
      </svg>
    </div>
  );
}

function ProcessAsset({ shape }: { shape:string }) {
  if (shape==='discover') return <DiscoverAsset/>;
  if (shape==='plan')     return <PlanAsset/>;
  if (shape==='build')    return <BuildAsset/>;
  return <MoveAsset/>;
}

// ─── Extracted step wrappers — fix hooks-in-loop ──────────────────────────────
function AssetStep({ smooth, i, shape }: { smooth:MotionValue<number>; i:number; shape:string }) {
  const s = i * 0.25, e = Math.min(s + 0.25, 1);
  const opacity = useTransform(smooth, [s, s+0.07, e-0.08, e], [0,1,1,0]);
  const scale   = useTransform(smooth, [s, s+0.07, e], [0.97,1,1.015]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center">
      <ProcessAsset shape={shape}/>
    </motion.div>
  );
}

function TextStep({ smooth, i, step }: { smooth:MotionValue<number>; i:number; step:typeof processSteps[0] }) {
  const s = i * 0.25, e = Math.min(s + 0.25, 1);
  const opacity = useTransform(smooth, [s, s+0.08, e-0.09, e], [0,1,1,0]);
  const y       = useTransform(smooth, [s, s+0.10, e], [20,0,-8]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex max-w-[600px] flex-col justify-center">
      <span className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-black/40">
        <span className="h-px w-5 bg-black/20"/>Step {step.idx}
      </span>
      <h2 className="text-[52px] font-semibold leading-[0.91] tracking-[-0.068em] text-[#121212] md:text-[76px]">
        {step.title}
      </h2>
      <p className="mt-5 max-w-[500px] text-[17px] leading-[1.82] text-[#797979] md:text-[18px]">
        {step.body}
      </p>
    </motion.div>
  );
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────
function Boot({ onDone }: { onDone:()=>void }) {
  useEffect(() => { const t = setTimeout(onDone, 1900); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div initial={{ opacity:1 }} exit={{ opacity:0, transition:{ duration:0.6, ease:E_OUT } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-7">
        <motion.div initial={{ opacity:0, y:16, filter:'blur(10px)' }} animate={{ opacity:1, y:0, filter:'blur(0px)' }}
          transition={{ duration:0.85, ease:E_OUT }} className="flex flex-col items-center gap-3">
          <div className="h-px w-10 bg-[#98FE00]"/>
          <div className="text-[58px] font-semibold tracking-[-0.07em] text-white md:text-[78px]">Keystone</div>
        </motion.div>
        <div className="relative h-px w-56 overflow-hidden rounded-full bg-white/8">
          <motion.div initial={{ x:'-100%' }} animate={{ x:'160%' }}
            transition={{ duration:1.05, repeat:1, repeatDelay:0.08, ease:'easeInOut' }}
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#98FE00] to-transparent"/>
        </div>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:[0,0.45,0.18,0.50,0.28] }}
          transition={{ duration:1.5, delay:0.25 }}
          className="text-[10px] uppercase tracking-[0.40em] text-white/36">
          Command layer initializing
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div className={cn('sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#F3F3F3]/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.055)]' : 'bg-transparent')}>
      <Container className="flex items-center justify-between px-5 py-3.5 md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="h-[17px] w-[17px] rounded-full bg-[#98FE00]"/>
          <span className="text-[20px] font-semibold tracking-[-0.055em] text-[#121212]">Keystone</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {[['Product','capabilities'],['Workflow','workflow'],['Security','proof'],['Pricing','pricing']].map(([l,id]) => (
            <button key={l} onClick={()=>scrollTo(id)}
              className="text-[13px] font-medium text-[#797979] transition-colors duration-200 hover:text-[#121212]">{l}</button>
          ))}
        </nav>
        <button onClick={()=>scrollTo('pricing')}
          className="group flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.09)]">
          Request access<ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5"/>
        </button>
      </Container>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement|null>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] });
  const titleY       = useTransform(scrollYProgress, [0,1],    [0,50]);
  const titleOpacity = useTransform(scrollYProgress, [0,0.82], [1,0.36]);

  return (
    <Wrap className="relative overflow-hidden bg-[#F3F3F3] pb-20 pt-6 md:pb-28 md:pt-10">
      <Container ref={ref} className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
        <motion.div style={{ y:titleY, opacity:titleOpacity }} className="relative z-10 flex flex-col">
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.08, duration:0.6, ease:E_OUT }}
            className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#797979]">
            <span className="h-px w-5 bg-[#98FE00]"/>AI executive command center
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.16, duration:0.75, ease:E_OUT }}
            className="max-w-[600px] text-[50px] font-semibold leading-[0.91] tracking-[-0.07em] text-[#121212] md:text-[74px] lg:text-[88px]">
            Run the day with clarity,{' '}
            <span className="text-[#797979]">not noise.</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.26, duration:0.65, ease:E_OUT }}
            className="mt-6 max-w-[480px] text-[17px] leading-[1.80] text-[#797979] md:text-[18px]">
            Keystone turns inboxes, meetings, follow-ups, and decisions into one calm operating layer for founders and operators.
          </motion.p>

          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.34, duration:0.58, ease:E_OUT }}
            className="mt-8 flex flex-wrap gap-3">
            <button onClick={()=>scrollTo('pricing')}
              className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#121212] px-6 py-3.5 text-[13px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.20)]">
              Request access<ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5"/>
            </button>
            <button onClick={()=>scrollTo('workflow')}
              className="inline-flex items-center gap-2 rounded-[14px] border border-black/10 bg-white/80 px-6 py-3.5 text-[13px] font-medium text-[#121212] backdrop-blur transition duration-300 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)]">
              See product story
            </button>
          </motion.div>

          <div className="mt-10 grid max-w-[500px] grid-cols-3 gap-2.5">
            {[{big:'4.2×',small:'Faster follow-through'},{big:'68%',small:'Less context switching'},{big:'1 view',small:'For the day ahead'}].map(({big,small},i)=>(
              <motion.div key={big} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.44+i*0.08, duration:0.52, ease:E_OUT }}
                className="rounded-[18px] border border-black/[0.07] bg-white/80 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] md:p-5">
                <div className="text-[24px] font-semibold tracking-[-0.05em] text-[#121212] md:text-[28px]">{big}</div>
                <div className="mt-1 text-[12px] leading-[1.5] text-[#797979]">{small}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 lg:pl-2"><HeroAsset/></div>
      </Container>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(152,254,0,0.10),transparent_18%),radial-gradient(circle_at_5%_94%,rgba(79,112,122,0.06),transparent_16%)]"/>
    </Wrap>
  );
}

// ─── PAIN ─────────────────────────────────────────────────────────────────────
// Redesigned: headline dominates top-center; cards form a single scrolling list
// on the bottom-left quadrant, sequentially stacking in — headline is never touched.
function PainSection() {
  const ref = useRef<HTMLDivElement|null>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness:68, damping:22, mass:0.26 });
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    return smooth.on('change', (v) => {
      const count = Math.max(0, Math.min(painSignals.length, Math.floor(v * painSignals.length * 1.2)));
      setVisible(Array.from({ length:count }, (_,i)=>i));
    });
  }, [smooth]);

  return (
    <Wrap className="bg-[#F3F3F3] py-14 md:py-20">
      <Container>
        <div ref={ref} className="relative h-[240vh]">
          <div className="sticky top-[56px] flex h-[calc(100vh-56px)] flex-col items-center justify-start overflow-hidden rounded-[2.6rem] bg-[#EDEDED] pt-[10vh]">

            {/* Headline — top center, never overlapped */}
            <div className="relative z-20 max-w-[900px] px-8 text-center">
              <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-black/40">The real problem</div>
              <h2 className="text-[40px] font-semibold leading-[0.93] tracking-[-0.065em] text-[#121212] md:text-[72px] lg:text-[86px]">
                Eliminate the bottlenecks<br className="hidden md:block"/> that hold you back.
              </h2>
            </div>

            {/* Signal list — below headline in a clean column */}
            <div className="relative z-10 mt-10 w-full max-w-[520px] px-6">
              <div className="flex flex-col gap-2.5">
                {painSignals.map((text, i) => (
                  <motion.div key={text}
                    initial={{ opacity:0, y:10, filter:'blur(4px)' }}
                    animate={visible.includes(i)
                      ? { opacity:1, y:0, filter:'blur(0px)' }
                      : { opacity:0, y:10, filter:'blur(4px)' }}
                    transition={{ duration:0.44, ease:E_OUT }}
                    className="flex items-center gap-3 rounded-[12px] border border-black/[0.07] bg-white/90 px-4 py-3 text-[13px] font-medium text-[#121212]/72 shadow-[0_4px_16px_rgba(0,0,0,0.05)] backdrop-blur-md"
                  >
                    <CircleAlert className="h-3.5 w-3.5 shrink-0 text-[#FF9500]"/>
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </Wrap>
  );
}

// ─── CAPABILITIES ─────────────────────────────────────────────────────────────
function Capabilities() {
  return (
    <Wrap id="capabilities" className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 grid gap-6 border-t border-black/[0.07] pt-5 md:grid-cols-[1.12fr_0.88fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Capabilities</div>
            <h2 className="max-w-[780px] text-[40px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[66px]">
              A calmer system for high-stakes work.
            </h2>
          </div>
          <p className="max-w-[460px] justify-self-end text-[15px] leading-[1.82] text-[#797979]">
            Keystone is designed to reduce friction across the moments that decide whether work actually moves.
          </p>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-black/[0.07]">
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              const isLast = i === features.length - 1;
              return (
                <motion.div key={feat.title}
                  initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                  viewport={{ once:true, amount:0.12 }}
                  transition={{ delay:i*0.04, duration:0.48, ease:E_OUT }}
                  className={cn(
                    'group relative flex flex-col bg-white p-7 transition duration-300 hover:bg-[#FAFAFA]',
                    // right border for all except last in each row
                    'border-b border-black/[0.07]',
                    // remove bottom border on last row (xl: last 3, md: last 2)
                    isLast && 'xl:border-b-0',
                    i >= 4 && 'md:border-b-0 xl:border-b',
                    i >= 3 && 'xl:border-b-0',
                    // right borders
                    'md:border-r md:last:border-r-0',
                    '[&:nth-child(2n)]:md:border-r-0 xl:[&:nth-child(2n)]:border-r',
                    '[&:nth-child(3n)]:xl:border-r-0',
                  )}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] border border-black/[0.07] bg-[#F8F8F8] transition duration-300 group-hover:border-[#98FE00]/30 group-hover:bg-[#F4FFD8]">
                      <Icon className="h-[21px] w-[21px] text-[#121212]" strokeWidth={1.6}/>
                    </div>
                    <span className="font-mono text-[11px] text-black/18">{feat.idx}</span>
                  </div>
                  <h3 className="text-[20px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#121212]">{feat.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.74] text-[#797979]">{feat.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Wrap>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
function ProcessPinned() {
  const ref = useRef<HTMLDivElement|null>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness:68, damping:22, mass:0.26 });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    return smooth.on('change', (v) => setCur(v<0.25?0:v<0.5?1:v<0.75?2:3));
  }, [smooth]);

  return (
    <Wrap id="workflow" className="bg-[#F3F3F3] py-10 md:py-14">
      <Container>
        <div className="mb-6 flex items-center justify-between border-t border-black/[0.07] pt-5">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#797979]">Workflow</div>
          <div className="flex items-center gap-1.5">
            {processSteps.map((_,i) => (
              <motion.div key={i}
                animate={{ width:cur===i?22:5, backgroundColor:cur===i?'#121212':'#D0D0D0' }}
                transition={{ duration:0.30, ease:E_SMOOTH }}
                className="h-[4px] rounded-full"
              />
            ))}
          </div>
        </div>
      </Container>

      <div ref={ref} className="relative h-[340vh]">
        <div className="sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden">
          <Container className="grid h-full items-center gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Asset panel */}
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute left-0 top-[4%] select-none font-semibold leading-none tracking-[-0.05em] text-black/[0.04]"
                style={{ fontSize:'clamp(80px, 12vw, 140px)' }}>
                0{cur+1}
              </div>
              <div className="relative h-[300px] w-[320px] md:h-[380px] md:w-[430px]">
                {processSteps.map((s,i) => <AssetStep key={s.title} smooth={smooth} i={i} shape={s.shape}/>)}
              </div>
            </div>
            {/* Text panel */}
            <div className="relative h-[320px] md:h-[400px]">
              {processSteps.map((s,i) => <TextStep key={s.title} smooth={smooth} i={i} step={s}/>)}
            </div>
          </Container>
        </div>
      </div>
    </Wrap>
  );
}

// ─── COMPARISON ───────────────────────────────────────────────────────────────
function HorizontalComparison() {
  const ref = useRef<HTMLDivElement|null>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness:68, damping:22, mass:0.26 });
  const x = useTransform(smooth, [0,1], ['0vw','-100vw']);

  return (
    <Wrap className="bg-white py-20 md:py-28">
      <Container>
        <div className="border-t border-black/[0.07] pt-5">
          <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Comparison</div>
          <h2 className="max-w-[820px] text-[40px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[72px]">
            The difference is obvious.
          </h2>
        </div>
      </Container>

      <div ref={ref} className="relative mt-8 h-[240vh]">
        <div className="sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden">
          <motion.div style={{ x }} className="flex h-full">

            {/* Panel 1: vs comparison */}
            <div className="flex h-full w-screen shrink-0 items-center px-5 md:px-8 lg:px-12">
              <Container className="grid w-full items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
                <div>
                  <p className="max-w-[420px] text-[16px] leading-[1.82] text-[#797979] md:text-[18px]">
                    Move from scattered, reactive work toward a system that prepares you early and keeps execution visible.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] bg-[#121212] p-7 text-white shadow-[0_24px_72px_rgba(0,0,0,0.18)]">
                    <div className="mb-2 h-px w-7 bg-[#98FE00]"/>
                    <div className="mb-6 mt-4 text-[24px] font-semibold tracking-[-0.05em]">Keystone</div>
                    <div className="space-y-3.5">
                      {compareKeystone.map(r=>(
                        <div key={r} className="flex items-start gap-3 text-[13px] text-white/84">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#98FE00]" strokeWidth={2}/>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-black/[0.07] bg-[#F5F5F5] p-7">
                    <div className="mb-2 h-px w-7 bg-black/18"/>
                    <div className="mb-6 mt-4 text-[24px] font-semibold tracking-[-0.05em] text-black">Typical tools</div>
                    <div className="space-y-3.5">
                      {compareOther.map(r=>(
                        <div key={r} className="flex items-start gap-3 text-[13px] text-black/48">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-black/20" strokeWidth={2}/>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            {/* Panel 2: outcome */}
            <div className="flex h-full w-screen shrink-0 items-center px-5 md:px-8 lg:px-12">
              <Container className="grid w-full items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="max-w-[440px]">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.26em] text-black/34">What this changes</div>
                  <h3 className="text-[34px] font-semibold leading-[0.96] tracking-[-0.06em] text-[#121212] md:text-[52px]">
                    Fewer tabs. Fewer dropped threads. More momentum.
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.80] text-[#797979]">
                    Keystone replaces the daily scramble with a system that knows what matters and keeps it visible.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { title:'Before meetings', desc:'Briefing comes to you. Every time.', accent:true  },
                    { title:'After decisions',  desc:'Owners stay visible. Threads stay alive.',        },
                    { title:'Across the day',   desc:'Priority stays stable. Not recency-driven.',     },
                  ].map(({ title, desc, accent }, i) => (
                    <div key={title} className={cn(
                      'rounded-[20px] border p-6 transition duration-300 hover:-translate-y-1',
                      accent
                        ? 'border-[#98FE00]/30 bg-[#F4FFD8] hover:shadow-[0_10px_32px_rgba(152,254,0,0.12)]'
                        : 'border-black/[0.07] bg-white hover:shadow-[0_10px_32px_rgba(0,0,0,0.07)]'
                    )}>
                      <div className="mb-2.5 h-px w-5 bg-[#98FE00]"/>
                      <div className="text-[19px] font-semibold tracking-[-0.042em] text-[#121212]">{title}</div>
                      <div className="mt-2 text-[13px] leading-[1.70] text-[#797979]">{desc}</div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </motion.div>
        </div>
      </div>
    </Wrap>
  );
}

// ─── DASHBOARD MOCK ───────────────────────────────────────────────────────────
function DashboardMock() {
  const reduce = useReducedMotion();
  const rows = [
    { label:'Reply to Nadia — term sheet',  tag:'Needs call prep',   dot:'#FF9500' },
    { label:'Investor board notes',          tag:'7 points surfaced', dot:'#98FE00' },
    { label:'Follow up with Pine Ridge',     tag:'2 days idle',       dot:'#FF9500' },
    { label:'Draft to leadership team',      tag:'Approval needed',   dot:'#A0A0A0' },
  ];
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_28px_88px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-black/30">Today — Feb 27</div>
          <div className="mt-1 text-[22px] font-semibold tracking-[-0.055em] text-black">Command Center</div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#98FE00]/24 bg-[#EDFFC0] px-3 py-1.5 text-[11px] font-medium text-black/66">
          <span className="h-1.5 w-1.5 rounded-full bg-[#98FE00]"/>High leverage
        </div>
      </div>
      <div className="grid gap-4 p-5 lg:grid-cols-[0.94fr_1.06fr]">
        <div className="space-y-2.5">
          <div className="rounded-[17px] bg-[#121212] p-5 text-white">
            <div className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.20em] text-white/38">
              <Sparkles className="h-3 w-3"/>Brief ready
            </div>
            <div className="space-y-2 text-[12.5px] leading-[1.76] text-white/80">
              <p>Board review in 43 minutes.</p>
              <p>Nadia will push on rollout timing and support ownership.</p>
              <p className="flex items-start gap-2">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#98FE00]"/>
                Confirm launch owner first, then show revised timeline.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[['Open loops','12'],['Decisions','4']].map(([l,v])=>(
              <div key={l} className="rounded-[15px] border border-black/[0.06] bg-[#F8F8F8] p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] text-black/30">{l}</div>
                <div className="mt-1.5 text-[28px] font-semibold leading-none tracking-[-0.06em] text-black">{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {rows.map((r,i)=>(
            <motion.div key={r.label}
              animate={reduce?undefined:{ x:[0,i%2?1.5:-1.5,0] }}
              transition={{ duration:5+i*0.8, repeat:Infinity, ease:'easeInOut' }}
              className="flex items-center justify-between rounded-[15px] border border-black/[0.05] bg-[#F8F8F8] px-4 py-3 transition duration-250 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor:r.dot }}/>
                <span className="text-[12.5px] font-medium text-black/80">{r.label}</span>
              </div>
              <span className="text-[11px] text-black/34">{r.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROOF ────────────────────────────────────────────────────────────────────
function ProofScenarios() {
  return (
    <Wrap id="proof" className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 grid gap-6 border-t border-black/[0.07] pt-5 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Product proof</div>
            <h2 className="max-w-[780px] text-[38px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[64px]">
              Designed around real moments that matter.
            </h2>
          </div>
          <p className="max-w-[460px] justify-self-end text-[15px] leading-[1.82] text-[#797979]">
            Keystone is strongest before a meeting, after a decision, and during the messy middle of execution.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.22fr_0.78fr]">
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.12 }} transition={{ duration:0.65, ease:E_OUT }}>
            <DashboardMock/>
          </motion.div>
          <div className="flex flex-col gap-4">
            {scenarios.map((s,i)=>(
              <motion.div key={s.title}
                initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }} transition={{ delay:i*0.07, duration:0.52, ease:E_OUT }}
                className="flex-1 rounded-[20px] border border-black/[0.07] bg-white/84 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[19px] font-semibold leading-[1.10] tracking-[-0.038em] text-[#121212]">{s.title}</h3>
                  <span className="mt-0.5 shrink-0 rounded-full bg-[#121212] px-3 py-1 text-[11px] font-medium text-white">{s.metric}</span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.76] text-[#797979]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Wrap>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing() {
  const [yr, setYr] = useState(false);
  const getPrice = (p: typeof plans[0]) => yr ? p.yr : p.mo;

  return (
    <Wrap id="pricing" className="bg-[#F3F3F3] py-16 md:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-8 border-t border-black/[0.07] pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#797979]">Pricing</div>
            <h2 className="text-[40px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#121212] md:text-[68px]">Choose your plan.</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={cn('text-[13px] transition-colors', !yr?'text-[#121212]':'text-[#797979]')}>Monthly</span>
            <button onClick={()=>setYr(!yr)}
              className={cn('relative h-7 w-12 rounded-full border transition-colors duration-300', yr?'border-[#98FE00] bg-[#98FE00]':'border-black/14 bg-white')}>
              <motion.div animate={{ x:yr?20:2 }} transition={{ duration:0.25, ease:E_SMOOTH }}
                className="absolute top-1 h-5 w-5 rounded-full bg-[#121212] shadow-sm"/>
            </button>
            <div className="flex items-center gap-2">
              <span className={cn('text-[13px] transition-colors', yr?'text-[#121212]':'text-[#797979]')}>Yearly</span>
              <AnimatePresence>
                {yr && (
                  <motion.span initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.88 }}
                    transition={{ duration:0.20, ease:E_OUT }}
                    className="rounded-full bg-[#E6FFC0] px-2 py-0.5 text-[11px] font-medium text-black/68">Save 20%</motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan,i)=>(
            <motion.div key={plan.name} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.08 }} transition={{ delay:i*0.07, duration:0.58, ease:E_OUT }}
              className={cn('rounded-[24px] border p-7 transition duration-350',
                plan.featured
                  ? 'border-[#121212] bg-[#121212] text-white shadow-[0_24px_72px_rgba(0,0,0,0.18)]'
                  : 'border-black/[0.07] bg-white/84 text-black backdrop-blur-xl hover:-translate-y-1.5 hover:shadow-[0_18px_56px_rgba(0,0,0,0.07)]')}>
              <div className="flex items-center justify-between">
                <div className="text-[22px] font-semibold tracking-[-0.05em]">{plan.name}</div>
                {plan.featured && <div className="rounded-full bg-[#98FE00] px-3 py-1 text-[11px] font-medium text-black">Recommended</div>}
              </div>
              <p className={cn('mt-2.5 text-[13px] leading-[1.68]', plan.featured?'text-white/50':'text-[#797979]')}>{plan.desc}</p>
              <div className="mt-7 flex items-end gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.div key={`${plan.name}-${yr}`}
                    initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-5 }}
                    transition={{ duration:0.18, ease:E_OUT }}
                    className="text-[42px] font-semibold leading-none tracking-[-0.06em]">
                    {getPrice(plan)}
                  </motion.div>
                </AnimatePresence>
                {getPrice(plan)!=='Custom' && (
                  <div className={cn('pb-1.5 text-[12px]', plan.featured?'text-white/42':'text-black/36')}>/&nbsp;mo</div>
                )}
              </div>
              {yr && getPrice(plan)!=='Custom' && (
                <div className={cn('mt-1 text-[11px]', plan.featured?'text-white/34':'text-black/34')}>Billed annually</div>
              )}
              <div className={cn('my-6 h-px', plan.featured?'bg-white/10':'bg-black/[0.06]')}/>
              <div className="space-y-3">
                {plan.features.map(f=>(
                  <div key={f} className="flex items-start gap-3 text-[13px]">
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.featured?'text-[#98FE00]':'text-black/46')} strokeWidth={2.2}/>
                    <span className={plan.featured?'text-white/80':'text-black/68'}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={cn('mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[13px] px-5 py-3.5 text-[13px] font-medium transition duration-300',
                plan.featured?'bg-white text-black hover:bg-white/94':'bg-[#121212] text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]')}>
                Choose {plan.name}<ArrowRight className="h-3.5 w-3.5"/>
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </Wrap>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number|null>(0);
  return (
    <Wrap className="bg-[#F3F3F3] py-16 md:py-24">
      <Container>
        <div className="mb-12 grid gap-8 border-t border-black/[0.07] pt-5 md:grid-cols-[0.42fr_0.58fr] md:items-start md:gap-16">
          {/* Left: label + heading */}
          <div className="md:sticky md:top-24">
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#797979]">FAQ</div>
            <h2 className="text-[36px] font-semibold leading-[0.94] tracking-[-0.062em] text-[#121212] md:text-[52px]">
              Common questions.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.78] text-[#797979]">
              Everything you need to know before getting started.
            </p>
            <button onClick={()=>scrollTo('pricing')}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#121212] underline-offset-4 hover:underline">
              View pricing<ArrowRight className="h-3.5 w-3.5"/>
            </button>
          </div>
          {/* Right: accordion */}
          <div className="flex flex-col divide-y divide-black/[0.06]">
            {faqs.map((item,i)=>(
              <div key={item.q} className="py-5 first:pt-0">
                <button onClick={()=>setOpen(open===i?null:i)}
                  className="flex w-full items-start justify-between gap-6 text-left">
                  <span className="text-[17px] font-medium leading-[1.22] tracking-[-0.034em] text-[#121212] md:text-[19px]">{item.q}</span>
                  <motion.div animate={{ rotate:open===i?45:0 }} transition={{ duration:0.22, ease:E_SMOOTH }}
                    className="mt-0.5 shrink-0 rounded-full border border-black/12 p-1">
                    <X className="h-3.5 w-3.5 text-black/46"/>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open===i && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }} transition={{ duration:0.26, ease:E_OUT }} className="overflow-hidden">
                      <p className="max-w-[640px] pt-4 text-[14px] leading-[1.80] text-[#797979] md:text-[15px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Wrap>
  );
}

// ─── FOOTER (full premium ending) ─────────────────────────────────────────────
function Footer() {
  const cols = [
    { title:'Product', links:['Command Center','Inbox Triage','Meeting Prep','Follow-ups','Decision Log'] },
    { title:'Company', links:['About','Careers','Press','Security','Contact'] },
    { title:'Resources', links:['Blog','Changelog','Documentation','Status','API'] },
  ];

  return (
    <footer className="bg-[#121212] text-white">
      {/* CTA band */}
      <div className="px-5 pb-0 pt-20 md:px-8 lg:px-12">
        <Container>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.15 }} transition={{ duration:0.68, ease:E_OUT }}
            className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.04] px-8 py-14 md:px-14 md:py-18">
            {/* Glow */}
            <div className="pointer-events-none absolute right-[-6%] top-[-24%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(circle,rgba(152,254,0,0.11),transparent_68%)] blur-3xl"/>
            <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[700px]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-[#98FE00]"/>
                  <div className="text-[11px] uppercase tracking-[0.32em] text-white/36">Keystone</div>
                </div>
                <h2 className="text-[38px] font-semibold leading-[0.93] tracking-[-0.065em] md:text-[66px]">
                  Clarity compounds.<br className="hidden md:block"/> So does execution.
                </h2>
                <p className="mt-5 max-w-[540px] text-[15px] leading-[1.80] text-white/50 md:text-[17px]">
                  Give yourself a system that sees the day clearly, prepares you early, and keeps work moving after the meeting ends.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <button onClick={()=>scrollTo('pricing')}
                  className="group inline-flex items-center gap-2.5 rounded-[14px] bg-white px-6 py-3.5 text-[13px] font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,255,255,0.16)]">
                  Request access<ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5"/>
                </button>
                <button className="inline-flex items-center gap-2 rounded-[14px] border border-white/10 px-6 py-3.5 text-[13px] font-medium text-white/80 transition duration-300 hover:bg-white/[0.06]">
                  Book a walkthrough
                </button>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Nav columns */}
      <div className="px-5 py-16 md:px-8 lg:px-12">
        <Container>
          <div className="grid gap-10 border-t border-white/[0.07] pt-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="h-[16px] w-[16px] rounded-full bg-[#98FE00]"/>
                <span className="text-[19px] font-semibold tracking-[-0.055em]">Keystone</span>
              </div>
              <p className="max-w-[220px] text-[13px] leading-[1.72] text-white/42">
                The AI operating layer for founders, executives, and high-output operators.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/40 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-[#98FE00]"/>
                Now in early access
              </div>
            </div>
            {/* Nav cols */}
            {cols.map(col=>(
              <div key={col.title}>
                <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/30">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map(link=>(
                    <li key={link}>
                      <button className="text-[13px] text-white/50 transition-colors duration-200 hover:text-white/90">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-5 py-5 md:px-8 lg:px-12">
        <Container className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <span className="text-[12px] text-white/28">© 2026 Keystone, Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {['Privacy','Terms','Security'].map(l=>(
              <button key={l} className="text-[12px] text-white/32 transition-colors hover:text-white/60">{l}</button>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function KeystoneLandingPage() {
  const [booted, setBooted] = useState(false);
  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#121212]">
      <AnimatePresence>{!booted && <Boot onDone={()=>setBooted(true)}/>}</AnimatePresence>
      <Header/>
      <Hero/>
      <PainSection/>
      <Capabilities/>
      <ProcessPinned/>
      <HorizontalComparison/>
      <ProofScenarios/>
      <Pricing/>
      <FAQ/>
      <Footer/>
    </div>
  );
}

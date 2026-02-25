"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Clock,
  Send,
  Database,
  Sparkles,
  Plus,
} from "lucide-react";
import { NodeCard } from "./NodeCard";
import { GlassSidebarPanel, SidebarSection, SidebarItem } from "./GlassSidebarPanel";
import { CanvasBackground } from "./CanvasBackground";

interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  color: "teal" | "violet" | "amber" | "blue" | "default";
  icon: React.ReactNode;
  x: number;
  y: number;
}

const NODES: WorkflowNode[] = [
  {
    id: "trigger",
    title: "New Email",
    subtitle: "priority@keystone.ai",
    tags: ["On success", "On fallback"],
    color: "teal",
    icon: <Mail className="w-4 h-4" />,
    x: 0,
    y: 0,
  },
  {
    id: "classify",
    title: "Classify Intent",
    subtitle: "Urgent, Follow-up, FYI",
    tags: ["On success", "On fallback"],
    color: "violet",
    icon: <Sparkles className="w-4 h-4" />,
    x: 260,
    y: 0,
  },
  {
    id: "draft",
    title: "Generate Draft",
    subtitle: "Context-aware reply",
    tags: ["On success", "On fallback"],
    color: "teal",
    icon: <Send className="w-4 h-4" />,
    x: 520,
    y: 0,
  },
  {
    id: "crm",
    title: "Update CRM",
    subtitle: "Notion • Lead record",
    tags: ["On success", "On fallback"],
    color: "amber",
    icon: <Database className="w-4 h-4" />,
    x: 260,
    y: 160,
  },
  {
    id: "delay",
    title: "Wait 24h",
    subtitle: "Buffer before follow-up",
    tags: ["On success", "On fallback"],
    color: "amber",
    icon: <Clock className="w-4 h-4" />,
    x: 520,
    y: 160,
  },
  {
    id: "followup",
    title: "AI Follow-up",
    subtitle: "Concise + personal tone",
    tags: ["On success", "On fallback"],
    color: "violet",
    icon: <MessageSquare className="w-4 h-4" />,
    x: 520,
    y: 320,
  },
];

// [from, to, color]
type Connection = [string, string, "teal" | "orange"];

const CONNECTIONS: Connection[] = [
  ["trigger", "classify", "teal"],
  ["classify", "draft", "teal"],
  ["classify", "crm", "orange"],
  ["crm", "delay", "teal"],
  ["delay", "followup", "orange"],
];

const NODE_W = 220;
const NODE_H = 100;

function getCenter(node: WorkflowNode) {
  return { x: node.x + NODE_W / 2, y: node.y + NODE_H / 2 };
}

function ConnectionLines() {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 0 }}
    >
      <defs>
        <filter id="glow-teal">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-orange">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {CONNECTIONS.map(([fromId, toId, color], i) => {
        const from = nodeMap[fromId];
        const to = nodeMap[toId];
        if (!from || !to) return null;
        const fc = getCenter(from);
        const tc = getCenter(to);
        const mx = (fc.x + tc.x) / 2;
        const d = `M${fc.x},${fc.y} C${mx},${fc.y} ${mx},${tc.y} ${tc.x},${tc.y}`;
        return (
          <motion.path
            key={i}
            d={d}
            stroke={color === "teal" ? "rgba(45,212,191,0.55)" : "rgba(251,146,60,0.55)"}
            strokeWidth={1.5}
            fill="none"
            strokeDasharray="6 4"
            filter={`url(#glow-${color})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
          />
        );
      })}
    </svg>
  );
}

export function WorkflowCanvas() {
  const CANVAS_W = 760;
  const CANVAS_H = 460;

  return (
    <div className="flex h-[560px] rounded-[20px] overflow-hidden ring-1 ring-white/[0.08] bg-[#040408]">
      {/* Sidebar */}
      <GlassSidebarPanel>
        {/* Logo bar */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-[8px] bg-teal-500/20 ring-1 ring-teal-400/30 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <span className="text-sm font-semibold text-white/80">Keystone</span>
        </div>

        {/* Workflow title */}
        <div className="px-4 py-3 border-b border-white/[0.05]">
          <div className="px-3 py-2 rounded-[10px] bg-teal-400/[0.08] ring-1 ring-teal-400/20 text-xs font-semibold text-teal-300">
            Customer Follow-Up
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-px px-4 pt-3 pb-1">
          {["Nodes", "History"].map((tab, i) => (
            <button
              key={tab}
              className={`flex-1 py-1.5 text-xs font-medium rounded-[8px] transition-colors ${
                i === 0
                  ? "bg-white/[0.07] text-white/80"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Triggers */}
        <SidebarSection label="Triggers">
          <SidebarItem
            icon={<Mail className="w-3.5 h-3.5" />}
            label="New Email"
            sublabel="Incoming mail received"
            active
          />
          <SidebarItem
            icon={<MessageSquare className="w-3.5 h-3.5" />}
            label="New Chat"
            sublabel="Chat message received"
          />
          <SidebarItem
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Time Delay"
            sublabel="Wait for specified time"
          />
        </SidebarSection>

        {/* Actions */}
        <SidebarSection label="Actions">
          <SidebarItem
            icon={<Send className="w-3.5 h-3.5" />}
            label="Send Draft"
            sublabel="Send email template"
          />
          <SidebarItem
            icon={<Database className="w-3.5 h-3.5" />}
            label="Update CRM"
            sublabel="Add to CRM / database"
          />
          <SidebarItem
            icon={<Sparkles className="w-3.5 h-3.5" />}
            label="AI Response"
            sublabel="Generate smart reply"
          />
        </SidebarSection>
      </GlassSidebarPanel>

      {/* Canvas */}
      <div className="relative flex-1 overflow-hidden">
        <CanvasBackground variant="grid" />

        {/* Toolbar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <div className="text-sm font-bold text-white/90">Workflow Canvas</div>
            <div className="text-[11px] text-white/35">Build your flow by connecting nodes</div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/[0.07] ring-1 ring-white/[0.12] text-xs font-semibold text-white/70 hover:bg-white/[0.12] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Node
          </button>
        </div>

        {/* Nodes + connections */}
        <div
          className="relative mx-6"
          style={{ width: CANVAS_W, height: CANVAS_H }}
        >
          <ConnectionLines />
          {NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                width: NODE_W,
                zIndex: 1,
              }}
            >
              <NodeCard
                icon={node.icon}
                title={node.title}
                subtitle={node.subtitle}
                tags={node.tags}
                color={node.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

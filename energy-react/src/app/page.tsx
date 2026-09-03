"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Variants,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  BatteryCharging,
  Car,
  CircuitBoard,
  Gauge,
  Leaf,
  MapPin,
  Network,
  Radio,
  Radar,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type HubNode = "solar" | "storage" | "grid" | "chargers";

type LiveMetrics = {
  reserve: number;
  grid: number;
  sessions: number;
  uptime: number;
};

const stats = [
  { label: "Hubs engineered", value: "184", suffix: "+" },
  { label: "Grid partners", value: "27" },
  { label: "Charge sessions", value: "1.8M", suffix: "/yr" },
];

const hubNodes: Record<HubNode, { title: string; kicker: string; value: string; detail: string }> = {
  solar: {
    title: "Solar canopy",
    kicker: "Generation",
    value: "4.2 MW",
    detail: "On-site generation feeds charging first, then tops off storage when demand falls.",
  },
  storage: {
    title: "Battery reserve",
    kicker: "Storage",
    value: "82%",
    detail: "Distributed storage absorbs price spikes and keeps the hub responsive during grid events.",
  },
  grid: {
    title: "Utility exchange",
    kicker: "Grid",
    value: "+23 MW",
    detail: "Adaptive load controls continuously rebalance utility draw against generation and reserve capacity.",
  },
  chargers: {
    title: "Charging field",
    kicker: "Driver layer",
    value: "36 ports",
    detail: "Session routing prioritizes vehicle need, dwell time, fleet commitments, and available power.",
  },
};

const innovationTracks = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Adaptive load orchestration",
    description: "Real-time balancing across solar, storage, and the primary grid keeps pricing predictable at scale.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Driver-first UX",
    description: "Instant authentication, session pairing, and predictive handoffs remove station dwell friction.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "System-grade resilience",
    description: "Hardware telemetry and digital twins surface anomalies before they interrupt a single vehicle.",
  },
];

const climateSignals = [
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Circular hardware program",
    description: "Battery modules get a second life in distributed storage clusters by default.",
  },
  {
    icon: <CircuitBoard className="h-5 w-5" />,
    title: "Edge intelligence",
    description: "Each hub runs a local mesh to keep smart-routing online through backhaul disruptions.",
  },
  {
    icon: <Radar className="h-5 w-5" />,
    title: "Predictive grid sensing",
    description: "Weather, demand, and wholesale signals become actionable dispatches in minutes, not days.",
  },
];

const rollout = [
  { label: "01 / Blueprint", title: "See the invisible system first.", copy: "Demand, utility capacity, traffic, storage, and service behavior become one digital operating model." },
  { label: "02 / Pilot", title: "Turn the model into a living hub.", copy: "Chargers, solar, storage, telemetry, and the driver journey come online as one instrumented system." },
  { label: "03 / Scale", title: "Multiply the playbook, not the chaos.", copy: "Reusable deployment logic connects every new site into the same operational network and data fabric." },
];

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom: number = 0) => ({ opacity: 1, y: 0, transition: { delay: custom, duration: 0.7, ease: cubicEase } }),
};

function MotionCard({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} custom={delay} variants={fadeUp}>{children}</motion.div>;
}

function MetricBar({ label, value, width }: { label: string; value: string; width: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/55"><span>{label}</span><span className="text-white/85">{value}</span></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500" animate={{ width: `${width}%` }} transition={{ duration: 0.8, ease: cubicEase }} /></div>
    </div>
  );
}

function EnergyHub({ active, onSelect }: { active: HubNode; onSelect: (node: HubNode) => void }) {
  const selected = hubNodes[active];
  const nodeClass = (node: HubNode) => `cursor-pointer transition ${active === node ? "opacity-100" : "opacity-55 hover:opacity-90"}`;
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
      <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[#050b16]/90 p-3 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(93,210,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(93,210,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
        <svg viewBox="0 0 760 430" className="relative h-full min-h-[390px] w-full" role="img" aria-label="Interactive EV energy hub diagram">
          <defs>
            <linearGradient id="flow" x1="0" x2="1"><stop offset="0%" stopColor="#67e8f9" /><stop offset="50%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#a7f3d0" /></linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <g opacity="0.2" stroke="#5dd2ff" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, i) => <line key={`v-${i}`} x1={60 + i * 70} y1="45" x2={60 + i * 70} y2="390" />)}
            {Array.from({ length: 6 }).map((_, i) => <line key={`h-${i}`} x1="40" y1={70 + i * 60} x2="720" y2={70 + i * 60} />)}
          </g>
          <g fill="none" stroke="url(#flow)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)">
            <path d="M150 110 C245 110, 245 205, 330 205" opacity="0.45" /><path d="M175 320 C245 320, 250 230, 330 215" opacity="0.45" /><path d="M605 115 C500 115, 500 190, 415 205" opacity="0.45" /><path d="M415 225 C485 245, 500 315, 590 315" opacity="0.45" />
          </g>
          {["M150 110 C245 110, 245 205, 330 205", "M175 320 C245 320, 250 230, 330 215", "M605 115 C500 115, 500 190, 415 205", "M415 225 C485 245, 500 315, 590 315"].map((d, index) => (
            <circle key={d} r="5" fill="#ffffff" filter="url(#glow)"><animateMotion dur={`${2.4 + index * 0.35}s`} repeatCount="indefinite" path={d} /></circle>
          ))}
          <g className={nodeClass("solar")} onClick={() => onSelect("solar")}>
            <rect x="65" y="65" width="170" height="95" rx="18" fill="#0b2030" stroke={active === "solar" ? "#67e8f9" : "#2d5970"} strokeWidth="2" />
            <g stroke="#67e8f9" strokeWidth="2" opacity="0.75"><line x1="85" y1="90" x2="215" y2="90" /><line x1="85" y1="112" x2="215" y2="112" /><line x1="85" y1="134" x2="215" y2="134" /><line x1="118" y1="77" x2="118" y2="148" /><line x1="158" y1="77" x2="158" y2="148" /><line x1="198" y1="77" x2="198" y2="148" /></g>
            <text x="75" y="185" fill="#e6f7ff" fontSize="14">SOLAR CANOPY</text><text x="75" y="205" fill="#67e8f9" fontSize="12">4.2 MW GENERATING</text>
          </g>
          <g className={nodeClass("storage")} onClick={() => onSelect("storage")}>
            <rect x="80" y="272" width="145" height="88" rx="18" fill="#0b2030" stroke={active === "storage" ? "#67e8f9" : "#2d5970"} strokeWidth="2" /><rect x="105" y="295" width="84" height="34" rx="8" fill="#07111e" stroke="#67e8f9" /><rect x="111" y="301" width="63" height="22" rx="5" fill="#67e8f9" opacity="0.75" /><rect x="190" y="305" width="8" height="14" rx="3" fill="#67e8f9" /><text x="90" y="386" fill="#e6f7ff" fontSize="14">STORAGE 82%</text>
          </g>
          <g className={nodeClass("grid")} onClick={() => onSelect("grid")}>
            <rect x="535" y="65" width="150" height="100" rx="18" fill="#0b2030" stroke={active === "grid" ? "#67e8f9" : "#2d5970"} strokeWidth="2" /><path d="M610 82 L578 145 M610 82 L642 145 M590 113 H630 M582 130 H638" fill="none" stroke="#67e8f9" strokeWidth="3" /><text x="550" y="190" fill="#e6f7ff" fontSize="14">UTILITY GRID</text><text x="550" y="210" fill="#67e8f9" fontSize="12">+23 MW FLOW</text>
          </g>
          <g><motion.circle cx="372" cy="212" r="72" fill="#07182a" stroke="#67e8f9" strokeWidth="2" animate={{ scale: [1, 1.035, 1] }} transition={{ duration: 2.4, repeat: Infinity }} /><circle cx="372" cy="212" r="52" fill="#0c2740" stroke="#60a5fa" strokeDasharray="7 9" strokeWidth="2" /><path d="M386 160 L346 218 H372 L358 266 L402 204 H376 Z" fill="#67e8f9" filter="url(#glow)" /><text x="372" y="300" fill="#e6f7ff" textAnchor="middle" fontSize="13">ORCHESTRATION CORE</text></g>
          <g className={nodeClass("chargers")} onClick={() => onSelect("chargers")}>
            {[0, 1, 2].map((i) => <g key={i} transform={`translate(${525 + i * 55} 275)`}><rect width="38" height="64" rx="9" fill="#0b2030" stroke={active === "chargers" ? "#67e8f9" : "#2d5970"} strokeWidth="2" /><rect x="9" y="10" width="20" height="17" rx="4" fill="#67e8f9" opacity="0.75" /><path d="M31 36 C43 36 42 50 42 55" fill="none" stroke="#67e8f9" strokeWidth="2" /><circle cx="19" cy="49" r="4" fill="#67e8f9" /></g>)}
            <text x="525" y="370" fill="#e6f7ff" fontSize="14">CHARGING FIELD</text><text x="525" y="390" fill="#67e8f9" fontSize="12">36 ACTIVE PORTS</text>
          </g>
        </svg>
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200 backdrop-blur"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" /></span>live digital twin</div>
      </div>
      <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/70">{selected.kicker}</p><p className="mt-3 text-2xl font-semibold text-white">{selected.title}</p><p className="mt-2 text-3xl font-semibold text-cyan-200">{selected.value}</p><p className="mt-5 text-sm leading-6 text-white/60">{selected.detail}</p><div className="mt-6 border-t border-white/10 pt-5 text-xs text-white/45">Tap any system in the hub to inspect its role.</div>
      </motion.div>
    </div>
  );
}

function RolloutScene() {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.45 });
  const gridOpacity = useTransform(progress, [0, 0.32, 0.72], [0.8, 0.25, 0.08]);
  const hubScale = useTransform(progress, [0, 0.38, 0.7, 1], [0.66, 0.92, 1, 0.9]);
  const networkOpacity = useTransform(progress, [0.5, 0.72, 1], [0, 0.45, 1]);
  useMotionValueEvent(scrollYProgress, "change", (value) => { const next = value < 0.34 ? 0 : value < 0.68 ? 1 : 2; setPhase((current) => (current === next ? current : next)); });
  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex min-h-screen items-center py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/65">From idea to network</p><motion.div key={phase} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-5"><p className="text-sm uppercase tracking-[0.24em] text-white/40">{rollout[phase].label}</p><h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">{rollout[phase].title}</h2><p className="mt-5 max-w-lg text-base leading-7 text-white/60">{rollout[phase].copy}</p></motion.div><div className="mt-8 flex gap-2">{rollout.map((item, index) => <div key={item.label} className={`h-1 rounded-full transition-all duration-500 ${index === phase ? "w-16 bg-cyan-300" : "w-7 bg-white/15"}`} />)}</div></div>
          <div className="relative min-h-[520px] overflow-hidden rounded-[34px] border border-white/10 bg-[#030812] shadow-[0_40px_120px_-45px_rgba(56,189,248,0.45)]">
            <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 bg-[linear-gradient(rgba(93,210,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(93,210,255,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,140,255,0.18),transparent_55%)]" />
            <motion.div style={{ scale: hubScale }} className="absolute inset-0 flex items-center justify-center"><div className="relative h-72 w-72 rounded-full border border-cyan-300/30 bg-cyan-300/[0.04]"><motion.div className="absolute inset-8 rounded-full border border-dashed border-cyan-200/30" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} /><div className="absolute inset-20 flex items-center justify-center rounded-full border border-cyan-200/30 bg-[#07182a] shadow-[0_0_80px_rgba(56,189,248,0.25)]"><Zap className="h-16 w-16 text-cyan-200" /></div>{[{ x: "50%", y: "-8%", icon: <Sun className="h-5 w-5" /> }, { x: "94%", y: "48%", icon: <Car className="h-5 w-5" /> }, { x: "48%", y: "93%", icon: <BatteryCharging className="h-5 w-5" /> }, { x: "-6%", y: "48%", icon: <Network className="h-5 w-5" /> }].map((node, index) => <motion.div key={index} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: phase >= 1 ? 1 : 0.35, scale: phase >= 1 ? 1 : 0.8 }} className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-200/25 bg-[#0a1d30] text-cyan-200" style={{ left: node.x, top: node.y }}>{node.icon}</motion.div>)}</div></motion.div>
            <motion.div style={{ opacity: networkOpacity }} className="absolute inset-0">{[[12, 16], [84, 18], [15, 80], [85, 82], [50, 8], [8, 50], [92, 50], [50, 92]].map(([x, y], index) => <motion.div key={index} className="absolute h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.85)]" style={{ left: `${x}%`, top: `${y}%` }} animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2 + index * 0.15, repeat: Infinity }} />)}<svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><g stroke="#67e8f9" strokeWidth="0.3" opacity="0.35"><line x1="12" y1="16" x2="50" y2="50" /><line x1="84" y1="18" x2="50" y2="50" /><line x1="15" y1="80" x2="50" y2="50" /><line x1="85" y1="82" x2="50" y2="50" /><line x1="50" y1="8" x2="50" y2="50" /><line x1="8" y1="50" x2="50" y2="50" /><line x1="92" y1="50" x2="50" y2="50" /><line x1="50" y1="92" x2="50" y2="50" /></g></svg></motion.div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white/45 backdrop-blur"><span>Deployment fabric</span><span className="text-cyan-200">{phase === 0 ? "modeling" : phase === 1 ? "commissioning" : "network online"}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [activeHubNode, setActiveHubNode] = useState<HubNode>("chargers");
  const [live, setLive] = useState<LiveMetrics>({ reserve: 82, grid: 23, sessions: 1284, uptime: 99.2 });
  const metrics = useMemo(() => stats, []);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 34]);
  const heroLift = useTransform(scrollYProgress, [0, 0.22], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.35]);
  useEffect(() => { const timer = window.setInterval(() => { setLive((current) => ({ reserve: Math.max(76, Math.min(91, current.reserve + (Math.random() > 0.5 ? 1 : -1))), grid: Math.max(17, Math.min(29, current.grid + (Math.random() > 0.5 ? 1 : -1))), sessions: current.sessions + Math.floor(Math.random() * 4), uptime: Number((99.1 + Math.random() * 0.7).toFixed(1)) })); }, 2200); return () => window.clearInterval(timer); }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#02050b]">
      <div className="pointer-events-none fixed inset-0 -z-20"><motion.div style={{ rotate: orbitRotation }} className="absolute -left-1/3 top-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.35),_transparent_65%)] blur-[100px]" /><div className="absolute right-[-20%] top-[28%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.2),_transparent_68%)] blur-[110px]" /></div>
      <main className="relative mx-auto w-full max-w-7xl px-5 pb-32 pt-8 md:px-10 lg:px-14">
        <nav className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl"><div className="flex items-center gap-3 text-sm font-semibold text-white"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-[#04101a]"><Zap className="h-4 w-4" /></span>Grid Futures Lab</div><div className="hidden items-center gap-6 text-xs uppercase tracking-[0.18em] text-white/50 md:flex"><span>Systems</span><span>Network</span><span>Impact</span></div><Button size="sm" className="rounded-full">Book a tour <ArrowUpRight className="ml-1 h-4 w-4" /></Button></nav>
        <section className="relative min-h-[82vh] py-10 md:py-16"><motion.div style={{ y: heroLift, opacity: heroOpacity }} className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div><motion.span initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/80"><Radio className="h-3.5 w-3.5" /> Energy intelligence / live systems</motion.span><motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-7xl lg:text-[5.4rem]">Don&apos;t just build a charging site. <span className="text-cyan-200">Orchestrate an energy network.</span></motion.h1><motion.p initial="hidden" animate="visible" custom={0.12} variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-white/60">Infrastructure, software, storage, utility signals, and driver experience move together as one responsive system—from the first flagship to the hundredth location.</motion.p><motion.div initial="hidden" animate="visible" custom={0.22} variants={fadeUp} className="mt-8 flex flex-wrap gap-4"><Button size="lg" className="rounded-full px-7 shadow-[0_22px_70px_-28px_rgba(103,232,249,0.85)]">Enter the system <ArrowUpRight className="ml-2 h-4 w-4" /></Button><Button size="lg" variant="secondary" className="rounded-full border border-white/10 bg-white/[0.06] px-7 text-white hover:bg-white/10">View the blueprint</Button></motion.div><motion.div initial="hidden" animate="visible" custom={0.3} variants={fadeUp} className="mt-10 flex flex-wrap gap-7">{metrics.map((stat) => <div key={stat.label}><p className="text-2xl font-semibold text-white">{stat.value}{stat.suffix}</p><p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/40">{stat.label}</p></div>)}</motion.div></div>
          <motion.div initial={{ opacity: 0, scale: 0.94, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.9, ease: cubicEase }} className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"><div className="absolute inset-x-10 -top-20 h-48 rounded-full bg-cyan-300/20 blur-3xl" /><div className="relative flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.26em] text-white/40">Energy command layer</p><p className="mt-2 text-xl font-semibold text-white">Flagship 017 / DMV</p></div><div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />Live</div></div><div className="relative mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Reserve</p><p className="mt-2 text-3xl font-semibold text-white">{live.reserve}%</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Grid flow</p><p className="mt-2 text-3xl font-semibold text-white">+{live.grid} MW</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Sessions</p><p className="mt-2 text-3xl font-semibold text-white">{live.sessions.toLocaleString()}</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Uptime</p><p className="mt-2 text-3xl font-semibold text-emerald-200">{live.uptime}%</p></div></div><div className="relative mt-5 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5"><MetricBar label="Storage state" value={`${live.reserve}%`} width={live.reserve} /><MetricBar label="Available capacity" value={`${Math.min(96, live.grid * 3)}%`} width={Math.min(96, live.grid * 3)} /><MetricBar label="Service health" value={`${live.uptime}%`} width={live.uptime} /></div><div className="relative mt-5 flex h-24 items-end gap-1 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">{Array.from({ length: 28 }).map((_, index) => <motion.span key={index} className="flex-1 rounded-full bg-gradient-to-t from-blue-500/40 to-cyan-200" animate={{ height: [`${20 + ((index * 17) % 55)}%`, `${35 + ((index * 29) % 60)}%`, `${20 + ((index * 17) % 55)}%`] }} transition={{ duration: 2.2 + (index % 5) * 0.25, repeat: Infinity }} />)}</div></motion.div>
        </motion.div></section>
        <section className="py-24"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/65">Interactive digital twin</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">Touch the system. Follow the power.</h2></div><p className="max-w-md text-sm leading-6 text-white/50">Power moves continuously between generation, reserve, the grid, and active charging. Select a subsystem to inspect it.</p></motion.div><EnergyHub active={activeHubNode} onSelect={setActiveHubNode} /></section>
        <section className="grid gap-5 py-16 md:grid-cols-3">{innovationTracks.map((track, index) => <MotionCard key={track.title} delay={index * 0.06}><Card className="group h-full overflow-hidden border-white/10 bg-white/[0.045] text-white backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.075]"><CardHeader className="gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-200 transition group-hover:scale-110">{track.icon}</div><CardTitle className="text-xl text-white">{track.title}</CardTitle><CardDescription className="text-sm leading-6 text-white/55">{track.description}</CardDescription></CardHeader></Card></MotionCard>)}</section>
        <RolloutScene />
        <section className="py-28"><div className="mb-10 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/65">Network intelligence</p><h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">One hub is infrastructure. A connected fleet of hubs is intelligence.</h2></div><p className="text-sm leading-7 text-white/50">Every location becomes another sensor, another optimization point, and another source of operational learning.</p></div><div className="relative min-h-[520px] overflow-hidden rounded-[34px] border border-white/10 bg-[#040914] p-6 md:p-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_60%)]" /><svg viewBox="0 0 900 480" className="relative h-full min-h-[460px] w-full"><g fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.25"><path d="M90 250 C240 120 330 120 445 235 S680 370 810 195" /><path d="M145 105 C290 235 355 285 445 235 S655 110 760 325" /><path d="M105 370 C240 315 340 295 445 235 S650 200 825 385" /></g>{[[90,250],[145,105],[105,370],[445,235],[810,195],[760,325],[825,385],[300,178],[610,260]].map(([x,y], index) => <g key={index}><motion.circle cx={x} cy={y} r={index === 3 ? 13 : 8} fill={index === 3 ? "#ffffff" : "#67e8f9"} animate={{ opacity: [0.45, 1, 0.45], r: index === 3 ? [13,17,13] : [7,10,7] }} transition={{ duration: 2 + index * 0.18, repeat: Infinity }} /><circle cx={x} cy={y} r={index === 3 ? 28 : 19} fill="none" stroke="#67e8f9" opacity="0.18" /></g>)}</svg><div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur md:left-10 md:top-10"><div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/40"><MapPin className="h-4 w-4 text-cyan-200" /> Network pulse</div><p className="mt-3 text-3xl font-semibold text-white">184 hubs</p><p className="mt-1 text-xs text-emerald-200">98.9% network health</p></div><div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-black/35 p-4 text-right backdrop-blur md:bottom-10 md:right-10"><div className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.22em] text-white/40"><Radio className="h-4 w-4 text-cyan-200" /> Signal exchange</div><p className="mt-3 text-xl font-semibold text-white">3.6M events / day</p><p className="mt-1 text-xs text-white/45">routing • pricing • health • demand</p></div></div></section>
        <section className="grid gap-5 py-16 md:grid-cols-3">{climateSignals.map((item, index) => <MotionCard key={item.title} delay={index * 0.06}><Card className="h-full border-white/10 bg-gradient-to-br from-emerald-300/[0.08] to-white/[0.035] text-white backdrop-blur"><CardHeader className="gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200/15 bg-emerald-200/[0.07] text-emerald-200">{item.icon}</div><CardTitle className="text-xl text-white">{item.title}</CardTitle><CardDescription className="text-sm leading-6 text-white/55">{item.description}</CardDescription></CardHeader></Card></MotionCard>)}</section>
        <section className="relative my-20 overflow-hidden rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.18),transparent_38%),linear-gradient(135deg,#07111e,#02050b)] p-8 md:p-14"><motion.div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-cyan-200/20" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} /><motion.div className="absolute -right-6 -top-6 h-44 w-44 rounded-full border border-dashed border-cyan-200/20" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} /><div className="relative max-w-4xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-200"><Sparkles className="h-5 w-5" /></div><h2 className="mt-7 text-4xl font-semibold tracking-tight text-white md:text-6xl">Build the flagship people remember—and the system operators can actually scale.</h2><p className="mt-6 max-w-2xl text-base leading-7 text-white/55">Strategy, infrastructure, software, deployment, and the driver experience—designed as one connected energy product.</p><div className="mt-8 flex flex-wrap gap-4"><Button size="lg" className="rounded-full px-7">Start the conversation <ArrowUpRight className="ml-2 h-4 w-4" /></Button><Button size="lg" variant="ghost" className="rounded-full border border-white/10 px-7 text-white hover:bg-white/10">Explore the playbook</Button></div></div></section>
      </main>
    </div>
  );
}

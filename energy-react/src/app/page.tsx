"use client";

import { useMemo, useRef } from "react";
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
  CircuitBoard,
  Gauge,
  Leaf,
  Radar,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TimelinePhase = {
  title: string;
  headline: string;
  description: string;
  signal: string;
};

const stats = [
  { label: "Hubs engineered", value: "184", suffix: "+" },
  { label: "Grid partners", value: "27" },
  { label: "Charge sessions", value: "1.8M", suffix: "/yr" },
];

const innovationTracks = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Adaptive load orchestration",
    description:
      "Real-time balancing across solar, storage, and the primary grid keeps pricing predictable at scale.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Driver-first UX",
    description:
      "Instant authentication, session pairing, and predictive handoffs remove the station dwell friction.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "System-grade resilience",
    description:
      "Hardware telemetry and digital twins surface anomalies before they interrupt a single vehicle.",
  },
];

const rolloutPhases: TimelinePhase[] = [
  {
    title: "Blueprint",
    headline: "Map the energy choreography",
    description:
      "Layer site data with demand modeling to produce a resilient electrical backbone for new hubs.",
    signal: "Grid digital twin models tuned to 15-minute intervals",
  },
  {
    title: "Pilot",
    headline: "Instrument the flagship location",
    description:
      "Deploy adaptive chargers, storage stacks, and fleet APIs, then tune orchestration live with operators.",
    signal: "First 12 weeks show 32% peak shaving and 98.7% uptime",
  },
  {
    title: "Scale",
    headline: "Roll out the network fabric",
    description:
      "Parallelize deployment kits, automate commissioning, and broadcast a cohesive driver story at every hub.",
    signal: "Rollout cadences accelerate to 30 sites / quarter",
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
    description: "Each hub runs a local mesh to keep smart-routing online even during backhaul disruptions.",
  },
  {
    icon: <Radar className="h-5 w-5" />,
    title: "Predictive grid sensing",
    description:
      "We translate weather, demand, and wholesale signals into actionable dispatches in minutes, not days.",
  },
];

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.7, ease: cubicEase },
  }),
};

function useStickyProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.4 });
  const translate = useTransform(eased, [0, 1], ["0%", "-18%"]);
  const glow = useTransform(eased, [0, 0.5, 1], [0.35, 0.9, 0.55]);

  return { translate, glow };
}

function MotionCard({
  delay,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { translate, glow } = useStickyProgress(heroRef);
  const metrics = useMemo(() => stats, []);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 24]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    // Reserved for telemetry hooks.
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          aria-hidden
          style={{ rotate: orbitRotation }}
          className="absolute -left-1/3 top-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(62,170,255,0.48),_transparent_65%)] blur-[90px]"
        />
        <div className="absolute inset-x-10 top-0 h-40 rounded-full bg-[radial-gradient(circle_at_top,_rgba(93,210,255,0.35),_transparent_65%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[28rem] bg-[radial-gradient(circle_at_bottom,_rgba(18,34,76,0.85),_rgba(2,4,8,0.9))]" />
      </div>

      <main
        ref={scrollRef}
        className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-32 pt-16 md:gap-32 md:px-12"
      >
        <section ref={heroRef} className="relative grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <motion.span
              className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sparkles className="h-4 w-4" />
              Grid Futures Lab
            </motion.span>
            <motion.h1
              className="text-4xl font-semibold leading-[1.1] text-white md:text-6xl"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Charging ecosystems that choreograph energy, experience, and scale.
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg text-white/70 md:text-xl"
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
            >
              We design the EV hubs that feel inevitable—where adaptive infrastructure, software, and service teams
              move in lockstep from the first pilot to the hundredth site.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
            >
              <Button size="lg" className="shadow-[0_24px_80px_-40px_rgba(93,210,255,0.8)]">
                Book the tour
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="border border-white/15 bg-white/10 text-white hover:bg-white/20"
              >
                Download the blueprint
              </Button>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-6 pt-4 text-sm text-white/70"
              style={{ opacity: glow }}
            >
              {metrics.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-3xl font-semibold text-white">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            style={{ y: translate }}
            className="relative flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <motion.div
              className="absolute -inset-x-12 -top-12 h-32 rounded-full bg-[radial-gradient(circle_at_top,_rgba(93,210,255,0.3),_transparent_70%)] blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/50">
                <span>Energy Stack</span>
                <span>Live Telemetry</span>
              </div>
              <div className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span className="flex items-center gap-2 font-medium">
                    <BatteryCharging className="h-4 w-4" /> Storage reserve
                  </span>
                  <span>82%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span className="flex items-center gap-2 font-medium">
                    <Zap className="h-4 w-4" /> Grid flow
                  </span>
                  <span>+23 MW</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span className="flex items-center gap-2 font-medium">
                    <Sparkles className="h-4 w-4" /> Forecast delta
                  </span>
                  <span className="text-green-300">▲ 12%</span>
                </div>
              </div>
            </div>
            <div className="relative grid gap-4 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">Experience pulse</p>
                  <p className="text-xl font-semibold">92.4 satisfaction index</p>
                </div>
              </div>
              <p className="text-sm text-white/70">
                A real-time read on the audience journey, synthesized from driver feedback loops, fleet dashboards, and
                concierge notes across every physical hub.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {innovationTracks.map((track, index) => (
            <MotionCard key={track.title} delay={0.05 * index}>
              <Card className="h-full border-white/5 bg-white/10 text-white backdrop-blur">
                <CardHeader className="gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                    {track.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{track.title}</CardTitle>
                  <CardDescription className="text-sm text-white/70">
                    {track.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionCard>
          ))}
        </section>

        <section className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-semibold text-white md:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              Pilot the flagship, scale the fabric, then let every driver feel the orchestration.
            </motion.h2>
            <motion.p
              className="max-w-xl text-base text-white/70"
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              Each phase is a choreography of disciplines—strategy, engineering, service design, partnerships—moving in
              synchrony. We design the playbook, embed the teams, and keep momentum compounding.
            </motion.p>
            <motion.div
              className="flex flex-col gap-4 text-sm text-white/70"
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <BatteryCharging className="h-4 w-4" />
                </span>
                <p>On-site energy architects collaborating with city planners and utilities from day one.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <Gauge className="h-4 w-4" />
                </span>
                <p>Experience teams prototyping the full driver journey, concierge layer, and fleet moments.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <p>Telemetry, service ops, and digital twins aligned to surface and solve before issues surface.</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-5">
            {rolloutPhases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0.05 * index}
                variants={fadeUp}
              >
                <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
                  <CardHeader className="flex-row items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{phase.title}</p>
                      <CardTitle className="mt-2 text-2xl text-white">{phase.headline}</CardTitle>
                    </div>
                    <span className="text-xs font-semibold text-white/50">{index + 1}</span>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-white/70">{phase.description}</p>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-xs uppercase tracking-[0.2em] text-white/60">
                      {phase.signal}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {climateSignals.map((item, index) => (
            <MotionCard key={item.title} delay={0.05 * index}>
              <Card className="h-full border-white/10 bg-gradient-to-br from-white/20 to-white/10 text-white backdrop-blur">
                <CardHeader className="gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-white/70">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </MotionCard>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(93,210,255,0.2),_rgba(8,14,30,0.95))] p-10 backdrop-blur">
          <motion.div
            className="pointer-events-none absolute -top-20 right-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(93,210,255,0.45),_transparent_65%)] blur-3xl"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-5">
              <motion.h3
                className="text-3xl font-semibold text-white md:text-4xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                Let’s choreograph your flagship energy story.
              </motion.h3>
              <motion.p
                className="text-sm text-white/70 md:text-base"
                initial="hidden"
                whileInView="visible"
                custom={0.1}
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                Share your rollout horizon, in-flight challenges, or the experience you need to unlock. Our team will
                assemble the rapid-response blueprint and co-pilot the launch.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial="hidden"
                whileInView="visible"
                custom={0.2}
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
              >
                <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200">
                  Start the conversation
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/10 text-white hover:bg-white/10"
                >
                  Explore partnership playbook
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-white/70 backdrop-blur"
              initial="hidden"
              whileInView="visible"
              custom={0.25}
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Signals we sync</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <Zap className="h-4 w-4" />
                  </span>
                  Portfolio heatmaps & demand curves
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <Gauge className="h-4 w-4" />
                  </span>
                  Driver experience diagnostics
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <Leaf className="h-4 w-4" />
                  </span>
                  Sustainability impact modeling
                </li>
              </ul>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

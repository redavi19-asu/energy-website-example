"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, BatteryCharging, Bolt, Factory, Sun, Zap } from "lucide-react";

const systems = [
  { n: "01", title: "SUN", stat: "4.2 MW", copy: "Canopy generation feeds the site before the grid ever has to work harder." },
  { n: "02", title: "STORE", stat: "82%", copy: "Battery reserve catches demand spikes and holds power for the moments that matter." },
  { n: "03", title: "MOVE", stat: "36 PORTS", copy: "Charging capacity is treated like a living traffic system, not a row of plugs." },
  { n: "04", title: "RETURN", stat: "+23 MW", copy: "Every site can respond to utility conditions and return flexibility back to the grid." },
];

const buildSteps = [
  ["A", "READ THE PLACE", "Traffic, sunlight, utility capacity, dwell time, and local demand become the site brief."],
  ["B", "BUILD THE LOOP", "Solar, storage, chargers, controls, and software are designed as one energy machine."],
  ["C", "LET IT LEARN", "Live telemetry keeps refining how the site buys, stores, moves, and protects power."],
];

function PowerGauge() {
  return (
    <div className="power-gauge" aria-label="Live site load 74 percent">
      <div className="power-gauge__ticks" />
      <div className="power-gauge__needle" />
      <div className="power-gauge__hub" />
      <div className="power-gauge__readout"><strong>74%</strong><span>SITE LOAD</span></div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="energy-poster min-h-screen overflow-hidden">
      <header className="energy-topbar">
        <div className="energy-wordmark"><span className="energy-mark"><Bolt size={18} /></span> GRID FUTURES LAB</div>
        <div className="energy-topbar-meta"><span>ENERGY / MOBILITY / INFRASTRUCTURE</span><span>DMV · USA</span></div>
        <button className="energy-contact">START A SITE <ArrowUpRight size={16} /></button>
      </header>

      <main>
        <section className="energy-hero">
          <div className="energy-index">001 — POWER SHOULD MOVE.</div>
          <div className="energy-current energy-current--one"><i/><i/><i/><i/></div>
          <div className="energy-current energy-current--two"><i/><i/><i/></div>
          <motion.div className="energy-sun" initial={{ scale: .82, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}>
            <div className="energy-orbit energy-orbit--a"><b/><b/><b/></div>
            <div className="energy-orbit energy-orbit--b"><b/><b/></div>
            <div className="energy-sun-core"><Sun size={56} strokeWidth={1.4} /></div>
          </motion.div>
          <div className="energy-hero-copy">
            <motion.h1 initial={{ y: 42, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .75 }}>
              ENERGY<br/><span>WITHOUT</span><br/>THE BORING.
            </motion.h1>
            <div className="energy-hero-side">
              <p>We design charging hubs as active pieces of the grid — part power plant, part battery, part mobility system.</p>
              <PowerGauge />
              <div className="energy-hero-rule" />
              <div className="energy-hero-metrics"><strong>184+</strong><span>HUBS ENGINEERED</span><strong>1.8M</strong><span>SESSIONS / YEAR</span></div>
            </div>
          </div>
          <div className="energy-crawl"><div className="energy-crawl__track"><span>GENERATE</span><Zap size={22}/><span>STORE</span><BatteryCharging size={22}/><span>MOVE</span><ArrowDownRight size={22}/><span>REPEAT</span><span>GENERATE</span><Zap size={22}/><span>STORE</span><BatteryCharging size={22}/><span>MOVE</span><ArrowDownRight size={22}/><span>REPEAT</span></div></div>
        </section>

        <section className="energy-manifesto">
          <div className="energy-manifesto-label">THE IDEA</div>
          <div className="energy-manifesto-copy">
            <p className="energy-big-line">A charging station is not a parking lot with plugs.</p>
            <p className="energy-big-line energy-big-line--orange">It is a tiny power system with cars attached.</p>
          </div>
          <div className="energy-diagram" aria-hidden="true">
            <div className="energy-wire energy-wire--one"><i/></div><div className="energy-wire energy-wire--two"><i/></div>
            <div className="energy-node energy-node--sun">SUN<span className="node-pulse"/></div><div className="energy-node energy-node--battery">BATTERY<span className="node-pulse"/></div><div className="energy-node energy-node--car">EV<span className="node-pulse"/></div><div className="energy-node energy-node--grid">GRID<span className="node-pulse"/></div>
          </div>
        </section>

        <section className="energy-system-strip">
          {systems.map((item, i) => (
            <motion.article key={item.n} className="energy-system" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: i * .08 }}>
              <div className="energy-system-number">{item.n}</div>
              <div className="energy-system-spinner" aria-hidden="true"><i/><i/><i/></div>
              <h2>{item.title}</h2>
              <strong>{item.stat}</strong>
              <p>{item.copy}</p>
              <div className="energy-system-arrow">↘</div>
            </motion.article>
          ))}
        </section>

        <section className="energy-blackout">
          <div className="energy-power-tape"><div>LIVE POWER FLOW · SOLAR → STORAGE → VEHICLES → GRID · LIVE POWER FLOW · SOLAR → STORAGE → VEHICLES → GRID ·</div></div>
          <div className="energy-blackout-kicker"><Factory size={18}/> HOW A SITE BECOMES A SYSTEM</div>
          <h2>THREE MOVES.<br/>ONE ENERGY MACHINE.</h2>
          <div className="energy-build-grid">
            {buildSteps.map(([letter,title,copy]) => (
              <div className="energy-build-step" key={letter}>
                <span>{letter}</span><h3>{title}</h3><p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="energy-closing">
          <div className="energy-closing-sun"><div/><i/><i/><i/></div>
          <p className="energy-closing-eyebrow">THE GRID IS CHANGING.</p>
          <h2>BUILD SOMETHING<br/>THAT CHANGES<br/><span>WITH IT.</span></h2>
          <button className="energy-closing-button">ENTER THE PROJECT <ArrowUpRight size={20}/></button>
        </section>
      </main>
    </div>
  );
}

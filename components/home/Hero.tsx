"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import EcosystemPopover from "@/components/shared/EcosystemPopover";
import { Button } from "@/components/ui/Button";

const topHierarchy = ["Country", "Region", "District"];

const foundationalDPIs = [
  {
    name: "NdaY'Fiiziana",
    icon: "🛡️",
    desc: "Identity & Trust Foundation",
    flyer: "/assets/flyers/nday-fiiziana-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "The trusted identity layer that powers every NdaY' DPI. One Identity. Trusted Communities. Connected Public Services.",
    learnMore: "/ecosystem/fiiziana",
    angle: 90,
  },
  {
    name: "NdaY'Fokontany",
    icon: "🏘️",
    desc: "Community Administration",
    flyer: "/assets/flyers/nday-fokontany-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Community administration platform that feeds into Ben'Tanàna, strengthening local governance.",
    learnMore: "/ecosystem/fokontany",
    angle: 180,
  },
  {
    name: "NdaY'Ben'Tanàna",
    icon: "🏛️",
    desc: "Communal Governance",
    flyer: "/assets/flyers/nday-ben-tanana-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Territorial governance platform connecting municipalities, communities, and services for smart cities.",
    learnMore: "/ecosystem/bentanana",
    angle: 270,
  },
];

// Sectoral DPIs – outer orbit
const sectoralDPIs = [
  {
    name: "NdaY'Fako",
    icon: "♻",
    desc: "Circular Economy & Waste",
    flyer: "/assets/flyers/nday-fako-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Digital waste management ecosystem connecting citizens, collectors, and municipalities through QR-based monitoring and recycling incentives.",
    learnMore: "/ecosystem/fako",
    angle: 70,
  },
  {
    name: "NdaY'Tantsaha",
    icon: "🌾",
    desc: "Smart Agriculture",
    flyer: "/assets/flyers/nday-tantsaha-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Smart agriculture ecosystem helping farmers access technical services, supply chains, and markets.",
    learnMore: "/ecosystem/tantsaha",
    angle: 90,
  },
  {
    name: "Living Labs",
    icon: "🧪",
    desc: "Co-creation & Research",
    flyer: "/assets/flyers/nday-livinglabs-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Co-creation spaces where communities, researchers, and entrepreneurs prototype solutions together.",
    learnMore: "/living-labs",
    angle: 135,
  },
  {
    name: "Territorial Atlas",
    icon: "📊",
    desc: "Data & Intelligence",
    flyer: "/assets/flyers/nday-atlas-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Territorial intelligence platform providing data-driven insights for planning and decision-making.",
    learnMore: "/atlas",
    angle: 210,
  },
  {
    name: "NdaY'Tsidika",
    icon: "🧭",
    desc: "Smart Tourism",
    flyer: "/assets/flyers/nday-tsidika-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Integrated tourism platform connecting visitors with hotels, restaurants, guides, and cultural experiences.",
    learnMore: "/ecosystem/tsidika",
    angle: 245,
  },
  {
    name: "NdaY'Radoko",
    icon: "🚁",
    desc: "Community Health",
    flyer: "/assets/flyers/nday-radoko-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Community health intelligence platform improving maternal and child health through data-driven care.",
    learnMore: "/ecosystem/radoko",
    angle: 290,
  },
  {
    name: "Future DPIs",
    icon: "🌍",
    desc: "Expanding ecosystem",
    flyer: "/assets/flyers/nday-future.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc: "New Digital Public Infrastructures will be added as the ecosystem evolves.",
    learnMore: "/ecosystems",
    angle: 186,
  },
];

export default function Hero() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredFoundation, setHoveredFoundation] = useState<string | null>(null);
  const [orbitRadius, setOrbitRadius] = useState(200);


  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center gap-6 px-4 py-8 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 w-360 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/background/nday-ecosystems.png') w-36 h-18",
          backgroundSize: "fit",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-cyan-950/40 via-slate-900/60 to-emerald-950/40" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -8, 0],
        }}
        transition={{
          duration: 1,
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10"
      >
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-xl shadow-[0_0_80px_rgba(34,211,238,0.18)]">
          <img
            src="/assets/logo/NdaY'Logo.png"
            alt="NdaY Logo"
            className="h-20 w-20 object-contain"
          />
          <div className="absolute -inset-2 rounded-full border border-cyan-400/20 animate-pulse" />
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Button href="#ecosystem-overview" variant="primary">
          Explore the Ecosystem
        </Button>
        <Button href="#about-enterprise" variant="secondary">
          Discover NdaY Enterprise
        </Button>
      </motion.div>

      {/* Architecture container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 w-400 h-180 max-w-4xl flex flex-col items-center"
      >
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-cyan-400/30 via-cyan-400/10 to-cyan-400/30" />
        {/* 1. Top hierarchy */}
        <div className="relative flex flex-col items-center gap-3 mb-8">
          {topHierarchy.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="relative z-10 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-white/80 backdrop-blur-sm"
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* 2. Main container for Hub + Orbit – min-height 300px, relative */}
        <div className="relative w-full nin-h-[400px] flex items-center justify-center overflow-visible">
          {/* Hub – absolute centred */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.2,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[clamp(200px,40vw,320px)] rounded-2xl border-2 border-cyan-400/40 bg-linear-to-b from-cyan-500/20 to-blue-500/10 p-4 sm:p-6 text-center backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.3)] overflow-visible"
          >
            <div className="absolute -inset-1 rounded-2xl border border-cyan-400/20 animate-pulse" />
            <div className="hub-label text-sm sm:text-base uppercase tracking-[0.2em] text-cyan-300/60 mb-3">
              Digital Public Infrastructure Hub
            </div>
            <div className="foundational-stack flex flex-col items-center gap-1">
              {/* Ben'Tanàna */}
              <div
                className="relative w-full"
                onMouseEnter={() => setHoveredFoundation("NdaY'Ben'Tanàna")}
                onMouseLeave={() => setHoveredFoundation(null)}
              >
                <div className="foundational-item flex items-center justify-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-cyan-500/20 cursor-pointer">
                  <span className="text-base">🏛️</span>
                  <span className="text-[clamp(0.7rem,1.2vw,0.9rem)]">NdaY'Ben'Tanàna</span>
                  <span className="text-[10px] text-cyan-300/50 ml-1 hidden sm:inline">(Governance)</span>
                </div>
                <EcosystemPopover
                  isActive={hoveredFoundation === "NdaY'Ben'Tanàna"}
                  flyer={foundationalDPIs[2].flyer}
                  logo={foundationalDPIs[2].logo}
                  name={foundationalDPIs[2].name}
                  shortDesc={foundationalDPIs[2].shortDesc}
                  learnMore={foundationalDPIs[2].learnMore}
                />
              </div>
              <span className="text-cyan-400/20 text-lg leading-none">↑</span>

              {/* Fokontany */}
              <div
                className="relative w-full"
                onMouseEnter={() => setHoveredFoundation("NdaY'Fokontany")}
                onMouseLeave={() => setHoveredFoundation(null)}
              >
                <div className="foundational-item flex items-center justify-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1.5 sm:px-4 sm:py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-orange-500/20 cursor-pointer">
                  <span className="text-base">🏘️</span>
                  <span className="text-[clamp(0.7rem,1.2vw,0.9rem)]">NdaY'Fokontany</span>
                  <span className="text-[10px] text-orange-300/50 ml-1 hidden sm:inline">(Community)</span>
                </div>
                <EcosystemPopover
                  isActive={hoveredFoundation === "NdaY'Fokontany"}
                  flyer={foundationalDPIs[1].flyer}
                  logo={foundationalDPIs[1].logo}
                  name={foundationalDPIs[1].name}
                  shortDesc={foundationalDPIs[1].shortDesc}
                  learnMore={foundationalDPIs[1].learnMore}
                />
              </div>
              <span className="text-cyan-400/20 text-lg leading-none">↑</span>

              {/* Fiiziana */}
              <div
                className="relative w-full"
                onMouseEnter={() => setHoveredFoundation("NdaY'Fiiziana")}
                onMouseLeave={() => setHoveredFoundation(null)}
              >
                <div className="foundational-item flex items-center justify-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/10 px-3 py-1.5 sm:px-4 sm:py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-yellow-500/20 cursor-pointer">
                  <span className="text-base">🛡️</span>
                  <span className="text-[clamp(0.7rem,1.2vw,0.9rem)]">NdaY'Fiiziana</span>
                  <span className="text-[10px] text-yellow-300/50 ml-1 hidden sm:inline">(Identity)</span>
                </div>
                <EcosystemPopover
                  isActive={hoveredFoundation === "NdaY'Fiiziana"}
                  flyer={foundationalDPIs[0].flyer}
                  logo={foundationalDPIs[0].logo}
                  name={foundationalDPIs[0].name}
                  shortDesc={foundationalDPIs[0].shortDesc}
                  learnMore={foundationalDPIs[0].learnMore}
                />
              </div>
            </div>
          </motion.div>

          {/* Orbital items – absolute positioned around centre */}
          {sectoralDPIs.map((item, index) => {
            const angleRad = (item.angle * Math.PI) / 180;
            const x = Math.round(Math.sin(angleRad) * orbitRadius * 100) / 100;
            const y = Math.round(-Math.cos(angleRad) * orbitRadius * 100) / 100;
            const isActive = activeItem === item.name;

            return (
              <div
                key={item.name}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.8 + index * 0.12,
                    type: "spring",
                    stiffness: 180,
                    damping: 15,
                  }}
                  className="relative z-10 group rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 sm:px-3 sm:py-2 text-center backdrop-blur-sm transition-all hover:bg-white/15 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-default"
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${item.flyer})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <span className="text-[clamp(0.8rem,2vw,1.2rem)] relative z-10">{item.icon}</span>
                  <p className="text-[clamp(0.45rem,0.8vw,0.65rem)] font-medium text-white/80 relative z-10">
                    {item.name}
                  </p>
                </motion.div>

                {/* Popover */}
                <EcosystemPopover
                  isActive={isActive}
                  flyer={item.flyer}
                  logo={item.logo}
                  name={item.name}
                  shortDesc={item.shortDesc}
                  learnMore={item.learnMore}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Explore (scroll) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="mb-2 text-xs uppercase tracking-[0.35em] text-white/40">
          Explore the Ecosystem
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce text-cyan-300" />
      </motion.div>
    </div>
  );
}
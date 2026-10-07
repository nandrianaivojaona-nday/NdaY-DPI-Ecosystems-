"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import EcosystemPopover from "@/components/shared/EcosystemPopover";

// Sector-specific data for the interactive cards
const sectorEcosystems = [
  {
    name: "Agriculture",
    icon: "🌾",
    flyer: "/assets/flyers/nday-tantsaha-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc: "Smart agriculture ecosystem helping farmers access technical services, supply chains, and markets.",
    learnMore: "/ecosystem/tantsaha",
  },
  {
    name: "Waste",
    icon: "♻",
    flyer: "/assets/flyers/nday-fako-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc: "Digital waste management connecting citizens, collectors, and municipalities through QR-based monitoring.",
    learnMore: "/ecosystem/fako",
  },
  {
    name: "Governance",
    icon: "🏛",
    flyer: "/assets/flyers/nday-ben-tanana-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc: "Territorial governance platform connecting municipalities, communities, and services.",
    learnMore: "/ecosystem/bentanana",
  },
  {
    name: "Tourism",
    icon: "🧭",
    flyer: "/assets/flyers/nday-tsidika-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc: "Integrated tourism platform connecting visitors with hotels, restaurants, guides, and cultural experiences.",
    learnMore: "/ecosystem/tsidika",
  },
  {
    name: "Health",
    icon: "🚁",
    flyer: "/assets/flyers/nday-radoko-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc: "Community health intelligence platform improving maternal and child health through data-driven care.",
    learnMore: "/ecosystem/radoko",
  },
];

// Main architecture layers with dynamic sizing
const layers = [
  {
    label: "NdaY'Fiiziana",
    subtitle: "Identity & Trust DPI",
    color: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-400/40",
    flyer: "/assets/flyers/nday-fiiziana-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "The trusted identity layer that powers every NdaY' DPI. One Identity. Trusted Communities. Connected Public Services.",
    learnMore: "/ecosystem/fiiziana",
  },
  {
    label: "NdaY'Ben'Tanàna",
    subtitle: "Governance DPI",
    color: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-400/40",
    flyer: "/assets/flyers/nday-ben-tanana-flyer.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Territorial governance platform connecting municipalities, communities, and services for smart cities.",
    learnMore: "/ecosystem/bentanana",
  },
  {
    label: "Sectoral DPIs",
    subtitle: "Agriculture · Waste · Governance · Tourism · Health",
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-400/40",
    isSectorContainer: true,
    flyer: "/assets/flyers/nday-ecosystems.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Agriculture, waste, tourism, health, and more – each sectoral DPI builds on the foundational layers.",
    learnMore: "/ecosystems",
  },
  {
    label: "Citizens · Families · Organizations",
    subtitle: "The people we serve",
    color: "from-white/10 to-white/5",
    border: "border-white/20",
    flyer: "/assets/flyers/nday-community.png",
    logo: "/assets/logo/NdaY'Logo.png",
    shortDesc:
      "Everyone is connected through trusted identity, governance, and services – building a resilient nation.",
    learnMore: "/join",
  },
];

export default function PlatformArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [layerWidths, setLayerWidths] = useState<Record<string, number>>({});
  const textRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Measure text width to determine optimal padding
  useEffect(() => {
    const widths: Record<string, number> = {};
    Object.keys(textRefs.current).forEach((key) => {
      const el = textRefs.current[key];
      if (el) {
        // Get the width of the text content
        const textWidth = el.scrollWidth;
        // Base padding: 16px (px-4) + 6px max additional
        const extraPadding = Math.min(textWidth * 0.04, 6);
        widths[key] = 16 + extraPadding;
      }
    });
    setLayerWidths(widths);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 max-w-2xl mx-auto">
      {layers.map((layer, index) => {
        const isActive = activeLayer === layer.label;
        const isSectorContainer = layer.isSectorContainer;
        const padding = layerWidths[layer.label] || 16;

        return (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="relative w-full flex flex-col items-center"
            onMouseEnter={() => setActiveLayer(layer.label)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            {/* Main layer card with dynamic padding */}
            <div
              className={`w-full rounded-2xl border ${layer.border} bg-linear-to-r ${layer.color} text-center backdrop-blur-sm transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] cursor-default`}
              style={{
                paddingLeft: `${padding}px`,
                paddingRight: `${padding}px`,
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <h3 className="text-lg font-bold text-white">{layer.label}</h3>
              <p className="text-sm text-white/70">
                <span ref={(el) => { textRefs.current[layer.label] = el; }}>
                  {layer.subtitle}
                </span>
              </p>
            </div>

            {/* If it's the Sectoral DPIs layer, render the mini ecosystem cards below it */}
            {isSectorContainer && (
              <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-5 w-full">
                {sectorEcosystems.map((sector) => {
                  const isSectorActive = activeSector === sector.name;
                  return (
                    <div
                      key={sector.name}
                      className="relative"
                      onMouseEnter={() => setActiveSector(sector.name)}
                      onMouseLeave={() => setActiveSector(null)}
                    >
                      <div
                        className={`rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center backdrop-blur-sm transition-all hover:bg-white/15 hover:border-cyan-400/30 cursor-default`}
                      >
                        <span className="text-lg">{sector.icon}</span>
                        <p className="text-xs font-medium text-white/80">{sector.name}</p>
                      </div>
                      <EcosystemPopover
                        isActive={isSectorActive}
                        flyer={sector.flyer}
                        logo={sector.logo}
                        name={sector.name}
                        shortDesc={sector.shortDesc}
                        learnMore={sector.learnMore}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Popover for the main layer */}
            <EcosystemPopover
              isActive={isActive}
              flyer={layer.flyer}
              logo={layer.logo}
              name={layer.label}
              shortDesc={layer.shortDesc}
              learnMore={layer.learnMore}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
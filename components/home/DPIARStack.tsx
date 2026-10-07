"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface Layer {
  id: string;
  label: string;
  subtitle?: string;
  color: string;
  border: string;
  href?: string;
  volume?: string;
  children?: { id: string; label: string; href?: string }[];
  isRoot?: boolean;
  isExchange?: boolean;
  isSurround?: boolean;
}

const dpiarLayers: Layer[] = [
  {
    id: "dpiar",
    label: "NDAY-DPIAR",
    subtitle: "Digital Public Infrastructure Ecosystem Architecture Reference",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-400/40",
    href: "/reference",
    isRoot: true,
  },
  {
    id: "fiiziana",
    label: "NdaY'Fiiziana",
    subtitle: "Foundational Identity & Trust (Izaho Tokana)",
    color: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-400/40",
    href: "/ecosystem/fiiziana",
    volume: "III",
    children: [
      { id: "identity-registry", label: "Identity Registry" },
      { id: "trust-services", label: "Trust Services" },
      { id: "consent-management", label: "Consent Management" },
    ],
  },
  {
    id: "territorial-dpis",
    label: "Territorial DPIs",
    subtitle: "Governance · Administration",
    color: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-400/40",
    volume: "III",
    children: [
      { id: "bentanana", label: "NdaY'Ben'Tanàna", href: "/ecosystem/bentanana" },
      { id: "fokontany", label: "NdaY'Fokontany", href: "/ecosystem/fokontany" },
    ],
  },
  {
    id: "sectoral-dpis",
    label: "Sectoral DPIs",
    subtitle: "Agriculture · Waste · Health · Tourism",
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-400/40",
    volume: "V",
    children: [
      { id: "tantsaha", label: "Tantsaha", href: "/ecosystem/tantsaha" },
      { id: "fako", label: "Fako", href: "/ecosystem/fako" },
      { id: "tsidika", label: "Tsidika", href: "/ecosystem/tsidika" },
      { id: "radoko", label: "Radoko", href: "/ecosystem/radoko" },
      { id: "hety", label: "Hety", href: "/ecosystem/hety" },
    ],
  },
  {
    id: "cross-cutting",
    label: "Cross‑cutting DPIs",
    subtitle: "Living Labs · Atlas · Innovation",
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-400/40",
    volume: "II",
    children: [
      { id: "living-labs", label: "Living Labs", href: "/living-labs" },
      { id: "atlas", label: "Territorial Atlas", href: "/atlas" },
    ],
  },
  {
    id: "evidence-exchange",
    label: "Trusted Evidence Exchange",
    subtitle: "Bidirectional data flow between DPIs",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-400/40",
    isExchange: true,
    href: "/reference/volume-vi",
    children: [
      { id: "bentanana-exchange", label: "Ben'Tanàna" },
      { id: "fokontany-exchange", label: "Fokontany" },
      { id: "tantsaha-exchange", label: "Tantsaha" },
      { id: "fako-exchange", label: "Fako" },
      { id: "atlas-exchange", label: "Atlas" },
    ],
  },
  {
    id: "citizens",
    label: "Citizens · Families · Communities · Institutions",
    subtitle: "The reason the ecosystem exists",
    color: "from-cyan-400/10 to-emerald-400/10",
    border: "border-cyan-400/20",
    isSurround: true,
    href: "/join",
  },
];

export default function DPIARStack() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-center gap-2 max-w-3xl mx-auto w-full">
      {dpiarLayers.map((layer) => {
        const isExpanded = expanded[layer.id] || false;
        const hasChildren = layer.children && layer.children.length > 0;

        // Exchange layer
        if (layer.isExchange) {
          return (
            <div key={layer.id} className="w-full">
              <GlassPanel className={`border ${layer.border} bg-linear-to-r ${layer.color}`}>
                <h3 className="text-lg font-bold text-white">{layer.label}</h3>
                <p className="text-sm text-white/70">{layer.subtitle}</p>
              </GlassPanel>
              <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
                {layer.children?.map((child, ci) => (
                  <div key={child.id} className="flex items-center gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                      {child.label}
                    </span>
                    {ci < (layer.children?.length || 0) - 1 && (
                      <span className="text-cyan-400/40 text-xl">⇄</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Surround layer (Citizens)
        if (layer.isSurround) {
          return (
            <div key={layer.id} className="w-full">
              <GlassPanel className={`border ${layer.border} bg-linear-to-r ${layer.color}`}>
                <h3 className="text-lg font-bold text-white">{layer.label}</h3>
                <p className="text-sm text-white/70">{layer.subtitle}</p>
                {layer.href && (
                  <Link href={layer.href} className="text-xs text-cyan-300 hover:underline block mt-1">
                    Learn more →
                  </Link>
                )}
              </GlassPanel>
            </div>
          );
        }

        // Regular layer
        return (
          <div key={layer.id} className="w-full">
            <GlassPanel
              className={`border ${layer.border} bg-linear-to-r ${layer.color} cursor-pointer ${
                layer.isRoot ? "border-2 border-cyan-400/60" : ""
              }`}
              onClick={() => hasChildren && toggle(layer.id)}
            >
              <div className="flex items-center justify-center gap-2">
                {hasChildren && (
                  <span className="text-white/50">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </span>
                )}
                <h3 className={`text-lg font-bold text-white ${layer.isRoot ? "text-xl" : ""}`}>
                  {layer.label}
                </h3>
              </div>
              <p className="text-sm text-white/70">{layer.subtitle}</p>
              {layer.href && !hasChildren && (
                <Link href={layer.href} className="text-xs text-cyan-300 hover:underline block mt-1">
                  Learn more →
                </Link>
              )}
            </GlassPanel>

            <AnimatePresence>
              {isExpanded && hasChildren && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap justify-center gap-2 mt-2 p-2 bg-white/5 rounded-xl backdrop-blur-sm">
                    {layer.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href || "#"}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
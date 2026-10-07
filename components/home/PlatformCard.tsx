"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type Status = "online" | "offline" | "coming" | "foundation";

export type PlatformCardProps = {
  name: string;
  label: string;
  mission?: string; // now optional – fallback to description or label
  description?: string;
  className?: string;
  url?: string;
  status?: Status;
  image?: string;
  // Enhanced fields
  purpose?: string;
  modules?: string[];
  beneficiaries?: string;
  interoperability?: string;
  maturity?: string;
  evolutionSteps?: string[];
  isFoundation?: boolean;
};

const statusStyles: Record<Status, { label: string; color: string }> = {
  online: { label: "Live", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  offline: { label: "Offline", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  coming: { label: "Coming Soon", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  foundation: { label: "Foundation", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
};

export default function PlatformCard({
  name,
  label,
  mission,
  description = "",
  className = "",
  url,
  status = "coming",
  image,
  purpose = "",
  modules = [],
  beneficiaries = "",
  interoperability = "",
  maturity = "",
  evolutionSteps = [],
  isFoundation = false,
}: PlatformCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);
  const [evolutionIndex, setEvolutionIndex] = useState(0);

  // Fallback mission if not provided
  const displayMission = mission || description || label;

  const statusInfo = statusStyles[status] || statusStyles.coming;

  useEffect(() => {
    if (!isHovered || evolutionSteps.length === 0) {
      setShowEvolution(false);
      setEvolutionIndex(0);
      return;
    }
    setShowEvolution(true);
    const interval = setInterval(() => {
      setEvolutionIndex((prev) => (prev + 1) % evolutionSteps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, evolutionSteps]);

  const content = (
    <div
      className={`glass-card group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
        isHovered ? "bg-white/15 shadow-2xl scale-[1.02]" : "hover:bg-white/10"
      } ${isFoundation ? "border-purple-500/30 ring-1 ring-purple-500/20" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 relative z-10">
        {image && (
          <div className="mb-4 h-32 w-32 overflow-hidden rounded-lg bg-white/5">
            <img
              src={image}
              alt={name}
              className="h-20 w-20 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <span
            className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wider ${statusInfo.color}`}
          >
            {statusInfo.label}
          </span>
        </div>

        <p className="text-sm font-medium text-white/60">{label}</p>
        <p className="mt-2 text-sm text-white/80 leading-relaxed">{displayMission}</p>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-2 text-xs text-white/70 border-t border-white/10 pt-3"
            >
              {purpose && <p><strong>Purpose:</strong> {purpose}</p>}
              {modules.length > 0 && (
                <div>
                  <strong>Modules:</strong>
                  <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5">
                    {modules.map((mod, i) => (
                      <li key={i}>{mod}</li>
                    ))}
                  </ul>
                </div>
              )}
              {beneficiaries && <p><strong>Beneficiaries:</strong> {beneficiaries}</p>}
              {interoperability && <p><strong>Interoperability:</strong> {interoperability}</p>}
              {maturity && <p><strong>Maturity:</strong> {maturity}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {evolutionSteps.length > 0 && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-3 border-t border-white/10"
          >
            <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
              Evolution Story
            </div>
            <div className="relative h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={evolutionIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-white/90 flex items-center"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-white/30 mr-2" />
                  {evolutionSteps[evolutionIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {url && (
          <div className="mt-4 pt-3 border-t border-white/10 text-right">
            <span className="text-sm font-medium text-white/40 transition-colors group-hover:text-white/80">
              Visit Platform →
            </span>
          </div>
        )}
      </div>

      {isFoundation && (
        <div className="absolute top-3 right-3 bg-purple-500/30 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/30 backdrop-blur-sm">
          Foundation
        </div>
      )}
    </div>
  );

  if (url) {
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
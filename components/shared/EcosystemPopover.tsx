// components/shared/EcosystemPopover.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface EcosystemPopoverProps {
  isActive: boolean;
  flyer: string;
  logo: string;
  name: string;
  shortDesc: string;
  learnMore: string;
  className?: string;
}

export default function EcosystemPopover({
  isActive,
  flyer,
  logo,
  name,
  shortDesc,
  learnMore,
  className = "",
}: EcosystemPopoverProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 z-50 ${className}`}
        >
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div
              className="h-60 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${flyer})` }}
            />
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                {/*
                <img src={logo} alt={name} className="h-8 w-8 object-contain" />
                <h4 className="text-lg font-bold text-white">{name}</h4>
                */}
              </div>
              <p className="text-sm text-white/70 line-clamp-3">{shortDesc}</p>
              <a
                href={learnMore}
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Learn More <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
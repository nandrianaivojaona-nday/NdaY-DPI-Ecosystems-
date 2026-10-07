"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";
import { cn } from "@/lib/utils"; // adjust path if your utils are elsewhere

const banners = [
  {
    id: "governance",
    title: "NdaY'Ben'Tanàna",
    tagline: "Empowering Communes. Connecting Citizens.",
    desc: "The core territorial management system powering local governance, civil registry, and municipal services.",
    color: "emerald",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2800&auto=format&fit=crop",
  },
  {
    id: "services",
    title: "Public Services & Permits",
    tagline: "Streamlined municipal service delivery.",
    desc: "End‑to‑end digital permits, service catalogues, and citizen‑facing workflows designed for efficiency and transparency.",
    color: "blue",
    image: "https://images.unsplash.com/photo-1574681126759-408a28f80454?q=80&w=2800&auto=format&fit=crop",
  },
  {
    id: "civic",
    title: "Civic Participation",
    tagline: "Listen. Engage. Act.",
    desc: "Public consultations, participatory budgeting, and community petitions that bring citizens into the decision‑making process.",
    color: "amber",
    image: "https://images.unsplash.com/photo-1506148386377-03e05a3c631a?q=80&w=2800&auto=format&fit=crop",
  },
];

export function CarouselHero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden rounded-xl border border-slate-200/50 shadow-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-slate-900/70 z-10" />
          <img
            src={banners[currentIdx].image}
            alt={banners[currentIdx].title}
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 px-6 py-12 md:py-20">
        <div className="max-w-3xl">
          <motion.div
            key={`tag-${currentIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md">
              <Box className="h-4 w-4" />
              Communal Digital Public Infrastructure
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIdx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4 leading-tight">
                {banners[currentIdx].title}
              </h1>
              <h2
                className={`text-xl md:text-2xl font-light text-white mb-4 border-l-4 pl-6 border-${banners[currentIdx].color}-400`}
              >
                {banners[currentIdx].tagline}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                {banners[currentIdx].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#dashboard"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-emerald-600/20"
            >
              Enter the Commune
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#information"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all backdrop-blur-md border border-white/20"
            >
              Explore Architecture
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-3">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx === currentIdx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Show slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
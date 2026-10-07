// components/home/Fiiziana.tsx
"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Link2,
  Handshake,
  Globe2,
  Database,
  Home,
  Building2,
  MapPin,
  Key,
  Wallet,
  CheckSquare,
  Activity,
  Share2,
} from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Identity",
    description: "Trusted identities for people, families, organizations, communities, territories, and assets.",
  },
  {
    icon: Handshake,
    title: "Trust",
    description: "Authentication, authorization, credentials, and verification services.",
  },
  {
    icon: Users,
    title: "Relationships",
    description: "Identity is connected to family, community, territory, organization, and public services.",
  },
  {
    icon: CheckSquare,
    title: "Participation",
    description: "Enables voting, consultation, taxation, farming, waste services, education, and healthcare.",
  },
  {
    icon: Share2,
    title: "Interoperability",
    description: "Every DPI consumes the same identity – no duplicates, no silos.",
  },
  {
    icon: Globe2,
    title: "Sovereignty",
    description: "The identity infrastructure belongs to Malagasy institutions and communities.",
  },
];

const modules = [
  { icon: Database, label: "Identity Registry" },
  { icon: Home, label: "Household Registry" },
  { icon: Users, label: "Community Registry" },
  { icon: Building2, label: "Organization Registry" },
  { icon: MapPin, label: "Territory Registry" },
  { icon: Key, label: "Trust Services" },
  { icon: Wallet, label: "Identity Wallet" },
  { icon: CheckSquare, label: "Consent Management" },
  { icon: Activity, label: "Audit" },
  { icon: Link2, label: "Integration Gateway" },
];

export default function Fiiziana() {
  return (
    <div className="space-y-16">
      {/* Motto */}
      <div className="text-center">
        <p className="text-2xl font-semibold text-cyan-300 italic">
          “Ny Fiiziana no Fototry ny Fifampitokisana.”
        </p>
        <p className="mt-2 text-sm text-white/60">One Identity. Trusted Communities. Connected Public Services.</p>
      </div>

      {/* Six pillars */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <Icon className="h-8 w-8 text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-white/70">{pillar.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Core modules – compact grid */}
      <div>
        <h3 className="text-center text-xl font-semibold text-white mb-6">Core Modules</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-cyan-300" />
                <span className="mt-2 text-xs font-medium text-white/70 text-center">{mod.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
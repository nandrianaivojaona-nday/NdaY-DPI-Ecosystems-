// components/home/DigitalPublicInfrastructureEcosystems.tsx
"use client";

import React from "react";
import Link from "next/link";
import Chapter from "@/components/ui/Chapter";
import { ecosystems, Dpi } from "@/data/ecosystems";
import DpiIcon from "@/components/shared/DpiIcon";
import { useMemo } from "react";

// Helper to group ecosystems by layer
const groupByLayer = (ecosystems: Dpi[]) => {
  const layers = {
    foundation: [],
    "territorial-governance": [],
    sectoral: [],
    intelligence: [],
    innovation: [],
  } as Record<string, Dpi[]>;

  ecosystems.forEach((eco) => {
    if (layers[eco.layer]) {
      layers[eco.layer].push(eco);
    }
  });

  return layers;
};

export default function DigitalPublicInfrastructureEcosystems() {
  const grouped = useMemo(() => groupByLayer(ecosystems), []);

  // Map layer names to display labels
  const layerLabels: Record<string, string> = {
    foundation: "Foundation Layer",
    "territorial-governance": "Territorial Governance Layer",
    sectoral: "Sectoral DPIs",
    intelligence: "Intelligence Layer",
    innovation: "Innovation Layer",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Overall page header */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            How does NdaY work?
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            A Governance-Led Digital Public Infrastructure Ecosystem
          </h1>
          <p className="mt-6 text-xl text-white/70">
            Every DPI is organised into layers derived from governance — from foundational infrastructure
            to territorial intelligence and innovation — all interoperating through a shared core.
          </p>
        </div>
      </section>

      {/* ---------- NEW: Why Digital Public Infrastructure? ---------- */}
      <Chapter
        question="WHY DOES SOCIETY NEED NDAY?"
        category="Digital Public Infrastructure"
        title="Digital Infrastructure in Service of Public Governance"
        description="Digital Public Infrastructure exists to strengthen public governance, not to replace it. Governance defines the ecosystem; digital capabilities enable it."
        manifesto="Trusted identities, interoperable governance, and territorial intelligence work together to improve lives and strengthen communities."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Why Governments Need DPIs</h4>
            <p className="mt-2 text-sm text-white/80">Efficient, transparent, and accountable public services that reach every citizen.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Why Communities Need DPIs</h4>
            <p className="mt-2 text-sm text-white/80">Participation, collective decision‑making, and local empowerment through shared data and tools.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Why Citizens Need DPIs</h4>
            <p className="mt-2 text-sm text-white/80">Access to services, secure identity, and a voice in governance — dignity and agency.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Why Interoperability Matters</h4>
            <p className="mt-2 text-sm text-white/80">Connected systems create connected decisions. No silos, no duplication.</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- Constitutional Principles ---------- */}
      <Chapter
        question="WHAT GUIDES THE ARCHITECTURE?"
        category="Architectural Principles"
        title="Four Pillars of Our Ecosystem"
        description="Every DPI we build is grounded in four principles, derived from the governance architecture of communities and public institutions, that ensure sovereignty, public value, trust, and territorial intelligence."
        manifesto="Principles come from governance; the architecture puts them into practice."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Sovereignty</h4>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Technological Sovereignty</li>
              <li>Institutional Sovereignty</li>
              <li>Territorial Sovereignty</li>
              <li>Data Sovereignty</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Public Value</h4>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Digital Public Infrastructure</li>
              <li>Digital Public Goods</li>
              <li>Open Standards</li>
              <li>Open APIs & Governance</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Trust</h4>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Identity & Consent</li>
              <li>Credentials & Privacy</li>
              <li>Security & Accountability</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Territorial Intelligence</h4>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Geography & Communities</li>
              <li>Local Government & Spatial Intelligence</li>
              <li>Decision Intelligence</li>
            </ul>
          </div>
        </div>
      </Chapter>

      {/* ---------- NEW: NdaY Governance Model ---------- */}
      <Chapter
        question="HOW IS NDAY GOVERNED?"
        category="Governance Model"
        title="Distributed, Decentralized, Accountable"
        description="NdaY's governance model respects communal autonomy while ensuring national coherence through shared standards and open protocols."
        manifesto="Good governance of DPI is as important as good technology."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Distributed</h4>
            <p className="mt-2 text-sm text-white/70">Decisions are made at the appropriate territorial level.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Decentralized</h4>
            <p className="mt-2 text-sm text-white/70">No single point of control — sovereignty is preserved.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Accountable</h4>
            <p className="mt-2 text-sm text-white/70">Transparency, auditability, and community oversight.</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- Core Platform ---------- */}
      <Chapter
        question="WHAT IS THE BACKBONE?"
        category=""
        title="NdaY Core"
        description="The shared platform services of the ecosystem. Every digital capability is exposed as a service to all DPIs, and none replaces an institutional decision."
        manifesto="One core, infinite possibilities."
        align="center"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Digital Identity</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Identity</li>
              <li>Authentication</li>
              <li>Trust</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Knowledge</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Knowledge Base</li>
              <li>AI</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Territorial Intelligence</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>GIS</li>
              <li>Territorial Registry</li>
              <li>Digital Twin</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6 backdrop-blur-sm">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Platform Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>API Gateway</li>
              <li>Security</li>
              <li>Collaboration</li>
              <li>Version Manager</li>
              <li>Design System</li>
            </ul>
          </div>
        </div>
      </Chapter>

      {/* ---------- DPI Classification (layered ecosystem cards) ---------- */}
      <Chapter
        question="HOW ARE DPIS ORGANISED?"
        category="Institutional Stack"
        title="From Society to Technology"
        description="Society, Governance, Public Services, Digital Public Infrastructure, Shared Platform Services, Technology. Each layer is derived from, and accountable to, the one before it."
        manifesto="Technology is the last layer in the chain, not the first."
        align="center"
      >
        <div className="space-y-16">
          {Object.entries(grouped).map(([layerKey, dpis]) => {
            if (dpis.length === 0) return null;
            return (
              <div key={layerKey}>
                <h3 className="mb-6 text-2xl font-semibold text-cyan-200 border-b border-cyan-400/20 pb-2">
                  {layerLabels[layerKey] || layerKey}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {dpis.map((dpi) => (
                    <EcosystemCard key={dpi.id} dpi={dpi} />
                  ))}
                </div>
              </div>
            );
          })}
          <div className="text-center text-sm italic text-white/40">
            Future sectoral DPIs — Education, Energy, Transport, Justice, Housing, Climate, Sports, Youth — will be added seamlessly.
          </div>
        </div>
      </Chapter>

      {/* ---------- Interoperability & DPIAR (enhanced) ---------- */}
      <Chapter
        question="HOW DO LAYERS CONNECT?"
        category="Interoperability & DPIAR"
        title="Every DPI Enriches Every Other"
        description="Through NdaY Core and the DPIAR framework, ecosystems exchange identity, territorial data, GIS, analytics, AI insights, and knowledge — transforming a stack of layers into a unified intelligence network."
        manifesto="Interoperability is a governance principle before it is a technical feature."
        align="center"
      >
        <div className="space-y-8">
          {/* Core + DPIAR diagram */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-cyan-600 px-10 py-3 text-xl font-bold text-white shadow-lg shadow-cyan-500/20">
              NdaY Core + DPIAR
            </div>
            <div className="my-4 h-6 w-0.5 bg-cyan-400/30" />
            <div className="flex flex-wrap justify-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-6 py-3 text-sm">
              <span className="font-semibold text-cyan-300">Identity</span>
              <span className="text-white/20">|</span>
              <span className="font-semibold text-cyan-300">Registries</span>
              <span className="text-white/20">|</span>
              <span className="font-semibold text-cyan-300">GIS</span>
              <span className="text-white/20">|</span>
              <span className="font-semibold text-cyan-300">AI</span>
              <span className="text-white/20">|</span>
              <span className="font-semibold text-cyan-300">Analytics</span>
              <span className="text-white/20">|</span>
              <span className="font-semibold text-cyan-300">API</span>
            </div>
            <div className="my-4 h-6 w-0.5 bg-cyan-400/30" />
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {Object.keys(grouped).map((layerKey) => (
                <span
                  key={layerKey}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-white/80"
                >
                  {layerLabels[layerKey] || layerKey}
                </span>
              ))}
            </div>
          </div>

          {/* DPIAR details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <h4 className="font-semibold text-cyan-300">API Gateway</h4>
              <p className="text-white/70">Unified API access for all DPIs.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <h4 className="font-semibold text-cyan-300">Identity & Consent</h4>
              <p className="text-white/70">Trusted, consent‑based identity management.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <h4 className="font-semibold text-cyan-300">Registries</h4>
              <p className="text-white/70">Territorial, demographic, and economic registries.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <h4 className="font-semibold text-cyan-300">Standards</h4>
              <p className="text-white/70">X‑Road compatible, open standards, interoperability.</p>
            </div>
          </div>
        </div>
      </Chapter>

      {/* ---------- Territorial Architecture ---------- */}
      <Chapter
        question="HOW DOES TERRITORY RELATE?"
        category="Territorial Architecture"
        title="From Citizen to Nation"
        description="NdaY models territorial governance as a relational continuum, not a flat administrative list. Every level builds upon the previous one."
        manifesto="Territory is not a set of boxes—it's a living system of relationships."
        align="center"
      >
        <div className="flex flex-col items-center gap-4 text-sm">
          {[
            "Citizen",
            "belongs to → Family",
            "Family → Household",
            "Household → Fokontany",
            "Fokontany → Commune",
            "Commune → District",
            "District → Region",
            "Region → Nation",
          ].map((step, idx) => (
            <div
              key={idx}
              className={`rounded-full border px-6 py-2 ${
                idx % 2 === 0
                  ? "border-cyan-400/20 bg-cyan-500/10 text-white"
                  : "border-white/10 bg-white/5 text-white/60"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-white/50">
          This hierarchy informs every DPI — from identity to spatial planning.
        </p>
      </Chapter>

      {/* ---------- Evolution ---------- */}
      <Chapter
        question="WHERE ARE WE HEADED?"
        category="Yesterday, Today, Tomorrow"
        title="The Journey of NdaY"
        description="From standalone applications to a territorial intelligence network — NdaY is constantly evolving to connect communities and decisions."
        manifesto="Evolution is built into the architecture."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-white/40">Yesterday</p>
            <p className="mt-2 text-xl font-semibold text-white">Standalone Applications</p>
            <p className="text-sm text-white/50">Siloed, non‑interoperable</p>
          </div>
          <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-6 text-center shadow-lg shadow-cyan-500/10">
            <p className="text-xs uppercase tracking-wider text-cyan-300">Today</p>
            <p className="mt-2 text-xl font-semibold text-white">Layered DPI Ecosystems</p>
            <p className="text-sm text-cyan-300/70">Connected, governance-led stack</p>
          </div>
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-emerald-300">Tomorrow</p>
            <p className="mt-2 text-xl font-semibold text-white">Territorial Intelligence Network</p>
            <p className="text-sm text-emerald-300/70">Predictive, adaptive, community‑driven</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- NEW: Research ---------- */}
      <Chapter
        question="HOW DO WE KNOW?"
        category="Research & Evidence"
        title="Research‑Driven Design"
        description="NdaY is built on rigorous research, continuous evaluation, and evidence‑based decision‑making — ensuring that every DPI delivers measurable value."
        manifesto="Research is the compass that guides our evolution."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold text-cyan-300">Academic Partnerships</h4>
            <p className="mt-2 text-sm text-white/70">Collaborations with universities and research institutions for independent evaluation.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold text-cyan-300">Living Lab Insights</h4>
            <p className="mt-2 text-sm text-white/70">Real‑world testing and iterative improvement based on community feedback.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold text-cyan-300">Open Data & Publications</h4>
            <p className="mt-2 text-sm text-white/70">Publicly available research, data sets, and technical publications.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold text-cyan-300">Impact Measurement</h4>
            <p className="mt-2 text-sm text-white/70">Quantitative and qualitative metrics to track social, economic, and environmental outcomes.</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- NEW: Community ---------- */}
      <Chapter
        question="WHO BUILDS AND SUPPORTS?"
        category="Community"
        title="A Living Ecosystem of Contributors"
        description="NdaY is built by a diverse community — developers, designers, domain experts, citizens, and public servants — all working together to create public value."
        manifesto="Community is the heart of Digital Public Infrastructure."
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Developers</h4>
            <p className="mt-2 text-sm text-white/70">Building and extending DPIs through open source contributions.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Citizens</h4>
            <p className="mt-2 text-sm text-white/70">Users and co‑creators who shape services through participation.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Public Servants</h4>
            <p className="mt-2 text-sm text-white/70">Government officials who champion and operationalise DPIs.</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- NEW: Partners ---------- */}
      <Chapter
        question="WHO COLLABORATES?"
        category="Partners"
        title="A Multi‑Stakeholder Alliance"
        description="NdaY's success depends on strong partnerships across government, civil society, academia, and the private sector."
        manifesto="No one builds a DPI ecosystem alone."
        align="center"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Government</h4>
            <p className="text-sm text-white/70">Ministries, local authorities, and public agencies.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Civil Society</h4>
            <p className="text-sm text-white/70">NGOs, community organizations, and advocacy groups.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Universities</h4>
            <p className="text-sm text-white/70">Research and education institutions driving innovation.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Private Sector</h4>
            <p className="text-sm text-white/70">Technology companies, service providers, and entrepreneurs.</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- NEW: Resources ---------- */}
      <Chapter
        question="WHAT CAN YOU EXPLORE?"
        category="Resources"
        title="Documentation, Standards, and Tools"
        description="Open access to all NdaY resources — from technical documentation to governance frameworks — to empower implementation and innovation."
        manifesto="Resources are the fuel for the ecosystem."
        align="center"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Documentation</h4>
            <p className="text-sm text-white/70">Developer guides, API references, and deployment manuals.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Standards</h4>
            <p className="text-sm text-white/70">Open standards, data models, and interoperability specifications.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">SDK & APIs</h4>
            <p className="text-sm text-white/70">Software development kits for building on NdaY Core.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Research Papers</h4>
            <p className="text-sm text-white/70">Academic publications, case studies, and white papers.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Community Forums</h4>
            <p className="text-sm text-white/70">Discussion boards, Q&A, and collaboration spaces.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <h4 className="font-semibold text-cyan-300">Downloads</h4>
            <p className="text-sm text-white/70">Reports, policy briefs, and presentation materials.</p>
          </div>
        </div>
      </Chapter>

      {/* ---------- Closing ---------- */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <blockquote className="text-2xl font-light italic text-white/80">
            “NdaY is not a collection of applications. It is a living Digital Public Infrastructure
            Ecosystem where every connected Commune strengthens every other Commune.”
          </blockquote>
          <p className="mt-4 text-sm text-white/40">— NdaY Engineering Philosophy</p>
          <div className="mt-12">
            <a
              href="/strategic-initiatives"
              className="inline-block rounded-full bg-cyan-600 px-10 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-500"
            >
              Explore Strategic Initiatives →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub‑component for each DPI card
function EcosystemCard({ dpi }: { dpi: Dpi }) {
  const isInternal = dpi.id === "internal";
  const statusLabel = dpi.status === "foundation" ? "Foundation" : dpi.status;

  return (
    <Link href={`/ecosystem/${dpi.id}`} className="group block h-full">
      <div
        className={`h-full rounded-xl border p-6 backdrop-blur-sm transition ${
          isInternal
            ? "border-slate-300/20 bg-slate-400/10 hover:border-slate-300/40 hover:bg-slate-400/15"
            : "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10"
        }`}
      >
        <div className="flex items-start gap-3">
          <DpiIcon dpi={dpi} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-white transition group-hover:text-cyan-100">{dpi.name}</h4>
              {isInternal && (
                <span className="inline-block rounded-full border border-slate-300/30 bg-slate-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200">
                  Internal Workspace
                </span>
              )}
            </div>
            <p className={`text-sm ${isInternal ? "text-slate-200" : "text-cyan-300"}`}>
              {dpi.description}
            </p>
            {dpi.status && (
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  dpi.status === "online"
                    ? "bg-green-500/20 text-green-300"
                    : dpi.status === "coming"
                      ? isInternal
                        ? "bg-slate-500/25 text-slate-200"
                        : "bg-yellow-500/20 text-yellow-300"
                      : dpi.status === "foundation"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-red-500/20 text-red-300"
                }`}
              >
                {statusLabel}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          {dpi.beneficiaries && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Who benefits</p>
              <p className="text-white/80">{dpi.beneficiaries}</p>
            </div>
          )}
          {dpi.interoperability && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Interoperability</p>
              <p className="text-white/80">{dpi.interoperability}</p>
            </div>
          )}
          {dpi.maturity && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Maturity</p>
              <p className="text-white/80">{dpi.maturity}</p>
            </div>
          )}
          {dpi.modules && dpi.modules.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Modules</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {dpi.modules.map((mod) => (
                  <span key={mod} className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          )}
          {isInternal && (
            <div className="rounded-lg border border-slate-300/15 bg-black/20 p-3 text-xs leading-relaxed text-slate-200/90">
              NdaY'Internal is the institutional operating workspace for governance workflows, approvals, reporting,
              partnerships and delivery coordination across the ecosystem.
            </div>
          )}
          <div className="pt-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80 transition group-hover:text-cyan-200">
            Open detail view →
          </div>
        </div>
      </div>
    </Link>
  );
}

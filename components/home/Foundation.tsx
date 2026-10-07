"use client";

import {
  Network,
  Building2,
  Sparkles,
  Globe2,
} from "lucide-react";

const pillars = [
  {
    icon: Network,
    title: "Digital Public Infrastructure",
    description:
      "An interoperable digital foundation enabling secure identities, trusted data exchange, shared services and collaboration across communities, institutions and sectors.",
  },
  {
    icon: Building2,
    title: "Communal Digital Ecosystems",
    description:
      "Every Commune becomes the cornerstone of territorial transformation, integrating governance, public services, local economies, community participation and innovation.",
  },
  {
    icon: Sparkles,
    title: "Collective Innovation",
    description:
      "Ideas emerge from citizens, are refined through Living Labs and engineering, then evolve into scalable solutions that create measurable impact.",
  },
  {
    icon: Globe2,
    title: "National Interoperability",
    description:
      "Independent ecosystems remain autonomous while exchanging trusted information through common standards, creating a resilient national Digital Public Infrastructure.",
  },
];

export default function Foundation() {
  return (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <p className="text-xl leading-9 text-white">
          NdaY' is trying to build a Communal DPI Ecosystems.
        </p>
        <p className="mt-8 text-lg leading-9 text-white/75">
          It is a Digital Public Infrastructure Ecosystem that enables
          communities, local governments, universities, entrepreneurs,
          researchers, development partners and citizens to work together
          through interoperable digital ecosystems.
        </p>
        <p className="mt-8 text-lg leading-9 text-white/75">
          Rather than digitising isolated services, NdaY' creates the digital
          foundations upon which communities can continuously innovate,
          collaborate and transform their territories.
        </p>
      </div>

      {/* Four Pillars */}
      <div className="grid gap-8 md:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article
              key={pillar.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/8"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 transition group-hover:bg-cyan-500/20">
                <Icon size={30} />
              </div>
              <h3 className="text-2xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-5 leading-8 text-white/70">{pillar.description}</p>
            </article>
          );
        })}
      </div>

      {/* Closing Statement */}
      <div className="rounded-3xl border border-cyan-400/20 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 p-12">
        <h3 className="text-3xl font-bold text-white">The NdaY' Approach</h3>
        <p className="mt-8 text-lg leading-9 text-white/80">
          Technology alone does not transform territories. Communities do.
        </p>
        <p className="mt-6 text-lg leading-9 text-white/80">
          NdaY' provides the shared digital infrastructure, engineering
          methodology and collaborative ecosystem that empower every
          Commune to become an engine of innovation, resilience and
          sustainable development.
        </p>
      </div>
    </div>
  );
}
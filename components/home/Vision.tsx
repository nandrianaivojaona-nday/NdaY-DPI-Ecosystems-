"use client";

import {
  Globe2,
  Briefcase,
  Landmark,
  Leaf,
} from "lucide-react";

const pillars = [
  {
    icon: Globe2,
    title: "Connected Communities",
    description:
      "Building a world where citizens, institutions and communities collaborate through trusted Digital Public Infrastructure to create opportunities and improve quality of life.",
  },
  {
    icon: Briefcase,
    title: "Thriving Local Economies",
    description:
      "Empowering every Commune to strengthen existing businesses, discover new opportunities, attract investments and generate sustainable employment.",
  },
  {
    icon: Landmark,
    title: "Empowered Territories",
    description:
      "Supporting every Commune to become the owner of its digital transformation through territorial intelligence, collaborative governance and interoperable digital ecosystems.",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    description:
      "Promoting balanced economic growth, environmental stewardship and social inclusion for present and future generations.",
  },
];

export default function Vision() {
  return (
    <div className="space-y-12">
      {/* Vision Statement */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h3 className="text-3xl font-bold text-white">Our Vision</h3>
        <p className="mt-8 text-xl leading-10 text-white">
          NdaY' is built upon a simple but ambitious vision:
        </p>
        <p className="mt-6 text-3xl font-semibold text-cyan-300">
          "A world where connected people enjoy a high quality standard of living."
        </p>
        <p className="mt-8 text-lg leading-9 text-white/75">
          We believe that digital transformation reaches its full potential
          when it strengthens communities, creates opportunities, empowers
          local economies and enables every citizen to actively participate
          in shaping a prosperous and sustainable future.
        </p>
      </div>

      {/* Mission */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h3 className="text-3xl font-bold text-white">Our Mission</h3>
        <p className="mt-8 text-lg leading-9 text-white/75">
          We bridge innovation and community by developing interoperable
          Digital Public Infrastructure Ecosystems that empower Communes,
          institutions, businesses and citizens to collaborate, innovate
          and continuously improve quality of life.
        </p>
      </div>

      {/* Strategic Commitment */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h3 className="text-3xl font-bold text-white">Our Strategic Commitment</h3>
        <p className="mt-8 text-lg leading-9 text-white/75">
          NdaY' is committed to equipping every Commune with interoperable
          Digital Public Infrastructure, territorial intelligence and
          collaborative engineering methods that transform local
          challenges into sustainable opportunities.
        </p>
        <p className="mt-8 text-lg leading-9 text-white/75">
          Through trusted data, shared digital services, Living Labs,
          artificial intelligence and sector-specific ecosystems,
          every territory can strengthen existing businesses,
          discover new economic opportunities and improve public services.
        </p>
      </div>

      {/* Vision Pillars */}
      <div className="grid gap-8 md:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article
              key={pillar.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.08]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                <Icon size={30} />
              </div>
              <h3 className="text-2xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-5 leading-8 text-white/70">{pillar.description}</p>
            </article>
          );
        })}
      </div>

      {/* Promise */}
      <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 p-12">
        <h3 className="text-3xl font-bold text-white">Our Promise to Every Commune</h3>
        <p className="mt-8 text-lg leading-9 text-white/80">
          Every Commune possesses unique people, culture, natural
          resources, knowledge and economic potential.
        </p>
        <p className="mt-8 text-lg leading-9 text-white/80">
          NdaY' provides the Digital Public Infrastructure Ecosystem that
          enables every territory to understand itself, connect its
          stakeholders, strengthen existing economic activities and
          continuously discover new opportunities for sustainable
          development.
        </p>
        <p className="mt-8 text-lg leading-9 text-white/80">
          We believe every Commune should become the owner of its digital
          transformation while remaining interoperable with regional,
          national and global digital ecosystems.
        </p>
      </div>

      {/* Closing */}
      <div className="text-center">
        <h3 className="text-4xl font-bold text-white">Towards a Connected Future</h3>
        <p className="mt-8 text-xl leading-10 text-white/75">
          Our vision becomes reality one Commune at a time.
        </p>
        <p className="mt-6 text-xl leading-10 text-white/75">
          Every connected citizen strengthens a connected community.
          Every connected community strengthens a connected nation.
        </p>
        <p className="mt-10 text-2xl font-semibold italic text-cyan-300">
          Together, they create a world where connected people enjoy a
          high quality standard of living.
        </p>
      </div>
    </div>
  );
}
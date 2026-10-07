"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";

const principles = [
  {
    title: "People Before Technology",
    description:
      "Every Digital Public Infrastructure begins with a person. Technology is not the purpose of digital transformation; it is an enabler of human development. Every individual has a unique identity, belongs to a family, lives within a household, participates in a community and contributes to society throughout life. NdaY' therefore places people—not applications, databases or institutions—at the centre of every ecosystem. Through NdaY'Fiiziana, individuals become trusted participants in an interconnected digital society where identity enables participation, opportunity and public value rather than simply authentication. Every technological decision should ultimately improve people's lives, strengthen human dignity and expand opportunities for present and future generations.",
  },
  {
    title: "Communities Before Systems",
    description:
      "Communities are the foundation of resilient societies. Digital transformation becomes meaningful only when it strengthens the places where people live, collaborate and solve problems together. Strong communities create trusted relationships, encourage participation and generate the local knowledge necessary for sustainable development. NdaY' recognises the Fokontany as the foundational community institution where everyday civic life begins. Through NdaY'Fokontany, communities become active participants in Digital Public Infrastructure rather than passive recipients of digital services. Systems should therefore adapt to communities—not require communities to adapt to systems.",
  },
  {
    title: "Shared Capabilities Before Duplication",
    description:
      "Digital Public Infrastructure should be built once and reused many times. Too many digital initiatives repeatedly recreate the same capabilities—identity management, territorial registries, document management, notifications, payments, analytics and interoperability—leading to fragmented investments and disconnected services. NdaY' designs these as shared Digital Public Infrastructure capabilities that can be securely reused across governance, agriculture, health, tourism, environmental management and every future ecosystem. Shared capabilities reduce costs, improve interoperability, accelerate innovation and create long-term public value that benefits the entire ecosystem.",
  },
  {
    title: "Collaboration Before Isolation",
    description:
      "Public value grows through collaboration. No single institution, organisation or technology provider can build an inclusive digital society alone. Governments, local authorities, communities, academia, businesses, innovators, civil society and development partners each contribute unique knowledge, experience and resources. NdaY' creates trusted environments where these stakeholders collaborate through common standards, shared governance and interoperable Digital Public Infrastructure, enabling innovation that benefits society as a whole rather than individual organisations alone.",
  },
  {
    title: "Contextualisation Before Replication",
    description:
      "Every country has its own identity, institutions and communities. Digital Public Infrastructure should not be copied from one nation to another without understanding local realities. NdaY' adopts internationally recognised Digital Public Infrastructure principles while contextualising them within Madagascar's territorial organisation, governance structures, legal frameworks, languages, culture and community practices. This balance between global interoperability and local relevance ensures that innovation remains both internationally aligned and nationally meaningful.",
  },
  {
    title: "Trust Before Transactions",
    description:
      "Trust is the invisible infrastructure behind every digital interaction. People adopt digital services only when they trust the institutions, technologies and governance that support them. NdaY' builds trust through secure identity, responsible data governance, privacy protection, transparency, interoperability and community participation. Trust is not treated as a technical feature but as a societal asset that enables confident participation across every Digital Public Infrastructure ecosystem. Without trust, digital transformation cannot be sustainable.",
  },
  {
    title: "Living Innovation Before Static Solutions",
    description:
      "Societies evolve continuously, and Digital Public Infrastructure must evolve with them. Rather than delivering fixed technology solutions, NdaY' promotes continuous learning through Living Labs where communities, institutions, researchers and innovators co-design, prototype, validate and improve solutions together. Innovation therefore becomes an ongoing process of observation, experimentation, learning and scaling rather than a one-time technology deployment.",
  },
  {
    title: "Evolution Before Replacement",
    description:
      "Digital transformation is a journey of continuous improvement. Existing institutions, investments and information systems represent valuable assets that should evolve rather than be discarded. NdaY' promotes progressive transformation through interoperability, shared standards and incremental innovation, allowing organisations to modernise while preserving institutional knowledge, protecting investments and ensuring continuity of public services. Evolution creates resilience, sustainability and long-term institutional ownership.",
  },
  {
    title: "Public Value Before Private Value",
    description:
      "Every Digital Public Infrastructure should generate benefits that extend beyond individual organisations. The ultimate purpose of innovation is to improve people's quality of life, strengthen communities, support resilient institutions and contribute to sustainable national development. NdaY' therefore measures success not by the number of applications deployed, but by the public value created for individuals, communities and society.",
  },
];

export default function FoundationalPrinciples() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <GlassPanel className="text-center">
        <p className="text-lg text-white/80 leading-relaxed">
          Technology alone does not transform societies. Sustainable transformation emerges when people,
          communities, institutions and technology evolve together through trust, collaboration and shared
          public value.
        </p>
        <p className="text-white/60 mt-3 text-sm">
          These principles guide the design, governance and continuous evolution of every Digital Public
          Infrastructure ecosystem developed by NdaY.
        </p>
      </GlassPanel>

      {principles.map((principle) => (
        <GlassPanel key={principle.title} className="border-white/5">
          <h3 className="text-xl font-semibold text-white">{principle.title}</h3>
          <p className="text-white/70 mt-2 leading-relaxed text-sm">{principle.description}</p>
        </GlassPanel>
      ))}
    </div>
  );
}
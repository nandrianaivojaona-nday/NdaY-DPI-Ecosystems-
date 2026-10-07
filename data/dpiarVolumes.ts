// DPIAR: Digital Public Infrastructure Ecosystem Architecture Reference (draft structure, six volumes)
export type VolumeSection = { heading: string; body?: string; items?: string[]; diagram?: string };
export type Volume = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  purpose: string;
  sections: VolumeSection[];
};

export const dpiarName = "DPIAR: Digital Public Infrastructure Ecosystem Architecture Reference";

export const anchorPrinciple =
  "Digital Public Infrastructure exists to strengthen public governance, not to replace it. Governance defines the ecosystem; digital capabilities enable it. Every platform, application and technical service within the NdaY DPI Ecosystem shall be derived from, aligned with, and accountable to the governance architecture established by communities and public institutions.";

export const conceptualChain = [
  "Society",
  "Governance",
  "Public Services",
  "Digital Public Infrastructure",
  "Shared Platform Services",
  "Technology",
];

export const volumes: Volume[] = [
  {
    slug: "volume-i",
    number: "I",
    title: "Foundations",
    subtitle: "Purpose, principles and the evolution of DPIAR",
    purpose:
      "States why DPIAR exists and the principle that anchors every other volume: technology is the last layer in the chain, not the first.",
    sections: [
      { heading: "Anchor principle", body: anchorPrinciple },
      { heading: "Conceptual chain", items: conceptualChain },
      {
        heading: "Inverted ordering",
        body: "Traditional digital transformation starts with software, then processes, then people. NdaY inverts this order.",
        diagram:
          "Traditional:  Software -> Processes -> People\n\nNdaY:  People -> Communities -> Governance -> Public Services\n       -> Digital Infrastructure -> Technology",
      },
      {
        heading: "Four stages of evolution",
        items: [
          "Stage 1, Software Architecture: how to build digital public infrastructure (applications, APIs, interoperability, databases, cloud, security).",
          "Stage 2, Ecosystem Architecture: how multiple DPIs collaborate (NdaY'Website, Fokontany, Ben'Tanana, Fako, Tantsaha).",
          "Stage 3, Governance Architecture: software does not create governance; governance already exists and software enables it.",
          "Stage 4, Public Institution Architecture: DPIAR describes public institutions operating in the digital age.",
        ],
      },
      {
        heading: "What DPIAR is",
        body: "An Enterprise Governance Architecture Reference for a Digital Public Infrastructure Ecosystem, closer to an institutional architecture framework than to a conventional IT reference architecture.",
      },
      {
        heading: "Alignment",
        body: "Aligned with Ecosystem Architecture V9.2 and TVE Core v3.0.0. See the architecture page for layers, invariants and the capability register.",
      },
    ],
  },
  {
    slug: "volume-ii",
    number: "II",
    title: "Institutional Ecosystem Architecture",
    subtitle: "The institutions, communities and services the ecosystem serves",
    purpose:
      "Describes the ecosystem as a whole. It is not only digital: the digital layer is one part of a wider institutional landscape.",
    sections: [
      {
        heading: "Elements of the ecosystem",
        items: [
          "Institutions",
          "Governance structures",
          "Communities",
          "Public services",
          "Legal authorities",
          "Digital capabilities",
        ],
      },
      {
        heading: "Foundational services",
        items: [
          "NdaY'Fiiziana: identity",
          "NdaY'Fokontany: territory and local community governance",
          "NdaY'Ben'Tanana: governance",
        ],
      },
      {
        heading: "Sectoral DPIs",
        body: "Sector applications such as NdaY'Fako (waste), NdaY'Tantsaha (agriculture), NdaY'Tsidika (tourism), NdaY'Lanona (events), Beauty and future DPIs own domain operations only.",
      },
      {
        heading: "Actor autonomy",
        body: "Actors keep control of their websites and content. Connecting to the ecosystem does not transfer ownership.",
      },
      {
        heading: "Hierarchy",
        diagram:
          "NdaY Enterprise\n  -> DPIAR\n     -> Governance Architecture -> Fokontany, Ben'Tanana\n     -> Technical Architecture -> NdaY'Core Platform Services\n     -> Sectoral DPIs -> Fako, Tantsaha, Tsidika, Future DPIs",
      },
    ],
  },
  {
    slug: "volume-iii",
    number: "III",
    title: "Governance Reference",
    subtitle: "Authority, decisions, consent and accountability",
    purpose:
      "Defines the governance rules from which every platform and service is derived and to which it is accountable.",
    sections: [
      {
        heading: "Governance comes first",
        body: "Services and platforms are derived from the governance architecture established by communities and public institutions.",
      },
      {
        heading: "Separate checks",
        items: [
          "Authentication",
          "Authorization",
          "Consent",
          "Entitlement",
          "Governance approval",
        ],
      },
      {
        heading: "Institutional decisions",
        body: "Recommendations cannot impersonate institutional decisions. Decisions are taken by the competent institution and recorded.",
      },
      {
        heading: "Evidence and assessment",
        items: [
          "Unknown evidence never becomes a favourable score.",
          "Assessments retain source, model, policy and registry versions.",
          "New observations never auto-modify production policies.",
        ],
      },
      {
        heading: "Public discovery",
        body: "Public territorial discovery requires no identity verification.",
      },
      { heading: "Audit and accountability", body: "To be detailed: audit trail, review cycles and responsibilities." },
    ],
  },
  {
    slug: "volume-iv",
    number: "IV",
    title: "Capability Reference",
    subtitle: "Institutional capabilities and digital capabilities",
    purpose:
      "Separates what institutions do from the reusable technical services that support them, so each capability has a clear owner.",
    sections: [
      {
        heading: "Institutional capabilities",
        body: "Exercised by public institutions. These belong to governance.",
        items: [
          "Register Resident",
          "Declare Visitor",
          "Validate Residence",
          "Approve Local Project",
          "Issue Local Certificate",
          "Manage Community Assembly",
        ],
      },
      {
        heading: "Digital capabilities",
        body: "Reusable technical services. These belong to NdaY'Core.",
        items: [
          "Identity Verification",
          "Authentication",
          "Notifications",
          "Digital Signature",
          "Workflow Engine",
          "GIS",
          "Analytics",
          "Payments",
          "Messaging",
          "Document Storage",
        ],
      },
      {
        heading: "Mapping rule",
        body: "Each institutional capability is enabled by one or more digital capabilities. A digital capability never becomes an institutional decision.",
      },
      {
        heading: "Status values",
        body: "Implemented, pilot, planned or blocked. The current register is on the architecture page.",
      },
    ],
  },
  {
    slug: "volume-v",
    number: "V",
    title: "Information Reference Architecture",
    subtitle: "The shared information model every DPI must use",
    purpose:
      "Defines core entities and relationships. Every sectoral DPI extends this model instead of inventing its own, which gives semantic interoperability.",
    sections: [
      {
        heading: "Core entities",
        items: [
          "Person", "Household", "Family", "Residence", "Visitor", "Community", "Fokontany", "Commune", "District", "Region",
          "Organisation", "Asset", "Land Parcel", "Building", "Business", "Service", "Permit", "Project", "Event", "Case", "Document",
        ],
      },
      {
        heading: "Example relationships",
        diagram:
          "Person -> belongs to -> Household -> located in -> Residence\n  -> within -> Fokontany -> within -> Commune",
      },
      {
        heading: "Sector extensions",
        items: [
          "NdaY'Fako adds: Bin, Collection Route, Waste Producer, Recycling Facility.",
          "NdaY'Tantsaha adds: Farm, Farmer, Plot, Crop, Harvest.",
          "NdaY'Tsidika adds: Visitor Site, Accommodation, Guide, Tourist Activity.",
        ],
      },
      {
        heading: "Rules",
        items: [
          "Sector models extend the core model; they do not redefine it.",
          "Entities and relationships are versioned.",
          "Data ownership follows the governing institution.",
        ],
      },
    ],
  },
  {
    slug: "volume-vi",
    number: "VI",
    title: "Technical Reference",
    subtitle: "NdaY'Core platform services and technology",
    purpose:
      "Specifies the shared platform and technology, derived last from the governance, capability and information volumes.",
    sections: [
      {
        heading: "NdaY'Core platform services",
        items: [
          "Versioned API gateway",
          "Identity",
          "Workflow",
          "GIS",
          "Analytics",
          "Documents",
          "Notifications",
          "Interoperability",
        ],
      },
      {
        heading: "TVE Core v3.0.0",
        body: "A single versioned shared engine: evidence registry, TER, viability, EbA, financial readiness and reviewed learning.",
      },
      {
        heading: "Shared operational services",
        body: "Access, consent, entitlement, notifications, transactions, audit and integration.",
      },
      {
        heading: "Design constraints",
        items: [
          "Support unreliable connectivity.",
          "Keep deployment cost and complexity low.",
          "Preserve existing behaviour during upgrades.",
        ],
      },
      { heading: "Security and hosting", body: "To be detailed." },
    ],
  },
];

export const getVolume = (slug: string) => volumes.find((v) => v.slug === slug)!;

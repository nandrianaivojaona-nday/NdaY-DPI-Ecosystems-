import PlatformCard, { type Status } from "@/components/home/PlatformCard";

type Platform = {
  name: string;
  label: string;
  mission: string;
  className: string;
  desc: string;
  status: Status;
  url?: string;
  isFoundation?: boolean;
  purpose: string;
  modules: string[];
  beneficiaries: string;
  interoperability: string;
  maturity: string;
  evolutionSteps: string[];
};

// Enriched platform data (same as homepage)
const platforms: Platform[] = [
  // In the platforms array inside PlatformSection.tsx
{
  name: "NdaY'Fiiziana",
  label: "Foundational Identity DPI",
  mission: "One Identity. Trusted Communities. Connected Public Services.",
  className: "fiiziana",
  desc: "The trusted identity layer that enables every Malagasy to participate securely in the NdaY' ecosystem.",
  status: "foundation",
  isFoundation: true,
  purpose: "Provide the identity and trust foundation for all NdaY' DPIs.",
  modules: [
    "Identity Registry",
    "Household Registry",
    "Community Registry",
    "Organization Registry",
    "Territory Registry",
    "Trust Services",
    "Identity Wallet",
    "Consent Management",
    "Audit",
    "Integration Gateway",
  ],
  beneficiaries: "All citizens, households, organizations, territories, and public services.",
  interoperability: "Consumed by every NdaY' DPI via Single Sign‑On and identity APIs.",
  maturity: "Version 1.0 (Foundation)",
  evolutionSteps: [
    "Identity Registry",
    "Household & Community Registry",
    "Trust Services",
    "Integration with all DPIs",
  ],
},
  {
    name: "NdaY'Ben'Tanàna",
    label: "Territorial Digital Public Infrastructure",
    mission: "Powering communal services and identities through a trusted governance layer.",
    className: "bentanana",
    desc: "Governance ecosystem supporting civic participation and public services.",
    status: "coming",
    isFoundation: true,
    purpose: "Provide a unified identity, registry, and governance framework for all NdaY' ecosystems.",
    modules: [
      "Citizen Identity",
      "Household Registry",
      "Territorial Registry",
      "Business Registry",
      "Participatory Planning",
      "Budget Monitoring",
      "Citizen Voice",
      "Service Delivery",
    ],
    beneficiaries: "All citizens, local governments, and every NdaY' platform.",
    interoperability: "Connects all NdaY' ecosystems through shared identity and governance APIs.",
    maturity: "Concept → MVP in progress",
    evolutionSteps: [
      "Community Registry",
      "Participatory Governance",
      "Digital Service Delivery",
      "National DPI Backbone",
    ],
  },
  {
    name: "NdaY'Fako",
    label: "Circular Economy & Environmental DPI",
    mission: "Transforming waste into value through intelligent circular ecosystems.",
    className: "fako",
    desc: "Waste management ecosystem connecting citizens, collectors and municipalities; environmental assessment comes from shared TVE EbA.",
    status: "online",
    url: "https://nda-y-fako-digital-platform.vercel.app",
    purpose: "Enable waste tracking, recycling, and circular economy incentives.",
    modules: ["Waste Collection", "Recycling Marketplace", "Environmental Monitoring", "Community Rewards"],
    beneficiaries: "Citizens, waste collectors, recycling businesses, municipalities.",
    interoperability: "Integrated with Ben'Tanàna for citizen identity and territorial planning.",
    maturity: "Live (MVP)",
    evolutionSteps: [
      "Waste Collection",
      "Waste Management",
      "Circular Economy",
      "Communal Waste Intelligence",
      "National Environmental DPI",
    ],
  },
  {
    name: "NdaY'Tantsaha",
    label: "Agricultural Digital Public Infrastructure",
    mission: "Supporting resilient food systems through data-driven agriculture.",
    className: "tantsaha",
    desc: "Agricultural ecosystem connecting farmers, markets and knowledge networks; soil and water assessment via shared TVE evidence.",
    status: "coming",
    purpose: "Empower farmers with market access, advisory services, and supply chain visibility.",
    modules: ["Farmer Registry", "SecureFarm", "Agricultural Atlas", "Market Intelligence"],
    beneficiaries: "Farmers, agri-businesses, extension services, policy makers.",
    interoperability: "Uses Ben'Tanàna for land and farmer identity.",
    maturity: "In development",
    evolutionSteps: [
      "Farmer Registry",
      "SecureFarm",
      "Agricultural Ecosystem Atlas",
      "Food Systems Intelligence",
      "Agricultural DPI",
    ],
  },
  {
    name: "NdaY'Tsidika",
    label: "Cultural Heritage & Smart Tourism DPI",
    mission: "Connecting travellers with authentic cultural experiences and sustainable tourism.",
    className: "tsidika",
    desc: "Tourism ecosystem enabling discovery and cultural experiences; resilience and payments via shared services.",
    status: "coming",
    purpose: "Promote cultural heritage, support local tourism businesses, and manage visitor flows.",
    modules: ["Heritage Atlas", "Tourism Marketplace", "Cultural Event Calendar", "Visitor Analytics"],
    beneficiaries: "Tourists, local guides, artisans, hospitality providers, cultural institutions.",
    interoperability: "Leverages Ben'Tanàna for citizen guides and territorial data.",
    maturity: "In development",
    evolutionSteps: [
      "Cultural Discovery",
      "Smart Tourism",
      "Heritage Preservation",
      "Cultural Intelligence",
      "Tourism DPI",
    ],
  },
  {
    name: "NdaY'Hety",
    label: "Skills, Creative Economy & Local Services DPI",
    mission: "Unlocking local talent and creative enterprises through digital services.",
    className: "hety",
    desc: "Beauty and personal care services connecting professionals and clients; appointments and capacity via shared booking and transactions.",
    status: "offline",
    purpose: "Connect service providers with clients, build skills certification, and enable gig economy.",
    modules: ["Service Directory", "Booking System", "Skills Certification", "Review & Reputation"],
    beneficiaries: "Local service providers, clients, training institutions.",
    interoperability: "Uses Ben'Tanàna for citizen identity and business registry.",
    maturity: "Offline (planned)",
    evolutionSteps: [
      "Service Discovery",
      "Skills & Certification",
      "Creative Economy",
      "Local Intelligence",
      "Services DPI",
    ],
  },
  {
    name: "NdaY'Lanona",
    label: "Cultural, Social & Event Ecosystem DPI",
    mission: "Celebrating community, tradition, and modern ceremonies through digital coordination.",
    className: "lanona",
    desc: "Event ecosystem covering traditional, civil and modern ceremonies; uses shared booking, payments and TVE where relevant.",
    status: "coming",
    purpose: "Streamline event planning, community participation, and cultural preservation.",
    modules: ["Event Calendar", "Community Engagement", "Ceremony Planning", "Cultural Archiving"],
    beneficiaries: "Community members, event organisers, cultural associations.",
    interoperability: "Integrates with Ben'Tanàna for community identification.",
    maturity: "In development",
    evolutionSteps: [
      "Community Events",
      "Ceremony Management",
      "Cultural Archiving",
      "Social Intelligence",
      "Event DPI",
    ],
  },
  {
    name: "NdaY'Radoko",
    label: "Community Health Intelligence DPI",
    mission: "Improving maternal and youth infant under 3 months health through data-driven community care (IMCI).",
    className: "radoko",
    desc: "Health ecosystem focused on Integrated Management Child Illness and community health education services. Drone replaces the Health Agent",
    status: "offline",
    purpose: "Track health indicators, manage child immunisation, and enable community health workers.",
    modules: ["Child Health Registry", "Immunisation Tracking", "Community Health Alerts", "Health Analytics"],
    beneficiaries: "Children, mothers, community health workers, health facilities.",
    interoperability: "Uses Ben'Tanàna for citizen identity and household registry.",
    maturity: "Offline (planned)",
    evolutionSteps: [
      "Child Health (IMCI)",
      "Community Care",
      "Health Intelligence",
      "Public Health DPI",
    ],
  },
];

export default function PlatformSection() {
  const foundation = platforms.find((p) => p.isFoundation);
  const others = platforms.filter((p) => !p.isFoundation);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {foundation && (
        <div className="md:col-span-2 lg:col-span-2">
          <PlatformCard key="foundation" {...foundation} />
        </div>
      )}
      {others.map((platform, index) => (
        <PlatformCard key={index} {...platform} />
      ))}
    </div>
  );
}
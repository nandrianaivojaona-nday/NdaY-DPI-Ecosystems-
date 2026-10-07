// data/dpiar.ts

export interface DpiLayer {
    id: string;
    label: string;
    subtitle?: string;
    color: string;
    border: string;
    href?: string;
    volume?: string;
    children?: { id: string; label: string; href?: string }[];
    isRoot?: boolean;
    isExchange?: boolean;
    isSurround?: boolean;
  }
  
  export const dpiarLayers: DpiLayer[] = [
    {
      id: "dpiar",
      label: "NDAY-DPIAR",
      subtitle: "Digital Public Infrastructure Ecosystem Architecture Reference",
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-400/40",
      href: "/reference",
      isRoot: true,
    },
    {
      id: "fiiziana",
      label: "NdaY'Fiiziana",
      subtitle: "Foundational Identity & Trust (Izaho Tokana)",
      color: "from-yellow-500/20 to-amber-500/10",
      border: "border-yellow-400/40",
      href: "/ecosystem/fiiziana",
      volume: "III",
      children: [
        { id: "identity-registry", label: "Identity Registry" },
        { id: "trust-services", label: "Trust Services" },
        { id: "consent-management", label: "Consent Management" },
      ],
    },
    {
      id: "territorial-dpis",
      label: "Territorial DPIs",
      subtitle: "Governance · Administration",
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-400/40",
      volume: "III",
      children: [
        { id: "bentanana", label: "NdaY'Ben'Tanàna", href: "/ecosystem/bentanana" },
        { id: "fokontany", label: "NdaY'Fokontany", href: "/ecosystem/fokontany" },
      ],
    },
    {
      id: "sectoral-dpis",
      label: "Sectoral DPIs",
      subtitle: "Agriculture · Waste · Health · Tourism",
      color: "from-emerald-500/20 to-green-500/10",
      border: "border-emerald-400/40",
      volume: "V",
      children: [
        { id: "tantsaha", label: "Tantsaha", href: "/ecosystem/tantsaha" },
        { id: "fako", label: "Fako", href: "/ecosystem/fako" },
        { id: "tsidika", label: "Tsidika", href: "/ecosystem/tsidika" },
        { id: "radoko", label: "Radoko", href: "/ecosystem/radoko" },
        { id: "hety", label: "Hety", href: "/ecosystem/hety" },
        
      ],
    },
    {
      id: "cross-cutting",
      label: "Cross‑cutting DPIs",
      subtitle: "Living Labs · Atlas · Innovation",
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-400/40",
      volume: "II",
      children: [
        { id: "living-labs", label: "Living Labs", href: "/living-labs" },
        { id: "atlas", label: "Territorial Atlas", href: "/atlas" },
      ],
    },
    {
      id: "evidence-exchange",
      label: "Trusted Evidence Exchange",
      subtitle: "Bidirectional data flow between DPIs",
      color: "from-pink-500/20 to-rose-500/10",
      border: "border-pink-400/40",
      isExchange: true,
      href: "/reference/volume-vi",
      children: [
        { id: "bentanana-exchange", label: "Ben'Tanàna" },
        { id: "fokontany-exchange", label: "Fokontany" },
        { id: "tantsaha-exchange", label: "Tantsaha" },
        { id: "fako-exchange", label: "Fako" },
        { id: "atlas-exchange", label: "Atlas" },
      ],
    },
    {
      id: "citizens",
      label: "Citizens · Families · Communities · Institutions",
      subtitle: "The reason the ecosystem exists",
      color: "from-cyan-400/10 to-emerald-400/10",
      border: "border-cyan-400/20",
      isSurround: true,
      href: "/join",
    },
  ];
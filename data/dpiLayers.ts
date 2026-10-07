// data/dpiLayers.ts
export interface Ecosystem {
    id: string;
    icon: string;
    title: string;
    mission: string;
    beneficiaries: string[];
    sharedCapabilities: string[];
    contribution: string;
  }
  
  export const foundationalDPIs: Ecosystem[] = [
    {
      id: "fiiziana",
      icon: "🧬",
      title: "NdaY'Fiiziana",
      mission: "Digital Public Infrastructure Operating System",
      beneficiaries: ["All Ecosystems", "Developers", "Administrators"],
      sharedCapabilities: ["Identity", "Registries", "API Gateway", "Security"],
      contribution: "Common foundation for all DPIs, ensuring coherence and interoperability",
    },
  ];
  
  export const territorialGovernanceDPIs: Ecosystem[] = [
    // ... as in the page
  ];
  
  export const sectoralDPIs: Ecosystem[] = [
    // ...
  ];
  
  export const intelligenceLayer: Ecosystem[] = [
    // ...
  ];
  
  export const innovationLayer: Ecosystem[] = [
    // ...
  ];
  
  export const constitutionalPillars = [
    {
      name: "Sovereignty",
      items: ["Technological Sovereignty", "Institutional Sovereignty", "Territorial Sovereignty", "Data Sovereignty"],
    },
    // ...
  ];
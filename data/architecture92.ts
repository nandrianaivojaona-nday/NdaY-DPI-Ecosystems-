// NdaY'DPI Ecosystems V9.2 — architecture content (source: NdaY-DPI-Ecosystems-V9-2 spec, rev 2.0)
export const architectureVersion = { ecosystem: "9.2", tve: "3.0.0" } as const;

export const invariants = [
  "One TVE: a single versioned shared engine",
  "Shared EbA: evaluation lives in TVE Core",
  "Sector autonomy: sectors own domain operations only",
  "Actor autonomy: connecting a website does not transfer ownership",
  "Public discovery requires no identity verification",
  "Authentication, authorization, consent, entitlement and governance approval are separate checks",
  "Unknown evidence never becomes a favorable score",
  "Recommendations cannot impersonate institutional decisions",
  "Assessments retain source, model, policy and registry versions",
  "New observations never auto-modify production policies",
];

export const layers = [
  { name: "Foundational services", scope: "NdaY'Fiiziana (identity), NdaY'Fokontany (territory), NdaY'Ben'Tanàna (governance)" },
  { name: "Shared operational services", scope: "Access, consent, entitlement, notifications, transactions, audit, integration" },
  { name: "TVE Core v3.0.0", scope: "Evidence registry, TER, viability, EbA, financial readiness, reviewed learning" },
  { name: "Sector applications", scope: "Lanona, Fako, Tantsaha, Tsidika, Beauty, institutional" },
  { name: "Internal enterprise workspace", scope: "NdaY'Internal for governance workflows, reporting, approvals, partnerships and delivery coordination" },
  { name: "Consortium workspaces", scope: "Membership, shared projects, authorized reporting" },
  { name: "Actor digital spaces", scope: "Actor-controlled websites and content" },
];

export const capabilities = [
  { name: "Public territorial discovery", status: "implemented" },
  { name: "TVE Core v3.0.0", status: "planned" },
  { name: "Shared EbA workflow", status: "planned" },
  { name: "Consent and entitlement services", status: "planned" },
  { name: "Consortium workspaces", status: "planned" },
  { name: "Internal enterprise operations workspace", status: "planned" },
  { name: "Website provisioning", status: "planned" },
  { name: "Bank/funding partner integrations", status: "blocked" },
] as const;

export const roadmap = ["Foundation", "Evidence", "TVE", "Operations", "Progression", "Learning"];

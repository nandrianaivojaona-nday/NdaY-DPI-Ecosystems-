import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ecosystems, type Dpi } from "@/data/ecosystems";
import DpiIcon from "@/components/shared/DpiIcon";
import InternalWorkspace from "@/components/internal/InternalWorkspace";
import {
  programmePlanningFields,
  projectPlanningFields,
  sampleAssets,
  sampleBankReports,
  sampleDepartments,
  sampleEmployees,
  sampleFinanceTransactions,
  sampleFiscalReports,
  sampleLeaveRecords,
  samplePayroll,
  sampleProcurement,
  sampleProgrammes,
  sampleProjects,
  sampleTreasuryAccounts,
} from "@/data/internalPlanning";

const layerLabels: Record<Dpi["layer"], string> = {
  foundation: "Foundation Layer",
  "territorial-governance": "Territorial Governance Layer",
  sectoral: "Sectoral DPI",
  intelligence: "Intelligence Layer",
  innovation: "Innovation Layer",
};

const statusStyles: Record<
  Dpi["status"],
  { label: string; className: string; summary: string }
> = {
  online: {
    label: "Online",
    className: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
    summary: "This DPI already has a public operational surface.",
  },
  coming: {
    label: "Coming",
    className: "border-amber-400/30 bg-amber-500/15 text-amber-200",
    summary:
      "This DPI is part of the V9.2 target architecture and is being prepared for deployment.",
  },
  offline: {
    label: "Offline",
    className: "border-rose-400/30 bg-rose-500/15 text-rose-200",
    summary:
      "This DPI is defined in the ecosystem but does not yet expose a public platform.",
  },
  foundation: {
    label: "Foundation",
    className: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200",
    summary:
      "This DPI acts as shared infrastructure for other ecosystem services.",
  },
};

const internalHierarchy = [
  {
    title: "Programmes",
    body:
      "Strategic mission portfolios that connect NdaY&apos;s institutional priorities, partners, funding envelopes and target territories.",
  },
  {
    title: "Projects",
    body:
      "Time-bound initiatives inside each programme with a defined scope, owner, risk profile, schedule and approved budget.",
  },
  {
    title: "Activities",
    body:
      "Concrete work packages, field actions, technical tasks and governance steps that move projects from plan to delivery.",
  },
  {
    title: "Resources",
    body:
      "People, budgets, assets, data, suppliers, contracts and partner contributions allocated to programmes, projects and activities.",
  },
  {
    title: "Outputs",
    body:
      "Immediate deliverables such as reports, deployments, trainings, procurements, integrations or validated field actions.",
  },
  {
    title: "Outcomes",
    body:
      "Observed operational or institutional changes produced by outputs and reviewed through evidence rather than assumptions.",
  },
  {
    title: "Impact",
    body:
      "Long-term social, territorial and institutional transformation linked to NdaY&apos;s mission and governance review cycles.",
  },
];

const internalWorkflow = [
  {
    stage: "Plan",
    detail:
      "Define programme intent, project scope, target territory, milestones, roles, risk assumptions and resource envelopes.",
  },
  {
    stage: "Authorize",
    detail:
      "Separate governance approval, operational authorization and resource commitment before execution starts.",
  },
  {
    stage: "Execute",
    detail:
      "Run activities, assign teams, capture evidence, monitor delivery blockers and track use of time, budget and assets.",
  },
  {
    stage: "Validate",
    detail:
      "Verify outputs, reconcile resource usage, review partner obligations and confirm whether promised deliverables are complete.",
  },
  {
    stage: "Review Outcomes",
    detail:
      "Assess whether outputs are creating measurable change through indicators, periodic reviews and contextual interpretation.",
  },
  {
    stage: "Learn & Govern",
    detail:
      "Escalate lessons into institutional decisions, portfolio adjustments and future programme design without auto-changing policy.",
  },
];

const internalRoles = [
  "Executive / Institutional Lead",
  "Programme Lead",
  "Project Manager",
  "Finance & Operations",
  "Partner / Consortium Focal Point",
  "Reviewer / Approver",
  "Monitoring, Evaluation & Learning",
];

const internalViews = [
  { id: "portfolio", label: "Programme portfolio board", accent: "cyan" },
  { id: "delivery", label: "Project registry and delivery dashboard", accent: "indigo" },
  { id: "execution", label: "Activity execution board", accent: "amber" },
  { id: "resources", label: "Resource and budget tracker", accent: "emerald" },
  { id: "hr", label: "HR and payroll workspace", accent: "teal" },
  { id: "finance", label: "Finance and treasury workspace", accent: "sky" },
  { id: "logistics", label: "Logistics and assets workspace", accent: "fuchsia" },
  { id: "reporting", label: "Fiscal and bank reporting views", accent: "violet" },
  { id: "evidence", label: "Outputs and evidence register", accent: "rose" },
  { id: "outcomes", label: "Outcome and impact review panel", accent: "orange" },
] as const;

type InternalViewId = (typeof internalViews)[number]["id"];

function getInternalTabClasses(active: boolean) {
  return active
    ? "border-cyan-300/40 bg-cyan-400/15 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.2)]"
    : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:bg-white/10 hover:text-white";
}

function InternalTabPanel({
  id,
  title,
  description,
  badge,
  children,
}: {
  id: InternalViewId;
  title: string;
  description: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/72">{description}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
          {badge}
        </span>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}






function getRelatedDpis(current: Dpi) {
  return ecosystems
    .filter((dpi) => dpi.id !== current.id && dpi.layer === current.layer)
    .slice(0, 3);
}

export async function generateStaticParams() {
  return ecosystems.map((dpi) => ({ id: dpi.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ tab?: string | string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dpi = ecosystems.find((item) => item.id === id);

  if (!dpi) {
    return { title: "DPI Not Found – NdaY" };
  }

  return {
    title: `${dpi.name} – NdaY DPI Ecosystems`,
    description: dpi.description,
  };
}

export default async function EcosystemDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = (await searchParams) ?? {};
  const dpi = ecosystems.find((item) => item.id === id);

  if (!dpi) notFound();

  const status = statusStyles[dpi.status];
  const related = getRelatedDpis(dpi);
  const tab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const activeInternalView = (tab as InternalViewId | undefined) ?? "portfolio";
  const isInternal = dpi.id === "internal";

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_42%)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Link
            href="/ecosystem"
            className="inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
          >
            ← Back to ecosystem registry
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">
                {layerLabels[dpi.layer]}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                  aria-hidden="true"
                >
                  <DpiIcon dpi={dpi} className="h-12 w-12" emojiClassName="text-3xl" />
                </div>

                <span
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${status.className}`}
                >
                  {status.label}
                </span>

                {dpi.isCore && (
                  <span className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-4 py-2 text-sm font-medium text-fuchsia-200">
                    Core ecosystem asset
                  </span>
                )}

                {dpi.isFoundation && (
                  <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-2 text-sm font-medium text-sky-200">
                    Shared infrastructure
                  </span>
                )}

                {isInternal && (
                  <span className="inline-flex items-center rounded-full border border-slate-300/30 bg-slate-500/15 px-4 py-2 text-sm font-medium text-slate-200">
                    Internal workspace
                  </span>
                )}
              </div>

              <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">{dpi.name}</h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/72">{dpi.description}</p>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">{status.summary}</p>

              {isInternal && (
                <div className="mt-6 max-w-3xl rounded-2xl border border-slate-300/15 bg-slate-400/10 p-5 text-sm leading-relaxed text-slate-100/90">
                  NdaY&apos;Internal is the institutional operating workspace for NdaY&apos; Enterprise. It should manage
                  programmes, projects, activities, resources, outputs, outcomes and impact through evidence-based
                  governance rather than simple task tracking.
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                {dpi.url ? (
                  <a
                    href={dpi.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
                  >
                    Open live platform ↗
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60">
                    No public platform URL yet
                  </span>
                )}

                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  View V9.2 architecture
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white">Registry snapshot</h2>
              <dl className="mt-6 space-y-5 text-sm text-white/75">
                <div>
                  <dt className="text-white/45">Layer</dt>
                  <dd className="mt-1 text-base text-white">{layerLabels[dpi.layer]}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Status</dt>
                  <dd className="mt-1 text-base text-white">{status.label}</dd>
                </div>
                {dpi.maturity && (
                  <div>
                    <dt className="text-white/45">Maturity</dt>
                    <dd className="mt-1 text-base text-white">{dpi.maturity}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-white/45">Internal reference</dt>
                  <dd className="mt-1 break-all text-base text-cyan-200">{dpi.learnMore}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {isInternal ? (
        <InternalWorkspace />
      ) : (
        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            {(dpi.modules?.length ?? 0) > 0 && (
              <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white">Key modules</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {dpi.modules?.map((module) => (
                    <div
                      key={module}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                    >
                      {module}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(dpi.evolutionSteps?.length ?? 0) > 0 && (
              <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white">Evolution path</h2>
                <ol className="mt-6 space-y-3">
                  {dpi.evolutionSteps?.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-200">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-sm leading-relaxed text-white/78">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <div className="space-y-8">
            {(dpi.beneficiaries || dpi.interoperability) && (
              <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white">Operational context</h2>
                <div className="mt-6 space-y-5 text-sm leading-relaxed text-white/75">
                  {dpi.beneficiaries && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                        Beneficiaries
                      </h3>
                      <p className="mt-2">{dpi.beneficiaries}</p>
                    </div>
                  )}
                  {dpi.interoperability && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                        Interoperability
                      </h3>
                      <p className="mt-2">{dpi.interoperability}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white">Architecture fit</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
                <p>
                  This detail page positions <span className="font-semibold text-white">{dpi.name}</span> inside the
                  V9.2 layered ecosystem so it can be understood as part of the shared DPI registry rather than as an
                  isolated application.
                </p>
                <p>
                  The layer assignment comes from the current ecosystem registry. Operational maturity, live platform
                  access and interoperability notes should continue to be maintained from the same data source.
                </p>
              </div>
            </section>

            {related.length > 0 && (
              <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white">Related in this layer</h2>
                <div className="mt-6 space-y-4">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/ecosystem/${item.id}`}
                      className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/30"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl" aria-hidden="true">
                          {item.icon.startsWith("/") ? "◉" : item.icon}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.name}</p>
                          <p className="mt-1 text-sm text-white/60">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

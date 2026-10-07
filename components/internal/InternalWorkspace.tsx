"use client";

import type { ComponentType } from "react";
import InternalGate, { useSession } from "./InternalGate";
import ProgrammeProjectWorkspace from "./ProgrammeProjectWorkspace";
import ActivityWorkspace from "./ActivityWorkspace";
import TaskWorkspace from "./TaskWorkspace";
import DeliverableWorkspace from "./DeliverableWorkspace";
import ResourceWorkspace from "./ResourceWorkspace";
import BudgetWorkspace from "./BudgetWorkspace";
import AllocationWorkspace from "./AllocationWorkspace";
import Dashboard from "./Dashboard";
import { canReadBudget } from "@/lib/internal/types";

type Section = { id: string; kicker: string; title: string; text: string; Body: ComponentType; financeOnly?: boolean };

const sections: Section[] = [
  { id: "dashboard", kicker: "Overview", title: "Dashboard", text: "Delivery progress set against time and spending for every project. Flags point to where attention is needed; they inform decisions and never change records.", Body: Dashboard },
  { id: "portfolio", kicker: "Portfolio", title: "Programmes and projects", text: "Plan institutional programmes, link projects to them, and keep approvals under human authority.", Body: ProgrammeProjectWorkspace },
  { id: "activities", kicker: "Delivery", title: "Activities under projects", text: "Break approved projects into accountable delivery activities, dates, blockers and evidence requirements.", Body: ActivityWorkspace },
  { id: "tasks", kicker: "Execution", title: "Tasks under activities", text: "Assign concrete tasks with priority, estimates and due dates so activities can move forward.", Body: TaskWorkspace },
  { id: "deliverables", kicker: "Results", title: "Deliverables and validation", text: "Track what each project must produce. Only administrators can validate or reject a deliverable.", Body: DeliverableWorkspace },
  { id: "resources", kicker: "Capacity", title: "Resources", text: "Register people, assets, suppliers, partners and data sources with availability and unit costs.", Body: ResourceWorkspace },
  { id: "allocations", kicker: "Capacity", title: "Resource allocation", text: "Assign registered resources to activities for a date range and workload. Overlapping assignments cannot push a resource past 100 percent. Only administrators can confirm or cancel an allocation.", Body: AllocationWorkspace },
  { id: "budgets", kicker: "Finance", title: "Budgets", text: "Plan, commit and track spending per project. Only administrators can approve a budget line. Visible to finance, managers and administrators.", Body: BudgetWorkspace, financeOnly: true },
];

function Sections() {
  const { role } = useSession();
  const visible = sections.filter((s) => !s.financeOnly || canReadBudget(role));
  return (
    <>
      <nav aria-label="Workspace sections" className="flex flex-wrap gap-2">
        {visible.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 hover:bg-white/10">{s.title}</a>
        ))}
      </nav>
      <div className="space-y-12">
        {visible.map(({ id, kicker, title, text, Body }, i) => (
          <section key={id} id={id} className={`scroll-mt-28 ${i ? "border-t border-white/10 pt-10" : ""}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{kicker}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-white/75">{text}</p>
            <div className="mt-6"><Body /></div>
          </section>
        ))}
      </div>
    </>
  );
}

export default function InternalWorkspace() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-14">
      <InternalGate>
        <Sections />
      </InternalGate>
    </section>
  );
}

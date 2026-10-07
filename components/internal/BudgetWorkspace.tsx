"use client";

import RecordBoard, { type BoardRow, type FieldSpec } from "./RecordBoard";
import { useCollection } from "./useCollection";
import {
  BUDGET_CATEGORIES, BUDGET_STATUSES, canWriteBudget,
  type BudgetLineDoc, type PlanDoc, type ResourceDoc,
} from "@/lib/internal/types";

const money = (n: unknown) => `${new Intl.NumberFormat("en-US").format(Number(n) || 0)} MGA`;

const fields: FieldSpec[] = [
  { key: "code", label: "Code", type: "text", required: true },
  { key: "projectId", label: "Project", type: "select", required: true, parent: true },
  { key: "title", label: "Budget line", type: "text", required: true },
  { key: "category", label: "Category", type: "select", required: true, options: BUDGET_CATEGORIES },
  { key: "resourceId", label: "Linked resource (optional)", type: "select" },
  { key: "status", label: "Status", type: "select", options: BUDGET_STATUSES },
  { key: "plannedAmount", label: "Planned (MGA)", type: "number" },
  { key: "committedAmount", label: "Committed (MGA)", type: "number" },
  { key: "actualAmount", label: "Actual spent (MGA)", type: "number" },
  { key: "notes", label: "Notes", type: "textarea", full: true },
];

export default function BudgetWorkspace() {
  const projects = useCollection<PlanDoc>("projects");
  const resources = useCollection<ResourceDoc>("resources");
  const lines = useCollection<BudgetLineDoc>("budgetLines");

  const summary = projects.rows.map((p) => {
    const own = lines.rows.filter((l) => l.projectId === p.id && l.status !== "Rejected");
    const sum = (k: "plannedAmount" | "committedAmount" | "actualAmount") => own.reduce((t, l) => t + (Number(l[k]) || 0), 0);
    const planned = sum("plannedAmount");
    return { p, planned, committed: sum("committedAmount"), actual: sum("actualAmount"), envelope: Number(p.budgetPlanned) || 0, over: planned > (Number(p.budgetPlanned) || 0) };
  });

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[40rem] text-left text-sm text-white/85">
          <caption className="p-4 text-left text-base font-semibold text-white">Budget position by project (rejected lines excluded)</caption>
          <thead className="text-xs uppercase tracking-wider text-white/70">
            <tr>{["Project", "Envelope", "Planned", "Committed", "Actual", "Remaining"].map((h) => <th key={h} scope="col" className="px-4 py-2">{h}</th>)}</tr>
          </thead>
          <tbody>
            {!summary.length && <tr><td colSpan={6} className="px-4 py-4 text-white/70">No projects yet.</td></tr>}
            {summary.map(({ p, planned, committed, actual, envelope, over }) => (
              <tr key={p.id} className="border-t border-white/10">
                <th scope="row" className="px-4 py-3 font-medium text-white">{p.code} {"\u2013"} {p.title}</th>
                <td className="px-4 py-3">{money(envelope)}</td>
                <td className="px-4 py-3">{money(planned)}</td>
                <td className="px-4 py-3">{money(committed)}</td>
                <td className="px-4 py-3">{money(actual)}</td>
                <td className={`px-4 py-3 font-semibold ${over ? "text-rose-300" : "text-emerald-300"}`}>
                  {money(envelope - planned)}{over && " (over envelope)"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RecordBoard
        collection="budgetLines"
        noun="budget line"
        fields={fields}
        rows={lines.rows as unknown as BoardRow[]}
        parentKey="projectId"
        parentLabel="Project"
        parents={projects.rows.map((p) => ({ value: p.id, label: `${p.code} \u2013 ${p.title}` }))}
        optionSets={{ resourceId: resources.rows.map((r) => ({ value: r.id, label: `${r.code} \u2013 ${r.title}` })) }}
        statusKey="status"
        statuses={BUDGET_STATUSES}
        defaults={{ status: "Draft", category: "Services", plannedAmount: "0", committedAmount: "0", actualAmount: "0" }}
        review={{ from: "Submitted", approve: "Approved", reject: "Rejected" }}
        canEdit={canWriteBudget}
        loadError={lines.error || projects.error}
        validate={(v) => {
          const planned = Number(v.plannedAmount) || 0, committed = Number(v.committedAmount) || 0, actual = Number(v.actualAmount) || 0;
          if (committed > planned) return "Committed cannot exceed planned. Raise the planned amount first.";
          if (actual > committed) return "Actual spending cannot exceed the committed amount.";
          return null;
        }}
        meta={(r, parent) => `${r.category} \u00b7 Project: ${parent.split(" \u2013 ")[0]}${r.resourceId ? ` \u00b7 Resource: ${resources.rows.find((x) => x.id === r.resourceId)?.code ?? "\u2014"}` : ""}`}
        badges={(r) => [String(r.status), `Planned ${money(r.plannedAmount)}`, `Committed ${money(r.committedAmount)}`, `Actual ${money(r.actualAmount)}`]}
        details={(r) => [{ label: "Notes", value: String(r.notes ?? "") }]}
      />
    </div>
  );
}

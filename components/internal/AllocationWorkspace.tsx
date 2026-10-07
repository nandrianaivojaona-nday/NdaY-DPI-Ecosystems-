"use client";

import { useState } from "react";
import RecordBoard, { type BoardRow, type FieldSpec } from "./RecordBoard";
import { useCollection } from "./useCollection";
import { ALLOCATION_STATUSES, type ActivityDoc, type AllocationDoc, type ResourceDoc } from "@/lib/internal/types";

const ACTIVE = ["Proposed", "Confirmed"];
const money = (n: number) => `${new Intl.NumberFormat("en-US").format(Math.round(n))} MGA`;

const fields: FieldSpec[] = [
  { key: "code", label: "Code", type: "text", required: true },
  { key: "activityId", label: "Activity", type: "select", required: true, parent: true },
  { key: "resourceId", label: "Resource", type: "select", required: true },
  { key: "title", label: "Role / purpose", type: "text", required: true },
  { key: "quantity", label: "Quantity (units of the resource)", type: "number", required: true },
  { key: "loadPercent", label: "Workload (% of resource, 1\u2013100)", type: "number", required: true },
  { key: "startDate", label: "Start date", type: "date", required: true },
  { key: "endDate", label: "End date", type: "date", required: true },
  { key: "status", label: "Status", type: "select", options: ALLOCATION_STATUSES },
  { key: "notes", label: "Notes", type: "textarea", full: true },
];

export default function AllocationWorkspace() {
  const activities = useCollection<ActivityDoc>("activities");
  const resources = useCollection<ResourceDoc>("resources");
  const allocations = useCollection<AllocationDoc>("allocations");
  const [today] = useState(() => new Date().toISOString().slice(0, 10));

  const cost = (a: AllocationDoc) => (Number(a.quantity) || 0) * (Number(resources.rows.find((r) => r.id === a.resourceId)?.unitCost) || 0);

  function validate(v: Record<string, string>, editingId?: string) {
    const qty = Number(v.quantity) || 0;
    const load = Number(v.loadPercent) || 0;
    if (qty <= 0) return "Quantity must be greater than zero.";
    if (load < 1 || load > 100) return "Workload must be between 1 and 100 percent.";
    if (v.endDate < v.startDate) return "End date must be on or after the start date.";
    const resource = resources.rows.find((r) => r.id === v.resourceId);
    if (resource?.availability === "Unavailable") return `${resource.title} is marked Unavailable.`;
    if (ACTIVE.includes(v.status)) {
      const used = allocations.rows
        .filter((a) => a.id !== editingId && a.resourceId === v.resourceId && ACTIVE.includes(a.status) && a.startDate <= v.endDate && v.startDate <= a.endDate)
        .reduce((t, a) => t + (Number(a.loadPercent) || 0), 0);
      if (used + load > 100) return `This would put ${resource?.title ?? "the resource"} at ${used + load}% on overlapping dates (${used}% already assigned).`;
    }
    return null;
  }

  const workload = resources.rows.map((res) => {
    const own = allocations.rows.filter((a) => a.resourceId === res.id && ACTIVE.includes(a.status));
    const now = own.filter((a) => a.startDate <= today && today <= a.endDate);
    return {
      res,
      count: own.length,
      load: now.reduce((t, a) => t + (Number(a.loadPercent) || 0), 0),
      cost: own.filter((a) => a.status === "Confirmed").reduce((t, a) => t + cost(a), 0),
    };
  });

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[36rem] text-left text-sm text-white/85">
          <caption className="p-4 text-left text-base font-semibold text-white">Resource workload today ({today})</caption>
          <thead className="text-xs uppercase tracking-wider text-white/70">
            <tr>{["Resource", "Type", "Open allocations", "Load today", "Confirmed cost"].map((h) => <th key={h} scope="col" className="px-4 py-2">{h}</th>)}</tr>
          </thead>
          <tbody>
            {!workload.length && <tr><td colSpan={5} className="px-4 py-4 text-white/70">No resources registered yet.</td></tr>}
            {workload.map(({ res, count, load, cost: c }) => (
              <tr key={res.id} className="border-t border-white/10">
                <th scope="row" className="px-4 py-3 font-medium text-white">{res.code} {"\u2013"} {res.title}</th>
                <td className="px-4 py-3">{res.type}</td>
                <td className="px-4 py-3">{count}</td>
                <td className={`px-4 py-3 font-semibold ${load >= 90 ? "text-amber-300" : "text-emerald-300"}`}>{load}%</td>
                <td className="px-4 py-3">{money(c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RecordBoard
        collection="allocations"
        noun="allocation"
        fields={fields}
        rows={allocations.rows as unknown as BoardRow[]}
        parentKey="activityId"
        parentLabel="Activity"
        parents={activities.rows.map((a) => ({ value: a.id, label: `${a.code} \u2013 ${a.title}` }))}
        optionSets={{ resourceId: resources.rows.map((r) => ({ value: r.id, label: `${r.code} \u2013 ${r.title} (${r.availability})` })) }}
        statusKey="status"
        statuses={ALLOCATION_STATUSES}
        defaults={{ status: "Proposed", quantity: "1", loadPercent: "100" }}
        review={{ from: "Proposed", approve: "Confirmed", reject: "Cancelled" }}
        loadError={allocations.error || activities.error || resources.error}
        validate={validate}
        meta={(r, parent) => {
          const res = resources.rows.find((x) => x.id === r.resourceId);
          return `${res ? `${res.code} \u2013 ${res.title}` : "Unknown resource"} \u00b7 Activity: ${parent.split(" \u2013 ")[0]} \u00b7 ${r.startDate} \u2192 ${r.endDate}`;
        }}
        badges={(r) => [String(r.status), `${r.loadPercent}% load`, `Qty ${r.quantity}`]}
        details={(r) => [
          { label: "Purpose", value: String(r.title ?? "") },
          { label: "Estimated cost", value: money(cost(r as unknown as AllocationDoc)) },
          { label: "Notes", value: String(r.notes ?? "") },
        ]}
      />
    </div>
  );
}

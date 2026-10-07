"use client";

import RecordBoard, { type BoardRow, type FieldSpec } from "./RecordBoard";
import { useCollection } from "./useCollection";
import { RESOURCE_AVAILABILITY, RESOURCE_TYPES, RESOURCE_UNITS, type ResourceDoc } from "@/lib/internal/types";

const fields: FieldSpec[] = [
  { key: "code", label: "Code", type: "text", required: true },
  { key: "title", label: "Name", type: "text", required: true },
  { key: "type", label: "Type", type: "select", required: true, options: RESOURCE_TYPES },
  { key: "contact", label: "Contact / owner", type: "text", required: true },
  { key: "availability", label: "Availability", type: "select", options: RESOURCE_AVAILABILITY },
  { key: "unitCost", label: "Unit cost (MGA)", type: "number" },
  { key: "unit", label: "Unit", type: "select", options: RESOURCE_UNITS },
  { key: "notes", label: "Notes", type: "textarea", full: true },
];

export default function ResourceWorkspace() {
  const resources = useCollection<ResourceDoc>("resources");
  return (
    <RecordBoard
      collection="resources"
      noun="resource"
      fields={fields}
      rows={resources.rows as unknown as BoardRow[]}
      parentKey="type"
      parentLabel="Resource type"
      parents={RESOURCE_TYPES.map((t) => ({ value: t, label: t }))}
      statusKey="availability"
      statuses={RESOURCE_AVAILABILITY}
      defaults={{ availability: "Available", unit: "day", unitCost: "0" }}
      loadError={resources.error}
      meta={(r) => `${r.type} \u00b7 Contact: ${r.contact}${Number(r.unitCost) ? ` \u00b7 ${new Intl.NumberFormat("en-US").format(Number(r.unitCost))} MGA per ${r.unit ?? "unit"}` : ""}`}
      badges={(r) => [String(r.availability)]}
      details={(r) => [{ label: "Notes", value: String(r.notes ?? "") }]}
    />
  );
}

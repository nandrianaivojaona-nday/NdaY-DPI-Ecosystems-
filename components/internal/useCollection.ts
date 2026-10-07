"use client";

import { useEffect, useState } from "react";
import { useSession } from "./InternalGate";
import { watchCollection } from "@/lib/internal/planning";
import type { InternalCollection } from "@/lib/internal/types";

export function useCollection<T extends { id: string }>(name: InternalCollection, orderField = "code", enabled = true) {
  const { db } = useSession();
  const [rows, setRows] = useState<T[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) return;
    return watchCollection<T>(db, name, orderField, setRows, () => setError("Could not load data. Check your permissions and connection."));
  }, [db, name, orderField, enabled]);

  return { rows, error };
}

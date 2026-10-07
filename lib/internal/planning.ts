import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Firestore,
  type Unsubscribe,
} from "firebase/firestore";
import type { ActivityDoc, InternalCollection, PlanDoc, PlanKind } from "./types";

export function watchPlans(
  db: Firestore,
  kind: PlanKind,
  onData: (rows: PlanDoc[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    query(collection(db, kind), orderBy("code")),
    (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as Omit<PlanDoc, "id">), id: d.id }))),
    onError,
  );
}

export function watchActivities(
  db: Firestore,
  onData: (rows: ActivityDoc[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    query(collection(db, "activities"), orderBy("dueDate")),
    (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as Omit<ActivityDoc, "id">), id: d.id }))),
    onError,
  );
}

export async function savePlan(
  db: Firestore,
  kind: InternalCollection,
  actor: { uid: string; email: string },
  data: Record<string, string | number>,
  id?: string,
) {
  const payload = { ...data, updatedAt: serverTimestamp(), updatedBy: actor.email };
  let recordId = id;
  if (id) {
    await updateDoc(doc(db, kind, id), payload);
  } else {
    const ref = await addDoc(collection(db, kind), {
      ...payload,
      createdAt: serverTimestamp(),
      createdBy: actor.email,
    });
    recordId = ref.id;
  }
  await addDoc(collection(db, "auditLog"), {
    collection: kind,
    recordId,
    action: id ? "update" : "create",
    changes: Object.keys(data).join(", "),
    actor: actor.email,
    uid: actor.uid,
    at: serverTimestamp(),
  });
  return recordId;
}

export function watchCollection<T extends { id: string }>(
  db: Firestore,
  name: InternalCollection,
  orderField: string,
  onData: (rows: T[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    query(collection(db, name), orderBy(orderField)),
    (snap) => onData(snap.docs.map((d) => ({ ...d.data(), id: d.id }) as unknown as T)),
    onError,
  );
}

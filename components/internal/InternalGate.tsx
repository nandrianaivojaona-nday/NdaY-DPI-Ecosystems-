"use client";

import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc, type Firestore } from "firebase/firestore";
import { firebaseConfigured, getInternalServices } from "@/lib/internal/firebase";
import { ROLES, type Role } from "@/lib/internal/types";

type Session = { user: User; role: Role; db: Firestore };
const SessionContext = createContext<Session | null>(null);

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error("useSession must be used inside InternalGate");
  return session;
}

type State =
  | { kind: "loading" }
  | { kind: "signed-out" }
  | { kind: "pending"; user: User }
  | { kind: "ready"; session: Session };

const field =
  "w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/55 outline-none focus:border-cyan-400";

export default function InternalGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [error, setError] = useState("");
  const services = getInternalServices();

  useEffect(() => {
    if (!services) return;
    const { auth, db } = services;
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setState({ kind: "signed-out" });
      try {
        const snap = await getDoc(doc(db, "staff", user.uid));
        const data = snap.data();
        const role = data?.role as Role | undefined;
        if (snap.exists() && data?.active === true && role && ROLES.includes(role)) {
          setState({ kind: "ready", session: { user, role, db } });
        } else {
          setState({ kind: "pending", user });
        }
      } catch {
        setState({ kind: "pending", user });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!firebaseConfigured || !services) {
    return (
      <Panel title="Workspace not configured">
        <p>Firebase settings are missing. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local and restart the server. See docs/INTERNAL_SETUP.md.</p>
      </Panel>
    );
  }

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      await signInWithEmailAndPassword(services!.auth, String(form.get("email")), String(form.get("password")));
    } catch {
      setError("Sign-in failed. Check your email and password.");
    }
  }

  if (state.kind === "loading") {
    return <Panel title="Checking access…"><p>One moment.</p></Panel>;
  }

  if (state.kind === "signed-out") {
    return (
      <Panel title="NdaY'Internal sign-in">
        <p>This workspace is restricted to authorised NdaY&apos; Enterprise staff.</p>
        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
          <input name="email" type="email" required autoComplete="username" placeholder="Email" className={field} />
          <input name="password" type="password" required autoComplete="current-password" placeholder="Password" className={field} />
          {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
          <button className="rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30">
            Sign in
          </button>
        </form>
      </Panel>
    );
  }

  if (state.kind === "pending") {
    return (
      <Panel title="Access pending">
        <p>You are signed in as {state.user.email}, but your account has not been activated for the workspace.</p>
        <p className="mt-3">Send this ID to an administrator: <code className="rounded bg-white/10 px-2 py-1 text-cyan-200">{state.user.uid}</code></p>
        <button onClick={() => signOut(services.auth)} className="mt-6 rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/10">
          Sign out
        </button>
      </Panel>
    );
  }

  const { session } = state;
  return (
    <SessionContext.Provider value={session}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80">
        <span>{session.user.email} · role: <strong className="text-cyan-200">{session.role}</strong></span>
        <button onClick={() => signOut(services.auth)} className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10">
          Sign out
        </button>
      </div>
      {children}
    </SessionContext.Provider>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-sm leading-relaxed text-white/80">
      <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

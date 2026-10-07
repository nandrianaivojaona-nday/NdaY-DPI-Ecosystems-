"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  LoaderCircle,
  MapPinned,
  MessageSquare,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryConstraint,
  type Timestamp,
} from "firebase/firestore";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

type Priority = "High" | "Medium" | "Low";

type OperatorProfile = {
  id: string;
  name?: string;
  contactEmail?: string;
  officeAddress?: string;
  serviceCount?: number;
  coverageZone?: string;
  status?: string;
};

type BookingRecord = {
  id: string;
  status: string;
  serviceName?: string;
  customerName?: string;
  amount?: number;
  createdAt?: Timestamp | null;
  sourceCollection?: string;
};

type PaymentRecord = {
  id: string;
  status?: string;
  amount?: number;
  createdAt?: Timestamp | null;
  sourceCollection?: string;
};

type AlertRecord = {
  id: string;
  title: string;
  meta: string;
  priority: Priority;
};

type ReviewRecord = {
  id: string;
  rating?: number;
  sourceCollection?: string;
};

type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

const quickActions = [
  {
    title: "Manage service catalog",
    description: "Update your offers, pricing, availability, and category positioning.",
    icon: ClipboardList,
    href: "/partner",
  },
  {
    title: "Review bookings",
    description: "Confirm, reschedule, or complete incoming service requests.",
    icon: CalendarDays,
    href: "/join",
  },
  {
    title: "Update operator profile",
    description: "Refresh contact details, coverage zone, and operational readiness.",
    icon: Building2,
    href: "/contact",
  },
];

const modules = [
  {
    title: "Operations",
    description: "Track field activity, assignments, and fulfillment readiness across your operator teams.",
    icon: Settings2,
  },
  {
    title: "Payments",
    description: "Monitor payouts, settlement timing, refund issues, and payment method performance.",
    icon: CreditCard,
  },
  {
    title: "Community reach",
    description: "See demand clusters, service coverage, and local traction by district.",
    icon: MapPinned,
  },
  {
    title: "Support inbox",
    description: "Handle customer conversations, escalations, and trust signals in one view.",
    icon: MessageSquare,
  },
];

function toDateLabel(timestamp?: Timestamp | null) {
  if (!timestamp?.toDate) return "Recently";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp.toDate());
}

function toCurrency(amount?: number) {
  const safeAmount = Number.isFinite(amount) ? Number(amount) : 0;
  return new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    maximumFractionDigits: 0,
  }).format(safeAmount);
}

function normalizeBooking(docId: string, data: DocumentData, sourceCollection = "bookings"): BookingRecord {
  return {
    id: docId,
    status: String(data.status ?? data.requestStatus ?? "pending"),
    serviceName: data.serviceName ?? data.serviceTitle ?? data.title ?? data.name ?? "Service request",
    customerName: data.customerName ?? data.memberName ?? data.requestedBy ?? data.requesterName ?? "Customer",
    amount:
      typeof data.amount === "number"
        ? data.amount
        : typeof data.totalAmount === "number"
          ? data.totalAmount
          : typeof data.price === "number"
            ? data.price
            : undefined,
    createdAt: data.createdAt ?? data.updatedAt ?? null,
    sourceCollection,
  };
}

function normalizePayment(docId: string, data: DocumentData, sourceCollection = "payments"): PaymentRecord {
  return {
    id: docId,
    status: data.status,
    amount:
      typeof data.amount === "number"
        ? data.amount
        : typeof data.totalAmount === "number"
          ? data.totalAmount
          : typeof data.price === "number"
            ? data.price
            : undefined,
    createdAt: data.createdAt ?? data.updatedAt ?? null,
    sourceCollection,
  };
}

function normalizeAlert(docId: string, data: DocumentData): AlertRecord {
  const rawPriority = String(data.priority ?? data.level ?? "Medium").toLowerCase();
  const priority: Priority = rawPriority.includes("high")
    ? "High"
    : rawPriority.includes("low")
      ? "Low"
      : "Medium";

  return {
    id: docId,
    title: data.title ?? data.name ?? "Operator alert",
    meta: data.meta ?? data.description ?? data.status ?? "Needs review",
    priority,
  };
}

function normalizeReview(docId: string, data: DocumentData, sourceCollection = "reviews"): ReviewRecord {
  return {
    id: docId,
    rating: typeof data.rating === "number" ? data.rating : undefined,
    sourceCollection,
  };
}

export default function OperatorPage() {
  const [operatorId, setOperatorId] = useState<string | null>(null);
  const [operatorProfile, setOperatorProfile] = useState<OperatorProfile | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      setError(
        "Firebase is not configured for this environment. Add the NEXT_PUBLIC_FIREBASE_* variables to enable the operator workspace."
      );
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setOperatorId(null);
        setOperatorProfile(null);
        setBookings([]);
        setPayments([]);
        setAlerts([]);
        setReviews([]);
        setLoading(false);
        setError("Please sign in with an operator account to access this workspace.");
        return;
      }

      const derivedOperatorId = user.uid;
      setOperatorId(derivedOperatorId);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !db || !operatorId) return;

    let profileLoaded = false;
    const unsubscribers: Array<() => void> = [];

    const operatorRef = doc(db, "operators", operatorId);
    unsubscribers.push(
      onSnapshot(
        operatorRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setOperatorProfile({
              id: snapshot.id,
              name: data.name,
              contactEmail: data.contactEmail,
              officeAddress: data.officeAddress,
              serviceCount: typeof data.serviceCount === "number" ? data.serviceCount : undefined,
              coverageZone: data.coverageZone ?? data.zone ?? data.city,
              status: data.status,
            });
          } else {
            setOperatorProfile({ id: operatorId, name: "Operator", status: "PENDING_SETUP" });
          }
          if (!profileLoaded) {
            profileLoaded = true;
            setLoading(false);
          }
        },
        () => {
          setError("Unable to read the operator profile from Firestore.");
          if (!profileLoaded) {
            profileLoaded = true;
            setLoading(false);
          }
        }
      )
    );

    const subscribeCollection = <T,>(
      name: string,
      setter: (items: T[]) => void,
      normalize: (docId: string, data: DocumentData, sourceCollection: string) => T,
      extraConstraints: QueryConstraint[] = [],
      filters: string[] = ["operatorId"]
    ) => {
      const attempts = filters.map((field) => {
        const constraints = [where(field, "==", operatorId), ...extraConstraints];
        if (!db) {
          throw new Error("Firestore database instance is not initialized.");
        }
        const q = query(collection(db, name), ...constraints);
        return onSnapshot(
          q,
          (snapshot) => setter(snapshot.docs.map((doc) => normalize(doc.id, doc.data(), name))),
          () => setError(`Unable to read ${name} data from Firestore.`)
        );
      });

      return () => attempts.forEach((unsubscribe) => unsubscribe());
    };

    unsubscribers.push(
      subscribeCollection<BookingRecord>(
        "bookings",
        setBookings,
        normalizeBooking,
        [orderBy("createdAt", "desc")],
        ["operatorId", "providerId"]
      )
    );

    unsubscribers.push(
      subscribeCollection<BookingRecord>(
        "public-services",
        (items) =>
          setBookings((current) => {
            const merged = [...current.filter((item) => item.sourceCollection !== "public-services"), ...items];
            return merged.sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
          }),
        normalizeBooking,
        [orderBy("createdAt", "desc")],
        ["operatorId", "providerId"]
      )
    );

    unsubscribers.push(
      subscribeCollection<PaymentRecord>(
        "payments",
        setPayments,
        normalizePayment,
        [orderBy("createdAt", "desc")],
        ["operatorId", "providerId"]
      )
    );

    unsubscribers.push(
      subscribeCollection<PaymentRecord>(
        "trust-services",
        (items) =>
          setPayments((current) => {
            const merged = [...current.filter((item) => item.sourceCollection !== "trust-services"), ...items];
            return merged.sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
          }),
        normalizePayment,
        [orderBy("createdAt", "desc")],
        ["operatorId", "providerId"]
      )
    );

    unsubscribers.push(
      subscribeCollection<AlertRecord>(
        "alerts",
        setAlerts,
        normalizeAlert,
        [orderBy("createdAt", "desc"), limit(4)],
        ["operatorId", "providerId"]
      )
    );

    unsubscribers.push(
      subscribeCollection<ReviewRecord>(
        "reviews",
        setReviews,
        normalizeReview,
        [limit(200)],
        ["operatorId", "providerId"]
      )
    );

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [operatorId]);

  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.status.toLowerCase().includes("pending")).length,
    [bookings]
  );

  const completedBookings = useMemo(
    () => bookings.filter((booking) => booking.status.toLowerCase().includes("complete")).length,
    [bookings]
  );

  const revenueTotal = useMemo(
    () =>
      payments.reduce((sum, payment) => {
        if (!["paid", "settled", "completed"].includes(String(payment.status ?? "").toLowerCase())) {
          return sum;
        }
        return sum + (payment.amount ?? 0);
      }, 0),
    [payments]
  );

  const averageRating = useMemo(() => {
    const validRatings = reviews
      .map((review) => review.rating)
      .filter((rating): rating is number => typeof rating === "number" && Number.isFinite(rating));
    if (!validRatings.length) return null;
    return validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length;
  }, [reviews]);

  const recentActivity = useMemo<ActivityItem[]>(() => {
    const bookingActivity = bookings.slice(0, 4).map((booking) => ({
      id: `booking-${booking.id}`,
      title: booking.serviceName ?? "Service request",
      detail: `${booking.customerName ?? "Customer"} · ${booking.status}`,
      time: toDateLabel(booking.createdAt),
    }));

    const paymentActivity = payments.slice(0, 3).map((payment) => ({
      id: `payment-${payment.id}`,
      title: "Payment update",
      detail: `${payment.status ?? "Processing"} · ${toCurrency(payment.amount)}`,
      time: toDateLabel(payment.createdAt),
    }));

    return [...bookingActivity, ...paymentActivity].slice(0, 6);
  }, [bookings, payments]);

  const stats = [
    {
      label: "Pending bookings",
      value: pendingBookings.toString(),
      hint: "Awaiting review",
      icon: Clock3,
      accent: "from-amber-400/20 to-orange-500/10",
    },
    {
      label: "Completed services",
      value: completedBookings.toString(),
      hint: "Closed successfully",
      icon: CheckCircle2,
      accent: "from-emerald-400/20 to-teal-500/10",
    },
    {
      label: "Revenue processed",
      value: toCurrency(revenueTotal),
      hint: "Paid and settled",
      icon: Wallet,
      accent: "from-sky-400/20 to-cyan-500/10",
    },
    {
      label: "Average rating",
      value: averageRating ? averageRating.toFixed(1) : "—",
      hint: reviews.length ? `${reviews.length} reviews` : "No reviews yet",
      icon: Sparkles,
      accent: "from-fuchsia-400/20 to-purple-500/10",
    },
  ];

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-24 text-white">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur-sm">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Loading the operator workspace…
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-white">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <GlassPanel className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-950/70 to-emerald-500/10 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                Operator workspace
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {operatorProfile?.name ?? "Operator Command Center"}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                  Monitor operational readiness, booking demand, payments, community traction, and trust signals
                  from one interface designed for service providers in the NdaY&apos;DPI Ecosystems 9.2.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/65">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Building2 className="h-4 w-4" />
                  {operatorProfile?.officeAddress ?? "Office address pending"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <MapPinned className="h-4 w-4" />
                  {operatorProfile?.coverageZone ?? "Coverage zone pending"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <BadgeCheck className="h-4 w-4" />
                  {operatorProfile?.status ?? "Status unavailable"}
                </span>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-cyan-200" />
                <div>
                  <p className="font-medium text-white">Priority alerts</p>
                  <p>{alerts.length ? `${alerts.length} active operational alerts` : "No active alerts detected"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-emerald-200" />
                <div>
                  <p className="font-medium text-white">Service capacity</p>
                  <p>{operatorProfile?.serviceCount ?? 0} registered services across your operator profile</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-fuchsia-200" />
                <div>
                  <p className="font-medium text-white">Operator ID</p>
                  <p className="break-all text-white/60">{operatorId ?? "Not signed in"}</p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <Activity className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Operational status</p>
                <h2 className="text-xl font-semibold text-white">Live service overview</h2>
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                  <span>Bookings being tracked</span>
                  <span className="font-semibold text-white">{bookings.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                  <span>Payment records synced</span>
                  <span className="font-semibold text-white">{payments.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                  <span>Alerts flagged</span>
                  <span className="font-semibold text-white">{alerts.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                  <span>Customer reviews available</span>
                  <span className="font-semibold text-white">{reviews.length}</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button href="/partner" variant="primary" className="w-full justify-center">
                Open service management
              </Button>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <GlassPanel
              key={stat.label}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${stat.accent} p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{stat.value}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="mt-4 text-sm text-white/60">{stat.hint}</p>
            </GlassPanel>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">Quick actions</p>
              <h2 className="text-2xl font-semibold text-white">Keep operations moving</h2>
            </div>
            <ArrowRight className="h-5 w-5 text-white/35" />
          </div>

          <div className="space-y-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/35 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Icon className="h-5 w-5 text-cyan-100" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white">{action.title}</p>
                    <p className="text-sm leading-6 text-white/65">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">Recent activity</p>
              <h2 className="text-2xl font-semibold text-white">Bookings and payments</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-white/35" />
          </div>

          <div className="space-y-3">
            {recentActivity.length ? (
              recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-white/60">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-white/35">{item.time}</span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/25 px-4 py-6 text-sm text-white/55">
                No live operational activity is available yet for this operator account.
              </div>
            )}
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">Workspace modules</p>
              <h2 className="text-2xl font-semibold text-white">Built for operator performance</h2>
            </div>
            <Settings2 className="h-5 w-5 text-white/35" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/35 p-5"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Icon className="h-5 w-5 text-cyan-100" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{module.description}</p>
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">Priority alerts</p>
              <h2 className="text-2xl font-semibold text-white">Needs attention</h2>
            </div>
            <Bell className="h-5 w-5 text-white/35" />
          </div>

          <div className="space-y-3">
            {alerts.length ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="font-medium text-white">{alert.title}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        alert.priority === "High"
                          ? "bg-rose-400/15 text-rose-100"
                          : alert.priority === "Low"
                            ? "bg-emerald-400/15 text-emerald-100"
                            : "bg-amber-400/15 text-amber-100"
                      }`}
                    >
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-sm text-white/65">{alert.meta}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/25 px-4 py-6 text-sm text-white/55">
                No alert has been raised across your operator workspace.
              </div>
            )}
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}

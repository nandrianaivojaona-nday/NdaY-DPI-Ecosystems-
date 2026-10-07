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
import { auth, db } from "@/lib/firebase";

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
    amount: typeof data.amount === "number" ? data.amount : typeof data.totalAmount === "number" ? data.totalAmount : typeof data.price === "number" ? data.price : undefined,
    createdAt: data.createdAt ?? data.updatedAt ?? null,
    sourceCollection,
  };
}

function normalizePayment(docId: string, data: DocumentData, sourceCollection = "payments"): PaymentRecord {
  return {
    id: docId,
    status: data.status,
    amount: typeof data.amount === "number" ? data.amount : typeof data.totalAmount === "number" ? data.totalAmount : typeof data.price === "number" ? data.price : undefined,
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

export default function OperatorDashboardPage() {
  const [operatorId, setOperatorId] = useState<string | null>(null);
  const [operatorProfile, setOperatorProfile] = useState<OperatorProfile | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setOperatorId(null);
        setLoading(false);
        setError("Sign in as an operator account to load live dashboard data.");
        return;
      }

      const derivedOperatorId = user.uid;
      setOperatorId(derivedOperatorId);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!operatorId) return;

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
        (items) => setBookings((current) => {
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
        (items) => setPayments((current) => {
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

  const bookingPipeline = useMemo(() => {
    const counts = {
      pending: 0,
      confirmed: 0,
      progress: 0,
      attention: 0,
    };

    bookings.forEach((booking) => {
      const status = booking.status.toLowerCase();
      if (["pending", "requested", "awaiting_confirmation"].includes(status)) {
        counts.pending += 1;
      } else if (["confirmed", "approved", "scheduled"].includes(status)) {
        counts.confirmed += 1;
      } else if (["in_progress", "ongoing", "active"].includes(status)) {
        counts.progress += 1;
      } else if (["cancelled", "failed", "disputed", "attention", "issue"].includes(status)) {
        counts.attention += 1;
      }
    });

    return [
      { label: "Pending", count: counts.pending, icon: Clock3, tone: "text-amber-300" },
      { label: "Confirmed", count: counts.confirmed, icon: CheckCircle2, tone: "text-cyan-300" },
      { label: "In progress", count: counts.progress, icon: Activity, tone: "text-violet-300" },
      { label: "Attention needed", count: counts.attention, icon: AlertCircle, tone: "text-rose-300" },
    ];
  }, [bookings]);

  const totalRevenue = useMemo(
    () => payments.reduce((sum, payment) => sum + (payment.amount ?? 0), 0),
    [payments]
  );

  const averageRating = useMemo(() => {
    const rated = reviews.map((review) => review.rating).filter((value): value is number => typeof value === "number");
    if (!rated.length) return null;
    return rated.reduce((sum, rating) => sum + rating, 0) / rated.length;
  }, [reviews]);

  const liveTasks = alerts.length
    ? alerts
    : [
        {
          id: "fallback-profile",
          title: "Complete operator onboarding",
          meta: operatorProfile?.status ?? "Pending setup",
          priority: "Medium" as Priority,
        },
      ];

  const activityFeed: ActivityItem[] = bookings.slice(0, 4).map((booking) => ({
    id: booking.id,
    title: `${booking.serviceName ?? "Service request"} booking`,
    detail: `${booking.customerName ?? "Customer"} · ${booking.status.replaceAll("_", " ")}`,
    time: toDateLabel(booking.createdAt),
  }));

  const kpis = [
    {
      label: "Active services",
      value: String(operatorProfile?.serviceCount ?? 0),
      change: operatorProfile?.coverageZone ? `Coverage: ${operatorProfile.coverageZone}` : "No coverage zone set",
      icon: Briefcase,
    },
    {
      label: "Open bookings",
      value: String(bookings.length),
      change: `${bookingPipeline[0].count} awaiting confirmation`,
      icon: CalendarDays,
    },
    {
      label: "Monthly revenue",
      value: toCurrency(totalRevenue),
      change: `${payments.length} payment records tracked`,
      icon: Wallet,
    },
    {
      label: "Customer rating",
      value: averageRating ? `${averageRating.toFixed(1)} / 5` : "No ratings",
      change: reviews.length ? `Based on ${reviews.length} reviews` : "No review data yet",
      icon: BadgeCheck,
    },
  ];

  return (
    <main className="relative px-4 pb-32 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <GlassPanel className="overflow-hidden p-0" hoverable={false}>
          <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                <ShieldCheck className="h-4 w-4" />
                Operator workspace
              </div>

              <div className="max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {operatorProfile?.name ? `${operatorProfile.name} dashboard` : "Live operator dashboard"}
                </h1>
                <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                  Real-time service data is loaded from Firestore for operator profile, bookings,
                  payments, alerts, and customer feedback.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/partner" variant="primary">
                  Open operator setup
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/ecosystem" variant="secondary">
                  Explore ecosystem modules
                </Button>
              </div>

              {(loading || error || operatorProfile?.contactEmail) && (
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/65">
                  {loading && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Loading Firestore data
                    </span>
                  )}
                  {operatorProfile?.contactEmail && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                      {operatorProfile.contactEmail}
                    </span>
                  )}
                  {error && (
                    <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-rose-200">
                      {error}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {bookingPipeline.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                            {item.label}
                          </p>
                          <p className="mt-2 text-3xl font-semibold text-white">{item.count}</p>
                        </div>
                        <Icon className={`h-5 w-5 ${item.tone}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </GlassPanel>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => {
            const Icon = item.icon;
            return (
              <GlassPanel key={item.label} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/60">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-cyan-200/90">{item.change}</p>
                  </div>
                  <div className="rounded-2xl bg-white/8 p-3 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </GlassPanel>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <GlassPanel className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Quick actions</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Key operator controls</h2>
              </div>
              <Sparkles className="hidden h-5 w-5 text-cyan-200 sm:block" />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-400/30 hover:bg-white/8"
                  >
                    <div className="flex h-full flex-col">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                      <p className="mt-3 text-sm text-white/65">{action.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                        Open module
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Alerts</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Priority queue</h2>
              </div>
              <Bell className="h-5 w-5 text-cyan-200" />
            </div>

            <div className="mt-6 space-y-3">
              {liveTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{task.title}</p>
                      <p className="mt-1 text-sm text-white/60">{task.meta}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        task.priority === "High"
                          ? "bg-rose-400/15 text-rose-200"
                          : task.priority === "Medium"
                            ? "bg-amber-400/15 text-amber-200"
                            : "bg-emerald-400/15 text-emerald-200"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassPanel className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Activity feed</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Recent platform events</h2>
              </div>
              <BarChart3 className="h-5 w-5 text-cyan-200" />
            </div>

            <div className="mt-6 space-y-4">
              {activityFeed.length ? (
                activityFeed.map((entry) => (
                  <div key={entry.id} className="relative pl-6">
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.6)]" />
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-medium text-white">{entry.title}</p>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/45">{entry.time}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/65">{entry.detail}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-white/60">
                  No live booking activity yet.
                </div>
              )}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Modules</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Operational building blocks</h2>
              </div>
              <Users className="h-5 w-5 text-cyan-200" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                    <p className="mt-2 text-sm text-white/65">{module.description}</p>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </section>
      </div>
    </main>
  );
}

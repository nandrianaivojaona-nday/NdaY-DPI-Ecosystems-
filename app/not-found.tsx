import Link from "next/link";
import Chapter from "@/components/ui/Chapter";

export default function NotFound() {
  return (
    <Chapter
      id="not-found"
      title="Page Under Construction"
      description="The page you're looking for is currently being built or doesn't exist yet."
      manifesto="Great things take time – we're working on it."
      align="center"
      variant="narrative"
    >
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        {/* 404 illustration */}
        <div className="text-8xl font-bold text-cyan-400/30 select-none">
          🚧
        </div>

        <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm w-full">
          <p className="text-white/70 text-sm leading-relaxed">
            This Digital Public Infrastructure is under construction.
            We're building something great – and we'd love to hear from you.
          </p>
        </div>

        {/* Quick navigation cards */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Link
            href="/"
            className="glass-card rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:border-cyan-400/30"
          >
            <span className="text-2xl block mb-1">🏠</span>
            <span className="text-sm text-white/80 font-medium">Home</span>
          </Link>

          <Link
            href="/contact?subject=Page%20Not%20Found%20-%20Under%20Construction"
            className="glass-card rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:border-cyan-400/30"
          >
            <span className="text-2xl block mb-1">📬</span>
            <span className="text-sm text-white/80 font-medium">Notify Us</span>
          </Link>

          <Link
            href="/ecosystem/fiiziana"
            className="glass-card rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:border-cyan-400/30"
          >
            <span className="text-2xl block mb-1">🛡️</span>
            <span className="text-sm text-white/80 font-medium">Fiiziana</span>
          </Link>

          <Link
            href="/ecosystem/bentanana"
            className="glass-card rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:border-cyan-400/30"
          >
            <span className="text-2xl block mb-1">🏛️</span>
            <span className="text-sm text-white/80 font-medium">Ben'Tanàna</span>
          </Link>
        </div>

        {/* Notification prompt */}
        <div className="text-xs text-white/30 text-center mt-2">
          If you expected to find something specific here, please{" "}
          <Link href="/contact?subject=Page%20Not%20Found%20-%20Under%20Construction" className="text-cyan-400 hover:underline">
            let us know
          </Link>
          . We'll prioritize it.
        </div>
      </div>
    </Chapter>
  );
}
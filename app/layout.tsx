// app/layout.tsx (Server Component)
import "./globals.css";
import ClientLayout from "./ClientLayout";
import NdaYLogo from "@/components/home/NdaYLogo";
import version from "@/lib/version";
import Link from "next/link";

export const metadata = {
  title: "NdaY’ Digital Public Infrastructure Ecosystems",
  description: "Bridging Innovation and Community for a sustainable Future. Architecture V9.2, TVE Core v3.0.0.",
  icons: {
    icon: "/assets/logo/NdaY'Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
          <footer className="relative z-10 mt-12 border-t border-white/10 bg-slate-950/90 py-5">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <NdaYLogo size={42} />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">
                    NdaY' Digital Public Infrastructure Ecosystems
                  </p>
                  <p className="text-xs text-white/70">
                    v{version.version} • Build {version.build} • © {new Date().getFullYear()} NdaY' Individual Enterprise
                  </p>
                </div>
              </div>
              <div className="flex gap-5 text-xs text-white/70">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </footer>
        </ClientLayout>
      </body>
    </html>
  );
}
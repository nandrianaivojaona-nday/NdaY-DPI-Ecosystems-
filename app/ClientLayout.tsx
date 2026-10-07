"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/architecture", label: "Architecture" },
  { href: "/reference", label: "Reference" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/contact", label: "Contact" },
  { href: "/partner", label: "Partner / Sponsor" },
];

function NavLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`nav-link ${isActive ? "active" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll for shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu with Escape and lock page scroll while it is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Observe header height dynamically for padding
  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    });

    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen isolate">
      {/* GLOBAL BACKGROUND */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
        <img
          src="/assets/background/nday-digital-infrastructure.png"
          className="h-full w-full object-cover opacity-15"
          alt=""
        />
        <div className="absolute inset-0 bg-slate-950/88" />
      </div>

      {/* HEADER */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 z-50 w-full border-b border-white/10 
        bg-black/40 backdrop-blur-2xl transition-all duration-300`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10
          ${isScrolled ? "py-2" : "py-4"}`}
        >
          {/* LOGO */}
          <Link href="/" className="site-logo shrink-0">
            <img
              src="/assets/logo/NdaY'Logo.png"
              alt="NdaY' Logo"
              className={`drop-shadow-sm transition-all duration-300 ${isScrolled ? "w-27.5" : "w-32"
                }`}
            />
          </Link>

          {/* TITLE */}
          <div
            className={`hidden min-w-0 flex-1 border-l-4 border-white/14 pl-6 lg:block transition-all duration-300
            ${isScrolled ? "py-1" : "py-2"}`}
          >
            <p
              className={`font-semibold tracking-tight text-white transition-all duration-300
              ${isScrolled ? "text-lg" : "text-xl xl:text-2xl"}`}
            >
              NdaY&apos; DPI Ecosystems
            </p>
            <p className="mt-1 text-xs font-medium text-white/75 xl:text-sm">
              Bridging Innovation and Community for a Sustainable Future
            </p>
          </div>

          {/* NAV */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 md:flex"
          >
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>


          {/* CTA */}
          <Link
            href="/join"
            className="nav-link active hidden px-6 font-bold md:flex"
          >
            Collaborate
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU PANEL */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 bg-slate-950/95 px-4 pb-6 pt-3 md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-base"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/join"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full bg-cyan-500/20 px-4 py-3 text-center text-base font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
                >
                  Collaborate
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* MAIN CONTENT – padded to avoid overlap with fixed header */}
      <main
        style={{ paddingTop: headerHeight }}
        className="relative z-10 min-h-screen"
      >
        {children}
      </main>
    </div>
  );
}
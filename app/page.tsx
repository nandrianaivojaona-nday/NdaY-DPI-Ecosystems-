import Link from "next/link";

import Hero from "@/components/home/Hero";
import HeroIntro from "@/components/home/HeroIntro";
import AboutNdaYEnterprise from "@/components/home/AboutNdaYEnterprise";
import StrategicPillars from "@/components/home/StrategicPillars";
import EnterpriseImpact from "@/components/home/EnterpriseImpact";
import EcosystemOverview from "@/components/home/EcosystemOverview";
import DPIARStack from "@/components/home/DPIARStack";
import PlatformSection from "@/components/home/PlatformSection";
import LivingLabs from "@/components/home/LivingLabs";
import GetInvolved from "@/components/home/GetInvolved";
import Architecture92 from "@/components/home/Architecture92";
import CapabilityRegister from "@/components/home/CapabilityRegister";
import Chapter from "@/components/ui/Chapter";
import FoundationalPrinciples from "@/components/home/FoundationalPrinciples";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about-enterprise" },
  { label: "Architecture", href: "#architecture-92" },
  { label: "Architecture V9.2", href: "/architecture" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Reference", href: "/reference" },
  { label: "Contact", href: "/contact" },
  { label: "Partner / Sponsor", href: "/partners" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* 1. Introduction – Philosophical Foundation */}
      <Chapter
        id="introduction"
        title="Rooting Digital Public Infrastructure in the Individual"
        description="NdaY' builds from the ground up — the individual citizen, then family, community, local governance, and institutions — creating a cohesive, interoperable ecosystem of public value."
        align="center"
        variant="narrative"
      >
        <HeroIntro />
      </Chapter>

      {/* 2. The Visual Architecture */}
      <Chapter
        id="architecture-visual"
        category="NdaY' Enterprise"
        title="Bridging Innovation and Community for a Sustainable Future"
        description="Designing, building and evolving Digital Public Infrastructure ecosystems that empower communities, institutions and public services."
        manifesto="A world where connected people enjoy a high quality standard of living."
        align="center"
        variant="hero"
      >
        <Hero />
      </Chapter>

      {/* 3. About NdaY' Enterprise */}
      <Chapter
        id="about-enterprise"
        title="About NdaY' Enterprise"
        description="Our story, vision, and mission."
        align="center"
      >
        <AboutNdaYEnterprise />
      </Chapter>

      {/* 4. Foundational Principles */}
      <Chapter
        id="strategic-pillars"
        title="Foundational Principles"
        description="The principles that guide everything we do."
        align="center"
      >
        <FoundationalPrinciples />
      </Chapter>

      {/* 5. Enterprise Impact */}
      <Chapter
        id="enterprise-impact"
        title="Our Impact"
        description="Measurable results that reflect our commitment."
        align="center"
      >
        <EnterpriseImpact />
      </Chapter>

      {/* 6. Ecosystem Overview */}
      <Chapter
        id="ecosystem-overview"
        title="NdaY' Digital Public Infrastructure Ecosystem"
        description="A sovereign, open-source platform connecting communities, institutions, and innovation."
        align="center"
        cta={{ label: "Explore the Ecosystem", href: "/ecosystem" }}
      >
        <EcosystemOverview />
      </Chapter>

      {/* 7. Architecture (DPIAR Stack) */}
      <Chapter
        id="architecture"
        title="Ecosystem Architecture V9.2"
        description="The architecture, derived from governance, that every NdaY' DPI follows."
        align="center"
        cta={{ label: "Read DPIAR (Volumes I to VI)", href: "/reference" }}
      >
        <DPIARStack />
      </Chapter>

      {/* 7b. Architecture 9.2 */}
      <Chapter
        id="architecture-92"
        title="One Shared TVE, Autonomous Sectors"
        description="Territorial Viability Engine v3.0.0 with shared EbA, independent actor websites and sector-hosted consortiums."
        align="center"
        cta={{ label: "Architecture 9.2", href: "/architecture" }}
      >
        <Architecture92 />
      </Chapter>

      <Chapter
        id="capability-register"
        title="Capability Register"
        description="Transparent status of every capability."
        align="center"
      >
        <CapabilityRegister />
      </Chapter>

      {/* 8. Core Platform */}
      <Chapter
        id="core-platform"
        title="NdaY' Core Platform"
        description="Identity, access, consent, entitlement, territory, transactions, audit, TVE Core v3.0.0, and a versioned API gateway."
        align="center"
        cta={{ label: "Read Volume IV", href: "/reference/volume-iv" }}
      >
        <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
          <p className="text-sm text-white/70">
            The foundational platform that powers all NdaY&apos; DPIs.
          </p>
        </div>
      </Chapter>

      {/* 9. Digital Public Services */}
      <Chapter
        id="public-services"
        title="Digital Public Services"
        description="NdaY&apos;Fokontany · NdaY&apos;Ben&apos;Tanàna · NdaY&apos;Lanona · NdaY&apos;Fako · NdaY&apos;Tantsaha · NdaY&apos;Tsidika · NdaY&apos;Hety · NdaY&apos;Radoko"
        align="center"
        cta={{ label: "Read Volume V", href: "/reference/volume-v" }}
      >
        <PlatformSection />
      </Chapter>

      {/* 10. Living Labs */}
      <Chapter
        id="living-labs"
        title="Living Labs"
        description="Ranomafana · Alaotra Mangoro · Antananarivo — innovation pilots in action."
        align="center"
        cta={{ label: "Read Volume VI", href: "/reference/volume-vi" }}
      >
        <LivingLabs />
      </Chapter>

      {/* 11. Resources */}
      <Chapter
        id="resources"
        title="Resources"
        description="Documentation · Standards · SDK · APIs · Research · Downloads · Publications"
        align="center"
        cta={{ label: "Explore Resources", href: "/resources" }}
      >
        <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
          <p className="text-sm text-white/70">
            Comprehensive resources for developers, researchers, and partners.
          </p>
        </div>
      </Chapter>

      {/* 12. Partners */}
      <Chapter
        id="partners"
        title="Partners"
        description="Government · Communities · Universities · NGOs · Private sector · Development partners"
        align="center"
        cta={{ label: "Become a Partner", href: "/partners" }}
      >
        <GetInvolved />
      </Chapter>
    </main>
  );
}

import Chapter from "@/components/ui/Chapter";
import PlatformSection from "@/components/home/PlatformSection";

export default function AboutPage() {
  return (
    <Chapter
      id="about"
      title="NdaY' Enterprise"
      description="Bridging Innovation and Community for a Sustainable Future."
      align="center"
    >
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-white/80 text-lg leading-relaxed">
          NdaY' Enterprise designs, builds and evolves Digital Public Infrastructure ecosystems that enable governments,
          communities, institutions, academia, businesses and development partners to collaborate through trusted,
          interoperable and sustainable digital ecosystems.
        </p>
        <p className="text-white/70 text-base mt-4">
          We believe lasting transformation is achieved through partnership, shared knowledge and locally owned
          innovation rather than isolated technology projects.
        </p>
        <p className="text-white/70 text-base mt-4">
          Our approach is governance-led: communities and public institutions define the ecosystem, and digital
          capabilities enable it. Technology is the last layer in the chain, not the first.
        </p>
      </div>
      <PlatformSection />
    </Chapter>
  );
}
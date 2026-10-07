import Chapter from "@/components/ui/Chapter";
import Architecture92 from "@/components/home/Architecture92";
import CapabilityRegister from "@/components/home/CapabilityRegister";

export const metadata = { title: "Architecture 9.2 | NdaY'DPI Ecosystems" };

export default function ArchitecturePage() {
  return (
    <main>
      <Chapter id="arch-92" title="Ecosystem Architecture V9.2" description="One shared TVE, sector autonomy, actor autonomy and public discovery." align="center">
        <Architecture92 />
      </Chapter>
      <Chapter id="capabilities" title="Capability Register" description="Implemented, pilot, planned and blocked capabilities." align="center">
        <CapabilityRegister />
      </Chapter>
    </main>
  );
}

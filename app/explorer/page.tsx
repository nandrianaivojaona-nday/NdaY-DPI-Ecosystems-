// app/explorer/page.tsx
import Chapter from "@/components/ui/Chapter";
import DPIARStack from "@/components/home/DPIARStack";

export default function ExplorerPage() {
  return (
    <Chapter
      id="explorer"
      title="Architecture Explorer"
      description="Interactively explore the NdaY' ecosystem, its layers, dependencies, and relationships."
      align="center"
      variant="narrative"
    >
      <DPIARStack />
    </Chapter>
  );
}
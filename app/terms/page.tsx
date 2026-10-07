import DocPage from "@/components/shared/DocPage";

export const metadata = { title: "Terms | NdaY' DPI Ecosystems" };

export default function Page() {
  return (
    <DocPage
      title="Terms of Use"
      intro="Conditions for using the NdaY' DPI Ecosystems public website."
      sections={[
        { heading: "Informational site", body: "This site presents the ecosystem. Platform services in the specification are a target baseline; see the capability register for status." },
        { heading: "Actor autonomy", body: "Connecting a website does not transfer ownership of an actor's content." },
        { heading: "Recommendations", body: "Recommendations cannot impersonate institutional decisions." },
        { heading: "Liability and governing law", body: "To be completed with legal review." },
      ]}
    />
  );
}

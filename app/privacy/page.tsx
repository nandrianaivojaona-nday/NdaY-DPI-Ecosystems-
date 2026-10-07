import DocPage from "@/components/shared/DocPage";

export const metadata = { title: "Privacy | NdaY' DPI Ecosystems" };

export default function Page() {
  return (
    <DocPage
      title="Privacy"
      intro="How NdaY' Individual Enterprise handles personal information on this website."
      sections={[
        { heading: "Public discovery", body: "Public territorial discovery requires no identity verification." },
        { heading: "Separate checks", body: "Authentication, authorization, consent, entitlement and governance approval are separate checks." },
        { heading: "Data we collect", body: "To be completed: list the data collected through contact and partner forms." },
        { heading: "Your rights", body: "To be completed: access, correction and deletion requests." },
        { heading: "Contact", body: "Use the contact page for privacy questions." },
      ]}
    />
  );
}

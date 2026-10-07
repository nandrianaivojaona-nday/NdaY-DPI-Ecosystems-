export interface Enterprise {
    name: string;
    tagline: string;
    vision: string;
    mission: string;
    story: string;
    philosophy: string;
    strategicPillars: { title: string; description: string; icon?: string }[];
    impact: { metric: string; value: string; description: string }[];
  }
  
  export const enterprise: Enterprise = {
    name: "NdaY' Enterprise",
    tagline: "Building Digital Public Infrastructure Around People",
    story:
      "The story of NdaY' did not begin with a company or a technology platform. It began with a commitment to serve communities. " +
      "Around 2015–2016, through volunteer engagement with Refuge Aina and other community development initiatives, " +
      "a simple observation emerged: despite significant efforts to improve lives, digital systems were often fragmented, " +
      "disconnected and designed around institutions rather than the people they were intended to serve. " +
      "This experience inspired a long journey of learning, collaboration and innovation. " +
      "Early initiatives explored how technology could strengthen local development, improve public services and connect communities. " +
      "As this work expanded, it became increasingly clear that creating individual applications would never be enough. " +
      "Sustainable transformation required shared digital foundations that could be reused across many sectors and institutions. " +
      "This conviction led to the creation of NdaY' Enterprise and, over time, to the development of the NdaY' Digital Public Infrastructure Ecosystem—" +
      "an evolving ecosystem where trusted identity, community administration, territorial governance and sectoral Digital Public Infrastructures work together to strengthen people, communities and institutions.",
    vision:
      "A World Where Connected People Enjoy a High Quality Standard of Living. " +
      "We envision a future where every individual can participate confidently in an inclusive digital society supported by trusted Digital Public Infrastructure. " +
      "In this future, every person has access to trusted identity, every community is digitally empowered, every institution collaborates through interoperable ecosystems and every public investment contributes to shared digital capabilities that improve lives, strengthen governance and promote sustainable development. " +
      "Technology is not the destination. Human well-being, resilient communities and lasting public value are.",
    mission:
      "Designing the Foundations of Collaborative Digital Societies. " +
      "Our mission is to design, build and continuously evolve Digital Public Infrastructure ecosystems that strengthen people, empower communities and enable trusted collaboration between institutions through shared digital capabilities. " +
      "We fulfil this mission by placing the individual at the centre of every digital ecosystem through NdaY'Fiiziana, empowering communities through NdaY'Fokontany, strengthening territorial governance through NdaY'Ben'Tanàna, developing sectoral ecosystems, contextualising global DPI principles, fostering innovation through Living Labs, and building trusted, interoperable and sustainable digital ecosystems that create lasting public value.",
    philosophy:
      "NdaY' does not build software first. It builds trust first. From trusted people come trusted communities. " +
      "From trusted communities come trusted institutions. From trusted institutions emerges a trusted Digital Public Infrastructure that creates lasting public value.",
    strategicPillars: [
      { title: "People before Technology", description: "Technology exists to improve people's lives, not to replace human relationships or institutional responsibility." },
      { title: "Communities before Systems", description: "Strong Digital Public Infrastructure grows from trusted communities where people live, collaborate and participate." },
      { title: "Shared Capabilities before Duplication", description: "Common digital capabilities should be reused across many sectors instead of being recreated independently by every application." },
      { title: "Collaboration before Isolation", description: "Public value grows when governments, academia, businesses, innovators, communities and development partners build together within a shared ecosystem." },
      { title: "Evolution before Replacement", description: "Digital transformation is a continuous journey where existing institutions and investments evolve progressively through interoperability and innovation." },
    ],
    impact: [
      { metric: "Communes", value: "6", description: "Pilot communes across Madagascar" },
      { metric: "Citizens", value: "234,000+", description: "Projected population reached by 2027" },
      { metric: "Platforms", value: "7", description: "Active Digital Public Infrastructures" },
      { metric: "Living Labs", value: "6", description: "Active co‑creation hubs" },
    ],
  };
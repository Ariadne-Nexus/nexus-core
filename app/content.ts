import { PageContent } from "../types/content";

export const siteContent: PageContent = {
  hero: {
    eyebrow: "Building better products",
    title: "Ship polished customer experiences, faster.",
    description:
      "Our team helps you uncover product opportunities, design delightful flows, and deliver resilient systems without slowing down your roadmap.",
    primaryCta: {
      label: "Talk to our team",
      href: "https://example.com/contact",
    },
    secondaryCta: {
      label: "View case studies",
      href: "https://example.com/work",
    },
  },
  features: [
    {
      title: "Product strategy, grounded in research",
      description:
        "We synthesize customer interviews, analytics, and experiments to find the highest-impact problems to solve next.",
    },
    {
      title: "Design systems that scale",
      description:
        "Reusable components, accessibility baked in, and thoughtful documentation keep your teams moving together.",
    },
    {
      title: "Reliable engineering delivery",
      description:
        "From architecture to release management, we build stable foundations that make future iterations faster, not slower.",
    },
  ],
  testimonials: [
    {
      quote:
        "They quickly understood our domain and guided the team to a launch-ready experience in weeks, not months.",
      name: "Aliyah Coleman",
      role: "VP of Product",
      company: "Northwind",
    },
    {
      quote:
        "The new design system eliminated so much duplicate work across squads. We ship UI changes with confidence now.",
      name: "Diego Ramirez",
      role: "Engineering Manager",
      company: "Acme Bank",
    },
  ],
};

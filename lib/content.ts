import type {
  ContactCopy,
  CtaContent,
  FaqItem,
  Feature,
  HeroContent,
  Metric,
  Outcome,
  PricingTier,
  Testimonial,
} from "@/types/content";

export const heroContent: HeroContent = {
  eyebrow: "Ops-grade reliability",
  title: "Systems that turn strategy into repeatable outcomes",
  subtitle:
    "Avidelta combines process intelligence, automation, and human-in-the-loop controls so revenue and operations teams can ship playbooks faster with fewer handoffs.",
  primaryCta: { label: "Request a demo", href: "#contact" },
  secondaryCta: { label: "See how it works", href: "#solutions" },
  highlights: [
    { label: "21% faster", detail: "from idea to shipped playbook" },
    { label: "99.9%", detail: "process reliability with live QA" },
    { label: "SOC 2", detail: "report-ready controls" },
  ],
  image: {
    src: "/images/hero-visual.svg",
    alt: "Avidelta orchestration workspace screenshot",
    width: 1200,
    height: 900,
  },
};

export const metrics: Metric[] = [
  { label: "Time to launch", value: "-21%", caption: "Weeks reclaimed on every rollout" },
  { label: "Automation coverage", value: "68%", caption: "Tasks moved off of human-only workflows" },
  { label: "Uptime", value: "99.9%", caption: "Operational reliability with built-in QA" },
];

export const features: Feature[] = [
  {
    title: "Map every workflow with living blueprints",
    description:
      "Break complex processes into reusable, version-controlled steps that keep GTM, ops, and engineering aligned.",
    badge: "Visibility",
    bulletPoints: [
      "Auto-generate SOPs with ownership, SLAs, and dependencies",
      "Change tracking that instantly updates playbooks across teams",
      "Contextual docs and data models one click away",
    ],
  },
  {
    title: "Automate the boring, review the critical",
    description:
      "Trigger low-risk steps automatically while routing approvals and exceptions to the right reviewers.",
    badge: "Control",
    bulletPoints: [
      "Human-in-the-loop gates with clear audit trails",
      "Branching logic for regional or segment-specific rules",
      "Timeboxed reviews so launches stay on schedule",
    ],
  },
  {
    title: "Close the loop with telemetry",
    description:
      "Track adoption, latency, and quality with dashboards built for operations leaders and auditors alike.",
    badge: "Proof",
    bulletPoints: [
      "Early-warning alerts for blockers and SLA risk",
      "Dashboards tuned for executives, operators, and QA",
      "Data warehouse friendly exports with lineage",
    ],
  },
];

export const outcomes: Outcome[] = [
  { label: "Launch-ready playbooks", detail: "Prebuilt templates for onboarding, renewals, and new SKUs." },
  { label: "Trusted controls", detail: "SOC 2–ready audit trails and reviewer sign-offs on every change." },
  { label: "Happier teams", detail: "Less swivel-chair work with automation that respects human judgment." },
  { label: "Customer-grade experiences", detail: "Consistent delivery with built-in SLAs and alerts." },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Avidelta let us standardize how revenue teams launch experiments. We cut rollout time by weeks without losing governance.",
    name: "Priya Ramanathan",
    role: "VP, Revenue Operations",
    company: "Northbeam",
  },
  {
    quote:
      "We finally have a source of truth for how work should happen. The live runbooks keep everyone honest and on track.",
    name: "Julian Cole",
    role: "Head of Business Systems",
    company: "Lattice Labs",
  },
];

export const pricing: PricingTier[] = [
  {
    name: "Launch",
    price: "$1,250/mo",
    description: "For teams running 2-3 critical playbooks with white-glove onboarding.",
    features: [
      "Up to 25 active collaborators",
      "Two guided playbook implementations",
      "SOC 2 controls, SSO, and audit history",
      "Email + chat support",
    ],
    cta: "Start a pilot",
  },
  {
    name: "Scale",
    price: "Talk to us",
    description: "For multi-team rollouts with custom data connections and change management.",
    features: [
      "Unlimited workspaces and reviewers",
      "Dedicated solutions architect",
      "Custom integrations and data warehouse feeds",
      "Priority support with uptime SLAs",
    ],
    cta: "Plan your rollout",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "How long does implementation take?",
    answer:
      "Most customers ship their first two playbooks in under four weeks. We pair your team with a solutions architect to keep momentum high.",
  },
  {
    question: "Can we connect to our existing tools?",
    answer:
      "Yes. We connect to CRMs, data warehouses, and ticketing tools. Our architecture keeps PII out of the platform when you need it to.",
  },
  {
    question: "What about security and compliance?",
    answer:
      "We maintain SOC 2–aligned controls, SSO, RBAC, and full audit trails. Exports are available for your auditors on request.",
  },
  {
    question: "Do you support change management?",
    answer:
      "Absolutely. Every playbook is versioned, approved, and accompanied by change logs so teams know what shipped and why.",
  },
];

export const contactCopy: ContactCopy = {
  title: "Tell us about your launch goals",
  subtitle: "We’ll follow up within one business day with a tailored rollout plan.",
  checklist: [
    "Guided tour of a playbook similar to your use case",
    "Timeline and effort for your team",
    "Security posture and data flow overview",
  ],
};

export const ctaContent: CtaContent = {
  title: "Ready to launch your next playbook?",
  subtitle: "See how Avidelta keeps delivery reliable without slowing teams down.",
  primaryCta: { label: "Book a demo", href: "#contact" },
  secondaryCta: { label: "Download overview", href: "/Avidelta-Overview.pdf" },
};

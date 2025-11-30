export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  highlights: { label: string; detail: string }[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type Feature = {
  title: string;
  description: string;
  badge: string;
  bulletPoints: string[];
};

export type Outcome = {
  label: string;
  detail: string;
};

export type Metric = {
  label: string;
  value: string;
  caption: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactCopy = {
  title: string;
  subtitle: string;
  checklist: string[];
};

export type CtaContent = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

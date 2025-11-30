export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Avidelta",
  description: "Operational intelligence that turns strategy into repeatable outcomes.",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  contactEmail: "hello@avidelta.com",
  navLinks: [
    { label: "Solutions", href: "#solutions" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ] as NavLink[],
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com/avidelta",
    twitterHandle: "@avidelta",
    email: "mailto:hello@avidelta.com",
  },
};

export const metadataDefaults = {
  keywords: [
    "operations platform",
    "revenue enablement",
    "process automation",
    "analytics",
    "customer success",
  ],
};

const LOCAL_FALLBACK = "http://localhost:3000";

function normalizeSiteUrl(url?: string | null) {
  const trimmed = url?.trim();

  if (!trimmed) return LOCAL_FALLBACK;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    parsed.hash = "";
    return parsed.origin;
  } catch {
    return LOCAL_FALLBACK;
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(siteConfig.url);
}

export function metadataBaseUrl(): URL | undefined {
  try {
    return new URL(getSiteUrl());
  } catch {
    return undefined;
  }
}

export function getSiteHostname() {
  try {
    return new URL(getSiteUrl()).hostname;
  } catch {
    return "localhost";
  }
}

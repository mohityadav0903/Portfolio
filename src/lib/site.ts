import { profile } from "./data";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://mohityadav.dev";

export const site = {
  url: siteUrl,
  name: profile.name,
  brand: profile.brandName,
  title: `${profile.name} — ${profile.role}`,
  shortTitle: profile.brandName,
  description: profile.intro,
  role: profile.role,
  location: profile.location,
  email: profile.email,
  calUrl: profile.calUrl,
  keywords: [
    profile.name,
    profile.brandName,
    profile.role,
    "Founding Engineer",
    "AI products",
    "agentic systems",
    "system design",
    "TypeScript",
    "microservices",
    "Redis Streams",
    "LangGraph",
    "realtime platforms",
    "Bengaluru",
    "portfolio",
    "WebACP",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  socials: profile.socials,
  ogImage: {
    path: "/og.png",
    width: 1200,
    height: 630,
    alt: `${profile.name} — ${profile.role} portfolio`,
  },
};

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.brandName,
    jobTitle: profile.role,
    url: site.url,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    sameAs: [profile.socials.github, profile.socials.linkedin],
    knowsAbout: [
      "Artificial Intelligence",
      "System Design",
      "TypeScript",
      "Microservices",
      "Agentic Systems",
      "Realtime Systems",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    alternateName: profile.brandName,
    url: site.url,
    description: site.description,
    author: {
      "@type": "Person",
      name: profile.name,
      url: site.url,
    },
  };
}

import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-serif-custom",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: site.authors,
  creator: site.name,
  publisher: site.name,
  applicationName: `${site.name} Portfolio`,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

const themeScript = `(function(){try{var root=document.documentElement;var media=matchMedia("(prefers-color-scheme: dark)");function choice(){var c=localStorage.getItem("theme");return c==="light"||c==="dark"?c:"system";}function label(c){return c==="light"?"Light theme":c==="dark"?"Dark theme":"System theme";}function apply(c){var dark=c==="dark"||(c==="system"&&media.matches);root.dataset.theme=dark?"dark":"light";root.dataset.themeChoice=c;root.style.colorScheme=dark?"dark":"light";if(c==="system")localStorage.removeItem("theme");else localStorage.setItem("theme",c);var button=document.querySelector("[data-theme-toggle]");if(button){button.title=label(c);button.setAttribute("aria-label",label(c)+". Switch theme");}}apply(choice());document.addEventListener("DOMContentLoaded",function(){apply(choice());});media.addEventListener("change",function(){if(choice()==="system")apply("system");});document.addEventListener("click",function(event){var button=event.target&&event.target.closest&&event.target.closest("[data-theme-toggle]");if(!button)return;var order={system:"light",light:"dark",dark:"system"};apply(order[choice()]||"system");});}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-surface text-foreground antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <JsonLd />
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === "production" ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon='{"token":"2912c95202724492aaaec925beda1fb2"}'
          />
        ) : null}
      </body>
    </html>
  );
}

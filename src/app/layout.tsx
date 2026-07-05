import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohityadav.dev"),
  title: "Mohit Yadav — Founding Engineer",
  description:
    "Founding Engineer building AI products from zero to scale — agentic systems, design tools, and the platforms behind them.",
  openGraph: {
    title: "Mohit Yadav — Founding Engineer",
    description:
      "Founding Engineer building AI products from zero to scale — agentic systems, design tools, and the platforms behind them.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

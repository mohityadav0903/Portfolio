import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkCards } from "@/components/WorkCards";
import { works } from "@/lib/data";

const lead =
  "Products I have stayed with. The first version, and what it became once people were using it.";

export const metadata: Metadata = {
  title: "Work",
  description: lead,
  alternates: { canonical: "/work" },
  openGraph: { title: "Work", description: lead, url: "/work" },
};

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Work",
    itemListElement: works.map((work, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: work.title,
      description: work.description,
      url: work.href,
    })),
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 py-8 sm:px-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <p className="font-mono text-[13px] text-muted">work</p>
      <div className="flex max-w-[640px] flex-col gap-3">
        <h1 className="font-serif text-5xl leading-none">Work</h1>
        <p className="text-lg leading-relaxed text-muted">{lead}</p>
      </div>
      <WorkCards columns="page" />
    </div>
  );
}

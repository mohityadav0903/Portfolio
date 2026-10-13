import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { NoteList } from "@/components/NoteList";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkCards } from "@/components/WorkCards";
import { lede, profile } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-5 py-8 sm:px-10 sm:py-12">
      <SiteHeader />
      <section className="flex max-w-[720px] flex-col gap-5">
        <p className="text-[13px] text-muted">{profile.role}</p>
        <h1 className="font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.12] tracking-[-0.02em]">
          {profile.intro}
        </h1>
        <p className="max-w-[560px] text-lg leading-relaxed text-muted">{lede}</p>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-[13px] font-medium text-muted">Work</h2>
        <WorkCards />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-[13px] font-medium text-muted">Notes</h2>
        <NoteList />
      </section>
      <Contact />
    </div>
  );
}

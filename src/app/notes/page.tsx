import type { Metadata } from "next";
import { NoteList } from "@/components/NoteList";
import { SiteHeader } from "@/components/SiteHeader";

const lead =
  "Systems I have run. Where they failed, what they were actually doing, and what it took to make them simple enough to hold.";

export const metadata: Metadata = {
  title: "Notes",
  description: lead,
  alternates: { canonical: "/notes" },
  openGraph: { title: "Notes", description: lead, url: "/notes" },
};

export default function NotesPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 py-8 sm:px-10 sm:py-12">
      <SiteHeader />
      <p className="font-mono text-[13px] text-muted">notes</p>
      <div className="flex max-w-[640px] flex-col gap-3">
        <h1 className="font-serif text-5xl leading-none">Notes</h1>
        <p className="text-lg leading-relaxed text-muted">{lead}</p>
      </div>
      <NoteList showDates />
    </div>
  );
}

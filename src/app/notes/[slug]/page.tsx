import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteMarkdown } from "@/components/NoteMarkdown";
import { chipClass } from "@/components/NoteList";
import { ShareLinks } from "@/components/ShareLinks";
import { SiteHeader } from "@/components/SiteHeader";
import { notes, profile } from "@/lib/data";
import { chaptersFor } from "@/lib/note-bodies";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  if (!note) return {};

  const path = `/notes/${note.slug}`;
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: path },
    openGraph: {
      title: note.title,
      description: note.description,
      url: path,
      type: "article",
      ...(note.dateISO ? { publishedTime: note.dateISO } : {}),
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  if (!note) notFound();

  const chapters = chaptersFor(note.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.description,
    ...(note.dateISO ? { datePublished: note.dateISO } : {}),
    author: {
      "@type": "Person",
      name: profile.name,
      url: site.url,
    },
    mainEntityOfPage: absoluteUrl(`/notes/${note.slug}`),
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-5 py-8 sm:px-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <p className="font-mono text-[13px] text-muted">notes / {note.slug}</p>
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,720px)_240px] lg:justify-between">
        <article className="flex min-w-0 flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.15]">{note.title}</h1>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${chipClass[note.chip]}`}>
                {note.chip}
              </span>
              <span className="font-mono text-[13px] text-muted">{note.date}</span>
              {chapters.length > 0 ? (
                <ShareLinks url={absoluteUrl(`/notes/${note.slug}`)} title={note.title} />
              ) : null}
            </div>
          </header>
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <section key={chapter.id} id={chapter.id} className="flex scroll-mt-8 flex-col gap-2.5">
                <h2 className="text-xl font-semibold">
                  <span className="mr-2 font-mono text-sm font-medium text-chapter">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {chapter.title}
                </h2>
                <NoteMarkdown markdown={chapter.markdown} />
              </section>
            ))
          ) : (
            <p className="text-base leading-relaxed text-muted">Coming soon.</p>
          )}
        </article>
        {chapters.length > 0 ? (
          <aside className="hidden flex-col gap-3.5 lg:sticky lg:top-8 lg:flex">
            <p className="text-[13px] font-medium text-muted">Chapters</p>
            <nav className="flex flex-col gap-2.5">
              {chapters.map((chapter, index) => (
                <a key={chapter.id} href={`#${chapter.id}`} className="text-sm text-muted hover:text-foreground">
                  <span className="mr-2 font-mono text-[12px] text-chapter">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {chapter.title}
                </a>
              ))}
            </nav>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

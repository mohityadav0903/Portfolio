import Link from "next/link";
import { notes, type NoteChip } from "@/lib/data";

export const chipClass: Record<NoteChip, string> = {
  Product: "bg-chip-product text-chip-product-ink",
  Craft: "bg-chip-craft text-chip-craft-ink",
  Systems: "bg-chip-systems text-chip-systems-ink",
};

export function NoteList({ showDates = false }: { showDates?: boolean }) {
  return (
    <ul>
      {notes.map((note, i) => (
        <li key={note.slug} className={i === notes.length - 1 ? "border-y border-line" : "border-t border-line"}>
          <Link
            href={`/notes/${note.slug}`}
            className="flex items-center justify-between gap-4 py-4"
          >
            <span className="flex min-w-0 items-center gap-3.5">
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${chipClass[note.chip]}`}>
                {note.chip}
              </span>
              <span className="truncate">{note.title}</span>
            </span>
            {note.soon ? (
              <span className="shrink-0 font-mono text-[13px] text-muted">Soon</span>
            ) : showDates ? (
              <span className="shrink-0 font-mono text-[13px] text-muted">{note.date}</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

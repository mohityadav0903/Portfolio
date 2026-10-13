import fs from "node:fs";
import path from "node:path";

export type Chapter = {
  id: string;
  title: string;
  markdown: string;
};

function chapterId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function chaptersFor(slug: string): Chapter[] {
  const file = path.join(process.cwd(), "src/content/notes", `${slug}.md`);
  if (!fs.existsSync(file)) return [];

  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n").trim();
  const chapters: Chapter[] = [];

  for (const chunk of raw.split(/^## /m)) {
    if (!chunk.trim()) continue;
    const breakAt = chunk.indexOf("\n");
    const title = (breakAt === -1 ? chunk : chunk.slice(0, breakAt)).trim();
    const markdown = (breakAt === -1 ? "" : chunk.slice(breakAt + 1)).trim();
    if (!title) continue;
    chapters.push({ id: chapterId(title), title, markdown });
  }

  return chapters;
}

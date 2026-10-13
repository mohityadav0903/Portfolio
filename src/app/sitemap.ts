import type { MetadataRoute } from "next";
import { notes } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/notes"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...notes.map((note) => ({
      url: absoluteUrl(`/notes/${note.slug}`),
      lastModified: new Date(note.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

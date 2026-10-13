import { notes } from "@/lib/data";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Note — Mohit Yadav";
export const size = ogSize;
export const contentType = "image/png";

export default async function NoteImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);

  return ogImage({
    kicker: note?.chip ?? "Notes",
    title: note?.title ?? "Notes",
    footer: note?.description,
  });
}

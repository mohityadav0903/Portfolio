import { ogImage, ogSize } from "@/lib/og";

export const alt = "Notes — Mohit Yadav";
export const size = ogSize;
export const contentType = "image/png";

export default function NotesImage() {
  return ogImage({
    kicker: "Notes",
    title: "Systems I have run.",
    footer: "Where they failed, and what it took to make them hold.",
  });
}

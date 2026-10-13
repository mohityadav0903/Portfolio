import { ogImage, ogSize } from "@/lib/og";

export const alt = "Work — Mohit Yadav";
export const size = ogSize;
export const contentType = "image/png";

export default function WorkImage() {
  return ogImage({
    kicker: "Work",
    title: "Products I have stayed with.",
    footer: "The first version, and what it became once people were using it.",
  });
}

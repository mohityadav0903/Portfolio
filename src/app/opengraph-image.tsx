import { profile } from "@/lib/data";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogImage({
    kicker: profile.role,
    title: profile.intro,
  });
}

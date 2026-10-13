import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

async function font(file: string) {
  return readFile(join(process.cwd(), "src/lib/fonts", file));
}

export async function ogImage({
  kicker,
  title,
  footer = "ymohit.com",
}: {
  kicker: string;
  title: string;
  footer?: string;
}) {
  const [newsreader, inter] = await Promise.all([
    font("Newsreader-500.woff"),
    font("Inter-400.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#F6F4EF",
          color: "#1C1B19",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Inter", fontSize: 24, color: "#6B6760" }}>
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize: title.length > 70 ? 54 : 68,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontFamily: "Inter", fontSize: 22, color: "#6B6760" }}>
          {footer}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 500, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}

export async function markImage(size: number) {
  const newsreader = await font("Newsreader-500.woff");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#1C1B19",
          color: "#F6F4EF",
          fontFamily: "Newsreader",
          fontSize: Math.round(size * 0.62),
          paddingBottom: Math.round(size * 0.04),
        }}
      >
        M
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Newsreader", data: newsreader, weight: 500, style: "normal" }],
    },
  );
}

import Image from "next/image";
import { works, type Work } from "@/lib/data";

export function WorkCards({ columns = "home" }: { columns?: "home" | "page" }) {
  const grid =
    columns === "home"
      ? "sm:grid-cols-2 xl:grid-cols-4"
      : "sm:grid-cols-2";

  return (
    <div className={`grid items-stretch gap-4 ${grid}`}>
      {works.map((work) => (
        <WorkCard key={work.title} work={work} />
      ))}
    </div>
  );
}

function WorkCard({ work }: { work: Work }) {
  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-5"
    >
      <div className="relative h-36 overflow-hidden rounded-[10px] bg-well">
        {work.video ? (
          <video
            src={work.video}
            poster={work.image}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : work.image ? (
          <Image
            src={work.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 240px, (min-width: 640px) 45vw, 90vw"
            className={work.imageFit === "contain" ? "object-contain" : "object-cover"}
          />
        ) : null}
      </div>
      <p className="font-semibold">{work.title}</p>
      <p className="text-sm leading-normal text-muted">{work.description}</p>
    </a>
  );
}

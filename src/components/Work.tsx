"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import type { Work } from "@/lib/data";
import { works } from "@/lib/data";
import { FramePad } from "./PageFrame";
import { Reveal } from "./Reveal";

const categories = ["All", "AI Products", "Open Source"] as const;

function matchCategory(w: Work, cat: string) {
  if (cat === "All") return true;
  if (cat === "Open Source") return w.title === "WebACP";
  return w.title !== "WebACP";
}

function ProjectVideo({ src, poster }: { src: string; poster?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const setRate = () => {
      video.playbackRate = 0.5;
    };

    video.addEventListener("loadedmetadata", setRate);
    setRate();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.ended) return;
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(container);

    return () => {
      video.removeEventListener("loadedmetadata", setRate);
      observer.disconnect();
    };
  }, []);

  const stopNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const replay = (e: React.MouseEvent) => {
    stopNav(e);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
    setEnded(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-white"
      onClick={stopNav}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        controls
        className="block h-auto w-full"
        onPlay={() => setEnded(false)}
        onEnded={() => setEnded(true)}
      />
      {ended && (
        <button
          type="button"
          onClick={replay}
          aria-label="Replay video"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 text-white transition-colors hover:bg-black/35"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg">
            <RotateCcw className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium tracking-wide">Replay</span>
        </button>
      )}
    </div>
  );
}

function ProjectPreview({ project }: { project: Work }) {
  if (project.video) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/50 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01]">
          <ProjectVideo src={project.video} poster={project.image} />
        </div>
      </div>
    );
  }

  if (project.image) {
    const fit = project.imageFit ?? "fill";

    if (fit === "contain") {
      return (
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
          <div className="relative flex h-full w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl border border-white/50 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/50 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className={`block h-auto w-full ${project.marketingImage ? "transition-opacity duration-500 group-hover:opacity-0" : ""}`}
          />
          {project.marketingImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.marketingImage}
              alt={`${project.title} product preview`}
              className="absolute inset-0 block h-auto w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-[72%] max-w-xl -translate-x-1/2 -translate-y-[42%] overflow-hidden rounded-xl border border-white/40 bg-white/90 shadow-[0_24px_64px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out group-hover:-translate-y-[calc(42%+6px)]">
      <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/80" />
      </div>
      <div className="space-y-2 p-4">
        <div className="h-2 w-1/3 rounded bg-black/10" />
        <div className="h-2 w-full rounded bg-black/5" />
        <div className="h-2 w-[80%] rounded bg-black/5" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="aspect-[4/3] rounded-md bg-black/5" />
          <div className="aspect-[4/3] rounded-md bg-black/5" />
          <div className="aspect-[4/3] rounded-md bg-black/5" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Work }) {
  const inner = (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[2/1]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${project.glow}, transparent 60%)`,
          }}
        />
        <ProjectPreview project={project} />
        {project.href && (
          <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        )}
      </div>

      <FramePad className="!py-6 sm:!py-7">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">
            {project.title}
          </h3>
          <span className="text-sm text-muted-2">
            — {project.category}, {project.year}
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </FramePad>
    </article>
  );

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

export function Work() {
  const [active, setActive] = useState<string>("All");
  const filtered = works.filter((w) => matchCategory(w, active));

  return (
    <div id="work">
      <FramePad className="!py-6 sm:!py-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.06em] transition-colors duration-200 ${
                active === cat
                  ? "bg-[var(--pill-active)] text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FramePad>

      <div className="border-dots-t">
        <FramePad className="!pt-8">
          <div className="flex flex-col gap-10">
            {filtered.map((w, i) => (
              <Reveal key={w.title} delay={i % 3}>
                <ProjectCard project={w} />
              </Reveal>
            ))}
          </div>
        </FramePad>
      </div>
    </div>
  );
}

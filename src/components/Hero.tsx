"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/lib/data";
import { FramePad } from "./PageFrame";
import { StackLogos } from "./StackLogos";
import { Reveal } from "./Reveal";

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      onClick={copy}
      className={`group inline-flex items-center gap-3 rounded-full border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground ${className ?? ""}`}
    >
      <span>{profile.email}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-brand" />
      ) : (
        <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />
      )}
    </button>
  );
}

export function Hero() {
  return (
    <div id="top">
      <FramePad>
        <div className="flex flex-wrap gap-2 hero-in">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-soft px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-brand"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
          <h1 className="hero-in hero-in-delay-1 text-[clamp(2rem,4.25vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] lg:whitespace-nowrap">
            Hello, I&apos;m {profile.firstName}
          </h1>

          <p className="hero-in hero-in-delay-2 text-[1.0625rem] leading-[1.65] text-muted lg:pt-1">
            {profile.intro}
          </p>
        </div>

        <div className="hero-in hero-in-delay-3 mt-10 flex flex-wrap items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-surface transition-transform hover:scale-[1.02]"
          >
            Resume
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={profile.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            Book call
            <ArrowUpRight className="h-4 w-4 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        </div>
      </FramePad>

      <div className="border-dots-t">
        <FramePad className="!py-8 sm:!py-10">
          <Reveal className="flex flex-col items-center">
            <p className="text-center text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-2">
              My Stack
            </p>
            <StackLogos />
          </Reveal>
        </FramePad>
      </div>
    </div>
  );
}

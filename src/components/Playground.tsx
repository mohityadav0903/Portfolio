import { playground, profile } from "@/lib/data";
import { FramePad } from "./PageFrame";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

export function Playground() {
  return (
    <FramePad id="playground">
      <div className="flex items-end justify-between gap-4">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Playground</h2>
          <p className="mt-2 text-sm text-muted">
            A space where I build, experiment, and figure things out.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hidden text-sm text-muted hover:text-foreground sm:inline"
          >
            View All
          </a>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {playground.map((item, i) => (
          <Reveal key={item.title} delay={i} as="div" className="bg-surface">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 py-5 transition-colors duration-200 hover:bg-brand-soft"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            </a>
          </Reveal>
        ))}
      </div>
    </FramePad>
  );
}

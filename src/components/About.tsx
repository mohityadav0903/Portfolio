import { about } from "@/lib/data";
import { FramePad } from "./PageFrame";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <FramePad id="about">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div>
          <Reveal>
            <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
              About Me
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-muted">
              {about}
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} className="flex justify-center lg:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/mohit-cutout.png"
            alt="Mohit Yadav"
            className="w-full max-w-xs object-contain"
          />
        </Reveal>
      </div>
    </FramePad>
  );
}

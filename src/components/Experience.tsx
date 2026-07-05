import { experiences } from "@/lib/data";
import { FramePad } from "./PageFrame";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <FramePad id="experience">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Experience</h2>
      </Reveal>

      <div className="mt-8">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i} as="div">
            <div className="border-dots-t grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <div>
                <p className="font-medium">{exp.company}</p>
                <p className="mt-0.5 text-sm text-muted">{exp.role}</p>
                <p className="mt-1 text-xs text-muted-2">{exp.period}</p>
              </div>
              <div className="text-sm leading-relaxed text-muted">
                <p>{exp.summary}</p>
                {exp.highlights && (
                  <ul className="mt-3 list-disc space-y-2 pl-4 marker:text-muted-2">
                    {exp.highlights.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </FramePad>
  );
}

import { profile } from "@/lib/data";
import { CopyEmail } from "./Hero";
import { FramePad } from "./PageFrame";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <FramePad id="contact" className="!pb-10">
      <Reveal>
        <p className="text-lg text-muted sm:text-xl">You can find me here :)</p>
      </Reveal>

      <Reveal delay={1}>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-foreground"
          >
            GitHub
          </a>
          <CopyEmail className="!border-0 !px-0 hover:!text-brand" />
        </div>
      </Reveal>

      <p className="mt-14 text-xs text-muted-2">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </FramePad>
  );
}

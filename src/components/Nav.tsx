import { nav, profile } from "@/lib/data";
import { FramePad } from "./PageFrame";
import { GithubIcon, LinkedinIcon } from "./icons";

const mainNav = nav.filter((n) => !n.external && n.label !== "Home");

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-dots-b bg-surface">
      <FramePad className="!py-3.5 sm:!py-4">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#top"
            className="text-sm font-bold tracking-[0.04em] text-brand"
          >
            {profile.brandName}
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-0 md:flex">
            {mainNav.map((item, i) => (
              <span key={item.href} className="flex items-center">
                {i > 0 && <span className="nav-slash mx-3 text-sm">/</span>}
                <a
                  href={item.href}
                  className="link-underline text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-[#f3f3f1] hover:text-[#181717]"
            >
              <GithubIcon className="h-4 w-4 transition-colors group-hover:text-[#181717]" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-[#f3f3f1] hover:text-[#0A66C2]"
            >
              <LinkedinIcon className="h-4 w-4 transition-colors group-hover:text-[#0A66C2]" />
            </a>
          </div>
        </div>
      </FramePad>
    </header>
  );
}

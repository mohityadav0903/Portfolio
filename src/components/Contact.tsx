import { profile } from "@/lib/data";

const links = [
  { label: "GitHub", href: profile.socials.github },
  { label: "LinkedIn", href: profile.socials.linkedin },
  { label: "Resume", href: profile.resumeUrl },
];

export function Contact() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[13px] font-medium text-muted">Contact</h2>
      <a href={`mailto:${profile.email}`} className="font-serif text-[1.75rem] leading-none text-foreground">
        {profile.email}
      </a>
      <div className="flex flex-wrap gap-2.5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`rounded-full px-3.5 py-2 text-[13px] font-medium ${
              link.label === "Resume"
                ? "bg-foreground text-surface"
                : "border border-line bg-card text-foreground"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

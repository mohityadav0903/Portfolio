"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/lib/data";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" className="text-[15px] font-medium text-foreground">
        {profile.name}
      </Link>
      <nav className="flex items-center gap-4 sm:gap-7">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm ${active ? "font-medium text-foreground" : "text-muted hover:text-foreground"}`}
            >
              {item.label}
            </Link>
          );
        })}
        <ThemeSwitch />
        <a
          href={profile.calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-foreground px-4 py-2.5 text-[13px] font-medium text-surface"
        >
          Book a call
        </a>
      </nav>
    </header>
  );
}

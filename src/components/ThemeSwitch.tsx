import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
  return (
    <button
      type="button"
      data-theme-toggle=""
      aria-label="System theme. Switch theme"
      title="System theme"
      suppressHydrationWarning
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-foreground"
    >
      <Monitor className="theme-icon theme-icon-system h-4 w-4" strokeWidth={1.75} />
      <Sun className="theme-icon theme-icon-light h-4 w-4" strokeWidth={1.75} />
      <Moon className="theme-icon theme-icon-dark h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}

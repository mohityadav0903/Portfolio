"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { LinkedinIcon } from "@/components/icons";

const buttonClass =
  "flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-foreground/6 hover:text-foreground";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="ml-1 flex items-center gap-0.5">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className={buttonClass}
      >
        <LinkedinIcon className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        title="Share on X"
        className={buttonClass}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
          } catch {
            const field = document.createElement("textarea");
            field.value = url;
            document.body.appendChild(field);
            field.select();
            document.execCommand("copy");
            field.remove();
          }
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        className={`${buttonClass} ${copied ? "text-foreground" : ""}`}
      >
        <span className="relative h-3.5 w-3.5">
          <Copy
            strokeWidth={1.75}
            className={`absolute inset-0 h-3.5 w-3.5 transition duration-200 ${
              copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <Check
            strokeWidth={1.75}
            className={`absolute inset-0 h-3.5 w-3.5 transition duration-200 ${
              copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

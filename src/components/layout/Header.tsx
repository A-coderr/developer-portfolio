import Link from "next/link";

import { resumeLink } from "@/data/contact";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="size-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 2v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.25 6.75 8 9.5l2.75-2.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 13.25h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="w-full bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-mono text-base font-semibold text-foreground outline-none interactive-transition hover:text-accent focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          aria-label="Anzhelika Kostyuk home"
        >
          AK.
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav
            className="flex items-center rounded-full border border-border/70 bg-surface px-1.5 py-1"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:px-4"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={resumeLink.href}
            download
            className="inline-flex h-11 items-center gap-2 rounded-full border border-control-border px-3 text-sm font-medium text-foreground outline-none interactive-transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:px-4"
          >
            <DownloadIcon />
            <span>{resumeLink.label}</span>
          </a>
        </div>

        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-control-border text-muted outline-none interactive-transition hover:border-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            <span className="sr-only">Open navigation</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </summary>
          <nav
            className="absolute right-0 top-12 z-20 w-56 rounded-lg border border-border bg-surface p-2 shadow-xl shadow-shadow/20"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus"
              >
                {item.label}
              </a>
            ))}
            <a
              href={resumeLink.href}
              download
              className="mt-2 flex items-center gap-2 rounded-lg border border-control-border px-3 py-3 text-sm font-medium text-foreground outline-none interactive-transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-focus"
            >
              <DownloadIcon />
              <span>{resumeLink.label}</span>
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

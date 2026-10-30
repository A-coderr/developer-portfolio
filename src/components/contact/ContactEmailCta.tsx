"use client";

import type { EmailContactLink } from "@/data/contact";
import type { ReactNode } from "react";
import { useState } from "react";

interface ContactEmailCtaProps {
  children: ReactNode;
  className: string;
  link: EmailContactLink;
}

export function ContactEmailCta({
  children,
  className,
  link,
}: ContactEmailCtaProps) {
  const [status, setStatus] = useState<string | null>(null);

  function handleEmailClick() {
    setStatus("If your email app did not open, use Copy email instead.");
  }

  function handleCopyEmail() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setStatus(`Copy this email address: ${link.address}`);
      return;
    }

    void navigator.clipboard
      .writeText(link.address)
      .then(() => setStatus("Email copied to clipboard."))
      .catch(() => setStatus(`Copy this email address: ${link.address}`));
  }

  return (
    <div className="mt-8 space-y-4">
      <a href={link.href} onClick={handleEmailClick} className={className}>
        {children}
      </a>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="font-mono text-sm text-muted">{link.address}</p>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex w-fit items-center rounded-sm border border-control-border px-3 py-2 text-sm font-medium text-foreground outline-none interactive-transition hover:bg-accent-subtle focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Copy email
        </button>
      </div>

      {status ? (
        <p aria-live="polite" className="max-w-sm text-sm leading-6 text-muted">
          {status}
        </p>
      ) : null}
    </div>
  );
}

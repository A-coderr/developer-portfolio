"use client";

import { useState } from "react";

interface LightweightYouTubeEmbedProps {
  embedUrl: string;
  externalUrl: string;
  title: string;
}

export function LightweightYouTubeEmbed({
  embedUrl,
  externalUrl,
  title,
}: LightweightYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border/70 bg-surface">
      <div className="aspect-video w-full">
        {isLoaded ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="group flex h-full w-full flex-col items-start justify-end bg-background p-6 text-left outline-none interactive-transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-8"
            aria-label="Play Neon Chaser trailer"
          >
            <span className="font-mono text-xs font-medium uppercase text-accent">
              Trailer / YouTube
            </span>
            <span className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              See Neon Chaser in motion
            </span>
            <span className="mt-5 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase text-muted">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full border border-border text-foreground interactive-transition group-hover:border-accent group-hover:text-accent"
              >
                &#9654;
              </span>
              Load trailer
            </span>
          </button>
        )}
      </div>
      <div className="flex justify-end border-t border-border/60 px-5 py-4 text-sm text-muted">
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-sm font-mono text-xs font-medium uppercase text-foreground outline-none interactive-transition hover:text-accent focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Open on YouTube <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </div>
  );
}

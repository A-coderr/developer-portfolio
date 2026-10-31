import Image from "next/image";

import { contactLinks } from "@/data/contact";

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.588 2 12.253c0 4.531 2.865 8.371 6.839 9.728.5.094.683-.222.683-.494 0-.244-.009-.89-.014-1.747-2.782.619-3.369-1.375-3.369-1.375-.455-1.184-1.11-1.499-1.11-1.499-.908-.636.069-.623.069-.623 1.004.073 1.532 1.057 1.532 1.057.892 1.566 2.341 1.114 2.91.852.091-.663.35-1.114.636-1.37-2.221-.259-4.556-1.139-4.556-5.068 0-1.12.39-2.034 1.03-2.751-.103-.26-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.051A9.345 9.345 0 0 1 12 6.956a9.35 9.35 0 0 1 2.504.345c1.909-1.327 2.747-1.051 2.747-1.051.546 1.411.203 2.453.1 2.713.641.717 1.028 1.631 1.028 2.751 0 3.939-2.339 4.806-4.566 5.06.359.317.679.943.679 1.9 0 1.371-.013 2.477-.013 2.813 0 .274.18.593.688.493C19.138 20.621 22 16.783 22 12.253 22 6.588 17.523 2 12 2Z"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.95fr)] lg:gap-16 lg:px-12 lg:py-24"
    >
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase leading-5 text-muted">
          SOFTWARE DEVELOPER &middot; CREATIVE TECHNOLOGIST
        </p>

        <p className="mt-8 text-2xl font-medium leading-8 text-foreground sm:text-3xl">
          Anzhelika Kostyuk
        </p>

        <h1
          id="hero-title"
          className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl"
        >
          I build software, games, and{" "}
          <span className="text-accent">things worth exploring.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
          I develop web applications, interactive 3D experiences, and Unity/C#
          game systems. Through Anzhelika Lab, I share what I&apos;m building,
          exploring, and learning along the way.
        </p>

        <p className="mt-5 font-mono text-sm font-medium text-accent">
          Build. Play. Experiment.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex h-11 items-center justify-center rounded-full bg-action px-5 text-sm font-semibold text-on-action outline-none interactive-transition hover:bg-action-hover active:bg-action focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            View projects
          </a>
          <a
            href={contactLinks.github.href}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-control-border text-foreground outline-none interactive-transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <Image
          src="/images/hero/anzhelika-avatar.png"
          alt="Stylized 3D avatar of Anzhelika Kostyuk surrounded by software development technologies"
          width={1122}
          height={1402}
          preload
          sizes="(min-width: 1280px) 540px, (min-width: 1024px) 470px, (min-width: 640px) 384px, 66vw"
          className="h-auto w-full max-w-64 object-contain sm:max-w-80 md:max-w-96 lg:max-w-120 xl:max-w-136"
        />
      </div>
    </section>
  );
}

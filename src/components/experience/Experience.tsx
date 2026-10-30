import { experienceItems } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase text-muted">
          EXPERIENCE
        </p>
        <h2
          id="experience-title"
          className="mt-5 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Professional experience across software, interactive 3D and game
          development.
        </h2>
        <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
          A progression from mobile and immersive development into full-stack
          software, technical ownership, and gameplay systems.
        </p>
      </div>

      <ol className="mt-10 border-t border-border/70">
        {experienceItems.map((entry) => (
          <li key={entry.id}>
            <article
              aria-labelledby={`${entry.id}-title`}
              className="grid gap-4 border-b border-border/60 py-7 interactive-transition hover:border-border sm:py-8 lg:grid-cols-[minmax(7rem,0.55fr)_minmax(15rem,0.95fr)_minmax(0,1.8fr)] lg:gap-10 lg:py-9"
            >
              <div className="flex items-center gap-3 lg:items-start">
                <p className="font-mono text-xs font-medium uppercase tracking-normal text-muted">
                  {entry.period}
                </p>
                {entry.current ? (
                  <span
                    aria-hidden="true"
                    className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-positive lg:mt-1.5"
                  />
                ) : null}
              </div>

              <div>
                <h3
                  id={`${entry.id}-title`}
                  className="text-xl font-semibold leading-tight text-foreground"
                >
                  {entry.company}
                </h3>
                <p className="mt-2 text-sm font-medium text-accent">
                  {entry.role}
                </p>
              </div>

              <div>
                <p className="max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                  {entry.summary}
                </p>
                {entry.context ? (
                  <p className="mt-4 font-mono text-xs uppercase leading-5 text-foreground">
                    {entry.context}
                  </p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

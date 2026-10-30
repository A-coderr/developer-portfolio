import Link from "next/link";
import type { PortfolioProject } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectTechnologyList } from "./ProjectTechnologyList";

interface CaseStudyShellProps {
  project: PortfolioProject;
}

export function CaseStudyShell({ project }: CaseStudyShellProps) {
  const { preview } = project;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <Link
          href="/#projects"
          className="inline-flex items-center rounded-sm font-mono text-xs font-medium uppercase text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          ← Back to projects
        </Link>

        <article className="mt-10">
          <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-medium uppercase text-accent">
                {preview.label}
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>
              {preview.role ? (
                <p className="mt-3 text-sm font-medium text-foreground">
                  {preview.role}
                </p>
              ) : null}
            </div>
            <div>
              <p className="max-w-2xl text-base leading-7 text-muted">
                {preview.summary}
              </p>
              <div className="mt-5">
                <ProjectTechnologyList technologies={preview.technologies} />
              </div>
            </div>
          </div>

          {preview.media ? (
            <div className="mt-8">
              <ProjectMedia media={preview.media} variant="caseStudy" />
            </div>
          ) : null}

          <section
            aria-labelledby={`${project.slug}-next-title`}
            className="mt-8 border-t border-border/60 pt-6"
          >
            <h2
              id={`${project.slug}-next-title`}
              className="text-2xl font-semibold text-foreground"
            >
              Full case study coming next
            </h2>
          </section>
        </article>
      </section>
    </main>
  );
}

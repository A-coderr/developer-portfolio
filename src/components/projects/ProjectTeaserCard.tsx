import Link from "next/link";
import type { PortfolioProject } from "@/data/projects";
import { getProjectHref } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectTechnologyList } from "./ProjectTechnologyList";

interface ProjectTeaserCardProps {
  project: PortfolioProject;
}

const emphasisStyles = {
  featured: {
    article: "border-accent bg-surface",
    label: "text-accent",
    cta: "text-accent hover:text-foreground",
  },
  standard: {
    article: "border-border/50 bg-surface",
    label: "text-accent",
    cta: "text-foreground hover:text-accent",
  },
  quiet: {
    article: "border-border/40 bg-surface",
    label: "text-muted",
    cta: "text-muted hover:text-accent",
  },
};

export function ProjectTeaserCard({ project }: ProjectTeaserCardProps) {
  const titleId = `${project.slug}-title`;
  const { preview } = project;
  const styles = emphasisStyles[project.emphasis];

  return (
    <article
      aria-labelledby={titleId}
      data-theme="dark"
      className={`project-teaser-card group rounded-lg border text-foreground interactive-transition hover:border-accent ${styles.article}`}
    >
      {preview.media ? <ProjectMedia media={preview.media} /> : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className={`font-mono text-xs font-medium uppercase ${styles.label}`}
        >
          {preview.label}
        </p>
        <h3
          id={titleId}
          className="mt-3 text-2xl font-semibold leading-tight text-foreground"
        >
          {project.title}
        </h3>
        {preview.role ? (
          <p className="mt-2 text-sm font-medium text-foreground">
            {preview.role}
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-6 text-muted">{preview.summary}</p>

        <div className="mt-auto pt-6">
          <ProjectTechnologyList technologies={preview.technologies} />
          <Link
            href={getProjectHref(project)}
            aria-label={`${preview.ctaLabel} for ${project.title}`}
            className={`mt-5 inline-flex items-center gap-2 rounded-sm font-mono text-xs font-medium uppercase outline-none interactive-transition focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background ${styles.cta}`}
          >
            <span>{preview.ctaLabel}</span>
            <span
              aria-hidden="true"
              className="interactive-transition group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

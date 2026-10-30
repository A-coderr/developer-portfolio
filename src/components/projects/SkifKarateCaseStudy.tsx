import Link from "next/link";
import type { ReactNode } from "react";
import type { PortfolioProject, ProjectImageMedia } from "@/data/projects";
import {
  skifCaseStudyLinks,
  skifFocusAreas,
  skifHeroLabels,
  skifLifecycleSteps,
} from "@/data/skif-case-study";
import { ProjectMedia } from "./ProjectMedia";
import {
  ExternalCaseStudyLink,
  narrowCopy,
  sectionSpacing,
  SectionHeading,
  TechnicalLabelList,
} from "./case-study/CaseStudyPrimitives";

interface SkifKarateCaseStudyProps {
  project: PortfolioProject;
}

function getProjectImage(project: PortfolioProject): ProjectImageMedia | null {
  const media = project.preview.media;

  return media?.kind === "image" ? media : null;
}

function FocusAreas() {
  return (
    <ol className="mt-10 grid gap-6 lg:grid-cols-3">
      {skifFocusAreas.map((area) => (
        <li key={area.title} className="border-t border-border/70 pt-5">
          <p className="font-mono text-xs font-medium uppercase text-accent">
            {area.label}
          </p>
          <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">
            {area.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted">
            {area.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

function LifecycleVisual() {
  return (
    <ol
      aria-label="Website production lifecycle"
      className="rounded-lg border border-border/70 bg-surface p-5 sm:p-6"
    >
      {skifLifecycleSteps.map((step, index) => {
        const isLastStep = index === skifLifecycleSteps.length - 1;

        return (
          <li
            key={step}
            className="flex items-center justify-between gap-4 border-border/60 py-3 first:pt-0 last:pb-0 not-last:border-b"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-normal text-foreground">
              {step}
            </span>
            {!isLastStep ? (
              <span
                aria-hidden="true"
                className="font-mono text-sm text-accent"
              >
                ↓
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function VisitSiteLink({ children }: { children: ReactNode }) {
  return (
    <ExternalCaseStudyLink href={skifCaseStudyLinks.liveSite}>
      {children}
      <span aria-hidden="true" className="ml-2">
        ↗
      </span>
    </ExternalCaseStudyLink>
  );
}

function CaseStudyHero({ project }: SkifKarateCaseStudyProps) {
  const image = getProjectImage(project);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center rounded-sm font-mono text-xs font-medium uppercase text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        ← Back to projects
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase text-accent">
            WEB DEVELOPMENT
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-foreground/90">
            A production website that brings schedules, instructors, competition
            updates, and essential dojo information into one clear, maintainable
            digital home.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <VisitSiteLink>Visit Live Site</VisitSiteLink>
          </div>

          <div className="mt-8">
            <TechnicalLabelList labels={skifHeroLabels} />
          </div>
        </div>

        {image ? <ProjectMedia media={image} variant="caseStudy" /> : null}
      </div>
    </section>
  );
}

export function SkifKarateCaseStudy({ project }: SkifKarateCaseStudyProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <CaseStudyHero project={project} />

        <section
          data-theme="light"
          className={`${sectionSpacing} rounded-2xl bg-background text-foreground`}
          aria-labelledby="skif-information-title"
        >
          <SectionHeading
            id="skif-information-title"
            title="Making a content-heavy organization easy to navigate"
          >
            <p className={narrowCopy}>
              SKIF Karate Canada needed to present several different kinds of
              information&mdash;training schedules, instructor profiles,
              competition updates, organizational details, and practical contact
              information&mdash;without making the site difficult to navigate or
              maintain.
            </p>
            <p className={narrowCopy}>
              The design therefore focuses on clear content hierarchy,
              predictable navigation, and responsive layouts that allow visitors
              to reach the information they need quickly.
            </p>
          </SectionHeading>

          <FocusAreas />
        </section>

        <section
          className={sectionSpacing}
          aria-labelledby="skif-ongoing-title"
        >
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <SectionHeading
              id="skif-ongoing-title"
              title="Built to keep changing"
            >
              <p className={narrowCopy}>
                The site was designed as an ongoing production property rather
                than a one-time launch. New competition results, galleries,
                organizational updates, schedules, and other information
                continue to be published as SKIF Karate Canada evolves.
              </p>
              <p className={narrowCopy}>
                My role spans the full website lifecycle: design,
                implementation, deployment, responsive QA, production updates,
                and continued maintenance.
              </p>
            </SectionHeading>
            <LifecycleVisual />
          </div>
        </section>
      </article>
    </main>
  );
}

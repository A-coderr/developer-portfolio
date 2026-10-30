import Link from "next/link";
import type { ReactNode } from "react";
import type { PortfolioProject, ProjectImageMedia } from "@/data/projects";
import {
  portfolioV1CaseStudyLinks,
  portfolioV1Comparison,
  portfolioV1HeroLabels,
} from "@/data/portfolio-v1-case-study";
import { ProjectMedia } from "./ProjectMedia";
import {
  ExternalCaseStudyLink,
  narrowCopy,
  sectionSpacing,
  SectionHeading,
  TechnicalLabelList,
} from "./case-study/CaseStudyPrimitives";

interface PortfolioV1CaseStudyProps {
  project: PortfolioProject;
}

function getProjectImage(project: PortfolioProject): ProjectImageMedia | null {
  const media = project.preview.media;

  return media?.kind === "image" ? media : null;
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="ml-2 size-4"
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

function ExternalLink({
  children,
  href,
  icon = "external",
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  icon?: "external" | "github";
  variant?: "primary" | "secondary";
}) {
  return (
    <ExternalCaseStudyLink href={href} variant={variant}>
      {children}
      {icon === "github" ? (
        <GitHubIcon />
      ) : (
        <span aria-hidden="true" className="ml-2">
          ↗
        </span>
      )}
    </ExternalCaseStudyLink>
  );
}

function ComparisonList({
  items,
  title,
}: {
  items: readonly string[];
  title: string;
}) {
  return (
    <div className="border-t border-border/70 pt-5">
      <h3 className="font-mono text-xs font-medium uppercase text-accent">
        {title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudyHero({ project }: PortfolioV1CaseStudyProps) {
  const image = getProjectImage(project);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center rounded-sm font-mono text-xs font-medium uppercase text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        ← Back to projects
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase text-accent">
            WEB DEVELOPMENT
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Portfolio V1
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-foreground/90">
            An interactive developer portfolio that explored how React and
            browser-based 3D could turn a traditional personal site into a more
            playful technical experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ExternalLink href={portfolioV1CaseStudyLinks.liveSite}>
              Visit Live Site
            </ExternalLink>
            <ExternalLink
              href={portfolioV1CaseStudyLinks.source}
              icon="github"
              variant="secondary"
            >
              View Source
            </ExternalLink>
          </div>

          <div className="mt-8">
            <TechnicalLabelList labels={portfolioV1HeroLabels} />
          </div>
        </div>

        {image ? <ProjectMedia media={image} variant="caseStudy" /> : null}
      </div>
    </section>
  );
}

export function PortfolioV1CaseStudy({ project }: PortfolioV1CaseStudyProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <CaseStudyHero project={project} />

        <section
          className={sectionSpacing}
          aria-labelledby="portfolio-v1-origin-title"
        >
          <SectionHeading
            id="portfolio-v1-origin-title"
            title="Exploring beyond a conventional portfolio"
          >
            <p className={narrowCopy}>
              Portfolio V1 started as an experiment in making a personal
              developer website feel more interactive than a traditional
              collection of static sections and project cards.
            </p>
            <p className={narrowCopy}>
              It became a place to explore React-based 3D rendering, animated
              interfaces, spatial layouts, and ways of presenting technical
              information through interaction.
            </p>
          </SectionHeading>
        </section>

        <section
          className={sectionSpacing}
          aria-labelledby="portfolio-v1-sphere-title"
        >
          <SectionHeading
            id="portfolio-v1-sphere-title"
            title="Turning a skills list into a 3D interface"
          >
            <p className={narrowCopy}>
              Instead of presenting technologies as a conventional badge grid,
              the skills section distributed them across a rotating 3D sphere.
            </p>
            <p className={narrowCopy}>
              The layout used a golden-angle distribution to spread labels
              evenly across the surface while keeping each item oriented toward
              the camera as the sphere rotated.
            </p>
            <p className={narrowCopy}>
              The implementation used React Three Fiber Canvas, Drei Text and
              OrbitControls, automatic rotation, camera-facing labels, and
              hover-based color and scale feedback.
            </p>
          </SectionHeading>
        </section>

        <section
          className={sectionSpacing}
          aria-labelledby="portfolio-v1-ui-title"
        >
          <SectionHeading
            id="portfolio-v1-ui-title"
            title="Mixing application UI with a 3D scene"
          >
            <p className={narrowCopy}>
              The project combined conventional React interface development with
              a Three.js scene rendered through React Three Fiber.
            </p>
            <p className={narrowCopy}>
              That made it possible to treat 3D elements as part of the
              application rather than as a separate visual demo, while still
              working within a component-based React structure.
            </p>
          </SectionHeading>
        </section>

        <section
          data-theme="light"
          className={`${sectionSpacing} rounded-2xl bg-background text-foreground`}
          aria-labelledby="portfolio-v1-evolution-title"
        >
          <SectionHeading
            id="portfolio-v1-evolution-title"
            title="What changed between V1 and V2"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ComparisonList
              title={portfolioV1Comparison.v1.title}
              items={portfolioV1Comparison.v1.items}
            />
            <ComparisonList
              title={portfolioV1Comparison.v2.title}
              items={portfolioV1Comparison.v2.items}
            />
          </div>
          <p className="mt-8 max-w-4xl text-base leading-8 text-foreground/90 sm:text-lg">
            Portfolio V1 taught me how much interactive 3D can add to a web
            experience&mdash;and where it can begin competing with the
            information the interface is supposed to communicate. Portfolio V2
            keeps that interactive identity, but applies it more selectively
            around stronger engineering content.
          </p>
        </section>
      </article>
    </main>
  );
}

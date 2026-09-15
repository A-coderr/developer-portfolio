import Link from "next/link";
import type { PortfolioProject, ProjectImageMedia } from "@/data/projects";
import {
  assetPlatformContextFacts,
  assetPlatformHeroLabels,
  previewerCapabilities,
} from "@/data/asset-platform-case-study";
import { ProjectMedia } from "./ProjectMedia";
import {
  narrowCopy,
  sectionSpacing,
  SectionHeading,
  TechnicalLabelList,
} from "./case-study/CaseStudyPrimitives";

interface AssetPlatformCaseStudyProps {
  project: PortfolioProject;
}

function getProjectImage(project: PortfolioProject): ProjectImageMedia | null {
  const media = project.preview.media;

  return media?.kind === "image" ? media : null;
}

function ContextFacts() {
  return (
    <dl className="mt-10 grid gap-5 border-y border-border/70 py-6 sm:grid-cols-3">
      {assetPlatformContextFacts.map((item) => (
        <div key={item.label}>
          <dt className="font-mono text-xs font-medium uppercase text-muted">
            {item.label}
          </dt>
          <dd className="mt-2 text-sm font-semibold text-foreground">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CapabilityList() {
  return (
    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {previewerCapabilities.map((capability) => (
        <li
          key={capability}
          className="border-t border-border/70 pt-3 font-mono text-xs font-medium uppercase text-muted"
        >
          {capability}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyHero({ project }: AssetPlatformCaseStudyProps) {
  const image = getProjectImage(project);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center rounded-sm font-mono text-xs font-medium uppercase text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        ← Back to projects
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase text-accent">
            SOFTWARE ENGINEERING
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-foreground/90">
            An internal platform for organizing, searching, and previewing
            reusable 2D and 3D assets across a shared production workflow.
          </p>

          <div className="mt-8">
            <TechnicalLabelList labels={assetPlatformHeroLabels} />
          </div>
        </div>

        {image ? (
          <div>
            <ProjectMedia media={image} variant="caseStudy" />
            <p className="mt-3 font-mono text-xs font-medium uppercase text-muted">
              Sanitized concept visual
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AssetPlatformCaseStudy({
  project,
}: AssetPlatformCaseStudyProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <CaseStudyHero project={project} />

        <section
          className={sectionSpacing}
          aria-labelledby="asset-context-title"
        >
          <SectionHeading
            id="asset-context-title"
            title="A shared home for production assets"
          >
            <p className={narrowCopy}>
              The platform was developed for an internal team that needed a more
              structured way to store, organize, search, and preview reusable 2D
              and 3D assets.
            </p>
            <p className={narrowCopy}>
              It was used by approximately 40 team members and developed by a
              five-person project team. My work included hands-on development,
              architecture and implementation decisions, pull-request reviews,
              deployments, stakeholder meetings, technical planning, and future
              improvement planning.
            </p>
          </SectionHeading>
          <ContextFacts />
        </section>

        <section className={sectionSpacing} aria-labelledby="previewer-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:items-start">
            <SectionHeading
              id="previewer-title"
              title="Previewing 3D assets directly in the browser"
            >
              <p className={narrowCopy}>
                One of the platform&apos;s key capabilities was a Three.js-based
                asset previewer that allowed users to inspect 3D and image
                assets without leaving the browser.
              </p>
              <p className={narrowCopy}>
                The previewer supported rotation, zoom, automatic camera
                fitting, asset switching, loading states, and error handling
                across formats including FBX, glTF, OBJ, JPG, JPEG, PNG, and
                additional common asset formats.
              </p>
            </SectionHeading>

            <div className="border-t border-border/70 pt-5 lg:mt-4">
              <p className="font-mono text-xs font-medium uppercase text-accent">
                Previewer capabilities
              </p>
              <div className="mt-5">
                <CapabilityList />
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-6 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-28 lg:pt-20"
          aria-labelledby="asset-reflection-title"
        >
          <div className="border-t border-border/70 pt-10">
            <p className="font-mono text-xs font-medium uppercase text-accent">
              Internal production software
            </p>
            <h2
              id="asset-reflection-title"
              className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              What this project demonstrates
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              This project brought together full-stack web development,
              interactive 3D, cloud-backed asset workflows, migration tooling,
              and collaborative software delivery around a tool used by a real
              internal team.
            </p>
            <p className="mt-6 font-mono text-xs font-medium uppercase text-muted">
              Public demo unavailable
            </p>
            <Link
              href="/#projects"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-border/80 px-5 text-sm font-semibold text-foreground outline-none interactive-transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Back to projects
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

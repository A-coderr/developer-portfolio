import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { SamePageSmoothScroll } from "@/components/layout/SamePageSmoothScroll";
import { AssetPlatformCaseStudy } from "@/components/projects/AssetPlatformCaseStudy";
import { CaseStudyShell } from "@/components/projects/CaseStudyShell";
import { NeonChaserCaseStudy } from "@/components/projects/NeonChaserCaseStudy";
import { PortfolioV1CaseStudy } from "@/components/projects/PortfolioV1CaseStudy";
import { SkifKarateCaseStudy } from "@/components/projects/SkifKarateCaseStudy";
import { assetPlatformCaseStudyMetadata } from "@/data/asset-platform-case-study";
import { neonChaserCaseStudyMetadata } from "@/data/neon-chaser-case-study";
import {
  allProjects,
  getProjectBySlug,
  getProjectHref,
  type PortfolioProject,
} from "@/data/projects";
import { portfolioV1CaseStudyMetadata } from "@/data/portfolio-v1-case-study";
import { siteConfig } from "@/data/site";
import { skifCaseStudyMetadata } from "@/data/skif-case-study";

type WorkProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getProjectMetadata(project: PortfolioProject) {
  if (project.slug === "asset-platform") {
    return assetPlatformCaseStudyMetadata;
  }

  if (project.slug === "neon-chaser") {
    return neonChaserCaseStudyMetadata;
  }

  if (project.slug === "skif-karate-canada") {
    return skifCaseStudyMetadata;
  }

  if (project.slug === "portfolio-v1") {
    return portfolioV1CaseStudyMetadata;
  }

  return {
    title: `${project.title} | Anzhelika Kostyuk`,
    description: project.preview.summary,
  } as const;
}

function buildProjectMetadata(project: PortfolioProject): Metadata {
  const projectMetadata = getProjectMetadata(project);
  const path = getProjectHref(project);

  return {
    title: projectMetadata.title,
    description: projectMetadata.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: projectMetadata.title,
      description: projectMetadata.description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [
        {
          url: siteConfig.ogImagePath,
          width: 1200,
          height: 630,
          alt: "Anzhelika Kostyuk software developer portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: projectMetadata.title,
      description: projectMetadata.description,
      images: [siteConfig.ogImagePath],
    },
  };
}

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return buildProjectMetadata(project);
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const caseStudy =
    project.slug === "asset-platform" ? (
      <AssetPlatformCaseStudy project={project} />
    ) : project.slug === "neon-chaser" ? (
      <NeonChaserCaseStudy project={project} />
    ) : project.slug === "skif-karate-canada" ? (
      <SkifKarateCaseStudy project={project} />
    ) : project.slug === "portfolio-v1" ? (
      <PortfolioV1CaseStudy project={project} />
    ) : (
      <CaseStudyShell project={project} />
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SamePageSmoothScroll />
      {caseStudy}
      <Footer />
    </div>
  );
}
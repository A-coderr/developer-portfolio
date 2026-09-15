export interface ProjectImageMedia {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  loading?: "eager" | "lazy";
  fit?: "cover" | "contain";
  position?: string;
}

export interface ProjectTechnicalMedia {
  kind: "technical";
}

export type ProjectMedia = ProjectImageMedia | ProjectTechnicalMedia;

export interface ProjectPreview {
  label: string;
  summary: string;
  role?: string;
  technologies: readonly string[];
  media?: ProjectMedia;
  ctaLabel: string;
}

export interface ProjectCaseStudyNotes {
  context?: readonly string[];
  systems?: readonly string[];
  technologies?: readonly string[];
}

export type ProjectEmphasis = "featured" | "standard" | "quiet";

export interface PortfolioProject {
  slug: string;
  title: string;
  emphasis: ProjectEmphasis;
  preview: ProjectPreview;
  caseStudyNotes?: ProjectCaseStudyNotes;
}

const teaserMediaSizes =
  "(min-width: 1280px) 580px, (min-width: 1024px) calc((100vw - 120px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)";

export const featuredProject: PortfolioProject = {
  slug: "neon-chaser",
  title: "Neon Chaser",
  emphasis: "standard",
  preview: {
    label: "GAME DEVELOPMENT",
    summary:
      "A neon-noir drift racing game built around physics-based driving, high-speed chases, and vehicle combat.",
    technologies: ["Unity", "C#"],
    ctaLabel: "Learn more",
    media: {
      kind: "image",
      src: "/images/projects/neon-chaser.webp",
      alt: "Screenshot of the Neon Chaser Unity racing game.",
      width: 1435,
      height: 804,
      sizes: teaserMediaSizes,
      loading: "lazy",
      fit: "cover",
      position: "center",
    },
  },
  caseStudyNotes: {
    context: ["Two-developer project team"],
    systems: [
      "Power-up architecture",
      "Nitro",
      "Oil Spill",
      "Machine Gun Turret",
      "Rocket system",
      "Save/load functionality",
      "Level development",
      "Vehicle balancing and tuning",
      "Gameplay QA",
    ],
    technologies: ["Unity", "C#"],
  },
};

export const selectedProjects: readonly PortfolioProject[] = [
  {
    slug: "asset-platform",
    title: "Digital Asset Management Platform",
    emphasis: "standard",
    preview: {
      label: "SOFTWARE ENGINEERING",
      summary:
        "A browser-based home for 3D assets, bringing cloud storage, migration, and interactive model previews into one workflow.",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Python",
        "Three.js",
        "Azure",
      ],
      ctaLabel: "Learn more",
      media: {
        kind: "image",
        src: "/images/projects/asset-management.webp",
        alt: "Sanitized concept illustration representing a browser-based digital asset management platform with 3D asset previewing",
        width: 1672,
        height: 941,
        sizes: teaserMediaSizes,
        loading: "lazy",
        fit: "cover",
        position: "center",
      },
    },
    caseStudyNotes: {
      context: [
        "Approximately 40 internal users",
        "Five-developer project team",
        "Technical leadership responsibilities",
        "Interactive previews for formats including 3D assets",
      ],
      technologies: [
        "React",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Azure",
        "Three.js",
        "Python",
      ],
    },
  },
  {
    slug: "skif-karate-canada",
    title: "SKIF Karate Canada",
    emphasis: "standard",
    preview: {
      label: "WEB DEVELOPMENT",
      summary:
        "A modern website for SKIF Karate Canada, bringing training schedules, instructors, events, pricing, and national karate updates into one focused experience.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      ctaLabel: "Learn more",
      media: {
        kind: "image",
        src: "/images/projects/skif-karate-canada.webp",
        alt: "Screenshot of the SKIF Karate Canada production website.",
        width: 1621,
        height: 1067,
        sizes: teaserMediaSizes,
        loading: "lazy",
        fit: "cover",
        position: "center",
      },
    },
    caseStudyNotes: {
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
  },
];

export const earlierWorkProjects: readonly PortfolioProject[] = [
  {
    slug: "portfolio-v1",
    title: "Portfolio Website V1",
    emphasis: "standard",
    preview: {
      label: "WEB DEVELOPMENT",
      summary:
        "Before this portfolio, I built one where skills lived inside an interactive 3D world—an early exploration of React and browser-based 3D.",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "Three.js",
        "HTML",
        "CSS",
      ],
      ctaLabel: "Learn more",
      media: {
        kind: "image",
        src: "/images/projects/portfolio-v1.webp",
        alt: "Screenshot of Anzhelika Kostyuk's previous interactive portfolio.",
        width: 1413,
        height: 856,
        sizes: teaserMediaSizes,
        loading: "lazy",
        fit: "cover",
        position: "center",
      },
    },
  },
];

export const homepageProjects: readonly PortfolioProject[] = [
  featuredProject,
  ...selectedProjects,
  ...earlierWorkProjects,
];

export const allProjects = homepageProjects;

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}

export function getProjectHref(project: Pick<PortfolioProject, "slug">) {
  return `/work/${project.slug}`;
}

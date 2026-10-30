import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProjectMedia as ProjectMediaType } from "@/data/projects";

interface ProjectMediaProps {
  media: ProjectMediaType;
  variant?: "teaser" | "caseStudy";
}

const caseStudyImageSizes =
  "(min-width: 1280px) 1184px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)";

const variantClassName = {
  teaser: "project-media--teaser",
  caseStudy: "project-media--case-study",
};

export function ProjectMedia({ media, variant = "teaser" }: ProjectMediaProps) {
  const className = [
    "project-media rounded-lg bg-background",
    variantClassName[variant],
    media.kind === "technical" ? "project-media--technical" : "",
  ].join(" ");

  if (media.kind === "image") {
    const isCaseStudyMedia = variant === "caseStudy";
    const frameStyle: CSSProperties | undefined = isCaseStudyMedia
      ? { aspectRatio: `${media.width} / ${media.height}` }
      : undefined;

    return (
      <div className={className} style={frameStyle}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={isCaseStudyMedia ? caseStudyImageSizes : media.sizes}
          loading={isCaseStudyMedia ? undefined : (media.loading ?? "lazy")}
          preload={isCaseStudyMedia ? true : undefined}
          className="project-media__image"
          style={{
            objectFit: isCaseStudyMedia ? "contain" : (media.fit ?? "cover"),
            objectPosition: media.position ?? "center",
          }}
        />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <svg
        className="project-media__technical-visual"
        viewBox="0 0 560 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.28" stroke="var(--control-border)" strokeWidth="1">
          <path d="M72 196H486" />
          <path d="M118 154H440" />
          <path d="M160 112H398" />
          <path d="M138 218L236 68" />
          <path d="M284 218L382 68" />
          <path d="M408 218L504 68" />
        </g>
        <path
          d="M118 174L268 96L426 152L276 226L118 174Z"
          fill="var(--surface)"
          stroke="var(--control-border)"
          strokeWidth="1.5"
        />
        <path
          d="M190 148L268 108L350 136L274 174L190 148Z"
          fill="var(--background)"
          stroke="var(--muted)"
          strokeOpacity="0.34"
          strokeWidth="1.2"
        />
        <path
          d="M190 148V178L276 226M350 136V178L276 226M274 174V226"
          stroke="var(--muted)"
          strokeOpacity="0.2"
          strokeWidth="1.2"
        />
        <g fill="var(--surface)" stroke="var(--control-border)" strokeWidth="1.5">
          <rect x="202" y="124" width="52" height="30" rx="5" />
          <rect x="294" y="142" width="56" height="32" rx="5" />
          <circle cx="268" cy="96" r="8" />
          <circle cx="426" cy="152" r="7" />
        </g>
        <path
          d="M252 140C288 120 328 124 366 148"
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="374" cy="154" r="5" fill="var(--accent)" />
      </svg>
    </div>
  );
}

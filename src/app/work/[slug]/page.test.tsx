import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  assetPlatformCaseStudyMetadata,
  assetPlatformContextFacts,
  assetPlatformHeroLabels,
  previewerCapabilities,
} from "@/data/asset-platform-case-study";
import {
  neonChaserCaseStudyMetadata,
  neonChaserHeroLabels,
  neonChaserLinks,
  neonChaserPowerUps,
  neonChaserSnapshot,
  persistentStateItems,
  powerUpArchitectureFacts,
  runtimeStateItems,
  saveLoadRecoverySteps,
  saveWriteSteps,
} from "@/data/neon-chaser-case-study";
import {
  portfolioV1CaseStudyLinks,
  portfolioV1CaseStudyMetadata,
  portfolioV1Comparison,
  portfolioV1HeroLabels,
} from "@/data/portfolio-v1-case-study";
import { allProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import {
  skifCaseStudyLinks,
  skifCaseStudyMetadata,
  skifFocusAreas,
  skifHeroLabels,
  skifLifecycleSteps,
} from "@/data/skif-case-study";
import WorkProjectPage, { generateMetadata, generateStaticParams } from "./page";

async function renderCaseStudy(slug: string) {
  const page = await WorkProjectPage({
    params: Promise.resolve({ slug }),
  });

  render(page);
}


describe("WorkProjectPage", () => {
  it("generates static params for the supported project routes", () => {
    expect(generateStaticParams()).toEqual(
      allProjects.map((project) => ({ slug: project.slug })),
    );
  });

  it("renders the Neon Chaser case study with public actions and snapshot metadata", async () => {
    await renderCaseStudy("neon-chaser");

    expect(
      screen.getByRole("heading", { level: 1, name: "Neon Chaser" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Screenshot of the Neon Chaser Unity racing game.",
      }),
    ).toBeInTheDocument();

    for (const steamLink of screen.getAllByRole("link", {
      name: /View on Steam/i,
    })) {
      expect(steamLink).toHaveAttribute("href", neonChaserLinks.steam);
      expect(steamLink).toHaveAttribute("target", "_blank");
      expect(steamLink).toHaveAttribute("rel", "noopener noreferrer");
    }

    for (const trailerLink of screen.getAllByRole("link", {
      name: /Watch Trailer/i,
    })) {
      expect(trailerLink).toHaveAttribute("href", "#trailer");
    }

    const trailerSection = screen.getByRole("region", {
      name: "See Neon Chaser in motion",
    });
    expect(trailerSection).toHaveAttribute("id", "trailer");

    const technicalLabels = screen.getByRole("list", {
      name: "Technical labels",
    });

    for (const label of neonChaserHeroLabels) {
      expect(within(technicalLabels).getByText(label)).toBeInTheDocument();
    }

    for (const item of neonChaserSnapshot) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getAllByText(item.value)[0]).toBeInTheDocument();
    }
  });

  it("renders the requested Neon Chaser engineering story", async () => {
    await renderCaseStudy("neon-chaser");

    for (const powerUp of neonChaserPowerUps) {
      expect(
        screen.getByRole("heading", { level: 3, name: powerUp.name }),
      ).toBeInTheDocument();
      expect(screen.getByText(powerUp.category)).toBeInTheDocument();
      expect(screen.getByText(powerUp.description)).toBeInTheDocument();
    }

    for (const heading of [
      "The Game",
      "See Neon Chaser in motion",
      "My Contribution",
      "Five Power-Ups, One System",
      "Five abilities, one gameplay architecture",
      "Persist the progression, not the simulation",
      "A save system designed to fail safely",
      "Where the persistence system can evolve next",
      "See Neon Chaser in action",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }

    for (const fact of powerUpArchitectureFacts) {
      expect(screen.getByText(fact)).toBeInTheDocument();
    }

    for (const item of [
      ...persistentStateItems,
      ...runtimeStateItems,
      ...saveWriteSteps,
      ...saveLoadRecoverySteps,
    ]) {
      expect(screen.getAllByText(item)[0]).toBeInTheDocument();
    }
  });

  it("renders the SKIF Karate Canada case study with the updated web-development context", async () => {
    await renderCaseStudy("skif-karate-canada");

    expect(screen.getByText("WEB DEVELOPMENT")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "SKIF Karate Canada" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A production website that brings schedules, instructors, competition updates, and essential dojo information into one clear, maintainable digital home.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Screenshot of the SKIF Karate Canada production website.",
      }),
    ).toBeInTheDocument();

    const liveSiteLink = screen.getByRole("link", { name: /Visit Live Site/i });

    expect(liveSiteLink).toHaveAttribute("href", skifCaseStudyLinks.liveSite);
    expect(liveSiteLink).toHaveAttribute("target", "_blank");
    expect(liveSiteLink).toHaveAttribute("rel", "noopener noreferrer");

    const technicalLabels = screen.getByRole("list", {
      name: "Technical labels",
    });

    for (const label of skifHeroLabels) {
      expect(within(technicalLabels).getByText(label)).toBeInTheDocument();
    }
  });

  it("renders the compact SKIF information architecture and production ownership sections", async () => {
    await renderCaseStudy("skif-karate-canada");

    for (const heading of [
      "Making a content-heavy organization easy to navigate",
      "Built to keep changing",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }

    expect(
      screen.queryByRole("heading", { level: 2, name: "See the live site" }),
    ).not.toBeInTheDocument();

    for (const area of skifFocusAreas) {
      expect(screen.getByText(area.label)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: area.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(area.description)).toBeInTheDocument();
    }

    expect(
      screen.getByText(/The site was designed as an ongoing production property/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/My role spans the full website lifecycle/i),
    ).toBeInTheDocument();

    const lifecycle = screen.getByRole("list", {
      name: "Website production lifecycle",
    });

    for (const step of skifLifecycleSteps) {
      expect(within(lifecycle).getByText(step)).toBeInTheDocument();
    }
  });

  it("renders the Portfolio V1 case study with public links and current technical labels", async () => {
    await renderCaseStudy("portfolio-v1");

    expect(
      screen.getByRole("heading", { level: 1, name: "Portfolio V1" }),
    ).toBeInTheDocument();
    expect(screen.getByText("WEB DEVELOPMENT")).toBeInTheDocument();
    expect(
      screen.getByText(
        "An interactive developer portfolio that explored how React and browser-based 3D could turn a traditional personal site into a more playful technical experience.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Screenshot of Anzhelika Kostyuk's previous interactive portfolio.",
      }),
    ).toBeInTheDocument();

    const liveSiteLink = screen.getByRole("link", {
      name: /Visit Live Site/i,
    });

    expect(liveSiteLink).toHaveAttribute(
      "href",
      portfolioV1CaseStudyLinks.liveSite,
    );
    expect(liveSiteLink).toHaveAttribute("target", "_blank");
    expect(liveSiteLink).toHaveAttribute("rel", "noopener noreferrer");

    const sourceLink = screen.getByRole("link", { name: /View Source/i });

    expect(sourceLink).toHaveAttribute(
      "href",
      portfolioV1CaseStudyLinks.source,
    );
    expect(sourceLink).toHaveAttribute("target", "_blank");
    expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(sourceLink).not.toHaveTextContent("↗");

    const sourceIcon = sourceLink.querySelector("svg");

    expect(sourceIcon).not.toBeNull();
    expect(sourceIcon).toHaveAttribute("aria-hidden", "true");
    expect(sourceIcon).toHaveAttribute("focusable", "false");

    const technicalLabels = screen.getByRole("list", {
      name: "Technical labels",
    });

    for (const label of portfolioV1HeroLabels) {
      expect(within(technicalLabels).getByText(label)).toBeInTheDocument();
    }
  });

  it("renders the Portfolio V1 evolution story", async () => {
    await renderCaseStudy("portfolio-v1");

    for (const heading of [
      "Exploring beyond a conventional portfolio",
      "Turning a skills list into a 3D interface",
      "Mixing application UI with a 3D scene",
      "What changed between V1 and V2",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }

    for (const comparison of [
      portfolioV1Comparison.v1,
      portfolioV1Comparison.v2,
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: comparison.title }),
      ).toBeInTheDocument();
      for (const item of comparison.items) {
        expect(screen.getByText(item)).toBeInTheDocument();
      }
    }

    expect(
      screen.getByText(/Portfolio V1 taught me how much interactive 3D can add/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: "Skills sphere rendering flow" }),
    ).not.toBeInTheDocument();
  });

  it("loads the YouTube trailer iframe only after user interaction", async () => {
    await renderCaseStudy("neon-chaser");

    expect(screen.queryByTitle("Neon Chaser trailer")).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Play Neon Chaser trailer" }),
    );

    expect(screen.getByTitle("Neon Chaser trailer")).toHaveAttribute(
      "src",
      neonChaserLinks.trailerEmbed,
    );
  });

  it("renders project pages without the global header and keeps a back link to projects", async () => {
    await renderCaseStudy("portfolio-v1");

    expect(
      screen.queryByRole("navigation", { name: "Primary navigation" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to projects/i }),
    ).toHaveAttribute("href", "/#projects");
  });

  it("smoothly scrolls to case-study anchors without affecting the projects back link", async () => {
    const scrollIntoView = vi.fn();

    window.history.pushState(null, "", "/work/neon-chaser");
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    await renderCaseStudy("neon-chaser");

    fireEvent.click(screen.getAllByRole("link", { name: /Watch Trailer/i })[0]);

    expect(window.location.hash).toBe("#trailer");
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(
      screen.getByRole("link", { name: /Back to projects/i }),
    ).toHaveAttribute("href", "/#projects");
  });

  it("renders the Digital Asset Management Platform case study with sanitized context", async () => {
    await renderCaseStudy("asset-platform");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Digital Asset Management Platform",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("SOFTWARE ENGINEERING"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Sanitized concept visual/i)).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Sanitized concept illustration representing a browser-based digital asset management platform with 3D asset previewing",
      }),
    ).toHaveAttribute("src", expect.stringContaining("asset-management.webp"));
    expect(screen.getByText("~40 Internal Users")).toBeInTheDocument();

    const technicalLabels = screen.getByRole("list", {
      name: "Technical labels",
    });

    for (const label of assetPlatformHeroLabels) {
      expect(within(technicalLabels).getByText(label)).toBeInTheDocument();
    }

    for (const fact of assetPlatformContextFacts) {
      expect(screen.getByText(fact.label)).toBeInTheDocument();
      expect(screen.getByText(fact.value)).toBeInTheDocument();
    }

    for (const heading of [
      "A shared home for production assets",
      "Previewing 3D assets directly in the browser",
      "What this project demonstrates",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }

    expect(
      screen.getByText(/Three\.js-based asset previewer/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/migration tooling/i)).toBeInTheDocument();
    expect(screen.getByText(/Public demo unavailable/i)).toBeInTheDocument();
    expect(screen.queryByText("Full case study coming next")).not.toBeInTheDocument();

    for (const backLink of screen.getAllByRole("link", {
      name: /Back to projects/i,
    })) {
      expect(backLink).toHaveAttribute("href", "/#projects");
    }
  });

  it("renders asset platform preview capabilities without exposing a public demo", async () => {
    await renderCaseStudy("asset-platform");

    expect(screen.getByText("Previewer capabilities")).toBeInTheDocument();

    for (const capability of previewerCapabilities) {
      expect(screen.getByText(capability)).toBeInTheDocument();
    }

    expect(
      screen.queryByRole("link", { name: /public demo/i }),
    ).not.toBeInTheDocument();
  });

  it("generates route metadata from the appropriate project details", async () => {
    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "neon-chaser" }) }),
    ).resolves.toMatchObject({
      title: neonChaserCaseStudyMetadata.title,
      description: neonChaserCaseStudyMetadata.description,
      alternates: { canonical: "/work/neon-chaser" },
      openGraph: {
        title: neonChaserCaseStudyMetadata.title,
        description: neonChaserCaseStudyMetadata.description,
        url: "/work/neon-chaser",
        siteName: siteConfig.name,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: neonChaserCaseStudyMetadata.title,
        description: neonChaserCaseStudyMetadata.description,
      },
    });

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "skif-karate-canada" }) }),
    ).resolves.toMatchObject({
      title: skifCaseStudyMetadata.title,
      description: skifCaseStudyMetadata.description,
      alternates: { canonical: "/work/skif-karate-canada" },
    });

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "portfolio-v1" }) }),
    ).resolves.toMatchObject({
      title: portfolioV1CaseStudyMetadata.title,
      description: portfolioV1CaseStudyMetadata.description,
      alternates: { canonical: "/work/portfolio-v1" },
    });

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "asset-platform" }) }),
    ).resolves.toMatchObject({
      title: assetPlatformCaseStudyMetadata.title,
      description: assetPlatformCaseStudyMetadata.description,
      alternates: { canonical: "/work/asset-platform" },
    });
  });

  it("throws the Next.js not-found response for unknown slugs", async () => {
    await expect(
      WorkProjectPage({ params: Promise.resolve({ slug: "unknown-project" }) }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});

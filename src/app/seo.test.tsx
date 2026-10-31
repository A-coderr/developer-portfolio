import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";
import robots from "./robots";
import sitemap from "./sitemap";
import { allProjects, getProjectHref } from "@/data/projects";
import { absoluteUrl, siteConfig } from "@/data/site";

describe("production SEO routes", () => {
  it("balances professional expertise and Anzhelika Lab in descriptive metadata", () => {
    expect(siteConfig.title).toBe(
      "Anzhelika Kostyuk | Software Developer & Creative Technologist",
    );
    expect(siteConfig.description).toBe(
      "Anzhelika Kostyuk develops web applications, interactive 3D, and Unity/C# games. Explore her projects and experiments through Anzhelika Lab.",
    );
    expect(siteConfig.author).toBe("Anzhelika Kostyuk");
    expect(siteConfig.ogImagePath).toBe("/opengraph-image");
  });

  it("generates an indexable robots policy with the sitemap URL", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: absoluteUrl("/sitemap.xml"),
    });
  });

  it("includes the homepage and all project routes in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl("/"));
    for (const project of allProjects) {
      expect(urls).toContain(absoluteUrl(getProjectHref(project)));
    }
  });

  it("centralizes the production site URL for canonical metadata", () => {
    expect(siteConfig.url).toMatch(/^https?:\/\//);
    expect(absoluteUrl("/work/neon-chaser")).toBe(
      new URL("/work/neon-chaser", siteConfig.url).toString(),
    );
  });
});

describe("NotFound", () => {
  it("renders an intentional 404 page with recovery links", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "This page is not part of the portfolio.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
  });
});

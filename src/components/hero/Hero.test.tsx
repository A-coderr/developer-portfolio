import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the main positioning heading", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "I build software, games, and things worth exploring.",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("region", {
        name: "I build software, games, and things worth exploring.",
      }),
    ).toBeInTheDocument();
  });

  it("introduces the creator identity alongside the developer and her expertise", () => {
    render(<Hero />);

    expect(screen.getByText("Anzhelika Kostyuk")).toBeInTheDocument();
    expect(
      screen.getByText("SOFTWARE DEVELOPER · CREATIVE TECHNOLOGIST"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I develop web applications, interactive 3D experiences, and Unity/C# game systems. Through Anzhelika Lab, I share what I'm building, exploring, and learning along the way.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Build. Play. Experiment.")).toBeInTheDocument();
  });

  it("links the primary call to action to the projects section", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      "#projects",
    );
  });

  it("links to GitHub safely in a new tab", () => {
    render(<Hero />);

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    const rel = githubLink.getAttribute("rel");

    expect(githubLink).toHaveAttribute("href", "https://github.com/A-coderr");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });

  it("renders the stylized avatar image", () => {
    render(<Hero />);

    expect(
      screen.getByRole("img", {
        name: "Stylized 3D avatar of Anzhelika Kostyuk surrounded by software development technologies",
      }),
    ).toBeInTheDocument();
  });
});

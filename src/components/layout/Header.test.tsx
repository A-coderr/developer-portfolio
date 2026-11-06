import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

const resumeHref = "/resume/resume_anzhelika_kostyuk.pdf";

describe("Header", () => {
  it("links the Anzhelika Lab wordmark to the homepage", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link", { name: "Anzhelika Lab home" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(
      within(homeLink).getByRole("img", { name: "Anzhelika Lab" }),
    ).toHaveAttribute("src", expect.stringContaining("brand-icon"));
    expect(screen.queryByText("AK.")).not.toBeInTheDocument();
  });

  it("exposes the main navigation with accessible labels and section links", () => {
    render(<Header />);

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });

    expect(navigation).toBeInTheDocument();
    expect(within(navigation).getAllByRole("link")).toHaveLength(4);
    expect(
      within(navigation).getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "/#projects");
    expect(
      within(navigation).getByRole("link", { name: "Experience" }),
    ).toHaveAttribute("href", "/#experience");
    expect(
      within(navigation).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "/#about");
    expect(
      within(navigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/#contact");
    expect(
      within(navigation).queryByRole("link", { name: /resume/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the resume download as a separate link", () => {
    render(<Header />);

    const resumeLinks = screen.getAllByRole("link", {
      name: "Download Resume",
    });

    expect(resumeLinks).toHaveLength(2);
    for (const resumeLink of resumeLinks) {
      expect(resumeLink).toHaveAttribute("href", resumeHref);
      expect(resumeLink).toHaveAttribute("download");
    }
  });

  it("keeps mobile navigation links pointed at their sections", () => {
    render(<Header />);

    const navigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });

    expect(
      within(navigation).getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "/#projects");
    expect(
      within(navigation).getByRole("link", { name: "Experience" }),
    ).toHaveAttribute("href", "/#experience");
    expect(
      within(navigation).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "/#about");
    expect(
      within(navigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/#contact");
    expect(
      within(navigation).getByRole("link", { name: "Download Resume" }),
    ).toHaveAttribute("href", resumeHref);
  });
});

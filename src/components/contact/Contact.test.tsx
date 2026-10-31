import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { contactLinks } from "@/data/contact";
import { describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

const primaryStatement =
  "Have a software role, project, or collaboration in mind?";

const availabilityCopy =
  "I'm open to full-time software-development opportunities across web applications, interactive 3D, and game development.";

function mockClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);

  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });

  return writeText;
}

describe("Contact", () => {
  it("renders the contact section with the expected anchor target", () => {
    render(<Contact />);

    const section = screen.getByRole("region", { name: primaryStatement });

    expect(section).toHaveAttribute("id", "contact");
    expect(within(section).getByText("CONTACT")).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: primaryStatement,
      }),
    ).toBeInTheDocument();
  });

  it("welcomes full-time roles and selected collaborations without AI positioning", () => {
    render(<Contact />);

    expect(screen.getByText(availabilityCopy)).toBeInTheDocument();
    expect(
      screen.getByText(
        "I also welcome selected technology and creative collaborations that connect with what I'm building and exploring through Anzhelika Lab.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/AI Engineer/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Machine Learning Engineer/i),
    ).not.toBeInTheDocument();
  });

  it("opens a preferred-email-handler draft and shows manual fallbacks", () => {
    render(<Contact />);

    const getInTouchLink = screen.getByRole("link", { name: "Get in touch" });
    const href = getInTouchLink.getAttribute("href");
    const draftUrl = new URL(href ?? "");

    expect(href).toBe(contactLinks.email.href);
    expect(draftUrl.protocol).toBe("mailto:");
    expect(draftUrl.pathname).toBe("kostyukanzhelika@gmail.com");
    expect(draftUrl.searchParams.get("subject")).toBe("Portfolio inquiry");
    expect(draftUrl.searchParams.get("body")).toContain(
      "I came across your portfolio and would like to connect about a software role, project, or collaboration.",
    );
    expect(getInTouchLink).not.toHaveAttribute("target");
    expect(getInTouchLink).not.toHaveAttribute("rel");
    expect(screen.getByText("kostyukanzhelika@gmail.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copy email" }),
    ).toBeInTheDocument();
  });

  it("shows a helper message when the email app handoff is attempted", async () => {
    render(<Contact />);

    const getInTouchLink = screen.getByRole("link", { name: "Get in touch" });

    getInTouchLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(getInTouchLink);

    expect(
      await screen.findByText(
        "If your email app did not open, use Copy email instead.",
      ),
    ).toBeInTheDocument();
  });

  it("copies the visible email address only when Copy email is clicked", async () => {
    const writeText = mockClipboard();

    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("kostyukanzhelika@gmail.com");
    });
    expect(await screen.findByText("Email copied to clipboard.")).toBeInTheDocument();
  });

  it("renders icon-only social links with safe external behavior", () => {
    render(<Contact />);

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    const linkedinLink = screen.getByRole("link", { name: "LinkedIn" });

    expect(githubLink).toHaveAttribute("href", "https://github.com/A-coderr");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(githubLink).not.toHaveTextContent("GitHub");

    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/anzhelikakostyuk",
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedinLink.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(linkedinLink).not.toHaveTextContent("LinkedIn");
  });
});

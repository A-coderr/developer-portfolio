import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders quiet site footer metadata", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(
      within(footer).getByRole("img", { name: "Anzhelika Lab" }),
    ).toHaveAttribute("src", expect.stringContaining("brand-icon"));
    expect(within(footer).queryByText("AK.")).not.toBeInTheDocument();
    expect(
      within(footer).getByText("© 2026 Anzhelika Kostyuk"),
    ).toBeInTheDocument();
    expect(within(footer).getByText("Kitchener, Canada")).toBeInTheDocument();
  });
});

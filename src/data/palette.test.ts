import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { artworkColors, brandPalette } from "./palette";

type Tokens = Record<string, string>;
const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");
const rules = [...css.matchAll(/([^{}]+)\{([^{}]+)\}/g)].map(([, selector, body]) => ({
  selector: selector.trim(),
  tokens: Object.fromEntries(
    [...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value]),
  ),
}));

function contextTokens(context: string): Tokens {
  return Object.assign(
    {},
    ...rules
      .filter(({ selector }) => selector.includes(":root") || selector.includes(`[data-theme="${context}"]`))
      .map(({ tokens }) => tokens),
  );
}

// Resolve the actual CSS definitions, including sRGB mixtures, so contrast
// regressions fail even when only a supporting neutral or context changes.
function rgb(value: string, tokens: Tokens): number[] {
  const variable = value.match(/^var\((--[\w-]+)\)$/);
  if (variable) return rgb(tokens[variable[1]], tokens);
  const mix = value.match(/^color-mix\(in srgb, (var\(--[\w-]+\)) (\d+)%, (var\(--[\w-]+\))\)$/);
  if (mix) {
    const first = rgb(mix[1], tokens);
    const second = rgb(mix[3], tokens);
    const weight = Number(mix[2]) / 100;
    return first.map((channel, index) => channel * weight + second[index] * (1 - weight));
  }
  if (!/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`Unsupported colour: ${value}`);
  return [1, 3, 5].map((index) => parseInt(value.slice(index, index + 2), 16) / 255);
}

function luminance(value: string, tokens: Tokens) {
  const linear = rgb(value, tokens).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(first: string, second: string, tokens: Tokens) {
  const a = luminance(first, tokens);
  const b = luminance(second, tokens);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe("Electric Studio colour accessibility", () => {
  it("keeps generated artwork aligned with all five official CSS colours", () => {
    const tokens = contextTokens("dark");
    for (const [name, value] of Object.entries(brandPalette)) {
      expect(tokens[`--brand-${name}`]).toBe(value);
    }
    for (const foreground of [artworkColors.foreground, artworkColors.accent, artworkColors.detail]) {
      expect(contrast(foreground, artworkColors.background, tokens)).toBeGreaterThanOrEqual(4.5);
    }
  });

  for (const context of ["dark", "light", "feature"]) {
    describe(context, () => {
      const tokens = contextTokens(context);
      for (const background of ["background", "surface", "accent-subtle"]) {
        for (const foreground of ["foreground", "muted", "accent", "positive"]) {
          it(`${foreground} text on ${background} meets AA`, () => {
            expect(contrast(tokens[`--${foreground}`], tokens[`--${background}`], tokens)).toBeGreaterThanOrEqual(4.5);
          });
        }
      }
      for (const background of ["action", "action-hover"]) {
        it(`button text on ${background} meets AA`, () => {
          expect(contrast(tokens["--on-action"], tokens[`--${background}`], tokens)).toBeGreaterThanOrEqual(4.5);
        });
      }
      for (const indicator of ["focus", "control-border"]) {
        for (const background of ["background", "surface"]) {
          it(`${indicator} on ${background} meets non-text contrast`, () => {
            expect(contrast(tokens[`--${indicator}`], tokens[`--${background}`], tokens)).toBeGreaterThanOrEqual(3);
          });
        }
      }
    });
  }
});

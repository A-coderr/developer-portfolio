// ImageResponse renders outside the page CSS cascade. The palette test keeps
// these literal colours aligned with the CSS brand tokens.
export const brandPalette = {
  ink: "#171B2B",
  ivory: "#F6F2EA",
  lavender: "#8D9BFF",
  coral: "#FF987D",
  mint: "#BEE5C0",
} as const;

export const artworkColors = {
  background: brandPalette.ink,
  foreground: brandPalette.ivory,
  accent: brandPalette.lavender,
  detail: brandPalette.mint,
} as const;

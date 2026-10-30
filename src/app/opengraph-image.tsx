import { artworkColors } from "@/data/palette";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Anzhelika Kostyuk software developer portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: artworkColors.background,
          color: artworkColors.foreground,
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              color: artworkColors.accent,
              fontSize: 24,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Software Developer
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Anzhelika Kostyuk
          </div>
          <div style={{ color: artworkColors.foreground, fontSize: 34, lineHeight: 1.3 }}>
            Web applications, interactive 3D, and Unity/C# game systems.
          </div>
          <div style={{ color: artworkColors.detail, fontSize: 22 }}>{siteConfig.url}</div>
        </div>
      </div>
    ),
    size,
  );
}
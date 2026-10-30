import { artworkColors } from "@/data/palette";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: artworkColors.background,
          color: artworkColors.accent,
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 52,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        AK.
      </div>
    ),
    size,
  );
}
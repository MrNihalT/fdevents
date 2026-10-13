import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iPhone / iPad.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6e2432",
          color: "#f4ebdb",
          fontSize: 84,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        FD
      </div>
    ),
    size,
  );
}

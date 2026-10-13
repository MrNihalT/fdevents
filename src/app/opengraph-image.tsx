import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — Event Management in Wayanad, Kerala`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social-share preview card (WhatsApp, Facebook, Google, etc.)
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#43141e",
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #e4b860",
            background: "radial-gradient(ellipse at 30% 0%, #8a3443 0%, #43141e 75%)",
            color: "#f4ebdb",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 30, letterSpacing: 10, color: "#e4b860", textTransform: "uppercase" }}>
            Wayanad · Kerala
          </div>
          <div style={{ fontSize: 120, fontWeight: 700, marginTop: 10, letterSpacing: 6 }}>{site.name.toUpperCase()}</div>
          <div style={{ width: 360, height: 2, background: "#e4b860", margin: "20px 0" }} />
          <div style={{ fontSize: 34, maxWidth: 900, color: "#eadcc1" }}>
            Weddings · Catering · Stage & Décor · Mehandi · Music · Vehicles
          </div>
          <div style={{ fontSize: 30, marginTop: 30, color: "#e4b860" }}>{`WhatsApp ${site.phone}`}</div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Velkina — a two-person studio in Istanbul";

// Branded OG card so links unfurl with the identity, not a bare text card.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FAF7F2",
          backgroundImage:
            "radial-gradient(900px 500px at 80% -10%, #FFE3DC 0%, transparent 60%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#14110F", letterSpacing: -1 }}>
          Velkina
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 800, color: "#14110F", letterSpacing: -4, lineHeight: 1 }}>
            We are Velkina.
          </div>
          <div style={{ fontSize: 36, color: "#5a534c", maxWidth: 900, lineHeight: 1.3 }}>
            A two-person studio in Istanbul. We build software, websites, and stores — one project at a time.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#14110F" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#FF5436", display: "flex" }} />
          Istanbul · velkina.com
        </div>
      </div>
    ),
    { ...size }
  );
}

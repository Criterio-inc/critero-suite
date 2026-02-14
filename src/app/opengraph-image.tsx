import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Critero Suite — Upphandling, Verktyg & Mognadsmätning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            marginBottom: 40,
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
          }}
        >
          <span style={{ fontSize: 60, fontWeight: 700, color: "#fff", letterSpacing: -2 }}>
            C
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: -2,
            }}
          >
            Critero
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: -1,
            }}
          >
            Suite
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
            marginTop: 16,
            fontWeight: 400,
            letterSpacing: 2,
          }}
        >
          Upphandling &middot; Verktyg &middot; Mognadsmätning
        </p>

        {/* Footer */}
        <p
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 16,
            color: "rgba(255,255,255,0.25)",
            fontWeight: 400,
          }}
        >
          criteroconsulting.se
        </p>
      </div>
    ),
    { ...size },
  );
}

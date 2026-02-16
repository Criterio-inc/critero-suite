import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "32px",
          border: "6px solid #f97316",
          position: "relative",
        }}
      >
        {/* Trend line chart */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: -10 }}
        >
          <polyline
            points="10,65 35,45 60,52 100,18"
            stroke="#f97316"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="10" cy="65" r="7" fill="#f97316" />
          <circle cx="35" cy="45" r="7" fill="#f97316" />
          <circle cx="60" cy="52" r="7" fill="#f97316" />
          <circle cx="100" cy="18" r="7" fill="#f97316" />
        </svg>
        {/* Text: Critero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1a1a2e",
              lineHeight: 1.1,
            }}
          >
            Critero
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#6b7280",
              lineHeight: 1.1,
            }}
          >
            Suite
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

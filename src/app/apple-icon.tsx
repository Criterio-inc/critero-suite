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
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          position: "relative",
        }}
      >
        {/* Hexagonal shield with gradient */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hex-gradient" x1="10" y1="10" x2="170" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
          </defs>
          <path d="M90 8L165 48V132L90 172L15 132V48L90 8Z" fill="url(#hex-gradient)" />
          <path d="M90 18L157 54V126L90 162L23 126V54L90 18Z" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          <path d="M113 58C107 52 100 49 92 49C72 49 56 65 56 90C56 115 72 131 92 131C100 131 107 128 113 122" stroke="white" strokeWidth="16" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

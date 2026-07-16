import { ImageResponse } from "next/og";
import { fr } from "@/shared/i18n/messages/fr";

export const alt = "Adama Komi — Software Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const techTags = [
  "Next.js",
  "Spring Boot",
  "NestJS",
  "TypeScript",
  "React Native",
];

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0b0d",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(16,185,129,0.32) 0%, rgba(16,185,129,0.10) 18%, rgba(10,11,13,0) 42%), repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, rgba(10,11,13,0) 1px, rgba(10,11,13,0) 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, rgba(10,11,13,0) 1px, rgba(10,11,13,0) 48px)",
          padding: 80,
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top status row: emerald dot + availability */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "#10b981",
              boxShadow: "0 0 14px 2px rgba(16,185,129,0.85)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#9ca3af",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {fr["common.available"]}
          </div>
        </div>

        {/* Big name */}
        <div
          style={{
            display: "flex",
            marginTop: 72,
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          Adama Komi
        </div>

        {/* Title — emerald accent */}
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 38,
            fontWeight: 500,
            color: "#34d399",
            letterSpacing: -0.5,
          }}
        >
          Software Engineer · Full-Stack Developer
        </div>

        {/* Subtle divider line — emerald fade */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            width: 220,
            height: 2,
            backgroundImage:
              "linear-gradient(90deg, #10b981 0%, rgba(16,185,129,0) 100%)",
          }}
        />

        {/* Tech badges — pill-shaped, bordered */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            marginTop: 32,
          }}
        >
          {techTags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 18,
                paddingRight: 18,
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.04)",
                fontSize: 18,
                color: "#e5e7eb",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom-left mono label */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 16,
            color: "#6b7280",
            letterSpacing: 1.5,
          }}
        >
          {"// portfolio"}
        </div>
      </div>
    ),
    { ...size }
  );
}

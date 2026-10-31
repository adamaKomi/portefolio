import { ImageResponse } from "next/og";
import { fr } from "@/shared/i18n/messages/fr";

export const alt = "Adama Komi — Ingénieur logiciel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4efe5",
          padding: 96,
          fontFamily: "serif",
          color: "#1b2540",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#d9502e", fontFamily: "sans-serif" }}>
          {fr["hero.role"]}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 112, letterSpacing: -3, lineHeight: 1 }}>
          Adama Komi
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            maxWidth: 820,
            fontSize: 34,
            lineHeight: 1.4,
            color: "#1b2540",
            fontFamily: "sans-serif",
          }}
        >
          {fr["hero.lead"]}
        </div>
        <div style={{ display: "flex", marginTop: 56, width: 96, height: 4, backgroundColor: "#d9502e" }} />
      </div>
    ),
    { ...size }
  );
}

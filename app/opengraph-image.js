import { ImageResponse } from "next/og";
import { advisor } from "./data/siteData";

export const runtime = "nodejs";

export const alt = "Umashankar Rai — Senior LIC Insurance Advisor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image.
 *
 * Self-contained on purpose — no external font fetch, no asset reads — so
 * `next build` works before the owner ships `/public/brand/og-cover.jpg`.
 * Satori (the engine behind ImageResponse) only supports flexbox + a CSS
 * subset; everything below stays within that subset.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #002C77 0%, #003a96 55%, #0a4bb5 100%)",
          color: "#FBF8F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#FF8B1F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#002C77",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            UR
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FFEEDD",
            }}
          >
            LIC Insurance Advisor
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {advisor.name}
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#E8EEF7",
              maxWidth: 880,
              lineHeight: 1.25,
            }}
          >
            Family-first LIC strategies, clear policy choices, and lifelong support.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#E8EEF7",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ color: "#FF8B1F", fontWeight: 700 }}>
              {advisor.yearsExperience}+ years
            </span>
            <span>Trusted across India</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            <span style={{ color: "#FF8B1F", fontWeight: 700 }}>EN · हिं</span>
            <span>umashankarrai.in</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

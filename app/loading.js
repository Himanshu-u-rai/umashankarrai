/**
 * Route-level loading skeleton.
 *
 * Mirrors the hero layout from `app/components/Hero.js` so that the page
 * reserves the same vertical space during hydration / streaming. This keeps
 * Cumulative Layout Shift (CLS) low on mobile, where the hero is the LCP
 * element. Uses CSS variables defined in `app/globals.css` (owned by Agent C)
 * with safe fallbacks so this file works even if tokens are missing.
 */
export default function Loading() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: "100dvh",
        padding: "calc(var(--header-h, 64px) + 16px) 16px 80px",
        background: "var(--paper, #FBF8F2)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <span className="skeleton skeleton-eyebrow" style={fallbackBlock(14, "40%")} />
      <span className="skeleton skeleton-headline" style={fallbackBlock(56, "90%")} />
      <span className="skeleton skeleton-subtitle" style={fallbackBlock(18, "80%")} />
      <span className="skeleton skeleton-subtitle" style={fallbackBlock(18, "65%")} />
      <div
        className="skeleton skeleton-portrait"
        style={{
          ...fallbackBlock(340, "100%"),
          marginTop: 12,
          borderRadius: "var(--radius-lg, 22px)",
        }}
      />
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <span
          className="skeleton skeleton-cta"
          style={{ ...fallbackBlock(48, "100%"), borderRadius: 999 }}
        />
        <span
          className="skeleton skeleton-cta"
          style={{ ...fallbackBlock(48, "100%"), borderRadius: 999 }}
        />
      </div>
    </div>
  );
}

function fallbackBlock(height, width) {
  return {
    display: "block",
    height,
    width,
    background:
      "linear-gradient(90deg, rgba(14,19,32,0.06) 0%, rgba(14,19,32,0.12) 50%, rgba(14,19,32,0.06) 100%)",
    backgroundSize: "200% 100%",
    borderRadius: 12,
    animation: "skeleton-shimmer 1.4s ease-in-out infinite",
  };
}

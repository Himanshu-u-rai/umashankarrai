/**
 * MetricCounter
 * -------------
 * Renders a proof metric without a count-up animation. These values are trust
 * cues, so showing the final number immediately avoids the fake-looking
 * "0+" flash on mobile and slow connections.
 */
export default function MetricCounter({ value, suffix = "", label }) {
  const display = Number.isFinite(value) ? value : "";

  return (
    <article className="metric-card">
      <span className="metric-value">
        {display}
        {suffix}
      </span>
      <span className="metric-label">{label}</span>
    </article>
  );
}

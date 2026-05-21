import { ShieldCheck } from "lucide-react";

// Wave 2 / P2.3 — small attribution chip surfacing the advisor's IRDA license.
// When the code is still a placeholder, render a softer "verification pending"
// state instead of leaking the literal XXXX placeholder.
export default function IRDABadge({ code, validity }) {
  const pending = !code || code.includes("XXXX");

  if (pending) {
    return (
      <span className="irda-badge irda-badge--pending">
        <ShieldCheck size={14} aria-hidden="true" />
        <span className="irda-badge-label">IRDA licensed</span>
      </span>
    );
  }

  return (
    <span className="irda-badge">
      <ShieldCheck size={14} aria-hidden="true" />
      <span className="irda-badge-label">IRDA</span>
      <span className="irda-badge-code">{code}</span>
      {validity ? <span className="irda-badge-validity">{validity}</span> : null}
    </span>
  );
}

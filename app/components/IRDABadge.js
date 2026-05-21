import Link from "next/link";
import { ShieldCheck } from "lucide-react";

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
    <Link href="/licence" className="irda-badge irda-badge--link">
      <ShieldCheck size={14} aria-hidden="true" />
      <span className="irda-badge-label">IRDA</span>
      <span className="irda-badge-code">{code}</span>
      {validity ? <span className="irda-badge-validity">{validity}</span> : null}
    </Link>
  );
}

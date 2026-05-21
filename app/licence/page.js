import Link from "next/link";
import { ShieldCheck, ArrowLeft, Building2, MapPin, FileText, Hash } from "lucide-react";
import { advisor } from "../data/siteData";

export const metadata = {
  title: "Licence & Credentials — Umashankar Rai",
  description:
    "Official IRDA licence and LIC agent credentials for Umashankar Rai, Senior LIC Insurance Advisor.",
};

const credentials = [
  {
    section: "Licence Information",
    icon: ShieldCheck,
    rows: [
      { label: "Licence No.", value: advisor.irdaCode },
      { label: "Authority", value: advisor.irdaAuthority },
      { label: "Licence Type", value: advisor.licenceType },
    ],
  },
  {
    section: "LIC Agent Details",
    icon: Building2,
    rows: [
      { label: "Agent Code", value: advisor.licAgentCode },
      { label: "Branch", value: advisor.branch.en },
      { label: "Division", value: advisor.division.en },
    ],
  },
];

export default function LicencePage() {
  return (
    <main className="licence-page">
      <div className="licence-inner">
        <Link href="/" className="licence-back">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to site
        </Link>

        <header className="licence-header">
          <span className="licence-eyebrow">Verified credentials</span>
          <h1>Licence &amp; Credentials</h1>
          <p>
            {advisor.name} is a licensed insurance agent operating under the
            authority of the Insurance Regulatory and Development Authority of
            India (IRDAI). All details below are on record with LIC of India.
          </p>
        </header>

        <div className="licence-cards">
          {credentials.map(({ section, icon: Icon, rows }) => (
            <div key={section} className="licence-card">
              <div className="licence-card-head">
                <Icon size={20} aria-hidden="true" />
                <h2>{section}</h2>
              </div>
              <dl className="licence-rows">
                {rows.map(({ label, value }) => (
                  <div key={label} className="licence-row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <aside className="licence-disclaimer">
          <FileText size={15} aria-hidden="true" />
          <p>
            Umashankar Rai operates as an independent LIC of India agent. This
            page and the website it belongs to are not the official website of
            Life Insurance Corporation of India. For the official site, visit{" "}
            <a
              href="https://licindia.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              licindia.in
            </a>
            .
          </p>
        </aside>
      </div>

      <style>{`
        .licence-page {
          min-height: 100vh;
          background: var(--paper);
          padding: clamp(80px, 12vw, 140px) clamp(16px, 5vw, 40px) 80px;
        }
        .licence-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .licence-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 48px;
        }
        .licence-back:hover { color: var(--ink); }

        .licence-header { margin-bottom: 48px; }
        .licence-eyebrow {
          display: block;
          font-size: clamp(11px, 2.8vw, 13px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--lic-saffron);
          margin-bottom: 12px;
        }
        .licence-header h1 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(32px, 8vw, 56px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.05;
          margin: 0 0 16px;
        }
        .licence-header p {
          color: var(--muted);
          font-size: clamp(15px, 3.8vw, 17px);
          line-height: 1.6;
          max-width: 540px;
        }

        .licence-cards {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }
        .licence-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .licence-card-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--line);
        }
        .licence-card-head svg { color: var(--lic-blue); flex-shrink: 0; }
        .licence-card-head h2 {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.01em;
          margin: 0;
        }
        .licence-rows {
          margin: 0;
          padding: 8px 0;
        }
        .licence-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 12px;
          align-items: baseline;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(14,19,32,0.05);
        }
        .licence-row:last-child { border-bottom: 0; }
        .licence-row dt {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .licence-row dd {
          font-size: 15px;
          font-weight: 500;
          color: var(--ink);
          margin: 0;
          font-family: "Courier New", monospace;
          word-break: break-all;
        }
        .licence-row:first-child dd,
        .licence-row:nth-child(2) dd {
          font-family: inherit;
          font-weight: 600;
          word-break: normal;
        }

        .licence-disclaimer {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 20px 24px;
          background: var(--lic-blue-soft);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--lic-blue);
        }
        .licence-disclaimer svg { color: var(--lic-blue); flex-shrink: 0; margin-top: 2px; }
        .licence-disclaimer p {
          font-size: 13px;
          color: var(--ink);
          line-height: 1.55;
          margin: 0;
          opacity: 0.8;
        }
        .licence-disclaimer a {
          color: var(--lic-blue);
          font-weight: 700;
        }

        @media (max-width: 480px) {
          .licence-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
      `}</style>
    </main>
  );
}

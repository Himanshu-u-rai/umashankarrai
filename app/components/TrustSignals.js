import { BadgeCheck, FileSearch, LockKeyhole, ScrollText } from "lucide-react";

const signals = [
  {
    title: "Official identifiers",
    text: "Plan names, plan numbers, and UINs are aligned with LIC's public insurance-plan list.",
    icon: BadgeCheck,
  },
  {
    title: "No invented maturity figures",
    text: "The site does not estimate bonuses or maturity values without an official LIC illustration.",
    icon: FileSearch,
  },
  {
    title: "Private contact approach",
    text: "Advisor contact details are not printed publicly; inquiries are sent through your email client.",
    icon: LockKeyhole,
  },
  {
    title: "Paperwork support",
    text: "Consultation covers documents, nominee details, premium schedule, and claim-support basics.",
    icon: ScrollText,
  },
];

export default function TrustSignals() {
  return (
    <section className="section trust-section">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">Trust framework</p>
          <h2>Clear boundaries create better advice.</h2>
        </div>
        <p>
          The site is designed to guide conversations, not replace LIC official
          underwriting, premium calculation, or policy issue process.
        </p>
      </div>

      <div className="trust-grid">
        {signals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div className="trust-item" key={signal.title}>
              <Icon size={24} />
              <h3>{signal.title}</h3>
              <p>{signal.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

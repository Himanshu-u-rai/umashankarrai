import Image from "next/image";
import { ClipboardCheck, FileText, Handshake, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Understand the household",
    text: "Income, liabilities, dependents, current policies, and life goals are reviewed first.",
    icon: ClipboardCheck,
  },
  {
    title: "Shortlist LIC plans",
    text: "Only relevant official LIC options are compared by purpose, term, and policy structure.",
    icon: ShieldCheck,
  },
  {
    title: "Prepare illustration request",
    text: "The final premium and benefit values are taken from LIC's official illustration process.",
    icon: FileText,
  },
  {
    title: "Support after issue",
    text: "Service continues for premium reminders, reviews, nominee updates, and claim paperwork.",
    icon: Handshake,
  },
];

export default function About() {
  return (
    <section className="section advisor-section" id="advisor">
      <div className="advisor-media">
        <Image
          src="/umashankar-rai-portrait-studio.png"
          alt="Umashankar Rai in formal attire"
          width={1167}
          height={1347}
          sizes="(max-width: 860px) 90vw, 38vw"
          className="advisor-image"
        />
      </div>

      <div className="advisor-copy">
        <p className="section-kicker">Advisor method</p>
        <h2>Insurance guidance should feel measured, not rushed.</h2>
        <p>
          The work is to translate LIC policy catalogue into decisions a family can
          actually act on: enough protection, suitable terms, clean paperwork, and
          reliable follow-through.
        </p>

        <div className="process-list">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div className="process-row" key={step.title}>
                <Icon size={21} />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

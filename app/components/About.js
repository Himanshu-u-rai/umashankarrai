"use client";

import Image from "next/image";
import { ClipboardCheck, FileText, Handshake, ShieldCheck } from "lucide-react";
import { advisor, aboutCopy } from "../data/siteData";
import { Award } from "lucide-react";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import IRDABadge from "./IRDABadge";

const STEP_ICONS = {
  ClipboardCheck,
  ShieldCheck,
  FileText,
  Handshake,
};

// Wave 2 / P2.3 — personal-story rewrite: milestone strip, IRDA badge,
// languages chips, and the advisor process list. Bilingual via useLang.
export default function About() {
  const { lang } = useLang();
  const imageAlt = t(aboutCopy.imageAlt, lang) || advisor.name;

  return (
    <section className="section advisor-section" id="advisor">
      <div className="section-ribbon" aria-hidden="true" />

      <div className="advisor-media">
        <Image
          src="/portrait/studio-1080.webp"
          alt={imageAlt}
          width={1080}
          height={1247}
          sizes="(min-width: 1080px) 45vw, 90vw"
          className="advisor-image"
        />
      </div>

      <div className="advisor-copy">
        <p className="section-kicker">
          <span aria-hidden="true" style={{ color: "var(--lic-saffron)", marginRight: "0.45em" }}>
            ▪
          </span>
          {t(aboutCopy.eyebrow, lang)}
        </p>
        <h2>{t(aboutCopy.heading, lang)}</h2>
        <p>{t(aboutCopy.story, lang)}</p>

        <ol className="milestone-strip">
          {aboutCopy.milestones.map((m) => (
            <li className="milestone-row" key={m.year}>
              <span className="milestone-year">{m.year}</span>
              <span className="milestone-text">{t(m.text, lang)}</span>
            </li>
          ))}
        </ol>

        <div className="advisor-credentials">
          <IRDABadge code={advisor.irdaCode} />
          {aboutCopy.awards?.map((award) => (
            <div className="award-chip" key={t(award.label, lang)}>
              <Award size={14} aria-hidden="true" />
              <span>
                <strong>{t(award.label, lang)}</strong>
                <small>{t(award.sublabel, lang)}</small>
              </span>
            </div>
          ))}
          <div className="language-chips" aria-label={t(aboutCopy.languagesLabel, lang)}>
            {advisor.languages.map((language) => (
              <span className="chip" key={language}>{language}</span>
            ))}
          </div>
        </div>

        <div className="process-list" role="list">
          {aboutCopy.steps.map((step) => {
            const Icon = STEP_ICONS[step.iconKey] || ShieldCheck;
            const title = t(step.title, lang);
            return (
              <div className="process-row" key={title} role="listitem">
                <Icon size={18} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{t(step.text, lang)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

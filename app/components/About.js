"use client";

import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";
import { advisor, aboutCopy } from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

const STATS = [
  { value: "25+", label: { en: "Years advising", hi: "वर्षों का अनुभव" } },
  { value: "5000+", label: { en: "Families served", hi: "परिवारों की सेवा" } },
  { value: "2001", label: { en: "Serving since", hi: "सेवा से" } },
];

export default function About() {
  const { lang } = useLang();

  return (
    <section className="ab-section section" id="advisor">

      {/* ── Hero row: photo + eyebrow+headline column ── */}
      <div className="ab-hero-row">
        <div className="ab-photo-wrap">
          <Image
            src="/portrait/studio-1080.webp"
            alt={t(aboutCopy.imageAlt, lang) || advisor.name}
            width={1080}
            height={1247}
            sizes="(min-width: 1080px) 42vw, 90vw"
            className="ab-photo"
          />
        </div>
        <div className="ab-intro-col">
          <p className="ab-eyebrow">{t(aboutCopy.eyebrow, lang)}</p>
          <div className="ab-spacer" />

          {/* Stats + credentials in the middle */}
          <div className="ab-stats-block">
            <div className="ab-stats-row">
              {STATS.map((s) => (
                <div key={s.value} className="ab-stat">
                  <strong>{s.value}</strong>
                  <span>{t(s.label, lang)}</span>
                </div>
              ))}
            </div>
            <div className="ab-creds">
              <span className="ab-badge">
                <ShieldCheck size={13} aria-hidden="true" />
                IRDA · {advisor.irdaCode}
              </span>
              {aboutCopy.awards?.map((award) => (
                <span className="ab-badge" key={t(award.label, lang)}>
                  <Award size={13} aria-hidden="true" />
                  {t(award.label, lang)}
                </span>
              ))}
            </div>
          </div>

          <h2 className="ab-heading">{t(aboutCopy.heading, lang)}</h2>
        </div>
      </div>

      {/* ── Story para ── */}
      <p className="ab-story">{t(aboutCopy.story, lang)}</p>

      {/* ── Process steps ── */}
      <div className="ab-steps">
        {aboutCopy.steps.map((step, i) => (
          <div key={i} className="ab-step">
            <span className="ab-step-num">0{i + 1}</span>
            <strong className="ab-step-title">{t(step.title, lang)}</strong>
            <p className="ab-step-text">{t(step.text, lang)}</p>
          </div>
        ))}
      </div>

      <style>{`
        .ab-section {
          background: var(--paper-deep);
        }

        /* ── Hero row ── */
        .ab-hero-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
          margin-bottom: 48px;
        }
        @media (min-width: 820px) {
          .ab-hero-row {
            grid-template-columns: minmax(0, 380px) 1fr;
            gap: 64px;
            align-items: stretch;
            margin-bottom: 56px;
          }
        }

        /* ── Right intro column — fills photo height ── */
        .ab-intro-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ab-spacer { flex: 1; min-height: 24px; }

        /* ── Eyebrow ── */
        .ab-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ab-eyebrow::before {
          content: "//";
          color: var(--lic-saffron);
          font-family: "Courier New", monospace;
        }

        /* ── Photo — no frame, clean edge ── */
        .ab-photo-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: transparent;
          max-width: 320px;
        }
        @media (min-width: 820px) {
          .ab-photo-wrap { max-width: 380px; }
        }

        .ab-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* ── Headline — Cormorant serif, matches site-wide h2 treatment ── */
        .ab-heading {
          font-family: var(--font-display);
          font-size: clamp(40px, 6.5vw, 76px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.05;
          margin: 24px 0 0;
          letter-spacing: -0.01em;
        }

        /* ── Stats block (inside right column) ── */
        .ab-stats-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ab-stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 36px;
        }
        .ab-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ab-stat strong {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 800;
          color: var(--ink);
          line-height: 1;
          font-family: "Cormorant Garamond", Georgia, serif;
        }
        .ab-stat span {
          font-size: 10px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        /* ── Credentials ── */
        .ab-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ab-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          background: #fff;
          border: 1.5px solid var(--line);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          color: var(--ink);
          white-space: nowrap;
        }
        .ab-badge svg { color: var(--lic-saffron); }

        /* ── Story paragraph ── */
        .ab-story {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0 0 56px;
          max-width: none;
        }

        /* ── Process steps ── */
        .ab-steps {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 24px;
          border-top: 1px solid var(--line);
          padding-top: 40px;
        }
        @media (min-width: 820px) {
          .ab-steps { grid-template-columns: repeat(4, 1fr); }
        }

        .ab-step {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ab-step-num {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--lic-saffron);
          font-family: "Courier New", monospace;
        }
        .ab-step-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
        }
        .ab-step-text {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}

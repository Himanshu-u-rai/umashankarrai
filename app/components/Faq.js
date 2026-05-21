"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  faqs,
  faqsCopy,
  faqSectionCopy,
  hasWhatsApp,
  whatsappLink,
} from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

// Prefer the bilingual mirror; fall back to the plain-string list so the
// component still renders if the mirror was never created.
const items = Array.isArray(faqsCopy) && faqsCopy.length > 0 ? faqsCopy : faqs;

export default function Faq() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState(0);

  const waHref = whatsappLink(t(faqSectionCopy.whatsappGreeting, lang));
  const fallbackHref = hasWhatsApp ? waHref : "#contact";
  const fallbackAction = hasWhatsApp
    ? t(faqSectionCopy.fallbackCtaAction, lang)
    : lang === "hi"
      ? "फ़ॉर्म भेजें →"
      : "Send the form →";

  return (
    <section className="section faq-section" id="faq">
      <Reveal>
        <div className="faq-heading">
          <p className="section-kicker">
            <span aria-hidden="true" className="faq-kicker-bullet">▪</span>{" "}
            {t(faqSectionCopy.eyebrow, lang)}
          </p>
          <h2>{t(faqSectionCopy.heading, lang)}</h2>
        </div>
      </Reveal>

      <div className="faq-list">
        {items.map((faq, index) => {
          const open = index === openIndex;
          const question = t(faq.question, lang);
          const answer = t(faq.answer, lang);
          return (
            <div className={`faq-item ${open ? "is-open" : ""}`} key={question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span>{question}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="faq-fallback-cta">
        {t(faqSectionCopy.fallbackCta, lang)}{" "}
        <a
          href={fallbackHref}
          target={hasWhatsApp ? "_blank" : undefined}
          rel={hasWhatsApp ? "noreferrer noopener" : undefined}
        >
          {fallbackAction}
        </a>
      </p>

      <style>{`
        .faq-kicker-bullet { color: var(--lic-saffron); margin-right: 2px; }
        .faq-fallback-cta {
          margin-top: 24px;
          color: var(--muted);
          font-size: 14px;
          font-weight: 700;
        }
        .faq-fallback-cta a {
          color: var(--lic-blue);
          font-weight: 900;
          text-decoration: none;
          margin-left: 4px;
        }
        .faq-fallback-cta a:hover { text-decoration: underline; }
      `}</style>
    </section>
  );
}

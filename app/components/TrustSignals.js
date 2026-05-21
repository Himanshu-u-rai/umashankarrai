"use client";

import { ClipboardCheck, FileText, Handshake, ShieldCheck } from "lucide-react";
import { useLang } from "./LangProvider";
import { t } from "../data/i18n";
import { trustCopy } from "../data/siteData";
import Reveal from "./Reveal";

const PROMISE_ICONS = {
  ClipboardCheck,
  FileText,
  Handshake,
  ShieldCheck,
};

export default function TrustSignals() {
  const { lang } = useLang();

  return (
    <>
      <hr className="section-ribbon" aria-hidden="true" />
      <section className="section trust-section" id="trust" aria-labelledby="trust-heading">
        <div className="advisor-promise">
          <Reveal>
          <div className="promise-statement">
            <p className="section-kicker">{t(trustCopy.eyebrow, lang)}</p>
            <h2 id="trust-heading">{t(trustCopy.heading, lang)}</h2>
            <p className="promise-lede">{t(trustCopy.intro, lang)}</p>
            <a className="button button-light promise-cta" href="#contact">
              {t(trustCopy.cta, lang)}
            </a>
          </div>
          </Reveal>

          <Reveal delay={0.15}>
          <div className="promise-detail">
            <p className="promise-overline">{t(trustCopy.promiseLabel, lang)}</p>
            <div className="trust-promise-list" role="list">
              {trustCopy.promiseItems.map((item) => {
                const Icon = PROMISE_ICONS[item.iconKey] || ShieldCheck;
                const title = t(item.title, lang);
                return (
                  <article className="promise-row" role="listitem" key={title}>
                    <span className="promise-icon" aria-hidden="true">
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{t(item.text, lang)}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="trust-disclaimer">{t(trustCopy.disclaimer, lang)}</p>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

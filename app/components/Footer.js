"use client";

import Image from "next/image";
import { ExternalLink, Phone, MessageCircle, Mail } from "lucide-react";
import {
  advisor,
  officialPlanSource,
  footerCopy,
  hasPhone,
  hasWhatsApp,
  whatsappLink,
  telLink,
  mailtoLink,
} from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

// Wave 2 / P2.4 — footer with brand mark, contact links, and the mandatory
// IRDA / independent-advisor disclaimer.
export default function Footer() {
  const { lang } = useLang();
  const contactLabel = t(footerCopy.navContact, lang);

  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="#top">
          <span className="advisor-mark" aria-hidden="true">
            <Image src="/brand/advisor-mark.svg" alt="" width={32} height={32} />
          </span>
          <span>{advisor.name}</span>
        </a>
        <p>{t(footerCopy.tagline, lang)}</p>
      </div>

      <nav aria-label="Footer navigation">
        <a href="#plans">{t(footerCopy.navPlans, lang)}</a>
        <a href="#advisor">{t(footerCopy.navAdvisor, lang)}</a>
        <a href="#contact">{t(footerCopy.navContact, lang)}</a>
        <a href="#faq">{t(footerCopy.navFaq, lang)}</a>
      </nav>

      <div className="footer-contact" aria-label={contactLabel}>
        {hasWhatsApp ? (
          <a href={whatsappLink(contactLabel)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp
          </a>
        ) : (
          <a href="#contact">
            <MessageCircle size={16} aria-hidden="true" /> Call me back
          </a>
        )}
        {hasPhone ? (
          <a href={telLink()}>
            <Phone size={16} aria-hidden="true" /> Call back
          </a>
        ) : null}
        <a href={mailtoLink()}>
          <Mail size={16} aria-hidden="true" /> Get in touch
        </a>
      </div>

      <div className="footer-source">
        <span>{t(footerCopy.sourceLabel, lang)}</span>
        <a href={officialPlanSource.url} target="_blank" rel="noreferrer">
          {t(footerCopy.sourceLink, lang)} <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>

      <p className="footer-disclaimer">{t(footerCopy.disclaimer, lang)}</p>

      <small>{t(footerCopy.rights, lang)}</small>
    </footer>
  );
}

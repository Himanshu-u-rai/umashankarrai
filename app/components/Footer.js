"use client";

import { Phone, MessageCircle, Mail, ExternalLink, MapPin } from "lucide-react";
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

export default function Footer() {
  const { lang } = useLang();
  const contactLabel = t(footerCopy.navContact, lang);

  return (
    <footer className="ft">

      {/* ── Main columns ── */}
      <div className="ft-body">

        {/* Brand column */}
        <div className="ft-brand-col">
          <a href="#top" className="ft-name">{advisor.name}</a>
          <p className="ft-tagline">{t(footerCopy.tagline, lang)}</p>
          <div className="ft-meta">
            <span className="ft-meta-item">
              <span className="ft-meta-dot" />
              IRDA · {advisor.irdaCode}
            </span>
            {advisor.city && advisor.state && (
              <span className="ft-meta-item">
                <MapPin size={11} aria-hidden="true" />
                {t(advisor.branch, lang)}, {t(advisor.division, lang)}
              </span>
            )}
          </div>
        </div>

        {/* Nav column */}
        <div className="ft-col">
          <p className="ft-col-heading">Navigate</p>
          <a href="#plans">{t(footerCopy.navPlans, lang)}</a>
          <a href="#advisor">{t(footerCopy.navAdvisor, lang)}</a>
          <a href="#contact">{t(footerCopy.navContact, lang)}</a>
          <a href="#faq">{t(footerCopy.navFaq, lang)}</a>
          <a href="/licence">Licence</a>
        </div>

        {/* Contact column */}
        <div className="ft-col">
          <p className="ft-col-heading">Contact</p>
          {hasWhatsApp && (
            <a href={whatsappLink(contactLabel)} target="_blank" rel="noopener noreferrer" className="ft-contact-link">
              <MessageCircle size={14} aria-hidden="true" />
              WhatsApp
            </a>
          )}
          {hasPhone && (
            <a href={telLink()} className="ft-contact-link">
              <Phone size={14} aria-hidden="true" />
              Call us
            </a>
          )}
          <a href={mailtoLink()} className="ft-contact-link">
            <Mail size={14} aria-hidden="true" />
            Email
          </a>
          <a
            href={officialPlanSource.url}
            target="_blank"
            rel="noreferrer"
            className="ft-contact-link ft-source-link"
          >
            <ExternalLink size={13} aria-hidden="true" />
            {t(footerCopy.sourceLink, lang)}
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p className="ft-disclaimer">{t(footerCopy.disclaimer, lang)}</p>
        <div className="ft-copyright">
          <span>{t(footerCopy.rights, lang)}</span>
        </div>
      </div>

      <style>{`
        .ft {
          background: var(--ink);
          border-top: 2px solid var(--lic-saffron);
        }

        /* ── Main body ── */
        .ft-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding: 56px 24px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (min-width: 680px) {
          .ft-body {
            grid-template-columns: 1.8fr 1fr 1fr;
            gap: 48px;
            padding: 64px 40px 56px;
          }
        }

        /* ── Brand column ── */
        .ft-brand-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ft-name {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 600;
          color: #fff;
          line-height: 1.1;
          text-decoration: none;
          display: block;
          margin-bottom: 14px;
          transition: color 160ms ease;
        }
        .ft-name:hover { color: var(--lic-saffron); }

        .ft-tagline {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          max-width: 280px;
          margin: 0 0 24px;
        }

        .ft-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ft-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .ft-meta-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--lic-saffron);
          flex-shrink: 0;
        }
        .ft-meta-item svg { color: var(--lic-saffron); }

        /* ── Nav/contact columns ── */
        .ft-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ft-col-heading {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin: 0 0 4px;
        }

        .ft-col a {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          transition: color 150ms ease;
          line-height: 1;
        }
        .ft-col a:hover { color: #fff; }

        .ft-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .ft-contact-link svg { color: var(--lic-saffron); flex-shrink: 0; }

        .ft-source-link {
          margin-top: 8px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.45) !important;
          font-size: 12px !important;
        }
        .ft-source-link:hover { color: rgba(255,255,255,0.72) !important; }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 24px 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 680px) {
          .ft-bottom { padding: 28px 40px; }
        }

        .ft-disclaimer {
          font-size: 11px;
          color: rgba(255,255,255,0.32);
          line-height: 1.65;
          max-width: 720px;
          margin: 0 0 16px;
        }

        .ft-copyright {
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          font-weight: 600;
          letter-spacing: 0.04em;
        }
      `}</style>
    </footer>
  );
}

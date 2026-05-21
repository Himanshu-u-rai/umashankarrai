"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
import {
  advisor,
  hasPhone,
  hasWhatsApp,
  stickyCtaCopy,
  whatsappLink,
} from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

// Wave 2 / P1.5 — persistent 3-button mobile bottom bar (Call · WhatsApp · Form).
// Hides while the hero (#top) is ≥50% visible, then slides up once scrolled past.
// Hidden entirely at desktop (≥1080px) via `.sticky-cta-bar` CSS.
export default function StickyMobileCTA() {
  const { lang } = useLang();
  const [hidden, setHidden] = useState(true);
  const barRef = useRef(null);

  useEffect(() => {
    const hero =
      typeof window !== "undefined" && "IntersectionObserver" in window
        ? document.getElementById("top")
        : null;

    if (!hero) {
      // No hero to observe — reveal the bar on the next frame so we never
      // call setState synchronously inside the effect body.
      const raf = requestAnimationFrame(() => setHidden(false));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const greeting = t(stickyCtaCopy.whatsappGreeting, lang) || "Hello";
  const itemCount = [hasPhone, hasWhatsApp, true].filter(Boolean).length;

  return (
    <nav
      ref={barRef}
      className={`sticky-cta-bar${hidden ? " is-hidden" : ""}`}
      aria-label="Quick contact"
      style={{ "--sticky-items": itemCount }}
    >
      {hasPhone ? (
        <a className="sticky-cta-segment" href={`tel:${advisor.phone}`}>
          <Phone aria-hidden="true" />
          {t(stickyCtaCopy.call, lang)}
        </a>
      ) : null}
      {hasWhatsApp ? (
        <a
          className="sticky-cta-segment sticky-cta-whatsapp"
          href={whatsappLink(greeting)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle aria-hidden="true" />
          {t(stickyCtaCopy.whatsapp, lang)}
        </a>
      ) : null}
      <a className="sticky-cta-segment" href="#contact">
        <Mail aria-hidden="true" />
        {t(stickyCtaCopy.consult, lang)}
      </a>
    </nav>
  );
}

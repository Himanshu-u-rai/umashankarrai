"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { advisor, hasWhatsApp, heroCopy, whatsappLink } from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

// Wave 2 / P1.2 — mobile-first redesign of the landing hero.
//
// Mobile target (≤100vh on 360×640): eyebrow → nameplate → subtitle →
// portrait → dual CTAs (WhatsApp primary saffron, Plans secondary).
// Desktop (≥1080px) layout treatment is owned by `app/globals.css`.
//
// Motion budget (P2.2): respects `prefers-reduced-motion`. We defer all
// hero motion by 200ms so the LCP image (portrait) paints unanimated.
// Total active animation window is ~600ms; nameplate words stagger by 60ms.
export default function Hero() {
  const { lang } = useLang();
  const prefersReducedMotion = useReducedMotion();

  // Bilingual nameplate. Prefer the explicit `line1`/`line2` split when
  // present so we can stagger word entrance; fall back to splitting the
  // localised advisor name on whitespace.
  const explicitLine1 = t(heroCopy.line1, lang);
  const explicitLine2 = t(heroCopy.line2, lang);
  const localisedName = t(heroCopy.name, lang) || advisor.name;
  const [fallbackLine1, ...fallbackRest] = localisedName.split(/\s+/);
  const fallbackLine2 = fallbackRest.join(" ");

  const nameLine1 = explicitLine1 || fallbackLine1 || advisor.name;
  const nameLine2 = explicitLine2 || fallbackLine2 || "";

  const eyebrowText = t(heroCopy.eyebrow, lang);
  const subtitleText = t(heroCopy.subtitle, lang);
  const portraitAlt = t(heroCopy.portraitAlt, lang) || advisor.name;

  const primaryLabel = hasWhatsApp
    ? t(heroCopy.primaryCtaLabel, lang) ||
      (lang === "hi" ? "उमाशंकर से बात करें" : "Talk to Umashankar")
    : lang === "hi"
      ? "संपर्क करें"
      : "Get in touch";
  const secondaryLabel =
    t(heroCopy.secondaryCtaLabel, lang) ||
    (lang === "hi" ? "योजनाएँ देखें" : "Explore plans");

  const whatsappGreeting = t(heroCopy.whatsappGreeting, lang) || "Hello";
  const primaryHref = hasWhatsApp ? whatsappLink(whatsappGreeting) : "#contact";

  // Motion presets. When reduced motion is requested we render the static
  // end-state so there's literally nothing animating.
  const fadeIn = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2, duration: 0.6, ease: "easeOut" },
      };

  const wordMotion = (index) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.2 + index * 0.06,
            duration: 0.45,
            ease: "easeOut",
          },
        };

  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true" style={{ color: "var(--lic-saffron)", marginRight: "0.45em" }}>
              ▪
            </span>
            {eyebrowText}
          </p>

          <h1
            className="hero-nameplate"
            aria-label={`${nameLine1}${nameLine2 ? ` ${nameLine2}` : ""}`}
          >
            <motion.span {...wordMotion(0)}>{nameLine1}</motion.span>
            {nameLine2 ? (
              <>
                {" "}
                <motion.span {...wordMotion(1)}>{nameLine2}</motion.span>
              </>
            ) : null}
          </h1>

          <motion.p className="hero-subtitle" {...fadeIn}>
            {subtitleText}
          </motion.p>
        </div>

        <motion.div
          className="hero-portrait"
          aria-label={portraitAlt}
          {...fadeIn}
        >
          <Image
            src="/portrait/hero-1080.webp"
            alt={portraitAlt}
            width={1080}
            height={1240}
            priority
            fetchPriority="high"
            sizes="(min-width: 1080px) 48vw, 90vw"
            className="portrait-image"
          />
        </motion.div>

        <div className="hero-actions">
          <a
            className="button button-saffron"
            href={primaryHref}
            target={hasWhatsApp ? "_blank" : undefined}
            rel={hasWhatsApp ? "noopener noreferrer" : undefined}
          >
            {primaryLabel}
          </a>
          <Link className="button button-secondary" href="/plans">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

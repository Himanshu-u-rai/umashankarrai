"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { advisor, hasWhatsApp, headerCopy, whatsappLink } from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import HindiToggle from "./HindiToggle";

// Wave 2 / P1.7 — full-bleed mobile header bar with a full-screen sheet menu,
// language toggle, and a WhatsApp "Talk now" CTA. Desktop pill treatment is
// owned by app/globals.css (≥1080px).
export default function Header() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const isHome = pathname === "/";
  const contactHref = isHome ? "#contact" : "/#contact";
  const sectionHref = (href) => (isHome || !href.startsWith("#") ? href : `/${href}`);

  const talkHref = hasWhatsApp
    ? whatsappLink(t(headerCopy.whatsappGreeting, lang) || "Hello")
    : contactHref;

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a
        className="brand-lockup"
        href={isHome ? "#top" : "/"}
        aria-label={isHome ? "Go to top" : "Go to home"}
        onClick={closeMenu}
      >
        <strong>{advisor.name}</strong>
      </a>

      <div className="header-actions">
        <HindiToggle />
        <a
          className="nav-cta header-talk"
          href={talkHref}
          target={hasWhatsApp ? "_blank" : undefined}
          rel={hasWhatsApp ? "noopener noreferrer" : undefined}
        >
          <MessageCircle size={16} aria-hidden="true" />
          {t(headerCopy.talkNow, lang)}
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t(headerCopy.menuClose, lang) : t(headerCopy.menuLabel, lang)}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav
        id="primary-nav"
        className={`site-nav ${menuOpen ? "is-open" : ""}`}
        aria-label={t(headerCopy.sheetTitle, lang)}
        role={menuOpen ? "dialog" : undefined}
        aria-modal={menuOpen ? "true" : undefined}
      >
        {headerCopy.navLinks.map((item) => (
          <a key={item.href} href={sectionHref(item.href)} onClick={closeMenu}>
            {t(item.label, lang)}
          </a>
        ))}
        <a
          className="nav-cta"
          href={talkHref}
          target={hasWhatsApp ? "_blank" : undefined}
          rel={hasWhatsApp ? "noopener noreferrer" : undefined}
          onClick={closeMenu}
        >
          {t(headerCopy.talkNow, lang)}
        </a>
      </nav>
    </header>
  );
}

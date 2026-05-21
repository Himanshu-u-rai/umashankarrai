"use client";

import { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const navItems = [
  { label: "Plans", href: "#plans" },
  { label: "Advisor", href: "#advisor" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand-lockup" href="#top" aria-label="Go to top" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">
          <ShieldCheck size={20} />
        </span>
        <span>
          <strong>Umashankar Rai</strong>
          <small>LIC insurance advisor</small>
        </span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Request consultation
        </a>
      </nav>
    </header>
  );
}

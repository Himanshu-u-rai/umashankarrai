"use client";

import { useLang } from "./LangProvider";

/**
 * Pill toggle for switching between English and Hindi.
 *
 * Hooks into `.lang-toggle` styles in `app/globals.css` (Wave 1 / Agent A) —
 * the rule `.lang-toggle button[aria-pressed="true"]` paints the active
 * choice in saffron/blue. Both options are buttons so each is independently
 * focusable, but they act as a single segmented control with mutually
 * exclusive pressed states.
 *
 * Clicking either button (or pressing it via keyboard) toggles `lang`
 * via `setLang(lang === 'en' ? 'hi' : 'en')`.
 */
export default function HindiToggle() {
  const { lang, setLang } = useLang();
  const isEnglish = lang === "en";

  const toggle = () => {
    setLang(isEnglish ? "hi" : "en");
  };

  return (
    <div
      className="lang-toggle"
      role="group"
      aria-label={isEnglish ? "Switch to Hindi" : "अंग्रेज़ी में बदलें"}
      data-lang={lang}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isEnglish ? "true" : "false"}
        aria-label="English"
      >
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!isEnglish ? "true" : "false"}
        aria-label="Hindi"
      >
        <span>हिं</span>
      </button>
    </div>
  );
}

/**
 * Lightweight i18n helper for the bilingual (en/hi) portfolio.
 *
 * Usage from any component:
 *   import { t } from "../data/i18n";
 *   import { useLang } from "../components/LangProvider";
 *   const { lang } = useLang();
 *   t(heroCopy.subtitle, lang);
 *
 * Contract:
 *   - If `value` is a string, return it unchanged (plain string passthrough).
 *   - If `value` is an object shaped like `{ en, hi }`, return `value[lang]`.
 *     Falls back to `value.en` when the requested lang is missing or empty.
 *   - If `value` is null/undefined, return an empty string.
 *
 * This is deliberately tolerant: components may mix plain strings and
 * bilingual objects during the staged migration without breaking.
 */
export function t(value, lang = "en") {
  if (value == null) return "";
  if (typeof value === "string") return value;

  if (typeof value === "object") {
    const candidate = value[lang];
    if (typeof candidate === "string" && candidate.length > 0) {
      return candidate;
    }
    const fallback = value.en;
    if (typeof fallback === "string") return fallback;
  }

  return "";
}

/**
 * Locale code map for things like `<html lang>` and JSON-LD `inLanguage`.
 */
export const LANG_LOCALE = {
  en: "en-IN",
  hi: "hi-IN",
};

export const SUPPORTED_LANGS = ["en", "hi"];

export function isSupportedLang(value) {
  return SUPPORTED_LANGS.includes(value);
}

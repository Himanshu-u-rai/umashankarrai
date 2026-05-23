"use client";

import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

export default function LocalizedText({ value }) {
  const { lang } = useLang();
  return t(value, lang);
}

"use client";

import { useEffect } from "react";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

export default function LocalizedDocumentTitle({ title, suffix = "Umashankar Rai" }) {
  const { lang } = useLang();

  useEffect(() => {
    document.title = `${t(title, lang)} | ${suffix}`;
  }, [lang, suffix, title]);

  return null;
}

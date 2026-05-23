"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { advisor, hasWhatsApp, mailtoLink, whatsappLink } from "../data/siteData";
import { officialPlansCopy } from "../data/officialPlans";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import styles from "../plans/plans.module.css";

const initialForm = {
  name: "",
  phone: "",
  preferredTime: "Morning",
  message: "",
  company: "",
};

export default function PlanQuoteForm({ plan }) {
  const { lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (form.company) return;

    const body = [
      `Plan: ${plan.name}`,
      `Plan No.: ${plan.planNo}`,
      `UIN: ${plan.uin}`,
      "",
      `${t(officialPlansCopy.fullName, lang)}: ${form.name || "-"}`,
      `${t(officialPlansCopy.phoneNumber, lang)}: ${form.phone || "-"}`,
      `${t(officialPlansCopy.preferredTime, lang)}: ${form.preferredTime}`,
      `${t(officialPlansCopy.message, lang)}: ${form.message || "-"}`,
      "",
      "Please contact me with the exact LIC quote and suitability details.",
    ].join("\n");

    window.location.href = mailtoLink(`LIC plan inquiry - ${plan.name}`, body);
    setSent(true);
  };

  const planDisplayName = t(plan.nameCopy ?? plan.name, lang);
  const whatsappHref = whatsappLink(
    `Hello ${advisor.name}, I want to know more about ${planDisplayName} (${plan.planNo}).`
  );

  return (
    <section className={styles.quotePanel} id="quote" aria-labelledby="quote-heading">
      <p className={styles.eyebrow}>{t(officialPlansCopy.advisorGuidance, lang)}</p>
      <h2 id="quote-heading">{t(officialPlansCopy.requestGuidance, lang)}</h2>
      <p className={styles.notice}>
        {t(officialPlansCopy.quoteNotice, lang)}
      </p>

      <form className={styles.quoteForm} onSubmit={submit}>
        <label>
          {t(officialPlansCopy.selectedPlan, lang)}
          <input type="text" value={`${planDisplayName} - ${plan.planNo}`} readOnly />
        </label>
        <label>
          {t(officialPlansCopy.fullName, lang)}
          <input value={form.name} onChange={updateField("name")} placeholder={t(officialPlansCopy.fullNamePlaceholder, lang)} />
        </label>
        <label>
          {t(officialPlansCopy.phoneNumber, lang)}
          <input
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={updateField("phone")}
            placeholder={t(officialPlansCopy.phonePlaceholder, lang)}
          />
        </label>
        <label>
          {t(officialPlansCopy.preferredTime, lang)}
          <select value={form.preferredTime} onChange={updateField("preferredTime")}>
            <option value="Morning">{t(officialPlansCopy.morning, lang)}</option>
            <option value="Afternoon">{t(officialPlansCopy.afternoon, lang)}</option>
            <option value="Evening">{t(officialPlansCopy.evening, lang)}</option>
          </select>
        </label>
        <label>
          {t(officialPlansCopy.message, lang)}
          <textarea
            value={form.message}
            onChange={updateField("message")}
            placeholder={t(officialPlansCopy.messagePlaceholder, lang)}
          />
        </label>

        <input
          type="text"
          name="company"
          value={form.company}
          onChange={updateField("company")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />

        <div className={styles.formActions}>
          <button className={styles.smallButton} type="submit">
            {t(officialPlansCopy.sendInquiry, lang)}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          {hasWhatsApp && (
            <a className={styles.ghostButton} href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} aria-hidden="true" />
              {t(officialPlansCopy.whatsapp, lang)}
            </a>
          )}
        </div>

        {sent && (
          <p className={styles.successNote} role="status">
            {t(officialPlansCopy.inquirySuccess, lang)}
          </p>
        )}
      </form>
    </section>
  );
}

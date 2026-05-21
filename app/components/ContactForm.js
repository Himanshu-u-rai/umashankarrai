"use client";

import { useEffect, useState } from "react";
import { MailCheck, ArrowRight, MessageCircle, Phone, Check } from "lucide-react";
import {
  advisor,
  planCategories,
  defaultPlanName,
  contactFormCopy,
  hasWhatsApp,
  hasPhone,
  whatsappLink,
  telLink,
  mailtoLink,
} from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

const initialForm = {
  name: "",
  visitorPhone: "",
  plan: defaultPlanName,
  preferredContact: "WhatsApp",
  preferredTime: "Morning",
  message: "",
  company: "",
};

const numbersPending = advisor.phone.includes("XXXX");

export default function ContactForm() {
  const { lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onPlanSelected = (event) => {
      setForm((current) => ({ ...current, plan: event.detail || current.plan }));
    };
    window.addEventListener("plan-selected", onPlanSelected);
    return () => window.removeEventListener("plan-selected", onPlanSelected);
  }, []);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const requiredLabel = t(contactFormCopy.errorRequired, lang);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = requiredLabel;
    if (!form.visitorPhone.trim()) next.visitorPhone = requiredLabel;
    return next;
  };

  const submitInquiry = (event) => {
    event.preventDefault();
    if (form.company) return;

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const subject = `${t(contactFormCopy.mailSubject, lang)} - ${form.plan}`;
    const body = [
      `${t(contactFormCopy.fieldName, lang)}: ${form.name}`,
      `${t(contactFormCopy.fieldPhone, lang)}: ${form.visitorPhone}`,
      `${t(contactFormCopy.fieldPlan, lang)}: ${form.plan}`,
      `${t(contactFormCopy.fieldPreferredContact, lang)}: ${form.preferredContact}`,
      `${t(contactFormCopy.fieldPreferredTime, lang)}: ${form.preferredTime}`,
      `${t(contactFormCopy.fieldMessage, lang)}: ${form.message || "-"}`,
    ].join("\n");

    window.location.href = mailtoLink(subject, body);
    setSubmitted(true);
  };

  const whatsappFastHref = whatsappLink(t(contactFormCopy.whatsAppFast, lang) || "Hello");

  return (
    <section className="section contact-section" id="contact">
      {/* Left: editorial copy + fast-path contact rows */}
      <div className="contact-copy">
        <p className="section-kicker">
          <span aria-hidden="true" style={{ color: "var(--lic-saffron)", marginRight: "0.45em" }}>▪</span>
          {t(contactFormCopy.kicker, lang)}
        </p>
        <h2>{t(contactFormCopy.headline, lang)}</h2>
        <p>{t(contactFormCopy.body, lang)}</p>

        {!numbersPending && (hasWhatsApp || hasPhone) && (
          <>
            <nav className="contact-fast-paths" aria-label="Fast contact options">
              {hasWhatsApp && (
                <a
                  href={whatsappFastHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fast-path-whatsapp"
                >
                  <span className="fast-path-icon" aria-hidden="true">
                    <MessageCircle size={18} />
                  </span>
                  <span className="fast-path-label">
                    <strong>WhatsApp</strong>
                    <span>{t(contactFormCopy.whatsAppFastSub, lang)}</span>
                  </span>
                  <ArrowRight size={16} style={{ marginLeft: "auto", opacity: 0.35 }} aria-hidden="true" />
                </a>
              )}
              {hasPhone && (
                <a href={telLink()} className="fast-path-phone">
                  <span className="fast-path-icon" aria-hidden="true">
                    <Phone size={18} />
                  </span>
                  <span className="fast-path-label">
                    <strong>{advisor.phone}</strong>
                    <span>{t(contactFormCopy.callSub, lang)}</span>
                  </span>
                  <ArrowRight size={16} style={{ marginLeft: "auto", opacity: 0.35 }} aria-hidden="true" />
                </a>
              )}
            </nav>
            <div className="contact-or-divider" aria-hidden="true">
              {t(contactFormCopy.orDivider, lang)}
            </div>
          </>
        )}
      </div>

      {/* Right: editorial underline form */}
      {submitted ? (
        <div className="form-status form-success" role="status">
          <Check size={22} aria-hidden="true" style={{ color: "var(--lic-saffron)" }} />
          <p className="form-success-headline">{t(contactFormCopy.submitted, lang)}</p>
          <p>{t(contactFormCopy.submittedSub, lang) || "Umashankar will be in touch shortly."}</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={submitInquiry} noValidate>
          <label>
            {t(contactFormCopy.fieldName, lang)}
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              placeholder={t(contactFormCopy.fieldNamePlaceholder, lang)}
              aria-invalid={errors.name ? "true" : undefined}
              required
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label>
            {t(contactFormCopy.fieldPhone, lang)}
            <input
              type="tel"
              inputMode="tel"
              value={form.visitorPhone}
              onChange={updateField("visitorPhone")}
              placeholder={t(contactFormCopy.fieldPhonePlaceholder, lang)}
              aria-invalid={errors.visitorPhone ? "true" : undefined}
              required
            />
            {errors.visitorPhone && (
              <span className="field-error">{errors.visitorPhone}</span>
            )}
          </label>

          <label>
            {t(contactFormCopy.fieldPlan, lang)}
            <select value={form.plan} onChange={updateField("plan")}>
              {planCategories.map((category) => (
                <optgroup key={category.id} label={category.label}>
                  {category.plans.map((plan) => (
                    <option key={plan.uin} value={plan.name}>
                      {plan.name} — {plan.planNo}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <fieldset className="contact-radio-group">
            <legend>{t(contactFormCopy.fieldPreferredContact, lang)}</legend>
            <div className="contact-radio-options">
              {[
                ["WhatsApp", contactFormCopy.contactWhatsApp],
                ["Call", contactFormCopy.contactCall],
                ["Email", contactFormCopy.contactEmail],
              ].map(([value, copy]) => (
                <label key={value} className="radio-pill">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={value}
                    checked={form.preferredContact === value}
                    onChange={updateField("preferredContact")}
                  />
                  {t(copy, lang)}
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            {t(contactFormCopy.fieldPreferredTime, lang)}
            <select value={form.preferredTime} onChange={updateField("preferredTime")}>
              <option value="Morning">{t(contactFormCopy.timeMorning, lang)}</option>
              <option value="Afternoon">{t(contactFormCopy.timeAfternoon, lang)}</option>
              <option value="Evening">{t(contactFormCopy.timeEvening, lang)}</option>
            </select>
          </label>

          <label>
            {t(contactFormCopy.fieldMessage, lang)}
            <textarea
              value={form.message}
              onChange={updateField("message")}
              placeholder={t(contactFormCopy.fieldMessagePlaceholder, lang)}
              rows={3}
            />
          </label>

          {/* Honeypot */}
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

          <div className="contact-submit-row">
            <span className="contact-submit-label">
              {t(contactFormCopy.submitLabel, lang) || "Send inquiry"}
            </span>
            <button className="contact-submit-btn" type="submit" aria-label={t(contactFormCopy.submit, lang)}>
              {t(contactFormCopy.submit, lang)}
              <span className="submit-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, FileCheck2 } from "lucide-react";
import { mailtoLink } from "../data/siteData";
import { calculatorFieldCopy, officialPlansCopy } from "../data/officialPlans";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import styles from "../plans/plans.module.css";

function initialFields(fields) {
  return Object.fromEntries(fields.map((field) => [field, ""]));
}

export default function PlanCalculatorPanel({ plan }) {
  const { lang } = useLang();
  const [fields, setFields] = useState(() => initialFields(plan.calculatorFields));
  const [prepared, setPrepared] = useState(false);

  const statusLabel = {
    "official-rate": officialPlansCopy.officialRateAvailable,
    "pending-rate": officialPlansCopy.pendingRate,
    "not-applicable": officialPlansCopy.notApplicable,
  }[plan.calculatorStatus];

  const quoteHref = useMemo(() => {
    const fieldLines = Object.entries(fields)
      .filter(([, value]) => value.trim())
      .map(([label, value]) => `${t(calculatorFieldCopy[label] ?? label, lang)}: ${value}`);
    const body = [
      `Plan: ${plan.name}`,
      `Plan No.: ${plan.planNo}`,
      `UIN: ${plan.uin}`,
      "",
      "Calculator inputs:",
      fieldLines.length ? fieldLines.join("\n") : "No inputs entered yet.",
      "",
      "Please share the exact LIC quote based on verified official rate tables.",
    ].join("\n");
    return mailtoLink(`Exact LIC quote request - ${plan.name}`, body);
  }, [fields, lang, plan]);

  const updateField = (field) => (event) => {
    setFields((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    setPrepared(true);
    window.location.href = quoteHref;
  };

  return (
    <section className={styles.calculatorPanel} aria-labelledby="plan-calculator">
      <p className={styles.eyebrow}>
        <Calculator size={14} aria-hidden="true" /> {t(officialPlansCopy.calculatorReference, lang)}
      </p>
      <h2 id="plan-calculator">{t(officialPlansCopy.quoteInputs, lang)}</h2>
      <span className={styles.statusChip}>{t(statusLabel, lang)}</span>

      <p className={styles.notice}>
        {t(officialPlansCopy.calculatorNotice, lang)}
      </p>

      <form className={styles.calculatorForm} onSubmit={submit}>
        <div className={styles.fieldGrid}>
          {plan.calculatorFields.map((field) => (
            <label key={field}>
              {t(calculatorFieldCopy[field] ?? field, lang)}
              <input
                type="text"
                value={fields[field]}
                onChange={updateField(field)}
                placeholder={t(officialPlansCopy.enterDetails, lang)}
              />
            </label>
          ))}
        </div>

        <div className={styles.formActions}>
          <button className={styles.smallButton} type="submit">
            {t(officialPlansCopy.requestExactQuote, lang)}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          <a className={styles.ghostButton} href="#quote">
            {t(officialPlansCopy.sendDetailedInquiry, lang)}
          </a>
        </div>

        {prepared && (
          <p className={styles.successNote} role="status">
            <FileCheck2 size={14} aria-hidden="true" /> {t(officialPlansCopy.calculatorSuccess, lang)}
          </p>
        )}
      </form>
    </section>
  );
}

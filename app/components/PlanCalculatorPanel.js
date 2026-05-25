"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, FileCheck2 } from "lucide-react";
import {
  calculatePlanReference,
  getCalculatorFields,
  getRangeConfig,
  normalizeCalculatorInputs,
} from "../data/calculatorEngine";
import { calculatorDataBySlug } from "../data/licCalculatorData";
import { mailtoLink } from "../data/siteData";
import { officialPlansCopy } from "../data/officialPlans";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import ThemedSelect from "./ThemedSelect";
import styles from "../plans/plans.module.css";

function initialFields(fields) {
  return Object.fromEntries(
    fields.map((field) => [field.name, field.default ?? field.options?.[0] ?? ""])
  );
}

function formatRangeValue(value) {
  return Number(value).toLocaleString("en-IN");
}

export default function PlanCalculatorPanel({ plan }) {
  const { lang } = useLang();
  const dataset = calculatorDataBySlug[plan.slug] ?? null;
  const calculatorFields = useMemo(() => getCalculatorFields(plan, dataset), [dataset, plan]);
  const [fields, setFields] = useState(() => initialFields(calculatorFields));
  const [prepared, setPrepared] = useState(false);
  const normalizedInputs = useMemo(() => normalizeCalculatorInputs(fields), [fields]);
  const result = useMemo(
    () => calculatePlanReference(dataset, normalizedInputs),
    [dataset, normalizedInputs]
  );

  const footnote = result.hasNumericReference
    ? "Indicative reference. Final quote will be confirmed with current LIC rules."
    : "Exact figures will be shared after advisor review.";

  const quoteHref = useMemo(() => {
    const fieldLines = Object.entries(fields)
      .filter(([, value]) => String(value).trim())
      .map(([label, value]) => {
        const field = calculatorFields.find((item) => item.name === label);
        return `${field?.label ?? label}: ${value}`;
      });
    const outputLines = result.outputs.map((output) => `${output.label}: ${output.value}`);
    const body = [
      `Plan: ${plan.name}`,
      `Plan No.: ${plan.planNo}`,
      `UIN: ${plan.uin}`,
      dataset ? `Calculator dataset: ${dataset.extractionPlanId}` : "Calculator dataset: not available",
      dataset ? `Dataset confidence: ${Math.round((dataset.completenessScore ?? 0) * 100)}%` : "",
      "",
      "Calculator inputs:",
      fieldLines.length ? fieldLines.join("\n") : "No inputs entered yet.",
      "",
      "Calculator reference output:",
      outputLines.length ? outputLines.join("\n") : "No numeric reference available from extracted data.",
      "",
      result.disclaimer,
      "",
      "Please share the exact LIC quote based on verified official rate tables.",
    ].join("\n");
    return mailtoLink(`Exact LIC quote request - ${plan.name}`, body);
  }, [calculatorFields, dataset, fields, plan, result]);

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

      <form className={styles.calculatorForm} onSubmit={submit}>
        <div className={styles.fieldGrid}>
          {calculatorFields.map((field) => {
            const range = getRangeConfig(field, plan);
            const rangeValue = range.renderAsRange
              ? range.clamp(fields[field.name])
              : fields[field.name];

            return (
              <label
                className={range.renderAsRange ? styles.rangeField : undefined}
                key={field.name}
              >
                <span className={styles.fieldLabelText}>{field.label}</span>
                {field.options?.length ? (
                  <ThemedSelect
                    ariaLabel={field.label}
                    options={field.options.map((option) => ({
                      value: option,
                      label: String(option).replaceAll("_", " "),
                    }))}
                    value={fields[field.name]}
                    onChange={updateField(field.name)}
                  />
                ) : range.renderAsRange ? (
                  <div className={styles.rangeControl}>
                    <input
                      type="range"
                      min={range.min}
                      max={range.max}
                      step={range.step}
                      value={rangeValue}
                      onInput={updateField(field.name)}
                      onChange={updateField(field.name)}
                      aria-label={`${field.label} slider`}
                    />
                    <div className={styles.rangeNumberRow}>
                      <span>{formatRangeValue(range.min)}</span>
                      <input
                        type="number"
                        min={range.min}
                        max={range.max}
                        step={range.step}
                        value={fields[field.name] || rangeValue}
                        onChange={updateField(field.name)}
                        placeholder={t(officialPlansCopy.enterDetails, lang)}
                        aria-label={`${field.label} exact value`}
                      />
                      <span>{formatRangeValue(range.max)}</span>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={fields[field.name]}
                    onChange={updateField(field.name)}
                    placeholder={t(officialPlansCopy.enterDetails, lang)}
                  />
                )}
              </label>
            );
          })}
        </div>

        <div className={styles.calculatorResult} aria-live="polite">
          <div className={styles.resultHeader}>
            <strong>{result.confidenceLabel}</strong>
            {result.matchedRow?.sourceFile && (
              <span>
                {result.matchedRow.sourceFile}
                {result.matchedRow.sourcePage ? `, p. ${result.matchedRow.sourcePage}` : ""}
              </span>
            )}
          </div>

          {result.hasNumericReference ? (
            <div className={styles.resultGrid}>
              {result.outputs.map((output) => (
                <div className={styles.resultCard} key={output.label}>
                  <span>{output.label}</span>
                  <strong>{output.value}</strong>
                  <small>{output.note}</small>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyResult}>
              No usable premium table was extracted for this product. Use the form below to request an exact advisor quote.
            </p>
          )}
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

        <p className={styles.calculatorFootnote}>{footnote}</p>
      </form>
    </section>
  );
}

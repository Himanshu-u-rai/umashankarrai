"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  ChevronDown,
  HandCoins,
  Landmark,
  ShieldHalf,
} from "lucide-react";
import {
  officialPlanSource,
  planCategories,
  planCategoriesCopy,
  plansSectionCopy,
} from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";

const icons = {
  "family-security": ShieldHalf,
  "savings-growth": HandCoins,
  "children-goals": Baby,
  "retirement-income": Landmark,
};

function categoryLabel(category) {
  return (
    planCategoriesCopy?.categories?.[category.id]?.label ?? category.label
  );
}

function categoryDescription(category) {
  return (
    planCategoriesCopy?.categories?.[category.id]?.description ??
    category.summary
  );
}

function PlanRowContent({ plan, lang }) {
  return (
    <>
      <span className="plan-chip" aria-hidden="true">
        {plan.planNo}
      </span>
      <span>
        <strong>{plan.name}</strong>
        <small>{plan.benefit}</small>
        <span className="plan-row-meta">
          <span className="plan-uin">UIN: {plan.uin}</span>
          <a
            href={plan.officialUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="plan-official-link"
            onClick={(e) => e.stopPropagation()}
          >
            {t(planCategoriesCopy.officialLink, lang)}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </span>
      </span>
    </>
  );
}

export default function Plans() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState(planCategories[0].id);
  const [expandedPlanNo, setExpandedPlanNo] = useState(null);

  const activeCategory =
    planCategories.find((c) => c.id === activeId) ?? planCategories[0];
  const ActiveIcon = icons[activeCategory.id];

  // Switching desktop tabs also collapses any expanded plan row — done in
  // the handler (no effect) to avoid cascading renders.
  const selectTab = (id) => {
    setActiveId(id);
    setExpandedPlanNo(null);
  };

  const selectPlan = (planName) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("plan-selected", { detail: planName }),
    );
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCtaLabel = t(planCategoriesCopy.selectCta, lang);

  return (
    <section className="section plan-guide" id="plans">
      <div className="section-ribbon" aria-hidden="true" />

      <div className="plan-guide-heading">
        <h2>{t(plansSectionCopy.heading, lang)}</h2>
        <p>{t(plansSectionCopy.intro, lang)}</p>
      </div>

      {/* Mobile: native accordions, one per category */}
      <div className="plans-shell plans-mobile">
        {planCategories.map((category) => {
          const Icon = icons[category.id];
          const label = t(categoryLabel(category), lang);
          const description = t(categoryDescription(category), lang);
          return (
            <details
              key={category.id}
              className="plan-accordion"
              {...(category.id === planCategories[0].id ? { open: true } : {})}
            >
              <summary>
                <span className="plan-accordion-label">
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="plan-accordion-chevron"
                />
              </summary>

              <div className="plan-accordion-body">
                <p className="plan-accordion-summary">{description}</p>

                <div
                  className="plan-list"
                  aria-label={`${label} plans`}
                >
                  {category.plans.map((plan) => (
                    <div key={plan.planNo} className="plan-item is-open">
                      <div className="plan-row plan-row--static">
                        <PlanRowContent plan={plan} lang={lang} />
                      </div>
                      <div className="plan-details">
                        <button
                          type="button"
                          className="button button-primary plan-select-btn"
                          onClick={() => selectPlan(plan.name)}
                        >
                          {selectCtaLabel} <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>

      {/* Desktop: sidebar tabs + plan panel */}
      <div
        className="plans-shell plans-desktop"
        style={{ gridTemplateColumns: "310px minmax(0, 1fr)" }}
      >
        <div
          className="plan-tabs"
          role="tablist"
          aria-label="LIC plan goals"
        >
          {planCategories.map((category) => {
            const Icon = icons[category.id];
            const active = category.id === activeId;
            const label = t(categoryLabel(category), lang);
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`plan-tab ${active ? "is-active" : ""}`}
                onClick={() => selectTab(category.id)}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div className="plan-panel" role="tabpanel">
          <div className="plan-panel-intro">
            <ActiveIcon size={30} aria-hidden="true" />
            <div>
              <h3>{t(categoryLabel(activeCategory), lang)}</h3>
              <p>{t(categoryDescription(activeCategory), lang)}</p>
            </div>
          </div>

          <div
            className="plan-list"
            aria-label={`${t(categoryLabel(activeCategory), lang)} plans`}
          >
            {activeCategory.plans.map((plan) => {
              const isExpanded = expandedPlanNo === plan.planNo;
              return (
                <div
                  key={plan.planNo}
                  className={`plan-item ${isExpanded ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="plan-row"
                    onClick={() =>
                      setExpandedPlanNo(isExpanded ? null : plan.planNo)
                    }
                    aria-expanded={isExpanded}
                  >
                    <PlanRowContent plan={plan} lang={lang} />
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="plan-expand-icon"
                    />
                  </button>
                  <div className="plan-details">
                    <div className="plan-details-inner">
                      <div className="plan-detail-row">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{plan.type}</span>
                      </div>
                      <div className="plan-detail-row">
                        <span className="detail-label">UIN:</span>
                        <span className="detail-value">{plan.uin}</span>
                      </div>
                      <button
                        type="button"
                        className="button button-primary plan-select-btn"
                        onClick={() => selectPlan(plan.name)}
                      >
                        {selectCtaLabel} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="official-source-link">
            Plan numbers and UIN references are kept in the site data from{" "}
            {officialPlanSource.label}.
          </p>
        </div>
      </div>

      {/*
        Local CSS for the mobile/desktop split + small additions
        (kicker bullet, official-link chip inside plan rows).
        Globals.css doesn't yet ship these helpers so we co-locate them
        with the only component that needs them.
      */}
      <style>{`
        .plans-mobile { display: grid; gap: 4px; }
        .plans-desktop { display: none; }

        .plan-accordion-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .plan-accordion-label svg { color: var(--lic-saffron); }
        .plan-accordion-body { padding: 2px 0 10px; }
        .plan-accordion-summary {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
          margin: 4px 0 8px;
        }
        .plan-accordion .plan-list { margin-top: 2px; }
        .plan-accordion .plan-item { border-bottom: 1px solid var(--line); }
        .plan-accordion .plan-item:last-child { border-bottom: 0; }
        .plan-row--static {
          width: 100%;
          padding: 10px 0;
          cursor: default;
        }
        .plan-accordion .plan-details { padding-bottom: 10px; }
        .plan-accordion .plan-select-btn {
          min-height: 36px;
          font-size: 13px;
          padding: 6px 18px;
          width: auto;
          justify-self: start;
        }
        .plan-accordion-chevron { transition: transform 200ms ease; color: var(--lic-blue); }
        .plan-accordion[open] .plan-accordion-chevron { transform: rotate(180deg); }

        .plan-row-meta {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 5px 10px;
          margin-top: 6px;
          font-size: 11px;
          color: rgba(74, 83, 104, 0.74);
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }
        .plan-uin {
          font-family: "Courier New", monospace;
          opacity: 0.78;
        }
        .plan-official-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: rgba(0, 44, 119, 0.72);
          font-weight: 800;
          text-decoration: none;
        }
        .plan-official-link:hover { text-decoration: underline; }

        .kicker-bullet { color: var(--lic-saffron); margin-right: 2px; }

        @media (min-width: 1080px) {
          .plans-mobile { display: none; }
          .plans-desktop { display: grid; }
        }
      `}</style>
    </section>
  );
}

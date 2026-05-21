"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ArrowLeft,
  Baby, HandCoins, Landmark, ShieldHalf,
} from "lucide-react";
import {
  officialPlanSource,
  planCategories,
  planCategoriesCopy,
  plansSectionCopy,
} from "../data/siteData";
import { t } from "../data/i18n";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

const icons = {
  "family-security":   ShieldHalf,
  "savings-growth":    HandCoins,
  "children-goals":    Baby,
  "retirement-income": Landmark,
};

function categoryLabel(c) {
  return planCategoriesCopy?.categories?.[c.id]?.label ?? c.label;
}
function categoryDescription(c) {
  return planCategoriesCopy?.categories?.[c.id]?.description ?? c.summary;
}

const GRID_VARIANTS = {
  hidden: { opacity: 0, scale: 0.97 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.28, ease: [0.33,1,0.68,1] } },
  exit:   { opacity: 0, scale: 0.97, transition: { duration: 0.18 } },
};

const EXPAND_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.33,1,0.68,1] } },
  exit:   { opacity: 0, y: 16, transition: { duration: 0.18 } },
};

export default function Plans() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState(null);

  const activeCategory = planCategories.find((c) => c.id === activeId) ?? null;
  const selectCtaLabel = t(planCategoriesCopy.selectCta, lang);

  const selectPlan = (planName) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("plan-selected", { detail: planName }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section plan-guide" id="plans">
      <Reveal>
        <div className="plan-guide-heading">
          <h2>{t(plansSectionCopy.heading, lang)}</h2>
          <p>{t(plansSectionCopy.intro, lang)}</p>
        </div>
      </Reveal>

      <div className="pc-wrap">
        <AnimatePresence mode="wait">

          {/* ── Four cards grid ── */}
          {!activeId && (
            <motion.div
              key="grid"
              className="pc-grid"
              variants={GRID_VARIANTS}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {planCategories.map((category) => {
                const Icon = icons[category.id];
                const label = t(categoryLabel(category), lang);
                const desc  = t(categoryDescription(category), lang);
                return (
                  <motion.button
                    key={category.id}
                    className="pc-card"
                    onClick={() => setActiveId(category.id)}
                    type="button"
                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(255,139,31,0.14)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="pc-card-icon">
                      <Icon size={28} aria-hidden="true" />
                    </span>
                    <strong className="pc-card-label">{label}</strong>
                    <span className="pc-card-desc">{desc}</span>
                    <span className="pc-card-count">{category.plans.length} plans →</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* ── Expanded single-category view ── */}
          {activeId && activeCategory && (
            <motion.div
              key={activeId}
              className="pc-expanded"
              variants={EXPAND_VARIANTS}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Header */}
              <div className="pc-exp-head">
                <button
                  className="pc-back"
                  onClick={() => setActiveId(null)}
                  type="button"
                  aria-label="Back to all plans"
                >
                  <ArrowLeft size={16} />
                  All goals
                </button>
                <div className="pc-exp-title">
                  {(() => {
                    const Icon = icons[activeCategory.id];
                    return <Icon size={22} aria-hidden="true" />;
                  })()}
                  <h3>{t(categoryLabel(activeCategory), lang)}</h3>
                </div>
                <p className="pc-exp-desc">{t(categoryDescription(activeCategory), lang)}</p>
              </div>

              {/* Plans */}
              <div className="pc-plans-row">
                {activeCategory.plans.map((plan, i) => (
                  <motion.div
                    key={plan.planNo}
                    className="pc-plan-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.28, ease: [0.33,1,0.68,1] }}
                  >
                    <div className="pc-plan-head">
                      <span className="plan-chip">{plan.planNo}</span>
                      <span className="pc-plan-type">{plan.type}</span>
                    </div>
                    <strong className="pc-plan-name">{plan.name}</strong>
                    <span className="pc-plan-benefit">{plan.benefit}</span>
                    <div className="pc-plan-meta">
                      <span className="plan-uin">UIN: {plan.uin}</span>
                      <a
                        href={plan.officialUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="plan-official-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t(planCategoriesCopy.officialLink, lang)}
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                    <button
                      type="button"
                      className="button button-primary pc-plan-cta"
                      onClick={() => selectPlan(plan.name)}
                    >
                      {selectCtaLabel} <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>

              <p className="pc-source">Plan data sourced from {officialPlanSource.label}.</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style>{`
        .pc-wrap { max-width: 880px; margin: 0 auto; }

        /* ── Grid: 2×2 ── */
        .pc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        /* ── Category card ── */
        .pc-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 24px 20px 20px;
          background: #fff;
          border: 1.5px solid var(--line);
          border-radius: var(--radius-lg);
          cursor: pointer;
          text-align: left;
          transition: border-color 180ms ease;
          will-change: transform;
        }
        .pc-card:hover { border-color: var(--lic-saffron); }

        .pc-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px; height: 48px;
          border-radius: 12px;
          background: var(--saffron-soft);
          color: var(--lic-saffron);
        }
        .pc-card-label {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
        }
        .pc-card-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.45;
          flex: 1;
        }
        .pc-card-count {
          font-size: 12px;
          font-weight: 700;
          color: var(--lic-saffron);
          letter-spacing: 0.02em;
        }

        /* ── Expanded view ── */
        .pc-expanded {
          background: #fff;
          border: 1.5px solid var(--line);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .pc-exp-head {
          padding: 28px 28px 24px;
          border-bottom: 1px solid var(--line);
          background: var(--paper);
        }
        .pc-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 16px;
          transition: color 150ms ease;
        }
        .pc-back:hover { color: var(--ink); }

        .pc-exp-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--lic-saffron);
          margin-bottom: 8px;
        }
        .pc-exp-title h3 {
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 700;
          color: var(--ink);
          margin: 0;
        }
        .pc-exp-desc {
          font-size: 14px;
          color: var(--muted);
          max-width: 520px;
          line-height: 1.5;
          margin: 0;
        }

        /* ── Plans row inside expanded card ── */
        .pc-plans-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 580px) {
          .pc-plans-row { grid-template-columns: repeat(3, 1fr); }
        }

        .pc-plan-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 24px 28px;
          border-bottom: 1px solid var(--line);
        }
        @media (min-width: 580px) {
          .pc-plan-card {
            border-bottom: none;
            border-right: 1px solid var(--line);
          }
          .pc-plan-card:last-child { border-right: none; }
        }

        .pc-plan-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .pc-plan-type {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--lic-blue);
          background: var(--lic-blue-soft);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .pc-plan-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
        }
        .pc-plan-benefit {
          font-size: 12px;
          color: var(--muted);
        }
        .pc-plan-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px 10px;
          font-size: 11px;
          margin-top: 2px;
        }
        .pc-plan-cta {
          align-self: flex-start;
          margin-top: 10px;
          min-height: 34px;
          font-size: 12px;
          padding: 5px 14px;
        }

        .pc-source {
          padding: 12px 28px;
          font-size: 11px;
          color: var(--muted);
          border-top: 1px solid var(--line);
          background: var(--paper);
        }
      `}</style>
    </section>
  );
}

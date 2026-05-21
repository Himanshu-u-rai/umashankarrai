"use client";

import { useState } from "react";
import { ArrowRight, Baby, HandCoins, Landmark, ShieldHalf } from "lucide-react";
import { officialPlanSource, planCategories } from "../data/siteData";

const icons = {
  "family-security": ShieldHalf,
  "savings-growth": HandCoins,
  "children-goals": Baby,
  "retirement-income": Landmark,
};

export default function Plans() {
  const [activeId, setActiveId] = useState(planCategories[0].id);
  const activeCategory = planCategories.find((category) => category.id === activeId) ?? planCategories[0];
  const ActiveIcon = icons[activeCategory.id];

  const selectPlan = (planName) => {
    window.dispatchEvent(new CustomEvent("plan-selected", { detail: planName }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section plan-guide" id="plans">
      <div className="plan-guide-heading">
        <p className="section-kicker">Plan guide</p>
        <h2>Start with the goal.</h2>
        <p>
          Pick the outcome first. The exact premium and benefit illustration is prepared
          through LIC official process during consultation.
        </p>
      </div>

      <div className="plans-shell">
        <div className="plan-tabs" role="tablist" aria-label="LIC plan goals">
          {planCategories.map((category) => {
            const Icon = icons[category.id];
            const active = category.id === activeId;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`plan-tab ${active ? "is-active" : ""}`}
                onClick={() => setActiveId(category.id)}
              >
                <Icon size={20} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="plan-panel" role="tabpanel">
          <div className="plan-panel-intro">
            <ActiveIcon size={30} />
            <div>
              <h3>{activeCategory.label}</h3>
              <p>{activeCategory.summary}</p>
            </div>
          </div>

          <div className="plan-list" aria-label={`${activeCategory.label} plans`}>
            {activeCategory.plans.map((plan) => (
              <button key={plan.planNo} type="button" className="plan-row" onClick={() => selectPlan(plan.name)}>
                <span className="plan-number">{plan.planNo}</span>
                <span>
                  <strong>{plan.name}</strong>
                  <small>{plan.benefit}</small>
                </span>
                <em>Select</em>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>

          <p className="official-source-link">
            Plan numbers and UIN references are kept in the site data from {officialPlanSource.label}.
          </p>
        </div>
      </div>
    </section>
  );
}

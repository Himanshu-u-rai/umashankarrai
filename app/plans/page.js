import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LocalizedDocumentTitle from "../components/LocalizedDocumentTitle";
import LocalizedText from "../components/LocalizedText";
import {
  officialInsurancePlanGroups,
  pensionPlanGroup,
  officialPlansCopy,
  officialPlanSources,
  officialPlanStats,
} from "../data/officialPlans";
import styles from "./plans.module.css";

export const metadata = {
  title: "LIC Plans Catalogue",
  description:
    "Review current LIC insurance and pension products by category, with plan numbers, UINs, official LIC references, and advisor quote support.",
};

function SourceLink({ source }) {
  return (
    <a className={styles.sourceLink} href={source.url} target="_blank" rel="noopener noreferrer">
      <LocalizedText value={source.label} />
      <ExternalLink size={14} aria-hidden="true" />
    </a>
  );
}

function PlanCard({ plan }) {
  return (
    <article className={styles.planCard}>
      <div>
        <div className={styles.planMeta}>
          <span className={styles.chip}>
            <LocalizedText value={officialPlansCopy.planLabel} /> {plan.planNo}
          </span>
          <span className={styles.statusChip}>UIN {plan.uin}</span>
        </div>
        <h3><LocalizedText value={plan.nameCopy ?? plan.name} /></h3>
        <p><LocalizedText value={plan.summary} /></p>
      </div>
      <div className={styles.cardActions}>
        <Link className={styles.knowMore} href={`/plans/${plan.slug}`}>
          <LocalizedText value={officialPlansCopy.knowMore} />
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <a className={styles.officialLink} href={plan.officialUrl} target="_blank" rel="noopener noreferrer">
          <LocalizedText value={officialPlansCopy.officialLic} />
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function PlanGroup({ group }) {
  return (
    <section className={styles.groupSection} id={group.id}>
      <header className={styles.groupHead}>
        <div>
          <p className={styles.eyebrow}><LocalizedText value={group.source.label} /></p>
          <h2><LocalizedText value={group.titleCopy ?? group.title} /></h2>
          <p><LocalizedText value={group.description} /></p>
        </div>
        <span className={styles.countBadge}>
          {group.plans.length} <LocalizedText value={officialPlansCopy.products} />
        </span>
      </header>
      <div className={styles.planGrid}>
        {group.plans.map((plan) => (
          <PlanCard plan={plan} key={plan.slug} />
        ))}
      </div>
    </section>
  );
}

export default function OfficialPlansPage() {
  return (
    <main id="top" className={styles.plansPage}>
      <LocalizedDocumentTitle title={officialPlansCopy.catalogueTitle} />
      <Header />
          <div className={styles.plansShell}>
            <Link className={styles.backLink} href="/">
              <ArrowLeft size={16} aria-hidden="true" />
              <LocalizedText value={officialPlansCopy.backHome} />
            </Link>

            <header className={styles.catalogueHero}>
              <div>
                <p className={styles.eyebrow}><LocalizedText value={officialPlansCopy.planReference} /></p>
                <h1><LocalizedText value={officialPlansCopy.catalogueTitle} /></h1>
                <p className={styles.heroLead}>
                  <LocalizedText value={officialPlansCopy.catalogueLead} />
                </p>
                <div className={styles.sourceLinks}>
                  <SourceLink source={officialPlanSources.insurance} />
              <SourceLink source={officialPlanSources.pension} />
            </div>
          </div>

          <div className={styles.statRail} aria-label="Official plan counts">
            <div>
              <strong>{officialPlanStats.insuranceGroupCount}</strong>
              <span><LocalizedText value={officialPlansCopy.insuranceGroups} /></span>
            </div>
            <div>
              <strong>{officialPlanStats.insurancePlanCount}</strong>
              <span><LocalizedText value={officialPlansCopy.insuranceProducts} /></span>
            </div>
            <div>
              <strong>{officialPlanStats.pensionPlanCount}</strong>
              <span><LocalizedText value={officialPlansCopy.pensionProducts} /></span>
            </div>
          </div>
        </header>

        <div className={styles.catalogueBlock}>
          {officialInsurancePlanGroups.map((group) => (
            <PlanGroup group={group} key={group.id} />
          ))}

          <PlanGroup group={pensionPlanGroup} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

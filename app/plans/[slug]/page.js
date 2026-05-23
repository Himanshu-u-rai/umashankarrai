import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LocalizedDocumentTitle from "../../components/LocalizedDocumentTitle";
import LocalizedText from "../../components/LocalizedText";
import PlanCalculatorPanel from "../../components/PlanCalculatorPanel";
import PlanQuoteForm from "../../components/PlanQuoteForm";
import {
  allOfficialPlans,
  getOfficialPlanBySlug,
  getRelatedOfficialPlans,
  officialPlansCopy,
} from "../../data/officialPlans";
import styles from "../plans.module.css";

export function generateStaticParams() {
  return allOfficialPlans.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const plan = getOfficialPlanBySlug(slug);

  if (!plan) {
    return {
      title: "LIC Plan Not Found",
    };
  }

  return {
    title: `${plan.name} | LIC Plan Details`,
    description: `${plan.name} plan details, plan number ${plan.planNo}, UIN ${plan.uin}, official LIC source links, and advisor quote request.`,
  };
}

export default async function OfficialPlanDetailPage({ params }) {
  const { slug } = await params;
  const plan = getOfficialPlanBySlug(slug);

  if (!plan) notFound();

  const relatedPlans = getRelatedOfficialPlans(plan);

  return (
    <main id="top" className={styles.plansPage}>
      <LocalizedDocumentTitle
        title={{
          en: `${plan.name} | LIC Plan Details`,
          hi: `${plan.nameCopy?.hi ?? plan.name} | एलआईसी योजना विवरण`,
        }}
      />
      <Header />
      <div className={styles.plansShell}>
        <Link className={styles.backLink} href="/plans">
          <ArrowLeft size={16} aria-hidden="true" />
          <LocalizedText value={officialPlansCopy.backAllPlans} />
        </Link>

        <header className={styles.detailHero}>
          <div>
            <p className={styles.eyebrow}><LocalizedText value={plan.groupTitleCopy ?? plan.groupTitle} /></p>
            <h1><LocalizedText value={plan.nameCopy ?? plan.name} /></h1>
            <p className={styles.heroLead}><LocalizedText value={plan.summary} /></p>
            <div className={styles.detailMeta}>
              <span className={styles.chip}>
                <LocalizedText value={officialPlansCopy.planLabel} /> {plan.planNo}
              </span>
              <span className={styles.statusChip}>UIN {plan.uin}</span>
              <span className={styles.statusChip}>
                <LocalizedText value={officialPlansCopy.sourceUpdated} /> {plan.sourceUpdated}
              </span>
            </div>
          </div>

          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#quote">
              <LocalizedText value={officialPlansCopy.requestExactQuote} />
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className={styles.secondaryAction} href={plan.officialUrl} target="_blank" rel="noopener noreferrer">
              <LocalizedText value={officialPlansCopy.officialLicPage} />
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className={styles.detailLayout}>
          <div className={styles.detailMain}>
            <section className={styles.infoSection}>
              <p className={styles.eyebrow}><LocalizedText value={officialPlansCopy.planHighlights} /></p>
              <h2><LocalizedText value={officialPlansCopy.reviewBeforeShortlisting} /></h2>
              <ul className={styles.cleanList}>
                {plan.features.map((feature) => (
                  <li key={feature.en ?? feature}><LocalizedText value={feature} /></li>
                ))}
              </ul>
            </section>

            <section className={styles.infoSection}>
              <p className={styles.eyebrow}><LocalizedText value={officialPlansCopy.eligibility} /></p>
              <h2><LocalizedText value={officialPlansCopy.eligibilityChecks} /></h2>
              <ul className={styles.cleanList}>
                {plan.eligibility.map((item) => (
                  <li key={item.en ?? item}><LocalizedText value={item} /></li>
                ))}
              </ul>
            </section>

            <section className={styles.infoSection}>
              <p className={styles.eyebrow}><LocalizedText value={officialPlansCopy.documents} /></p>
              <h2><LocalizedText value={officialPlansCopy.officialReferences} /></h2>
              <ul className={styles.documentList}>
                {plan.documents.map((document) => (
                  <li key={document.url}>
                    <a className={styles.documentLink} href={document.url} target="_blank" rel="noopener noreferrer">
                      {document.label}
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {relatedPlans.length > 0 && (
              <section className={styles.infoSection}>
                <p className={styles.eyebrow}><LocalizedText value={officialPlansCopy.sameCategory} /></p>
                <h2><LocalizedText value={officialPlansCopy.relatedPlans} /></h2>
                <div className={styles.relatedGrid}>
                  {relatedPlans.map((related) => (
                    <Link className={styles.relatedCard} href={`/plans/${related.slug}`} key={related.slug}>
                      <strong><LocalizedText value={related.nameCopy ?? related.name} /></strong>
                      <span>
                        <LocalizedText value={officialPlansCopy.planLabel} /> {related.planNo} · UIN {related.uin}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.detailAside}>
            <PlanCalculatorPanel plan={plan} />
            <PlanQuoteForm plan={plan} />
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}

import { ExternalLink, ShieldCheck } from "lucide-react";
import { officialPlanSource } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="footer-brand" href="#top">
          <ShieldCheck size={20} />
          <span>Umashankar Rai</span>
        </a>
        <p>
          Independent advisor website for LIC planning conversations. Final policy
          terms, premium values, and benefits must be confirmed through LIC official
          process.
        </p>
      </div>

      <nav aria-label="Footer navigation">
        <a href="#plans">Plans</a>
        <a href="#advisor">Advisor method</a>
        <a href="#contact">Request consultation</a>
        <a href="#faq">FAQ</a>
      </nav>

      <div className="footer-source">
        <span>Plan data reference</span>
        <a href={officialPlanSource.url} target="_blank" rel="noreferrer">
          LIC official list <ExternalLink size={14} />
        </a>
      </div>

      <small>Copyright 2026 Umashankar Rai. All rights reserved.</small>
    </footer>
  );
}

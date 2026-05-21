import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">LIC insurance advisor</p>
          <div className="hero-nameplate" aria-label="Umashankar Rai">
            <span>Umashankar</span>
            <span>Rai</span>
          </div>
          <p className="hero-subtitle">
            Plan-first LIC guidance for families who want clear choices, private
            consultation, and steady paperwork support.
          </p>
        </div>

        <div className="hero-portrait" aria-label="Portrait of Umashankar Rai">
          <div className="portrait-slab" />
          <Image
            src="/umashankar-rai-portrait.png"
            alt="Umashankar Rai"
            width={1172}
            height={1342}
            priority
            sizes="(max-width: 760px) 84vw, 48vw"
            className="portrait-image"
          />
        </div>

        <div className="hero-actions">
          <a className="button button-primary" href="#plans">
            Explore LIC plans <ArrowRight size={18} />
          </a>
          <a className="button button-secondary" href="#contact">
            Request consultation
          </a>
        </div>
      </div>
    </section>
  );
}

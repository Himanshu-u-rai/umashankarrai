"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { t } from "../data/i18n";
import { hasWhatsApp, trustCopy, whatsappLink } from "../data/siteData";

/**
 * TestimonialCarousel
 * -------------------
 * Renders a horizontal scroll-snap rail of testimonial cards (mobile) that
 * becomes a 3-up grid on desktop (governed by `globals.css`). A row of dots
 * underneath reflects the currently-visible card via `IntersectionObserver`
 * and acts as click targets that scroll the matching card into view.
 *
 * Renders a single "empty state" CTA card when `items` is empty, so the
 * section never collapses to nothing during the pre-launch period.
 */
export default function TestimonialCarousel({ items = [] }) {
  const { lang } = useLang();
  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const isEmpty = !Array.isArray(items) || items.length === 0;

  // Reset stored card refs whenever the list length changes.
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items?.length ?? 0);
  }, [items]);

  // Track which card is most visible — drives the active dot indicator.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (isEmpty) return undefined;
    if (typeof window.IntersectionObserver !== "function") return undefined;

    const rail = railRef.current;
    if (!rail) return undefined;

    const observer = new window.IntersectionObserver(
      (entries) => {
        let best = { index: activeIndex, ratio: 0 };
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute("data-index"));
          if (Number.isNaN(idx)) continue;
          if (entry.intersectionRatio > best.ratio) {
            best = { index: idx, ratio: entry.intersectionRatio };
          }
        }
        if (best.ratio > 0) {
          setActiveIndex((prev) => (prev === best.index ? prev : best.index));
        }
      },
      {
        root: rail,
        threshold: [0.25, 0.5, 0.75, 1],
      },
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
    // We intentionally re-run when item count changes; activeIndex is read
    // as initial state only and updates via setState inside the callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, isEmpty]);

  const handleDotClick = (index) => {
    const node = cardRefs.current[index];
    if (!node) return;
    if (typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setActiveIndex(index);
  };

  if (isEmpty) {
    const greeting = t(trustCopy.emptyTestimonialWhatsAppGreeting, lang);
    const emptyHref = hasWhatsApp ? whatsappLink(greeting) : "#contact";
    return (
      <div className="testimonial-rail" ref={railRef}>
        <article
          className="testimonial-card testimonial-card--empty"
          data-index="0"
          ref={(node) => {
            cardRefs.current[0] = node;
          }}
        >
          <blockquote>{t(trustCopy.emptyTestimonialTitle, lang)}</blockquote>
          <p>{t(trustCopy.emptyTestimonialBody, lang)}</p>
          <a
            className="button button-primary"
            href={emptyHref}
            target={hasWhatsApp ? "_blank" : undefined}
            rel={hasWhatsApp ? "noopener noreferrer" : undefined}
          >
            {t(trustCopy.emptyTestimonialCta, lang)}
          </a>
        </article>
      </div>
    );
  }

  return (
    <>
      <div className="testimonial-rail" ref={railRef}>
        {items.map((item, index) => (
          <article
            className="testimonial-card"
            key={item.id ?? index}
            data-index={index}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
          >
            <blockquote>{t(item.quote, lang)}</blockquote>
            <cite>
              {item.avatarSrc ? (
                // 64px circular avatars — native lazy <img> is intentional
                // here. Per AGENTS.md / P1.4 spec: "small avatar (lazy <img>
                // 64px circle)". next/image would add layout overhead for
                // tiny thumbnails inside an already-streamed list.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.avatarSrc}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <span>
                {item.name}
                {item.city ? ` · ${item.city}` : ""}
                {item.planRef ? ` · ${item.planRef}` : ""}
              </span>
            </cite>
          </article>
        ))}
      </div>
      {items.length > 1 ? (
        <div className="testimonial-dots" role="tablist" aria-label="Testimonials">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id ?? index}
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

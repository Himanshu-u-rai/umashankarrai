"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 420;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY > SCROLL_THRESHOLD;
      setVisible((current) => {
        if (current !== shouldShow) setHasToggled(true);
        return shouldShow;
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const stateClass = visible ? "is-visible" : hasToggled ? "is-hidden" : "";

  return (
    <button
      className={`back-to-top ${stateClass}`}
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
    >
      <ArrowUp size={24} strokeWidth={2.6} aria-hidden="true" />
    </button>
  );
}

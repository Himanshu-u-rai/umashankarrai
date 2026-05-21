"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/siteData";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="faq-heading">
        <p className="section-kicker">Questions</p>
        <h2>Before you request a consultation.</h2>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const open = index === openIndex;
          return (
            <div className={`faq-item ${open ? "is-open" : ""}`} key={faq.question}>
              <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
                <span>{faq.question}</span>
                <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

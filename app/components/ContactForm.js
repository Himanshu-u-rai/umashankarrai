"use client";

import { useEffect, useState } from "react";
import { MailCheck, Send, ShieldCheck } from "lucide-react";
import { allPlans, defaultPlanName } from "../data/siteData";

const advisorEmail = "lic.umashanker@gmail.com";

const initialForm = {
  name: "",
  visitorPhone: "",
  plan: defaultPlanName,
  preferredTime: "Morning",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onPlanSelected = (event) => {
      setForm((current) => ({ ...current, plan: event.detail || current.plan }));
    };

    window.addEventListener("plan-selected", onPlanSelected);
    return () => window.removeEventListener("plan-selected", onPlanSelected);
  }, []);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitInquiry = (event) => {
    event.preventDefault();

    const subject = `LIC plan inquiry - ${form.plan}`;
    const body = [
      "Hello Umashankar Rai,",
      "",
      "I would like to request a LIC plan consultation.",
      "",
      `Name: ${form.name || "Not provided"}`,
      `Visitor phone: ${form.visitorPhone || "Not provided"}`,
      `Interested plan: ${form.plan}`,
      `Preferred time: ${form.preferredTime}`,
      `Message: ${form.message || "Not provided"}`,
      "",
      "Please share the next steps for an official LIC illustration.",
    ].join("\n");

    window.location.href = `mailto:${advisorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-copy">
        <p className="section-kicker">Request consultation</p>
        <h2>Send the plan context before the first call.</h2>
        <p>
          The form opens a mail draft from your device. Private advisor contact
          details are intentionally not printed on the page.
        </p>
        <div className="privacy-note">
          <ShieldCheck size={19} />
          <span>No public phone or email display. No backend storage in this version.</span>
        </div>
      </div>

      <form className="contact-form" onSubmit={submitInquiry}>
        <label>
          Full name
          <input type="text" value={form.name} onChange={updateField("name")} placeholder="Your name" />
        </label>
        <label>
          Your phone number
          <input
            type="tel"
            value={form.visitorPhone}
            onChange={updateField("visitorPhone")}
            placeholder="For callback coordination"
          />
        </label>
        <label>
          Interested LIC plan
          <select value={form.plan} onChange={updateField("plan")}>
            {allPlans.map((plan) => (
              <option key={plan.planNo} value={plan.name}>
                {plan.name} - Plan {plan.planNo}
              </option>
            ))}
          </select>
        </label>
        <label>
          Preferred time
          <select value={form.preferredTime} onChange={updateField("preferredTime")}>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
        <label>
          Message
          <textarea
            value={form.message}
            onChange={updateField("message")}
            placeholder="Goal, age, income range, existing LIC policy, or question"
            rows={4}
          />
        </label>

        <button className="button button-primary" type="submit">
          Open mail draft <Send size={17} />
        </button>

        {submitted && (
          <p className="form-status">
            <MailCheck size={17} /> Mail draft opened. Send it from your email app to request the illustration.
          </p>
        )}
      </form>
    </section>
  );
}

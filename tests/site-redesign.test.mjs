import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const appFiles = [
  "app/page.js",
  "app/layout.js",
  "app/components/Header.js",
  "app/components/Hero.js",
  "app/components/Plans.js",
  "app/components/About.js",
  "app/components/TrustSignals.js",
  "app/components/ContactForm.js",
  "app/components/Faq.js",
  "app/components/Footer.js",
  "app/components/StickyMobileCTA.js",
  "app/components/BackToTop.js",
  "app/components/MetricCounter.js",
  "app/components/TestimonialCarousel.js",
];

test("page composition stays server-rendered while interactive sections remain isolated", () => {
  const page = read("app/page.js");
  const trust = read("app/components/TrustSignals.js");

  assert.ok(!page.startsWith('"use client";'), "app/page.js should not be a client component");
  assert.ok(page.includes("<Hero />"), "hero should remain part of the page composition");
  assert.ok(page.includes("<Plans />"), "plans guide should remain part of the page composition");
  assert.ok(page.includes("<ContactForm />"), "contact form should remain part of the page composition");
  assert.ok(!page.includes("<Calculator />"), "portfolio site should not include a calculator section");
  assert.match(trust, /id="trust"/, "header Trust link should scroll to a real section anchor");
});

test("portrait-led redesign uses public assets and next/image instead of raw img tags", () => {
  assert.ok(
    existsSync(new URL("../public/portrait/hero-1080.webp", import.meta.url)),
    "hero portrait should be available in public/portrait"
  );
  assert.ok(
    existsSync(new URL("../public/portrait/studio-1080.webp", import.meta.url)),
    "advisor portrait should be available in public/portrait"
  );

  const hero = read("app/components/Hero.js");
  const about = read("app/components/About.js");

  assert.match(hero, /from "next\/image"/, "hero should import next/image");
  assert.match(hero, /portrait\/hero-1080\.webp/, "hero should use the optimized portrait asset");
  assert.match(about, /from "next\/image"/, "about section should import next/image");
  assert.match(about, /portrait\/studio-1080\.webp/, "about section should use the optimized studio portrait asset");
});

test("hero stays minimal and uncluttered", () => {
  const hero = read("app/components/Hero.js");
  const css = read("app/globals.css");
  const copyIndex = hero.indexOf('className="hero-copy"');
  const portraitIndex = hero.indexOf('className="hero-portrait"');
  const actionsIndex = hero.indexOf('className="hero-actions"');

  assert.match(hero, /hero-stage/, "hero should have a poster-style stage wrapper");
  assert.match(hero, /hero-nameplate/, "hero should separate the oversized name composition");
  assert.ok(copyIndex < portraitIndex, "hero copy should render before the portrait");
  assert.ok(portraitIndex < actionsIndex, "hero actions should render below the portrait in source order");
  assert.ok(!hero.includes("hero-proof-rail"), "hero should not include a proof rail");
  assert.ok(!hero.includes("hero-watermark"), "hero should not include a decorative watermark");
  assert.ok(!hero.includes("hero-assurance"), "hero should not include a secondary assurance row");
  assert.match(hero, /from "next\/link"/, "hero should use Next links for internal navigation");
  assert.match(hero, /<Link className="button button-secondary" href="\/plans">/, "hero Explore plans CTA should open the dedicated plans catalogue");
  assert.match(css, /grid-template-areas:\s*"\. visual"\s*"copy visual"\s*"actions visual"/, "desktop hero should keep actions with the text column");
  assert.match(css, /grid-template-areas:\s*"visual"\s*"copy"\s*"actions"/, "mobile hero should keep the portrait-led order");
});

test("header keeps desktop navigation semantics while mobile menu behaves like a dialog", () => {
  const header = read("app/components/Header.js");

  assert.ok(!header.includes('role="dialog"'), "desktop nav should not always be exposed as a dialog");
  assert.match(header, /role=\{menuOpen \? "dialog" : undefined\}/, "mobile menu should only use dialog role while open");
  assert.match(header, /aria-modal=\{menuOpen \? "true" : undefined\}/, "mobile menu should only be modal while open");
  assert.match(header, /usePathname/, "shared header should route section anchors correctly off the homepage");
});

test("back to top control matches site theme and clears mobile chrome", () => {
  const layout = read("app/layout.js");
  const backToTop = read("app/components/BackToTop.js");
  const css = read("app/globals.css");

  assert.match(layout, /<BackToTop \/>/, "back to top button should be global");
  assert.match(backToTop, /aria-label="Back to top"/, "button should have a clear accessible label");
  assert.match(backToTop, /window\.scrollTo\(\{\s*top:\s*0/, "button should scroll to the top");
  assert.match(backToTop, /prefers-reduced-motion/, "button should respect reduced motion preferences");
  assert.ok(!backToTop.includes("7c4dff"), "button should not use the sample purple gradient");
  assert.ok(!backToTop.includes("00d4ff"), "button should not use the sample cyan gradient");
  assert.match(css, /\.back-to-top/, "back to top styles should be in global CSS");
  assert.match(css, /var\(--lic-blue\)/, "button should use the LIC blue token");
  assert.match(css, /var\(--lic-saffron\)/, "button should use the LIC saffron token");
  assert.match(css, /bottom:\s*calc\(74px \+ var\(--safe-bottom\)\)/, "mobile position should clear the sticky CTA bar");
  assert.match(css, /@media \(min-width:\s*1080px\)[\s\S]*\.back-to-top/, "desktop position should be adjusted independently");
}
);

test("raw private contact details are not visibly rendered", () => {
  const allSource = appFiles.map(read).join("\n");
  const footer = read("app/components/Footer.js");
  const sticky = read("app/components/StickyMobileCTA.js");
  const data = read("app/data/siteData.js");

  assert.ok(!allSource.includes("9427201408"), "phone number should not be present in rendered source");
  assert.ok(!allSource.includes("+91 98765 43210"), "placeholder phone number should be removed");
  assert.ok(!allSource.includes("advisor@licindia.com"), "placeholder email should be removed");
  assert.ok(!allSource.includes(">lic.umashanker@gmail.com<"), "email should not be rendered as visible text");
  assert.ok(!footer.includes("{advisor.phone}"), "footer should not visibly render advisor phone");
  assert.ok(!footer.includes("{advisor.email}"), "footer should not visibly render advisor email");
  assert.ok(!sticky.includes("telLink()"), "sticky mobile bar should not link to an unavailable phone number");
  assert.ok(!data.match(/disclaimer:[\s\S]*TODO\(owner\)/), "visible disclaimer copy should not contain TODO placeholders");
});

test("contact form opens an encoded mail draft without a backend dependency", () => {
  const contactForm = read("app/components/ContactForm.js");
  const css = read("app/globals.css");
  const data = read("app/data/siteData.js");

  assert.match(contactForm, /mailtoLink\(subject, body\)/, "form submission should use a mailto draft helper");
  assert.ok(data.includes("return `mailto:${advisor.email}"), "mailto helper should create a mailto draft");
  assert.match(data, /encodeURIComponent/, "mail draft subject/body should be encoded");
  assert.match(contactForm, /preferredTime/, "form should collect preferred callback time");
  assert.match(css, /\.contact-radio-group/, "preferred contact fieldset should be styled");
  assert.match(css, /\.radio-pill/, "preferred contact radio labels should be styled");
  assert.match(css, /\.contact-form \.radio-pill/, "radio pills should override generic form label layout");
  assert.match(css, /\.radio-pill input/, "radio inputs should be sized inside the pill treatment");
  assert.match(read("app/components/Footer.js"), /\.ft-contact-link/, "footer contact links should have their own mobile spacing");
});

test("visible form controls use the site control system instead of browser defaults", () => {
  const themedSelectPath = new URL("../app/components/ThemedSelect.js", import.meta.url);
  assert.ok(existsSync(themedSelectPath), "site should have a reusable themed select component");

  const themedSelect = read("app/components/ThemedSelect.js");
  const contactForm = read("app/components/ContactForm.js");
  const calculator = read("app/components/PlanCalculatorPanel.js");
  const quoteForm = read("app/components/PlanQuoteForm.js");
  const css = read("app/globals.css");
  const planCss = read("app/plans/plans.module.css");

  assert.match(themedSelect, /role="listbox"/, "themed dropdown should expose listbox semantics");
  assert.match(themedSelect, /aria-expanded=\{open\}/, "dropdown trigger should expose open state");
  assert.match(themedSelect, /ArrowDown/, "dropdown should support keyboard navigation");
  assert.match(
    themedSelect,
    /typeof option !== "object"/,
    "dropdown options should support primitive calculator values like booleans and numbers"
  );
  assert.match(
    themedSelect,
    /String\(option\.value\) === currentValue/,
    "dropdown should match native form value behavior for boolean-like strings"
  );
  assert.match(contactForm, /ThemedSelect/, "homepage contact form should use the themed dropdown");
  assert.ok(!contactForm.includes("<select"), "homepage contact form should not render native select controls");
  assert.match(calculator, /ThemedSelect/, "calculator quote inputs should use the themed dropdown");
  assert.ok(!calculator.includes("<select"), "calculator should not render native select controls");
  assert.match(quoteForm, /ThemedSelect/, "plan quote form should use the themed dropdown");
  assert.ok(!quoteForm.includes("<select"), "plan quote form should not render native select controls");
  assert.match(css, /\.theme-select-trigger/, "themed select trigger should be styled globally");
  assert.match(css, /\.theme-select-menu/, "themed select menu should be styled globally");
  assert.match(css, /appearance:\s*none/, "browser-native control appearance should be reset");
  assert.match(css, /input\[type="number"\]::-webkit-outer-spin-button/, "number spinners should be removed");
  assert.match(planCss, /::-webkit-slider-thumb/, "calculator slider thumb should be custom styled");
  assert.match(planCss, /::-moz-range-thumb/, "Firefox slider thumb should be custom styled");
});

test("trust section reads as an advisor promise instead of a metrics dashboard", () => {
  const trust = read("app/components/TrustSignals.js");
  const css = read("app/globals.css");
  const data = read("app/data/siteData.js");

  assert.match(data, /promiseItems/, "trust copy should be promise-led structured content");
  assert.match(trust, /advisor-promise/, "trust section should use the advisor promise layout");
  assert.match(trust, /trust-promise-list/, "trust section should render a structured promise list");
  assert.ok(!trust.includes("metric-rail"), "trust section should not render metric cards");
  assert.ok(!trust.includes("MetricCounter"), "trust section should not depend on the old metric counter");
  assert.ok(!trust.includes("TestimonialCarousel"), "trust section should not show an empty testimonial card");
  assert.match(css, /\.advisor-promise/, "advisor promise shell should be styled");
  assert.match(css, /\.trust-promise-list/, "promise list should be styled");
  assert.match(css, /\.promise-row/, "promise rows should be styled");
  assert.match(css, /scroll-margin-top:\s*calc\(var\(--header-h\)/, "trust anchor should clear the fixed header");
});

test("plan guide uses official LIC identifiers without fake calculator outputs", () => {
  const plans = read("app/components/Plans.js");
  const data = read("app/data/siteData.js");
  const css = read("app/globals.css");

  assert.match(data, /officialPlanSource/, "plan data should record the official LIC source");
  assert.match(data, /512N304V03/, "plan data should include LIC UINs from the official list");
  assert.match(data, /slug:\s*"lic-jeevan-labh-plan-736"/, "homepage plan entries should map to official detail pages");
  assert.match(data, /selectCta:\s*\{\s*en:\s*"Know more"/, "homepage plan CTA should say Know more");
  assert.match(data, /allPlansCta/, "plan guide should expose a catalogue CTA label");
  assert.match(plans, /from "next\/link"/, "homepage plan guide should use Next links for internal plan routes");
  assert.match(plans, /href=\{`\/plans\/\$\{plan\.slug\}`\}/, "product CTAs should link to dedicated plan pages");
  assert.match(plans, /href="\/plans"/, "plan guide should include a link to the full plans catalogue");
  assert.match(css, /\.plan-guide-heading\s*>\s*p/, "plan guide intro spacing should not depend on being the last child");
  assert.ok(!css.includes(".plan-guide-heading p:last-child"), "plan guide intro should keep its spacing after the catalogue CTA");
  assert.ok(!plans.includes("plan-selected"), "product CTA should not preselect the contact form anymore");
  assert.ok(!plans.includes("Official source"), "plan rows should not be cluttered with source links");
  assert.ok(!plans.includes("UIN {plan.uin}"), "plan rows should not show UINs inline");
  assert.ok(!plans.includes("Math.pow"), "plan guide should not estimate fake compound returns");
  assert.ok(!plans.includes("Estimated maturity"), "plan guide should not show fake maturity values");
});

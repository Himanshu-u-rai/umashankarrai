import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const appFiles = [
  "app/page.js",
  "app/components/Header.js",
  "app/components/Hero.js",
  "app/components/Plans.js",
  "app/components/About.js",
  "app/components/TrustSignals.js",
  "app/components/ContactForm.js",
  "app/components/Faq.js",
  "app/components/Footer.js",
];

test("page composition stays server-rendered while interactive sections remain isolated", () => {
  const page = read("app/page.js");

  assert.ok(!page.startsWith('"use client";'), "app/page.js should not be a client component");
  assert.ok(page.includes("<Hero />"), "hero should remain part of the page composition");
  assert.ok(page.includes("<Plans />"), "plans guide should remain part of the page composition");
  assert.ok(page.includes("<ContactForm />"), "contact form should remain part of the page composition");
  assert.ok(!page.includes("<Calculator />"), "portfolio site should not include a calculator section");
});

test("portrait-led redesign uses public assets and next/image instead of raw img tags", () => {
  assert.ok(
    existsSync(new URL("../public/umashankar-rai-portrait.png", import.meta.url)),
    "transparent portrait should be available in public/"
  );

  const hero = read("app/components/Hero.js");
  const about = read("app/components/About.js");
  const allSource = appFiles.map(read).join("\n");

  assert.match(hero, /from "next\/image"/, "hero should import next/image");
  assert.match(hero, /umashankar-rai-portrait\.png/, "hero should use the new portrait asset");
  assert.match(about, /from "next\/image"/, "about section should import next/image");
  assert.ok(!allSource.includes("<img"), "raw img tags should not be used in app components");
});

test("hero stays minimal and uncluttered", () => {
  const hero = read("app/components/Hero.js");
  const css = read("app/globals.css");

  assert.match(hero, /hero-stage/, "hero should have a poster-style stage wrapper");
  assert.match(hero, /hero-nameplate/, "hero should separate the oversized name composition");
  assert.ok(!hero.includes("hero-proof-rail"), "hero should not include a proof rail");
  assert.ok(!hero.includes("hero-watermark"), "hero should not include a decorative watermark");
  assert.ok(!hero.includes("hero-assurance"), "hero should not include a secondary assurance row");
  assert.match(css, /grid-template-areas:\s*"copy visual"/, "desktop hero should be composition-driven");
  assert.match(css, /grid-template-areas:\s*"copy"\s*"visual"/, "mobile hero should remain simple");
});

test("raw private contact details are not visibly rendered", () => {
  const allSource = appFiles.map(read).join("\n");

  assert.ok(!allSource.includes("9427201408"), "phone number should not be present in rendered source");
  assert.ok(!allSource.includes("+91 98765 43210"), "placeholder phone number should be removed");
  assert.ok(!allSource.includes("advisor@licindia.com"), "placeholder email should be removed");
  assert.ok(!allSource.includes(">lic.umashanker@gmail.com<"), "email should not be rendered as visible text");
});

test("contact form opens an encoded mail draft without a backend dependency", () => {
  const contactForm = read("app/components/ContactForm.js");

  assert.match(contactForm, /lic\.umashanker@gmail\.com/, "mail draft should target the configured email");
  assert.match(contactForm, /mailto:/, "form submission should use a mailto draft");
  assert.match(contactForm, /encodeURIComponent/, "mail draft subject/body should be encoded");
  assert.match(contactForm, /preferredTime/, "form should collect preferred callback time");
});

test("plan guide uses official LIC identifiers without fake calculator outputs", () => {
  const plans = read("app/components/Plans.js");
  const data = read("app/data/siteData.js");

  assert.match(data, /officialPlanSource/, "plan data should record the official LIC source");
  assert.match(data, /512N304V03/, "plan data should include LIC UINs from the official list");
  assert.ok(!plans.includes("Official source"), "plan rows should not be cluttered with source links");
  assert.ok(!plans.includes("UIN {plan.uin}"), "plan rows should not show UINs inline");
  assert.ok(!plans.includes("Math.pow"), "plan guide should not estimate fake compound returns");
  assert.ok(!plans.includes("Estimated maturity"), "plan guide should not show fake maturity values");
});

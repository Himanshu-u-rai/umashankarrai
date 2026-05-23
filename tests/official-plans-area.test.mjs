import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("official LIC catalogue data mirrors current source groups", async () => {
  const {
    officialInsurancePlanGroups,
    pensionPlanGroup,
    allOfficialPlans,
    getOfficialPlanBySlug,
  } = await import("../app/data/officialPlans.js");

  assert.deepEqual(
    officialInsurancePlanGroups.map((group) => group.title),
    ["Endowment Plans", "Whole Life Plans", "Money Back Plans", "Term Assurance Plans", "Riders"]
  );
  assert.equal(
    officialInsurancePlanGroups.reduce((total, group) => total + group.plans.length, 0),
    32
  );
  assert.equal(pensionPlanGroup.plans.length, 5);
  assert.equal(allOfficialPlans.length, 37);

  const jeevanAnand = getOfficialPlanBySlug("lic-new-jeevan-anand-715");
  assert.equal(jeevanAnand.groupId, "endowment");
  assert.equal(jeevanAnand.uin, "512N279V03");

  for (const plan of allOfficialPlans) {
    assert.ok(plan.slug, `${plan.name} should have a slug`);
    assert.ok(plan.officialUrl.startsWith("https://licindia.in/"), `${plan.name} should link to LIC`);
    assert.ok(plan.planNo || plan.planNo === "-", `${plan.name} should record plan number`);
    assert.ok(plan.uin, `${plan.name} should record UIN`);
  }
});

test("separate plans area exists without changing homepage composition", () => {
  const homePage = read("app/page.js");
  const footer = read("app/components/Footer.js");
  const plansPage = read("app/plans/page.js");
  const detailPage = read("app/plans/[slug]/page.js");

  assert.ok(existsSync(new URL("../app/plans/page.js", import.meta.url)), "/plans page should exist");
  assert.ok(
    existsSync(new URL("../app/plans/[slug]/page.js", import.meta.url)),
    "/plans/[slug] detail route should exist"
  );
  assert.ok(!homePage.includes('href="/plans"'), "homepage should not add a plans CTA");
  assert.ok(!homePage.includes("OfficialPlans"), "homepage should not import the catalogue area");
  assert.match(footer, /href="\/plans"/, "footer should link to the separate plans page");
  assert.match(plansPage, /<Header \/>/, "/plans should render the shared site header");
  assert.match(detailPage, /<Header \/>/, "/plans/[slug] should render the shared site header");
});

test("plans area uses advisor-facing copy instead of internal spec language", () => {
  const plansPage = read("app/plans/page.js");
  const detailPage = read("app/plans/[slug]/page.js");
  const calculator = read("app/components/PlanCalculatorPanel.js");
  const quoteForm = read("app/components/PlanQuoteForm.js");
  const planData = read("app/data/officialPlans.js");

  assert.ok(
    !plansPage.includes("Plans, grouped exactly by LIC product category."),
    "catalogue headline should not sound like a wireframe note"
  );
  assert.match(plansPage, /LIC Plans Catalogue/, "catalogue headline should use a direct product title");
  assert.match(
    plansPage,
    /Review current LIC insurance and pension products/,
    "catalogue lead should explain the page in plain advisor language"
  );
  assert.match(detailPage, /officialPlansCopy\.planHighlights/, "detail pages should use polished section labels");
  assert.match(planData, /Plan highlights/, "polished section label should live in localized plan copy");
  assert.ok(
    !detailPage.includes("What this plan is generally used for."),
    "detail section title should not read as placeholder copy"
  );
  assert.match(calculator, /officialPlansCopy\.quoteInputs/, "calculator area should be framed as quote input capture");
  assert.match(quoteForm, /officialPlansCopy\.requestGuidance/, "advisor CTA should read naturally");
  assert.ok(
    !planData.includes("Savings-oriented LIC plans that combine life cover with maturity benefits."),
    "product summaries should avoid repeated generic placeholder phrasing"
  );
});

test("plans area participates in the global language toggle", () => {
  const plansPage = read("app/plans/page.js");
  const detailPage = read("app/plans/[slug]/page.js");
  const calculator = read("app/components/PlanCalculatorPanel.js");
  const quoteForm = read("app/components/PlanQuoteForm.js");
  const planData = read("app/data/officialPlans.js");

  assert.match(plansPage, /LocalizedText/, "/plans should render translated labels through the global language store");
  assert.match(detailPage, /LocalizedText/, "/plans/[slug] should render translated labels through the global language store");
  assert.match(plansPage, /plan\.nameCopy/, "/plans should render localized plan names");
  assert.match(detailPage, /plan\.nameCopy/, "/plans/[slug] should render localized plan names");
  assert.match(calculator, /useLang/, "calculator labels should update when language changes");
  assert.match(quoteForm, /useLang/, "plan inquiry form labels should update when language changes");
  assert.match(planData, /productNameCopy/, "official plan data should include localized product names");
  assert.match(planData, /[\u0900-\u097F]/, "official plan copy should include Hindi text for translated plan pages");
});

test("plan detail route is static and calculator cannot emit fake figures", () => {
  const detailPage = read("app/plans/[slug]/page.js");
  const calculator = read("app/components/PlanCalculatorPanel.js");

  assert.match(detailPage, /generateStaticParams/, "all plan detail routes should be generated from data");
  assert.match(detailPage, /getOfficialPlanBySlug/, "detail route should resolve plans by slug");
  assert.match(calculator, /calculatorStatus/, "calculator should respect per-plan calculation status");
  assert.ok(!calculator.includes("Math.pow"), "calculator should not estimate compound returns");
  assert.ok(!calculator.includes("Estimated maturity"), "calculator should not show fabricated maturity values");
  assert.ok(!calculator.includes("Annual Premium: ₹0"), "calculator should not render fake zero-premium output");
  assert.match(
    calculator,
    /verified official rate table/i,
    "calculator should disclose missing verified rate tables"
  );
});

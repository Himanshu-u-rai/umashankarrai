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
    34
  );
  assert.equal(pensionPlanGroup.plans.length, 5);
  assert.deepEqual(
    allOfficialPlans
      .filter((plan) => ["unit-linked", "micro"].includes(plan.groupId))
      .map((plan) => plan.slug),
    [
      "lic-index-plus-873",
      "lic-nivesh-plus-749",
      "lic-siip-752",
      "lic-protection-plus-886",
      "lic-micro-bachat-751",
      "lic-jan-suraksha-880",
    ]
  );
  assert.equal(allOfficialPlans.length, 45);

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

test("plan calculators use extracted data but do not fabricate missing rates", async () => {
  const { calculatorDataBySlug } = await import("../app/data/licCalculatorData.js");
  const {
    calculatePlanReference,
    getCalculatorFields,
    getRangeConfig,
  } = await import("../app/data/calculatorEngine.js");
  const calculator = read("app/components/PlanCalculatorPanel.js");
  const styles = read("app/plans/plans.module.css");

  const tableBacked = calculatorDataBySlug["lic-jeevan-labh-plan-736"];
  assert.equal(tableBacked.extractionPlanId, "736_Jeevan_Labh");
  assert.ok(tableBacked.tableRows.length > 0, "Jeevan Labh should carry extracted premium references");

  const tableResult = calculatePlanReference(tableBacked, {
    age: 35,
    sumAssured: 200000,
    premiumMode: "yearly",
  });
  assert.equal(tableResult.hasNumericReference, true);
  assert.match(tableResult.confidenceLabel, /Illustrative/i);
  assert.match(tableResult.disclaimer, /not an exact LIC quote/i);

  const noTable = calculatorDataBySlug["lic-index-plus-873"];
  assert.equal(noTable.extractionPlanId, "873_Index_Plus");
  assert.equal(noTable.tableRows.length, 0);

  const noTableResult = calculatePlanReference(noTable, {
    age: 35,
    sumAssured: 100000,
    premiumMode: "yearly",
  });
  assert.equal(noTableResult.hasNumericReference, false);
  assert.match(noTableResult.disclaimer, /Request exact quote/i);

  assert.match(calculator, /calculatorDataBySlug/, "plan detail calculator should load extracted calculator datasets");
  assert.match(calculator, /calculatePlanReference/, "plan detail calculator should use the shared calculator engine");
  const amountField = getCalculatorFields({ groupId: "endowment" }, tableBacked).find(
    (field) => field.name === "sum_assured"
  );
  const amountRange = getRangeConfig(amountField, { groupId: "endowment" });
  assert.equal(amountRange.renderAsRange, true);
  assert.ok(amountRange.max > amountRange.min, "amount range should have a practical slider maximum");
  assert.ok(amountRange.step >= 10000, "amount range should use useful money increments");
  assert.match(calculator, /type="range"/, "numeric calculator fields should render draggable range controls");
  assert.match(calculator, /styles\.rangeField/, "range fields should have dedicated layout styling");
  assert.match(calculator, /styles\.calculatorFootnote/, "calculator disclaimer should be a quiet footer note");
  assert.ok(!calculator.includes("styles.notice"), "calculator should not lead with a large warning block");
  assert.ok(!calculator.includes("extracted data confidence"), "calculator should not foreground confidence copy above inputs");
  assert.match(styles, /\.rangeField/, "range control styles should exist");
  assert.match(
    styles,
    /\.rangeField\s*\{[\s\S]*grid-column:\s*1\s*\/\s*-1/,
    "range controls should span the calculator field grid on desktop"
  );
  assert.match(styles, /\.rangeNumberRow/, "range numeric row styles should exist");
  assert.match(
    styles,
    /\.rangeNumberRow\s*\{[\s\S]*min-width:\s*0/,
    "range numeric rows should be allowed to shrink inside the card"
  );
  assert.match(
    styles,
    /\.rangeNumberRow input\[type="number"\]\s*\{[\s\S]*min-width:\s*0/,
    "range exact inputs should not force horizontal overflow"
  );
  assert.match(styles, /\.calculatorFootnote/, "quiet calculator footer disclaimer should be styled");
  assert.ok(!calculator.includes("Math.pow"), "calculator should not invent compound projections");
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
  assert.match(calculator, /calculatorFootnote/, "calculator should keep accuracy copy as a small footer note");
  assert.ok(!calculator.includes("Math.pow"), "calculator should not estimate compound returns");
  assert.ok(!calculator.includes("Estimated maturity"), "calculator should not show fabricated maturity values");
  assert.ok(!calculator.includes("Annual Premium: ₹0"), "calculator should not render fake zero-premium output");
  assert.ok(!calculator.includes("not an exact LIC quote"), "calculator UI should not open with heavy warning language");
});

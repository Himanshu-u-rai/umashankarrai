const INR = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR",
});

const MODE_LABELS = {
  yearly: "Yearly",
  half_yearly: "Half-yearly",
  quarterly: "Quarterly",
  monthly: "Monthly",
};

const QUALITY_COPY = {
  "table-backed": "Illustrative table-backed reference",
  "sample-reference": "Illustrative extracted sample reference",
  limited: "Limited extracted reference",
  "no-table": "Exact quote required",
};

const DEFAULT_INPUT_FIELDS = [
  { name: "age", type: "int", min: 18, max: 65, description: "Age at entry" },
  { name: "sum_assured", type: "float", min: 100000, max: null, description: "Basic sum assured" },
  {
    name: "mode",
    type: "str",
    options: ["yearly", "half_yearly", "quarterly", "monthly"],
    description: "Premium mode",
  },
];

const FIELD_LABELS = {
  age: "Age at entry",
  sum_assured: "Basic sum assured",
  mode: "Premium mode",
  gender: "Gender",
  smoker: "Smoking status",
  policy_term: "Policy term",
  premium_paying_term: "Premium paying term",
};

const NUMERIC_FIELD_NAMES = new Set(["age", "sum_assured", "policy_term", "premium_paying_term"]);

const RANGE_DEFAULTS = {
  age: { min: 18, max: 75, step: 1 },
  policy_term: { min: 5, max: 40, step: 1 },
  premium_paying_term: { min: 5, max: 40, step: 1 },
  sum_assured: { min: 100000, max: 5000000, step: 50000 },
};

const AMOUNT_RANGE_BY_GROUP = {
  "term-assurance": { max: 50000000, step: 500000 },
  pension: { max: 50000000, step: 100000 },
  "unit-linked": { max: 2000000, step: 25000 },
  micro: { max: 200000, step: 10000 },
  riders: { max: 5000000, step: 50000 },
};

function asNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function nearestScore(row, inputs) {
  let score = 0;
  const age = asNumber(inputs.age);
  const ppt = asNumber(inputs.premium_paying_term ?? inputs.ppt);
  const term = asNumber(inputs.policy_term ?? inputs.term);

  if (row.age !== null && age !== null) score += Math.abs(row.age - age);
  if (row.ppt !== null && ppt !== null) score += Math.abs(row.ppt - ppt) * 3;
  if (row.term !== null && term !== null) score += Math.abs(row.term - term) * 3;
  if (row.gender && inputs.gender && row.gender !== "both" && row.gender !== inputs.gender) score += 20;

  return score;
}

function formatMoney(value) {
  if (!Number.isFinite(value)) return null;
  return INR.format(value);
}

function rateValue(rate) {
  if (!rate || !Number.isFinite(rate.value) || rate.value <= 0) return null;
  return rate.value;
}

function annualizeByMode(value, mode) {
  if (!Number.isFinite(value)) return null;
  if (mode === "half_yearly") return value * 2;
  if (mode === "quarterly") return value * 4;
  if (mode === "monthly") return value * 12;
  return value;
}

function clampNumber(value, min, max) {
  const number = asNumber(value);
  if (number === null) return min;
  return Math.min(Math.max(number, min), max);
}

export function normalizeCalculatorInputs(fields = {}) {
  return {
    age: fields.age ?? fields["Age nearest birthday"] ?? "",
    sum_assured:
      fields.sum_assured ??
      fields.sumAssured ??
      fields["Basic sum assured"] ??
      fields["Life cover amount"] ??
      fields["Purchase price or contribution"] ??
      "",
    mode: fields.mode ?? fields.premiumMode ?? fields["Premium mode"] ?? fields["Payout mode"] ?? "yearly",
    gender: fields.gender ?? fields.Gender ?? "",
    smoker: fields.smoker ?? fields["Smoking status"] ?? "",
    policy_term: fields.policy_term ?? fields["Policy term"] ?? "",
    premium_paying_term: fields.premium_paying_term ?? fields["Premium paying term"] ?? "",
  };
}

export function getCalculatorFields(plan, dataset) {
  if (dataset?.inputFields?.length) {
    return dataset.inputFields
      .filter((field) => ["age", "sum_assured", "mode", "gender", "smoker", "policy_term", "premium_paying_term"].includes(field.name))
      .map((field) => ({
        ...field,
        label: FIELD_LABELS[field.name] ?? field.description ?? field.name,
        options: field.type === "bool" && !field.options ? ["false", "true"] : field.options,
      }));
  }

  return (plan?.calculatorFields?.length ? plan.calculatorFields : DEFAULT_INPUT_FIELDS).map((field) => {
    if (typeof field === "string") return { name: field, type: "str", label: field, description: field };
    return { ...field, label: field.description ?? field.name };
  });
}

export function getRangeConfig(field, plan = {}) {
  if (!field || !NUMERIC_FIELD_NAMES.has(field.name)) {
    return { renderAsRange: false };
  }

  const base = RANGE_DEFAULTS[field.name] ?? RANGE_DEFAULTS.age;
  const groupAmount = field.name === "sum_assured" ? AMOUNT_RANGE_BY_GROUP[plan?.groupId] : null;
  const min = Number.isFinite(field.min) ? field.min : base.min;
  const max = Number.isFinite(field.max) && field.max > min
    ? field.max
    : (groupAmount?.max ?? base.max);

  return {
    renderAsRange: true,
    min,
    max,
    step: groupAmount?.step ?? base.step,
    clamp: (value) => clampNumber(value, min, max),
  };
}

export function calculatePlanReference(dataset, rawInputs = {}) {
  const inputs = normalizeCalculatorInputs(rawInputs);
  const rows = (dataset?.tableRows ?? []).filter((row) => Number.isFinite(row.premium) && row.premium > 0);
  const confidenceLabel = QUALITY_COPY[dataset?.quality] ?? QUALITY_COPY["no-table"];

  if (!dataset || !rows.length) {
    return {
      hasNumericReference: false,
      confidenceLabel,
      outputs: [],
      matchedRow: null,
      disclaimer:
        "Request exact quote from Umashankar Rai. This product does not have usable extracted premium-rate rows in the current calculator dataset.",
    };
  }

  const matchedRow = [...rows].sort((a, b) => nearestScore(a, inputs) - nearestScore(b, inputs))[0];
  const mode = inputs.mode || "yearly";
  const firstYearGst = rateValue(dataset.gst?.firstYearRate);
  const renewalGst = rateValue(dataset.gst?.renewalYearRate);
  const annualReference = annualizeByMode(matchedRow.premium, mode);
  const firstYearWithGst = firstYearGst ? annualReference * (1 + firstYearGst / 100) : null;
  const renewalWithGst = renewalGst ? annualReference * (1 + renewalGst / 100) : null;
  const ppt = matchedRow.ppt ?? asNumber(inputs.premium_paying_term);
  const totalPremiumReference = ppt ? annualReference * ppt : null;

  const outputs = [
    {
      label: `${MODE_LABELS[mode] ?? "Annual"} premium reference`,
      value: formatMoney(matchedRow.premium),
      note: "Extracted table amount before custom underwriting changes.",
    },
    {
      label: "Annualized reference",
      value: formatMoney(annualReference),
      note: mode === "yearly" ? "Same as yearly reference." : "Mode amount annualized for comparison.",
    },
    firstYearWithGst && {
      label: "First-year GST reference",
      value: formatMoney(firstYearWithGst),
      note: `${firstYearGst}% GST basis from extracted data.`,
    },
    renewalWithGst && {
      label: "Renewal GST reference",
      value: formatMoney(renewalWithGst),
      note: `${renewalGst}% GST basis from extracted data.`,
    },
    totalPremiumReference && {
      label: "Total premium reference",
      value: formatMoney(totalPremiumReference),
      note: `Based on ${ppt} premium-paying years and the matched extracted row.`,
    },
  ].filter(Boolean);

  return {
    hasNumericReference: true,
    confidenceLabel,
    outputs,
    matchedRow,
    disclaimer:
      "This is an illustrative reference from extracted LIC brochure/CIS data, not an exact LIC quote. Final premium depends on current LIC rates, age proof, underwriting, riders, taxes, and selected options.",
  };
}

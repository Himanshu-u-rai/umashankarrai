export const officialPlanSource = {
  label: "LIC official insurance-plan list",
  url: "https://licindia.in/insurance-plan",
  updated: "01 Apr 2026",
};

export const planCategories = [
  {
    id: "family-security",
    label: "Family Security",
    summary: "Term assurance and protection-led plans for dependents and liabilities.",
    plans: [
      {
        name: "LIC's New Jeevan Amar",
        planNo: "955",
        uin: "512N350V02",
        type: "Term Assurance",
        benefit: "Pure protection cover",
        officialUrl: "https://licindia.in/web/guest/lic-s-new-jeevan-amar-955-uin-512n350v02",
      },
      {
        name: "LIC's New Tech-Term",
        planNo: "954",
        uin: "512N351V02",
        type: "Term Assurance",
        benefit: "Online term assurance",
        officialUrl: "https://licindia.in/insurance-plan",
      },
      {
        name: "LIC's Digi Term",
        planNo: "876",
        uin: "512N356V02",
        type: "Term Assurance",
        benefit: "Digital term cover",
        officialUrl: "https://licindia.in/insurance-plan",
      },
    ],
  },
  {
    id: "savings-growth",
    label: "Savings Growth",
    summary: "Endowment plans for disciplined savings with insurance protection.",
    plans: [
      {
        name: "LIC's Jeevan Labh Plan",
        planNo: "736",
        uin: "512N304V03",
        type: "Endowment",
        benefit: "Limited premium savings",
        officialUrl: "https://licindia.in/web/guest/lic-s-jeevan-labh-plan-736-512n304v03",
      },
      {
        name: "LIC's New Endowment Plan",
        planNo: "714",
        uin: "512N277V03",
        type: "Endowment",
        benefit: "Savings plus life cover",
        officialUrl: "https://licindia.in/insurance-plan",
      },
      {
        name: "LIC's Bima Jyoti",
        planNo: "760",
        uin: "512N339V03",
        type: "Endowment",
        benefit: "Guaranteed additions",
        officialUrl: "https://licindia.in/insurance-plan",
      },
    ],
  },
  {
    id: "children-goals",
    label: "Children Goals",
    summary: "Goal-based options for education milestones and timed payouts.",
    plans: [
      {
        name: "LIC's Jeevan Tarun",
        planNo: "734",
        uin: "512N299V03",
        type: "Money Back",
        benefit: "Child education planning",
        officialUrl: "https://licindia.in/web/guest/lic-s-jeevan-tarun",
      },
      {
        name: "LIC's Jeevan Lakshya",
        planNo: "733",
        uin: "512N297V03",
        type: "Endowment",
        benefit: "Family goal protection",
        officialUrl: "https://licindia.in/insurance-plan",
      },
      {
        name: "LIC's New Money Back Plan - 25 Years",
        planNo: "721",
        uin: "512N278V03",
        type: "Money Back",
        benefit: "Scheduled survival benefits",
        officialUrl: "https://licindia.in/insurance-plan",
      },
    ],
  },
  {
    id: "retirement-income",
    label: "Retirement Income",
    summary: "Whole-life and income-oriented plans for later-life planning.",
    plans: [
      {
        name: "LIC's Jeevan Umang",
        planNo: "745",
        uin: "512N312V03",
        type: "Whole Life",
        benefit: "Whole-life income style planning",
        officialUrl: "https://licindia.in/web/guest/lic-sjeevanumang-745%09512n312v03",
      },
      {
        name: "LIC's Jeevan Utsav",
        planNo: "771",
        uin: "512N363V02",
        type: "Whole Life",
        benefit: "Regular benefit option",
        officialUrl: "https://licindia.in/insurance-plan",
      },
      {
        name: "LIC's New Jeevan Anand",
        planNo: "715",
        uin: "512N279V03",
        type: "Endowment",
        benefit: "Endowment with whole-life cover",
        officialUrl: "https://licindia.in/insurance-plan",
      },
    ],
  },
];

export const allPlans = planCategories.flatMap((category) =>
  category.plans.map((plan) => ({
    ...plan,
    category: category.label,
  }))
);

export const defaultPlanName = allPlans[0].name;

export const proofPoints = [
  { value: "Plan-first", label: "Recommendations by life goal" },
  { value: "Official", label: "Plan numbers and UINs referenced" },
  { value: "Private", label: "Contact details are not published" },
];

export const faqs = [
  {
    question: "Is this an official LIC website?",
    answer:
      "No. This is an advisor website for Umashankar Rai. LIC policy terms, illustrations, and final documents are issued through LIC's official process.",
  },
  {
    question: "Does this site show guaranteed LIC maturity values?",
    answer:
      "No. The plan guide uses official plan identifiers and your inputs to prepare an illustration request. Exact premium, GST, bonus, maturity, and rider values require LIC official policy illustration.",
  },
  {
    question: "Why not estimate returns like other websites?",
    answer:
      "Generic return estimates can be misleading for LIC products. This site avoids invented maturity values and routes the selected plan details into a proper consultation request.",
  },
  {
    question: "Will private contact details be public?",
    answer:
      "No. The inquiry form opens an email draft from your device. Private advisor phone and email details are not printed on the page.",
  },
];

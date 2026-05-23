const LIC_BASE_URL = "https://licindia.in";
const tx = (en, hi) => ({ en, hi });

export const officialPlanSources = {
  insurance: {
    label: tx("LIC official insurance plans", "एलआईसी आधिकारिक बीमा योजनाएँ"),
    url: `${LIC_BASE_URL}/insurance-plan`,
    updated: "01 Apr 2026",
  },
  pension: {
    label: tx("LIC official pension plans", "एलआईसी आधिकारिक पेंशन योजनाएँ"),
    url: `${LIC_BASE_URL}/pension-plan`,
    updated: "17 Feb 2026",
  },
  calculatorReference: {
    label: tx("LIC calculator UX reference", "एलआईसी कैलकुलेटर संदर्भ"),
    url: "https://liccalculator.info/",
  },
};

const doc = (label, url) => ({ label, url });

export const officialPlansCopy = {
  backHome: tx("Back to home", "होम पर वापस जाएँ"),
  backAllPlans: tx("Back to all plans", "सभी योजनाओं पर वापस जाएँ"),
  planReference: tx("LIC plan reference", "एलआईसी योजना संदर्भ"),
  catalogueTitle: tx("LIC Plans Catalogue", "एलआईसी योजनाओं की सूची"),
  catalogueLead: tx(
    "Review current LIC insurance and pension products by category, with plan numbers, UINs, official LIC references, and quote support from Umashankar Rai.",
    "मौजूदा एलआईसी बीमा और पेंशन उत्पादों को श्रेणी के अनुसार देखें, योजना नंबर, UIN, आधिकारिक एलआईसी संदर्भ और उमाशंकर राय से कोट सहायता के साथ।"
  ),
  countsLabel: tx("Official plan counts", "आधिकारिक योजना संख्या"),
  insuranceGroups: tx("insurance groups", "बीमा श्रेणियाँ"),
  insuranceProducts: tx("insurance products", "बीमा उत्पाद"),
  pensionProducts: tx("pension products", "पेंशन उत्पाद"),
  products: tx("products", "उत्पाद"),
  planLabel: tx("Plan", "प्लान"),
  sourceUpdated: tx("Source updated", "स्रोत अपडेट"),
  knowMore: tx("Know more", "और जानें"),
  officialLic: tx("Official LIC", "आधिकारिक एलआईसी"),
  officialLicPage: tx("Official LIC page", "आधिकारिक एलआईसी पेज"),
  requestExactQuote: tx("Request exact quote", "सटीक कोट माँगें"),
  planHighlights: tx("Plan highlights", "योजना की मुख्य बातें"),
  reviewBeforeShortlisting: tx(
    "What to review before shortlisting.",
    "शॉर्टलिस्ट करने से पहले क्या देखें।"
  ),
  eligibility: tx("Eligibility", "पात्रता"),
  eligibilityChecks: tx("Eligibility and quote checks.", "पात्रता और कोट जाँच।"),
  documents: tx("Documents", "दस्तावेज़"),
  officialReferences: tx("Official references.", "आधिकारिक संदर्भ।"),
  sameCategory: tx("Same category", "इसी श्रेणी में"),
  relatedPlans: tx("Related official LIC plans.", "संबंधित आधिकारिक एलआईसी योजनाएँ।"),
  calculatorReference: tx("Calculator reference", "कैलकुलेटर संदर्भ"),
  quoteInputs: tx("Quote inputs", "कोट जानकारी"),
  officialRateAvailable: tx("Official rate table available", "आधिकारिक रेट टेबल उपलब्ध"),
  pendingRate: tx("Verified official rate table pending", "सत्यापित आधिकारिक रेट टेबल लंबित"),
  notApplicable: tx("Standalone calculator not applicable", "अलग कैलकुलेटर लागू नहीं"),
  calculatorNotice: tx(
    "This page will not generate premium or maturity figures without a verified official rate table. Share your inputs with Umashankar Rai for an exact LIC quote.",
    "सत्यापित आधिकारिक रेट टेबल के बिना यह पेज प्रीमियम या मैच्योरिटी राशि नहीं दिखाएगा। सटीक एलआईसी कोट के लिए अपनी जानकारी उमाशंकर राय को भेजें।"
  ),
  enterDetails: tx("Enter details", "जानकारी दर्ज करें"),
  sendDetailedInquiry: tx("Send detailed inquiry", "विस्तृत पूछताछ भेजें"),
  calculatorSuccess: tx(
    "Your email app should open with the inputs ready.",
    "आपका ईमेल ऐप भरी हुई जानकारी के साथ खुलना चाहिए।"
  ),
  advisorGuidance: tx("Advisor guidance", "सलाहकार मार्गदर्शन"),
  requestGuidance: tx("Request guidance on this plan.", "इस योजना पर मार्गदर्शन माँगें।"),
  quoteNotice: tx(
    "Final premium, eligibility, and benefit illustration should be confirmed against LIC's current official rules.",
    "अंतिम प्रीमियम, पात्रता और लाभ विवरण एलआईसी के मौजूदा आधिकारिक नियमों से ही पुष्टि किए जाने चाहिए।"
  ),
  selectedPlan: tx("Selected plan", "चुनी हुई योजना"),
  fullName: tx("Full name", "पूरा नाम"),
  fullNamePlaceholder: tx("Your name", "आपका नाम"),
  phoneNumber: tx("Phone number", "फोन नंबर"),
  phonePlaceholder: tx("For callback coordination", "कॉल समन्वय के लिए"),
  preferredTime: tx("Preferred time", "पसंदीदा समय"),
  morning: tx("Morning", "सुबह"),
  afternoon: tx("Afternoon", "दोपहर"),
  evening: tx("Evening", "शाम"),
  message: tx("Message", "संदेश"),
  messagePlaceholder: tx(
    "Age, goal, income range, existing LIC policy, or question",
    "उम्र, लक्ष्य, आय सीमा, मौजूदा एलआईसी पॉलिसी या सवाल"
  ),
  sendInquiry: tx("Send inquiry", "पूछताछ भेजें"),
  whatsapp: tx("WhatsApp", "व्हाट्सऐप"),
  inquirySuccess: tx(
    "Your email app should open with the inquiry ready.",
    "आपका ईमेल ऐप तैयार पूछताछ के साथ खुलना चाहिए।"
  ),
};

const calculatorFields = {
  endowment: [
    "Age nearest birthday",
    "Basic sum assured",
    "Policy term",
    "Premium paying term",
    "Premium mode",
    "Rider preference",
  ],
  "whole-life": [
    "Age nearest birthday",
    "Basic sum assured",
    "Premium paying term",
    "Benefit option",
    "Premium mode",
  ],
  "money-back": [
    "Age nearest birthday",
    "Basic sum assured",
    "Policy term",
    "Survival benefit need",
    "Premium mode",
  ],
  "term-assurance": [
    "Age nearest birthday",
    "Gender",
    "Smoking status",
    "Life cover amount",
    "Policy term",
    "Premium mode",
  ],
  riders: [
    "Base LIC plan",
    "Policyholder age",
    "Required rider",
    "Base sum assured",
  ],
  pension: [
    "Age nearest birthday",
    "Purchase price or contribution",
    "Annuity option",
    "Deferment period if applicable",
    "Payout mode",
  ],
};

export const calculatorFieldCopy = {
  "Age nearest birthday": tx("Age nearest birthday", "निकटतम जन्मदिन के अनुसार उम्र"),
  "Basic sum assured": tx("Basic sum assured", "मूल बीमा राशि"),
  "Policy term": tx("Policy term", "पॉलिसी अवधि"),
  "Premium paying term": tx("Premium paying term", "प्रीमियम भुगतान अवधि"),
  "Premium mode": tx("Premium mode", "प्रीमियम मोड"),
  "Rider preference": tx("Rider preference", "राइडर पसंद"),
  "Benefit option": tx("Benefit option", "लाभ विकल्प"),
  "Survival benefit need": tx("Survival benefit need", "सर्वाइवल बेनिफिट आवश्यकता"),
  Gender: tx("Gender", "लिंग"),
  "Smoking status": tx("Smoking status", "धूम्रपान स्थिति"),
  "Life cover amount": tx("Life cover amount", "जीवन कवर राशि"),
  "Base LIC plan": tx("Base LIC plan", "आधार एलआईसी योजना"),
  "Policyholder age": tx("Policyholder age", "पॉलिसीधारक की उम्र"),
  "Required rider": tx("Required rider", "आवश्यक राइडर"),
  "Base sum assured": tx("Base sum assured", "आधार बीमा राशि"),
  "Purchase price or contribution": tx("Purchase price or contribution", "खरीद राशि या योगदान"),
  "Annuity option": tx("Annuity option", "एन्युटी विकल्प"),
  "Deferment period if applicable": tx("Deferment period if applicable", "लागू हो तो स्थगन अवधि"),
  "Payout mode": tx("Payout mode", "भुगतान मोड"),
};

const groupDefaults = {
  endowment: {
    summary: tx(
      "LIC endowment category product with savings and life-cover elements to review against official terms.",
      "एलआईसी एंडोमेंट श्रेणी का उत्पाद, जिसमें बचत और जीवन कवर के पहलू आधिकारिक शर्तों के अनुसार देखने होते हैं।"
    ),
    features: [
      tx("Review premium mode, policy term, and maturity benefit from LIC material", "एलआईसी सामग्री से प्रीमियम मोड, पॉलिसी अवधि और मैच्योरिटी लाभ देखें"),
      tx("Check whether the product supports the goal, payment pattern, and cover amount", "लक्ष्य, भुगतान पैटर्न और कवर राशि के हिसाब से योजना की उपयुक्तता जाँचें"),
      tx("Add riders only where LIC allows them for the selected plan", "राइडर केवल वहीं जोड़ें जहाँ एलआईसी चयनित योजना में अनुमति देती है"),
    ],
    eligibility: [
      tx("Entry age, policy term, premium-paying term, and sum assured limits vary by product.", "प्रवेश उम्र, पॉलिसी अवधि, प्रीमियम भुगतान अवधि और बीमा राशि की सीमा उत्पाद के अनुसार बदलती है।"),
      tx("Final eligibility and premium must be checked against LIC's current underwriting rules.", "अंतिम पात्रता और प्रीमियम एलआईसी के मौजूदा अंडरराइटिंग नियमों से जाँचे जाने चाहिए।"),
    ],
  },
  "whole-life": {
    summary: tx(
      "LIC whole life category product for longer-duration protection planning.",
      "लंबी अवधि की सुरक्षा योजना के लिए एलआईसी होल लाइफ श्रेणी का उत्पाद।"
    ),
    features: [
      tx("Review cover duration, premium-paying period, and benefit option", "कवर अवधि, प्रीमियम भुगतान अवधि और लाभ विकल्प देखें"),
      tx("Check income or survival-benefit rules from official plan documents", "आधिकारिक योजना दस्तावेज़ों से आय या सर्वाइवल बेनिफिट नियम देखें"),
      tx("Confirm family protection or legacy-planning fit with the advisor", "परिवार सुरक्षा या विरासत योजना की उपयुक्तता सलाहकार से पुष्टि करें"),
    ],
    eligibility: [
      tx("Entry age, premium-paying term, and benefit options vary by product.", "प्रवेश उम्र, प्रीमियम भुगतान अवधि और लाभ विकल्प उत्पाद के अनुसार बदलते हैं।"),
      tx("Benefits and options should be verified from the official LIC product page.", "लाभ और विकल्प आधिकारिक एलआईसी उत्पाद पेज से सत्यापित करें।"),
    ],
  },
  "money-back": {
    summary: tx(
      "LIC money back category product with scheduled survival-benefit rules to review.",
      "निर्धारित सर्वाइवल बेनिफिट नियमों वाला एलआईसी मनी बैक श्रेणी उत्पाद।"
    ),
    features: [
      tx("Review survival-benefit schedule and policy term", "सर्वाइवल बेनिफिट शेड्यूल और पॉलिसी अवधि देखें"),
      tx("Check life-cover continuation conditions after money-back payouts", "मनी बैक भुगतान के बाद जीवन कवर जारी रहने की शर्तें जाँचें"),
      tx("Confirm premium mode and milestone timing before shortlisting", "शॉर्टलिस्ट करने से पहले प्रीमियम मोड और लक्ष्य समय की पुष्टि करें"),
    ],
    eligibility: [
      tx("Policy term and payout timing vary by product.", "पॉलिसी अवधि और भुगतान समय उत्पाद के अनुसार बदलते हैं।"),
      tx("Final quote depends on LIC's active premium and benefit rules.", "अंतिम कोट एलआईसी के सक्रिय प्रीमियम और लाभ नियमों पर निर्भर करता है।"),
    ],
  },
  "term-assurance": {
    summary: tx(
      "LIC term assurance category product focused on protection planning.",
      "सुरक्षा योजना पर केंद्रित एलआईसी टर्म एश्योरेंस श्रेणी का उत्पाद।"
    ),
    features: [
      tx("Review cover amount, policy term, premium mode, and underwriting class", "कवर राशि, पॉलिसी अवधि, प्रीमियम मोड और अंडरराइटिंग वर्ग देखें"),
      tx("Check whether the product is online, offline, or has specific channel rules", "यह जाँचें कि उत्पाद ऑनलाइन, ऑफलाइन या किसी विशेष चैनल नियम के अंतर्गत है"),
      tx("Medical, occupation, and lifestyle details can affect the final quote", "मेडिकल, पेशा और जीवनशैली की जानकारी अंतिम कोट को प्रभावित कर सकती है"),
    ],
    eligibility: [
      tx("Age, smoking status, occupation, and medical underwriting may affect quote.", "उम्र, धूम्रपान स्थिति, पेशा और मेडिकल अंडरराइटिंग कोट को प्रभावित कर सकते हैं।"),
      tx("Exact premium must be generated from verified LIC rate data.", "सटीक प्रीमियम सत्यापित एलआईसी रेट डेटा से ही निकाला जाना चाहिए।"),
    ],
  },
  riders: {
    summary: tx(
      "LIC rider benefit that may attach only to eligible base policies.",
      "एलआईसी राइडर लाभ, जो केवल पात्र आधार पॉलिसियों से जोड़ा जा सकता है।"
    ),
    features: [
      tx("Confirm the eligible base plan before considering rider benefits", "राइडर लाभ देखने से पहले पात्र आधार योजना की पुष्टि करें"),
      tx("Review rider sum assured, term, and exclusions from official documents", "आधिकारिक दस्तावेज़ों से राइडर बीमा राशि, अवधि और अपवाद देखें"),
      tx("Benefit and premium depend on the base policy and LIC rules", "लाभ और प्रीमियम आधार पॉलिसी और एलआईसी नियमों पर निर्भर करते हैं"),
    ],
    eligibility: [
      tx("Rider availability depends on the base plan, age, and LIC rules.", "राइडर उपलब्धता आधार योजना, उम्र और एलआईसी नियमों पर निर्भर करती है।"),
      tx("An advisor quote is required before adding a rider.", "राइडर जोड़ने से पहले सलाहकार कोट आवश्यक है।"),
    ],
  },
  pension: {
    summary: tx(
      "LIC pension category product for annuity, pension, or retirement-income planning.",
      "एन्युटी, पेंशन या सेवानिवृत्ति आय योजना के लिए एलआईसी पेंशन श्रेणी का उत्पाद।"
    ),
    features: [
      tx("Review purchase price or contribution amount and annuity/pension option", "खरीद राशि या योगदान और एन्युटी/पेंशन विकल्प देखें"),
      tx("Check payout mode, deferment, and return-of-purchase-price options where applicable", "लागू होने पर भुगतान मोड, स्थगन और खरीद राशि वापसी विकल्प देखें"),
      tx("Final payout depends on LIC's active rates and selected option", "अंतिम भुगतान एलआईसी की सक्रिय दरों और चुने गए विकल्प पर निर्भर करता है"),
    ],
    eligibility: [
      tx("Pension plan entry age and payout rules vary by product.", "पेंशन योजना की प्रवेश उम्र और भुगतान नियम उत्पाद के अनुसार बदलते हैं।"),
      tx("Exact annuity or premium values require official LIC rate data.", "सटीक एन्युटी या प्रीमियम राशि के लिए आधिकारिक एलआईसी रेट डेटा चाहिए।"),
    ],
  },
};

const productSummaries = {
  "lic-single-premium-endowment-plan-717": tx(
    "Single-premium endowment product for one-time payment planning with life cover and maturity-oriented benefits as per LIC terms.",
    "एकमुश्त भुगतान योजना के लिए सिंगल प्रीमियम एंडोमेंट उत्पाद, जीवन कवर और मैच्योरिटी लाभ एलआईसी शर्तों के अनुसार।"
  ),
  "lic-new-endowment-plan-714": tx(
    "Regular-premium endowment product for disciplined savings with life cover, subject to LIC benefit rules.",
    "नियमित प्रीमियम एंडोमेंट उत्पाद, जिसमें अनुशासित बचत और जीवन कवर एलआईसी लाभ नियमों के अनुसार मिलते हैं।"
  ),
  "lic-new-jeevan-anand-715": tx(
    "Endowment category product with life cover and benefit structure to review for long-term savings goals.",
    "लंबी अवधि की बचत के लिए देखने योग्य एंडोमेंट श्रेणी उत्पाद, जिसमें जीवन कवर और लाभ संरचना शामिल है।"
  ),
  "lic-jeevan-lakshya-733": tx(
    "Endowment category product commonly reviewed for family-goal planning, with benefits subject to LIC rules.",
    "परिवार लक्ष्य योजना के लिए देखी जाने वाली एंडोमेंट श्रेणी योजना, जिसके लाभ एलआईसी नियमों के अधीन हैं।"
  ),
  "lic-jeevan-labh-plan-736": tx(
    "Limited-premium endowment category product for planned savings with life cover.",
    "जीवन कवर के साथ योजनाबद्ध बचत के लिए लिमिटेड प्रीमियम एंडोमेंट श्रेणी उत्पाद।"
  ),
  "lic-amritbaal-774": tx(
    "Endowment category product positioned for child-related planning; check official eligibility and benefit conditions.",
    "बच्चों से जुड़े लक्ष्यों के लिए एंडोमेंट श्रेणी उत्पाद; आधिकारिक पात्रता और लाभ शर्तें देखें।"
  ),
  "lic-bima-jyoti-760": tx(
    "Endowment category product for savings and protection planning, subject to LIC terms.",
    "बचत और सुरक्षा योजना के लिए एंडोमेंट श्रेणी उत्पाद, एलआईसी शर्तों के अधीन।"
  ),
  "lic-nav-jeevan-shree-912": tx(
    "Endowment category product; review premium, term, and benefit illustration from official LIC material.",
    "एंडोमेंट श्रेणी उत्पाद; आधिकारिक एलआईसी सामग्री से प्रीमियम, अवधि और लाभ विवरण देखें।"
  ),
  "lic-bima-lakshmi-881": tx(
    "Endowment category product; confirm current eligibility, premium mode, and benefit details from LIC.",
    "एंडोमेंट श्रेणी उत्पाद; मौजूदा पात्रता, प्रीमियम मोड और लाभ विवरण एलआईसी से पुष्टि करें।"
  ),
  "lic-jeevan-umang-745": tx(
    "Whole life category product with long-duration cover; review income and maturity-related terms from LIC.",
    "लंबी अवधि कवर वाला होल लाइफ उत्पाद; आय और मैच्योरिटी संबंधी शर्तें एलआईसी से देखें।"
  ),
  "lic-jeevan-utsav-771": tx(
    "Whole life category product; compare benefit option, premium-paying term, and payout structure.",
    "होल लाइफ श्रेणी उत्पाद; लाभ विकल्प, प्रीमियम भुगतान अवधि और भुगतान संरचना की तुलना करें।"
  ),
  "lic-jeevan-utsav-single-premium-883": tx(
    "Single-premium whole life category product; review purchase amount and benefit option before shortlisting.",
    "सिंगल प्रीमियम होल लाइफ उत्पाद; शॉर्टलिस्ट करने से पहले खरीद राशि और लाभ विकल्प देखें।"
  ),
  "lic-bima-shree-748": tx(
    "Money back category product; review scheduled survival benefits and cover conditions.",
    "मनी बैक श्रेणी उत्पाद; निर्धारित सर्वाइवल बेनिफिट और कवर शर्तें देखें।"
  ),
  "lic-new-money-back-plan-20-years-720": tx(
    "Money back plan with a 20-year policy term; confirm payout schedule and premium details from LIC.",
    "20 वर्ष की पॉलिसी अवधि वाला मनी बैक प्लान; भुगतान शेड्यूल और प्रीमियम विवरण एलआईसी से पुष्टि करें।"
  ),
  "lic-new-money-back-plan-25-years-721": tx(
    "Money back plan with a 25-year policy term; confirm payout schedule and premium details from LIC.",
    "25 वर्ष की पॉलिसी अवधि वाला मनी बैक प्लान; भुगतान शेड्यूल और प्रीमियम विवरण एलआईसी से पुष्टि करें।"
  ),
  "lic-new-childrens-money-back-plan-732": tx(
    "Child-focused money back plan; review proposer, child age, and payout conditions.",
    "बच्चों पर केंद्रित मनी बैक प्लान; प्रपोजर, बच्चे की उम्र और भुगतान शर्तें देखें।"
  ),
  "lic-jeevan-tarun-734": tx(
    "Child education-focused money back category product; review benefit option and age rules.",
    "बच्चों की शिक्षा पर केंद्रित मनी बैक उत्पाद; लाभ विकल्प और उम्र नियम देखें।"
  ),
  "lic-digi-term-876": tx(
    "Term assurance product; review digital-channel eligibility, cover amount, term, and underwriting requirements.",
    "टर्म एश्योरेंस उत्पाद; डिजिटल चैनल पात्रता, कवर राशि, अवधि और अंडरराइटिंग आवश्यकताएँ देखें।"
  ),
  "lic-digi-credit-life-878": tx(
    "Credit-life term assurance product; review loan-cover fit and LIC eligibility rules.",
    "क्रेडिट-लाइफ टर्म एश्योरेंस उत्पाद; लोन कवर उपयुक्तता और एलआईसी पात्रता नियम देखें।"
  ),
  "lic-yuva-credit-life-877": tx(
    "Credit-life protection product for younger lives; confirm loan and age suitability.",
    "युवा जीवन के लिए क्रेडिट-लाइफ सुरक्षा उत्पाद; लोन और उम्र उपयुक्तता की पुष्टि करें।"
  ),
  "lic-yuva-term-875": tx(
    "Term assurance product for protection planning; review cover amount, term, and premium mode.",
    "सुरक्षा योजना के लिए टर्म एश्योरेंस उत्पाद; कवर राशि, अवधि और प्रीमियम मोड देखें।"
  ),
  "lic-new-tech-term-954": tx(
    "Online term assurance product; confirm eligibility, medical rules, and premium class from LIC.",
    "ऑनलाइन टर्म एश्योरेंस उत्पाद; पात्रता, मेडिकल नियम और प्रीमियम वर्ग एलआईसी से पुष्टि करें।"
  ),
  "lic-new-jeevan-amar-955": tx(
    "Term assurance product; review available benefit options and underwriting requirements.",
    "टर्म एश्योरेंस उत्पाद; उपलब्ध लाभ विकल्प और अंडरराइटिंग आवश्यकताएँ देखें।"
  ),
  "lic-saral-jeevan-bima-859": tx(
    "Standard term insurance product; review sum assured range, term, and eligibility conditions.",
    "मानक टर्म बीमा उत्पाद; बीमा राशि सीमा, अवधि और पात्रता शर्तें देखें।"
  ),
  "lic-bima-kavach-887": tx(
    "Term assurance product; verify current benefit structure and eligibility on LIC's official page.",
    "टर्म एश्योरेंस उत्पाद; मौजूदा लाभ संरचना और पात्रता आधिकारिक एलआईसी पेज पर जाँचें।"
  ),
  "lic-accident-benefit-rider": tx(
    "Rider for accident-related benefit where attached to eligible base LIC policies.",
    "पात्र आधार एलआईसी पॉलिसियों से जुड़ने वाला दुर्घटना संबंधी लाभ राइडर।"
  ),
  "lic-premium-waiver-benefit-rider": tx(
    "Rider that may waive future premiums under covered conditions on eligible base policies.",
    "पात्र आधार पॉलिसियों पर कवर शर्तों में भविष्य के प्रीमियम माफ कर सकने वाला राइडर।"
  ),
  "lic-accidental-death-disability-benefit-rider": tx(
    "Rider for accidental death or disability benefit, subject to base-plan eligibility.",
    "दुर्घटनात्मक मृत्यु या विकलांगता लाभ राइडर, आधार योजना पात्रता के अधीन।"
  ),
  "lic-new-term-assurance-rider": tx(
    "Additional term-cover rider available only with eligible LIC base plans.",
    "केवल पात्र एलआईसी आधार योजनाओं के साथ उपलब्ध अतिरिक्त टर्म कवर राइडर।"
  ),
  "lic-linked-accidental-death-benefit-rider": tx(
    "Linked-policy rider for accidental death benefit where LIC rules allow attachment.",
    "जहाँ एलआईसी नियम अनुमति दें, लिंक्ड पॉलिसी के लिए दुर्घटनात्मक मृत्यु लाभ राइडर।"
  ),
  "lic-critical-illness-health-rider": tx(
    "Health rider for specified critical illness benefit, subject to eligibility and exclusions.",
    "निर्धारित गंभीर बीमारी लाभ के लिए हेल्थ राइडर, पात्रता और अपवादों के अधीन।"
  ),
  "lic-female-critical-illness-benefit-rider": tx(
    "Female critical illness rider; review covered conditions and attachment rules.",
    "महिला गंभीर बीमारी राइडर; कवर शर्तें और जोड़ने के नियम देखें।"
  ),
  "lic-new-pension-plus-867": tx(
    "Pension product for retirement accumulation; review contribution, fund, and vesting conditions.",
    "सेवानिवृत्ति संचय के लिए पेंशन उत्पाद; योगदान, फंड और वेस्टिंग शर्तें देखें।"
  ),
  "lic-jeevan-akshay-vii-857": tx(
    "Immediate annuity product; quote depends on purchase price, age, and annuity option.",
    "तत्काल एन्युटी उत्पाद; कोट खरीद राशि, उम्र और एन्युटी विकल्प पर निर्भर करता है।"
  ),
  "lic-new-jeevan-shanti-758": tx(
    "Deferred annuity product; review deferment period, purchase price, and payout option.",
    "डिफर्ड एन्युटी उत्पाद; स्थगन अवधि, खरीद राशि और भुगतान विकल्प देखें।"
  ),
  "lic-saral-pension-862": tx(
    "Standard pension product; compare annuity options and payout mode before selecting.",
    "मानक पेंशन उत्पाद; चयन से पहले एन्युटी विकल्प और भुगतान मोड की तुलना करें।"
  ),
  "lic-smart-pension-879": tx(
    "Pension product; review available annuity choices, payout mode, and official rate basis.",
    "पेंशन उत्पाद; उपलब्ध एन्युटी विकल्प, भुगतान मोड और आधिकारिक रेट आधार देखें।"
  ),
};

const productNameCopy = {
  "lic-single-premium-endowment-plan-717": tx("LIC's Single Premium Endowment Plan", "एलआईसी सिंगल प्रीमियम एंडोमेंट प्लान"),
  "lic-new-endowment-plan-714": tx("LIC's New Endowment Plan", "एलआईसी न्यू एंडोमेंट प्लान"),
  "lic-new-jeevan-anand-715": tx("LIC's New Jeevan Anand", "एलआईसी न्यू जीवन आनंद"),
  "lic-jeevan-lakshya-733": tx("LIC's Jeevan Lakshya", "एलआईसी जीवन लक्ष्य"),
  "lic-jeevan-labh-plan-736": tx("LIC's Jeevan Labh Plan", "एलआईसी जीवन लाभ प्लान"),
  "lic-amritbaal-774": tx("LIC's Amritbaal", "एलआईसी अमृतबाल"),
  "lic-bima-jyoti-760": tx("LIC's Bima Jyoti", "एलआईसी बीमा ज्योति"),
  "lic-nav-jeevan-shree-912": tx("LIC's Nav Jeevan Shree", "एलआईसी नव जीवन श्री"),
  "lic-bima-lakshmi-881": tx("LIC's Bima Lakshmi", "एलआईसी बीमा लक्ष्मी"),
  "lic-jeevan-umang-745": tx("LIC's Jeevan Umang", "एलआईसी जीवन उमंग"),
  "lic-jeevan-utsav-771": tx("LIC's Jeevan Utsav", "एलआईसी जीवन उत्सव"),
  "lic-jeevan-utsav-single-premium-883": tx("LIC's Jeevan Utsav Single Premium", "एलआईसी जीवन उत्सव सिंगल प्रीमियम"),
  "lic-bima-shree-748": tx("LIC's Bima Shree", "एलआईसी बीमा श्री"),
  "lic-new-money-back-plan-20-years-720": tx("LIC's New Money Back Plan - 20 Years", "एलआईसी न्यू मनी बैक प्लान - 20 वर्ष"),
  "lic-new-money-back-plan-25-years-721": tx("LIC's New Money Back Plan - 25 Years", "एलआईसी न्यू मनी बैक प्लान - 25 वर्ष"),
  "lic-new-childrens-money-back-plan-732": tx("LIC's New Children's Money Back Plan", "एलआईसी न्यू चिल्ड्रन्स मनी बैक प्लान"),
  "lic-jeevan-tarun-734": tx("LIC's Jeevan Tarun", "एलआईसी जीवन तरुण"),
  "lic-digi-term-876": tx("LIC's Digi Term", "एलआईसी डिजी टर्म"),
  "lic-digi-credit-life-878": tx("LIC's Digi Credit Life", "एलआईसी डिजी क्रेडिट लाइफ"),
  "lic-yuva-credit-life-877": tx("LIC's Yuva Credit Life", "एलआईसी युवा क्रेडिट लाइफ"),
  "lic-yuva-term-875": tx("LIC's Yuva Term", "एलआईसी युवा टर्म"),
  "lic-new-tech-term-954": tx("LIC's New Tech-Term", "एलआईसी न्यू टेक-टर्म"),
  "lic-new-jeevan-amar-955": tx("LIC's New Jeevan Amar", "एलआईसी न्यू जीवन अमर"),
  "lic-saral-jeevan-bima-859": tx("LIC's Saral Jeevan Bima", "एलआईसी सरल जीवन बीमा"),
  "lic-bima-kavach-887": tx("LIC's Bima Kavach", "एलआईसी बीमा कवच"),
  "lic-accident-benefit-rider": tx("LIC's Accident Benefit Rider", "एलआईसी एक्सीडेंट बेनिफिट राइडर"),
  "lic-premium-waiver-benefit-rider": tx("LIC's Premium Waiver Benefit Rider", "एलआईसी प्रीमियम वेवर बेनिफिट राइडर"),
  "lic-accidental-death-disability-benefit-rider": tx("LIC's Accidental Death and Disability Benefit Rider", "एलआईसी एक्सीडेंटल डेथ एंड डिसेबिलिटी बेनिफिट राइडर"),
  "lic-new-term-assurance-rider": tx("LIC's New Term Assurance Rider", "एलआईसी न्यू टर्म एश्योरेंस राइडर"),
  "lic-linked-accidental-death-benefit-rider": tx("LIC's Linked Accidental Death Benefit Rider", "एलआईसी लिंक्ड एक्सीडेंटल डेथ बेनिफिट राइडर"),
  "lic-critical-illness-health-rider": tx("LIC's Critical Illness Health Rider", "एलआईसी क्रिटिकल इलनेस हेल्थ राइडर"),
  "lic-female-critical-illness-benefit-rider": tx("LIC's Female Critical Illness Benefit Rider", "एलआईसी फीमेल क्रिटिकल इलनेस बेनिफिट राइडर"),
  "lic-new-pension-plus-867": tx("LIC's New Pension Plus", "एलआईसी न्यू पेंशन प्लस"),
  "lic-jeevan-akshay-vii-857": tx("LIC's Jeevan Akshay-VII", "एलआईसी जीवन अक्षय-VII"),
  "lic-new-jeevan-shanti-758": tx("LIC's New Jeevan Shanti", "एलआईसी न्यू जीवन शांति"),
  "lic-saral-pension-862": tx("LIC's Saral Pension", "एलआईसी सरल पेंशन"),
  "lic-smart-pension-879": tx("LIC's Smart Pension", "एलआईसी स्मार्ट पेंशन"),
};

const brochureDocs = {
  "lic-new-endowment-plan-714": [
    doc(
      "Sales brochure",
      "https://licindia.in/documents/20121/1319704/LIC%27s+NEW+ENDOWMENT+PLAN+714.pdf/77f3167c-ae64-a1ea-d348-1c66f4455aed?t=1760357386313"
    ),
    doc(
      "Policy document",
      "https://licindia.in/documents/20121/1385382/Final+Policy+Document+_LIC%27s+New+Endowment+Plan.pdf/353630dd-dada-cd7e-d3cf-5792ee3cb807?t=1751638574726"
    ),
    doc(
      "CIS",
      "https://licindia.in/documents/20121/1325029/Final+CIS_LIC%27s+New+Endowment+Plan.pdf/517bb034-93bb-7b78-ed57-9d928cba0ec9?t=1751638625419"
    ),
  ],
  "lic-new-jeevan-anand-715": [
    doc(
      "Sales brochure",
      "https://licindia.in/documents/20121/1319704/LIC%27s+New+Jeevan+Anand+Sales+Brochure+Eng_141025.pdf/43b60cd9-f6f1-c889-734c-47c565a47ada?t=1760418918360"
    ),
    doc(
      "Policy document",
      "https://licindia.in/documents/20121/1385382/Modif_Policy+Document+LICs+New+Jeevan+Anand_715.pdf/c63e8ae7-8532-12d6-9a19-73b212881016?t=1751638594161"
    ),
    doc(
      "CIS",
      "https://licindia.in/documents/20121/1325029/CIS+_Jeevan+Anand_715.pdf/5184e798-9d7f-2f20-88ef-7b4db80e262f?t=1751638611111"
    ),
  ],
  "lic-jeevan-labh-plan-736": [
    doc(
      "Sales brochure",
      "https://licindia.in/documents/20121/1319704/LIC_Jeevan+labh_Sales+Brochure_Eng.pdf/cafcd0b7-8f9d-6b65-f5e9-b2aad0788c98?t=1762495060800"
    ),
    doc(
      "Policy document",
      "https://licindia.in/documents/20121/1243952/Final_Policy+Docs_LIC%27s+Jeevan+Labh_V03_website.pdf/042e4ba3-075c-b59b-b08d-ff49b406831a?t=1728040449287"
    ),
    doc(
      "CIS",
      "https://licindia.in/documents/20121/1243952/CIS+_Jeevan+Labh_736.pdf/091b2448-e4f4-d216-d834-8bff02d5ec72?t=1728034239209"
    ),
  ],
  "lic-jeevan-umang-745": [
    doc(
      "Sales brochure",
      "https://licindia.in/documents/20121/1319704/745+LIC_Jeevan+Umang_Eng+_141025.pdf/d67dc9dc-ca37-7e1e-d662-132423c49d15?t=1760458103167"
    ),
  ],
  "lic-jeevan-utsav-771": [
    doc(
      "Sales brochure",
      "https://licindia.in/documents/20121/1319704/Jeevan+Utsav+Sales+Brochure_141025.pdf/da84d78a-ef72-c80f-b8df-83bb7565f087?t=1760429620376"
    ),
  ],
};

const insuranceGroups = [
  {
    id: "endowment",
    title: "Endowment Plans",
    titleCopy: tx("Endowment Plans", "एंडोमेंट प्लान्स"),
    description: tx(
      "LIC products that combine protection with savings or maturity-oriented benefits, subject to plan terms.",
      "एलआईसी उत्पाद जो सुरक्षा के साथ बचत या मैच्योरिटी आधारित लाभ जोड़ते हैं, योजना शर्तों के अधीन।"
    ),
    plans: [
      ["LIC's Single Premium Endowment Plan", "717", "512N283V03", "lic-single-premium-endowment-plan-717", "/web/guest/lic-s-single-premium-endowment-plan-717-512n283v03"],
      ["LIC's New Endowment Plan", "714", "512N277V03", "lic-new-endowment-plan-714", "/web/guest/lic-s-new-endowment-plan-714-512n277v03"],
      ["LIC's New Jeevan Anand", "715", "512N279V03", "lic-new-jeevan-anand-715", "/web/guest/lic-s-new-jeevan-anand-715%09512n279v03"],
      ["LIC's Jeevan Lakshya", "733", "512N297V03", "lic-jeevan-lakshya-733", "/web/guest/lic-s-jeevan-lakshya-733-512n297v03"],
      ["LIC's Jeevan Labh Plan", "736", "512N304V03", "lic-jeevan-labh-plan-736", "/web/guest/lic-s-jeevan-labh-plan-736-512n304v03"],
      ["LIC's Amritbaal", "774", "512N365V02", "lic-amritbaal-774", "/web/guest/lic-s-amritbaal-774%09512n365v02"],
      ["LIC's Bima Jyoti", "760", "512N339V03", "lic-bima-jyoti-760", "/web/guest/lic-s-bima-jyoti-new"],
      ["LIC's Nav Jeevan Shree", "912", "512N387V02", "lic-nav-jeevan-shree-912", "/web/guest/lic-s-nav-jeevan-shree-plan-no.912-1"],
      ["LIC's Bima Lakshmi", "881", "512N389V01", "lic-bima-lakshmi-881", "/web/guest/lic-s-bima-lakshmi-881-512n389v01"],
    ],
  },
  {
    id: "whole-life",
    title: "Whole Life Plans",
    titleCopy: tx("Whole Life Plans", "होल लाइफ प्लान्स"),
    description: tx(
      "LIC products designed for longer-duration protection and family-continuity planning.",
      "लंबी अवधि की सुरक्षा और परिवार निरंतरता योजना के लिए बनाए गए एलआईसी उत्पाद।"
    ),
    plans: [
      ["LIC's Jeevan Umang", "745", "512N312V03", "lic-jeevan-umang-745", "/web/guest/lic-sjeevanumang-745%09512n312v03"],
      ["LIC's Jeevan Utsav", "771", "512N363V02", "lic-jeevan-utsav-771", "/web/guest/lic-s-jeevan-utsav1"],
      ["LIC's Jeevan Utsav Single Premium", "883", "512N392V01", "lic-jeevan-utsav-single-premium-883", "/web/guest/lic-s-jeevan-utsav-single-premium"],
    ],
  },
  {
    id: "money-back",
    title: "Money Back Plans",
    titleCopy: tx("Money Back Plans", "मनी बैक प्लान्स"),
    description: tx(
      "LIC products with scheduled survival benefits during the policy term, subject to plan conditions.",
      "पॉलिसी अवधि के दौरान निर्धारित सर्वाइवल बेनिफिट वाले एलआईसी उत्पाद, योजना शर्तों के अधीन।"
    ),
    plans: [
      ["LIC's Bima Shree", "748", "512N316V03", "lic-bima-shree-748", "/web/guest/lic-s-bima-shree"],
      ["LIC's New Money Back Plan - 20 Years", "720", "512N280V03", "lic-new-money-back-plan-20-years-720", "/web/guest/lic-s-new-money-back-plan-20-years"],
      ["LIC's New Money Back Plan - 25 Years", "721", "512N278V03", "lic-new-money-back-plan-25-years-721", "/web/guest/lic-s-new-money-back-plan-25-years"],
      ["LIC's New Children's Money Back Plan", "732", "512N296V03", "lic-new-childrens-money-back-plan-732", "/web/guest/lic-s-new-children-s-money-back-plan"],
      ["LIC's Jeevan Tarun", "734", "512N299V03", "lic-jeevan-tarun-734", "/web/guest/lic-s-jeevan-tarun"],
    ],
  },
  {
    id: "term-assurance",
    title: "Term Assurance Plans",
    titleCopy: tx("Term Assurance Plans", "टर्म एश्योरेंस प्लान्स"),
    description: tx(
      "LIC protection products focused on life cover, term, and underwriting profile.",
      "जीवन कवर, अवधि और अंडरराइटिंग प्रोफाइल पर केंद्रित एलआईसी सुरक्षा उत्पाद।"
    ),
    plans: [
      ["LIC's Digi Term", "876", "512N356V02", "lic-digi-term-876", "/web/guest/lic-s-digi-term-876-512n356v01"],
      ["LIC's Digi Credit Life", "878", "512N358V01", "lic-digi-credit-life-878", "/web/guest/lic-s-digi-credit-life-878-512n358v01"],
      ["LIC's Yuva Credit Life", "877", "512N357V01", "lic-yuva-credit-life-877", "/web/guest/lic-s-yuva-credit-life-877-512n357v01"],
      ["LIC's Yuva Term", "875", "512N355V02", "lic-yuva-term-875", "/web/guest/lic-s-yuva-term-875-512n355v01"],
      ["LIC's New Tech-Term", "954", "512N351V02", "lic-new-tech-term-954", "/web/guest/lic-s-new-tech-term-954-512n351v01"],
      ["LIC's New Jeevan Amar", "955", "512N350V02", "lic-new-jeevan-amar-955", "/web/guest/lic-s-new-jeevan-amar-955-uin-512n350v02"],
      ["LIC's Saral Jeevan Bima", "859", "512N341V01", "lic-saral-jeevan-bima-859", "/web/guest/lic-s-saral-jeevan-bima"],
      ["LIC's Bima Kavach", "887", "512N360V01", "lic-bima-kavach-887", "/web/guest/lic-s-bima-kavach"],
    ],
  },
  {
    id: "riders",
    title: "Riders",
    titleCopy: tx("Riders", "राइडर्स"),
    description: tx(
      "Additional LIC benefits that can be attached only to eligible base policies.",
      "अतिरिक्त एलआईसी लाभ जो केवल पात्र आधार पॉलिसियों से जोड़े जा सकते हैं।"
    ),
    plans: [
      ["LIC's Accident Benefit Rider", "-", "512B203V03", "lic-accident-benefit-rider", "/web/guest/lic-s-accident-benefit-rider-512b203v03"],
      ["LIC's Premium Waiver Benefit Rider", "-", "512B204V04", "lic-premium-waiver-benefit-rider", "/web/guest/lic-s-premium-waiver-benefit-rider"],
      ["LIC's Accidental Death and Disability Benefit Rider", "-", "512B209V02", "lic-accidental-death-disability-benefit-rider", "/web/guest/lic-s-accidental-death-disability-benefit-rider-512b209v02"],
      ["LIC's New Term Assurance Rider", "-", "512B210V02", "lic-new-term-assurance-rider", "/web/guest/lic-s-new-term-assurance-rider"],
      ["LIC's Linked Accidental Death Benefit Rider", "-", "512A211V02", "lic-linked-accidental-death-benefit-rider", "/web/guest/lic-s-linked-accidental-death-benefit-rider"],
      ["LIC's Critical Illness Health Rider", "-", "512B227V01", "lic-critical-illness-health-rider", "/web/guest/lic-s-critical-illness-health-rider-512b227v01"],
      ["LIC's Female Critical Illness Benefit Rider", "-", "512B226V01", "lic-female-critical-illness-benefit-rider", "/web/guest/lic-s-female-critical-illness-benefit-rider-uin-512n226v01-"],
    ],
  },
];

const pensionProducts = [
  ["LIC's New Pension Plus", "867", "512L347V01", "lic-new-pension-plus-867", "/web/guest/lic-s-new-pension-plus-867-512l347v01"],
  ["LIC's Jeevan Akshay-VII", "857", "512N337V07", "lic-jeevan-akshay-vii-857", "/web/guest/lic-s-jeevan-akshay-vii-plan-no.-857-uin-512n337v07-"],
  ["LIC's New Jeevan Shanti", "758", "512N338V08", "lic-new-jeevan-shanti-758", "/web/guest/lic-s-new-jeevan-shanti-plan-no.-758-uin-512n338v08-"],
  ["LIC's Saral Pension", "862", "512N342V05", "lic-saral-pension-862", "/web/guest/lic-s-saral-pension"],
  ["LIC's Smart Pension", "879", "512N386V01", "lic-smart-pension-879", "/web/guest/lic-s-smart-pension"],
];

function normalizePlan(group, item, index, source) {
  const [name, planNo, uin, slug, path] = item;
  const defaults = groupDefaults[group.id];
  const standaloneRider = group.id === "riders";
  return {
    name,
    nameCopy: productNameCopy[slug] ?? tx(name, name),
    planNo,
    uin,
    slug,
    groupId: group.id,
    groupTitle: group.title,
    groupTitleCopy: group.titleCopy ?? tx(group.title, group.title),
    source: source.label,
    sourceUrl: source.url,
    sourceUpdated: source.updated,
    officialUrl: `${LIC_BASE_URL}${path}`,
    summary: productSummaries[slug] ?? defaults.summary,
    features: defaults.features,
    eligibility: defaults.eligibility,
    documents: [
      doc("Official LIC product page", `${LIC_BASE_URL}${path}`),
      ...(brochureDocs[slug] ?? []),
    ],
    calculatorStatus: standaloneRider ? "not-applicable" : "pending-rate",
    calculatorFields: calculatorFields[group.id],
    sortOrder: index + 1,
  };
}

export const officialInsurancePlanGroups = insuranceGroups.map((group) => ({
  ...group,
  source: officialPlanSources.insurance,
  plans: group.plans.map((item, index) =>
    normalizePlan(group, item, index, officialPlanSources.insurance)
  ),
}));

export const pensionPlanGroup = {
  id: "pension",
  title: "Pension Plans",
  titleCopy: tx("Pension Plans", "पेंशन प्लान्स"),
  description: tx(
    "LIC retirement and annuity products for income planning after retirement.",
    "सेवानिवृत्ति के बाद आय योजना के लिए एलआईसी सेवानिवृत्ति और एन्युटी उत्पाद।"
  ),
  source: officialPlanSources.pension,
  plans: pensionProducts.map((item, index) =>
    normalizePlan(
      { id: "pension", title: "Pension Plans", titleCopy: tx("Pension Plans", "पेंशन प्लान्स") },
      item,
      index,
      officialPlanSources.pension
    )
  ),
};

export const officialPlanGroups = [...officialInsurancePlanGroups, pensionPlanGroup];

export const allOfficialPlans = officialPlanGroups.flatMap((group) => group.plans);

export const officialPlanStats = {
  insuranceGroupCount: officialInsurancePlanGroups.length,
  insurancePlanCount: officialInsurancePlanGroups.reduce(
    (total, group) => total + group.plans.length,
    0
  ),
  pensionPlanCount: pensionPlanGroup.plans.length,
  totalPlanCount: allOfficialPlans.length,
};

export function getOfficialPlanBySlug(slug) {
  return allOfficialPlans.find((plan) => plan.slug === slug) ?? null;
}

export function getRelatedOfficialPlans(plan, limit = 3) {
  return allOfficialPlans
    .filter((candidate) => candidate.groupId === plan.groupId && candidate.slug !== plan.slug)
    .slice(0, limit);
}

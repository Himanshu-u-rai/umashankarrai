import { allOfficialPlans } from "./data/officialPlans";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://umashankarrai.in";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "en-IN": SITE_URL,
          "hi-IN": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/plans`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...allOfficialPlans.map((plan) => ({
      url: `${SITE_URL}/plans/${plan.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.64,
    })),
  ];
}

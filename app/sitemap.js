const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://umashankarrai.in";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "en-IN": SITE_URL,
          "hi-IN": SITE_URL,
        },
      },
    },
  ];
}

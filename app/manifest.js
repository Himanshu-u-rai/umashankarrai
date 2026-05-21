export default function manifest() {
  return {
    name: "Umashankar Rai | LIC Insurance Advisor",
    short_name: "Umashankar Rai",
    description:
      "Personal portfolio of Umashankar Rai, Senior LIC Insurance Advisor — family-first policy guidance across India.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FBF8F2",
    theme_color: "#002C77",
    lang: "en-IN",
    categories: ["finance", "business", "lifestyle"],
    icons: [
      {
        src: "/brand/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/brand/favicon-180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/advisor-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}

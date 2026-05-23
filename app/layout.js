import { Cormorant_Garamond, Hind, Manrope } from "next/font/google";
import "./globals.css";
import { LangProvider } from "./components/LangProvider";
import BackToTop from "./components/BackToTop";
import { advisor, faqsCopy } from "./data/siteData";

// Latin + Devanagari subset on the variable body font so Hindi renders
// without falling back to system stack.
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "devanagari"],
  display: "swap",
});

// Cormorant is latin-only; keep it for English display headings.
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Hind is the Devanagari-capable display fallback for Hindi headings.
const hind = Hind({
  variable: "--font-display-deva",
  subsets: ["devanagari", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://umashankarrai.in";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Umashankar Rai | Senior LIC Insurance Advisor",
    template: "%s | Umashankar Rai",
  },
  description:
    "Plan-led LIC insurance guidance for family protection, savings, child goals, retirement income, and policy support — with 20+ years of trusted advisory experience.",
  applicationName: "Umashankar Rai — LIC Advisor",
  authors: [{ name: advisor.name }],
  keywords: [
    "LIC advisor",
    "LIC insurance",
    "Life Insurance Corporation",
    "Umashankar Rai",
    "insurance planning",
    "Jeevan Labh",
    "term insurance India",
    "retirement planning",
    "एलआईसी सलाहकार",
  ],
  creator: advisor.name,
  publisher: advisor.name,
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/",
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: SITE_URL,
    siteName: "Umashankar Rai",
    title: "Umashankar Rai | Senior LIC Insurance Advisor",
    description:
      "Family-first LIC insurance strategies, clear policy choices, and lifelong dedicated support.",
    images: [
      {
        url: "/brand/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Umashankar Rai — Senior LIC Insurance Advisor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umashankar Rai | Senior LIC Insurance Advisor",
    description:
      "Family-first LIC insurance strategies, clear policy choices, and lifelong dedicated support.",
    images: ["/brand/og-cover.jpg"],
  },
  icons: {
    icon: [{ url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [
      { url: "/brand/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "finance",
};

export const viewport = {
  themeColor: "#002C77",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

function buildStructuredData() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: advisor.name,
    jobTitle: advisor.title.en,
    email: `mailto:${advisor.email}`,
    telephone: advisor.phone,
    url: SITE_URL,
    image: `${SITE_URL}/brand/og-cover.jpg`,
    knowsLanguage: ["en-IN", "hi-IN"],
    worksFor: {
      "@type": "Organization",
      name: "Life Insurance Corporation of India",
      url: "https://licindia.in",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: advisor.city,
      addressRegion: advisor.state,
      addressCountry: "IN",
    },
  };

  const businessLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: `${advisor.name} — LIC Insurance Advisor`,
    image: `${SITE_URL}/brand/og-cover.jpg`,
    url: SITE_URL,
    telephone: advisor.phone,
    email: advisor.email,
    priceRange: "Free consultation",
    areaServed: { "@type": "Country", name: "India" },
    address: {
      "@type": "PostalAddress",
      addressLocality: advisor.city,
      addressRegion: advisor.state,
      addressCountry: "IN",
    },
    founder: { "@type": "Person", name: advisor.name },
    knowsLanguage: ["en-IN", "hi-IN"],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsCopy.map((entry) => ({
      "@type": "Question",
      name: entry.question.en,
      acceptedAnswer: { "@type": "Answer", text: entry.answer.en },
      inLanguage: "en-IN",
    })),
  };

  return [personLd, businessLd, faqLd];
}

// Safe JSON-LD serializer per Next.js JSON-LD guide:
// node_modules/next/dist/docs/01-app/02-guides/json-ld.md
// Content is strictly first-party static data; we still escape `<` to neutralise
// any future string that contains HTML-looking sequences.
function serializeLd(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }) {
  const structured = buildStructuredData();

  return (
    <html
      lang="en-IN"
      data-lang="en"
      className={`${manrope.variable} ${cormorant.variable} ${hind.variable}`}
    >
      <body>
        <LangProvider>
          {children}
          <BackToTop />
        </LangProvider>
        {structured.map((schema, index) => (
          <script
            key={`ld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeLd(schema) }}
          />
        ))}
      </body>
    </html>
  );
}

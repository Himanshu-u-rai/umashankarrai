import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Umashankar Rai | LIC Insurance Advisor",
  description:
    "Plan-led LIC insurance guidance for family protection, savings, child goals, retirement income, and policy support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}

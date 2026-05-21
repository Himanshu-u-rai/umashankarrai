import Header from "./components/Header";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import About from "./components/About";
import TrustSignals from "./components/TrustSignals";
import Faq from "./components/Faq";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import StickyMobileCTA from "./components/StickyMobileCTA";
import PageIntro from "./components/PageIntro";

export default function Home() {
  return (
    <main>
      <PageIntro />
      <Header />
      <Hero />
      <Plans />
      <About />
      <TrustSignals />
      <ContactForm />
      <Faq />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}

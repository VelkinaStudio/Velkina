import "./sections.css";
import { LangProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import AIStack from "@/components/sections/AIStack";
import Operators from "@/components/sections/Operators";
import Contact from "@/components/sections/Contact";

// Creative-duo portfolio (comic world). Agency funnel (Capabilities/Process)
// dropped per direction — the AI section carries "what we play with".
export default function HomePage() {
  return (
    <LangProvider>
      <SmoothScroll>
        <a id="top" />
        <Nav />
        <main>
          <Hero />
          <Statement />
          <Work />
          <AIStack />
          <Operators />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </LangProvider>
  );
}

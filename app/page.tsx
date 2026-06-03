import "./sections.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Capabilities from "@/components/sections/Capabilities";
import Work from "@/components/sections/Work";
import Operators from "@/components/sections/Operators";
import AIStack from "@/components/sections/AIStack";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <SmoothScroll>
      <a id="top" />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Capabilities />
        <AIStack />
        <Operators />
        <Process />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

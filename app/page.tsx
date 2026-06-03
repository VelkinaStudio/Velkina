import "./site.css";
import { LangProvider } from "./lib/LangProvider";
import StudioWorld from "./components/StudioWorld";

// The explorable studio-world. A cute, smooth, glossy 3D room you walk through
// to discover the studio — mounted over a DOM-first content layer that is the
// SEO + reduced-motion + no-WebGL fallback (and good on its own).
export default function HomePage() {
  return (
    <LangProvider>
      <StudioWorld />
    </LangProvider>
  );
}

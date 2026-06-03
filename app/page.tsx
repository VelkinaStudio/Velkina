import "./site.css";
import { LangProvider } from "./lib/LangProvider";
import Nav from "./components/Nav";
import Sections from "./components/Sections";

// Single-page physics-toy portfolio. The hero text + the real work list render
// as static HTML (LCP + crawlable); the throwable pile is a deferred client toy.
export default function HomePage() {
  return (
    <LangProvider>
      <Nav />
      <Sections />
    </LangProvider>
  );
}

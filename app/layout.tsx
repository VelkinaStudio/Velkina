import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Geist } from "next/font/google";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Display: Archivo Variable — a grotesque with width/weight axes so the
// proximity-morph (variable-font cursor reaction) signature move works.
const display = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
// Body/UI: Geist (Vercel) — clean neo-grotesque, fitting for a dev studio.
const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});
// Mono: part of the brand voice — labels, live data, terminal motif.
const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Velkina — Software and brand that ships",
  description:
    "Velkina is a two-operator software, design and AI-automation studio. We design, build and ship websites, e-commerce, mobile apps and AI agents. İstanbul.",
  manifest: "/site.webmanifest",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Velkina — Software and brand that ships",
    description:
      "A two-operator software, design and AI-automation studio. Real work, shipped end-to-end. İstanbul.",
    url: "/",
    siteName: "Velkina",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Velkina", description: "Software and brand that ships." },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0B0D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="vk-grain">{children}</body>
    </html>
  );
}

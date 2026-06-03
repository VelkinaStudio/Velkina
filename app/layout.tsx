import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velkina.com";

// Display: Bricolage Grotesque — "dignified but flippant". Variable, OFL.
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
// Body: Hanken Grotesk — soft humanist screen grotesk, pairs under Bricolage.
const body = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Velkina — a two-person studio in Istanbul",
  description:
    "We are Velkina. A two-person studio in Istanbul building software, websites, e-commerce, AI, and brand.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-48.png", sizes: "48x48", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Velkina — a two-person studio in Istanbul",
    description:
      "We build and ship software, websites, e-commerce, AI, and brand. Two people: Ömer Can Nalbant and Baha Taşkın.",
    url: "/",
    siteName: "Velkina",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velkina",
    description: "A two-person studio in Istanbul. Software, websites, e-commerce, AI, brand.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF7F2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

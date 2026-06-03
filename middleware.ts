import createMiddleware from "next-intl/middleware";

// v9: the maximalist English experience lives at the ROOT (app/page.tsx).
// The /en /tr /ro localized routes still exist for SEO + TR/RO visitors, but
// we no longer force-redirect "/" away from the new root experience.
const intlMiddleware = createMiddleware({
  locales: ["en", "tr", "ro"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false, // don't auto-bounce "/" to "/tr" etc.
});

export default function middleware(request: any) {
  return intlMiddleware(request);
}

export const config = {
  // Only run intl middleware on the explicit locale routes; leave "/", the
  // root experience, demos, and static files alone.
  matcher: ["/(en|tr|ro)/:path*"],
};

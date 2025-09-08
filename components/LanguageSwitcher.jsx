"use client";
import {usePathname, useRouter} from "next/navigation";

export default function LanguageSwitcher({locale}) {
  const pathname = usePathname();
  const router = useRouter();

  // Derive current locale from the path if not provided
  const segs = (pathname || '').split('/').filter(Boolean);
  const current = locale || ((segs[0] === 'tr' || segs[0] === 'en') ? segs[0] : 'en');
  const other = current === 'tr' ? 'en' : 'tr';

  function toOtherLocalePath(path) {
    if (!path) return `/${other}`;
    const s = path.split('/').filter(Boolean);
    if (s.length === 0) return `/${other}`;
    if (s[0] === 'tr' || s[0] === 'en') {
      s[0] = other;
    } else {
      s.unshift(other);
    }
    return '/' + s.join('/');
  }

  const target = toOtherLocalePath(pathname);

  return (
    <button
      onClick={() => router.push(target)}
      className="text-white/80 hover:text-vkcyan border border-white/15 rounded-lg px-3 py-1.5"
      aria-label={other === 'tr' ? 'Türkçe' : 'English'}
    >
      {other.toUpperCase()}
    </button>
  );
}

"use client";
import {usePathname, useRouter} from "next/navigation";

export default function LanguageSwitcher({locale}) {
  const pathname = usePathname();
  const router = useRouter();

  const other = locale === 'tr' ? 'en' : 'tr';

  function toOtherLocalePath(path) {
    if (!path) return `/${other}`;
    const segs = path.split('/').filter(Boolean);
    if (segs.length === 0) return `/${other}`;
    // Replace first segment (current locale) or prefix
    if (segs[0] === 'tr' || segs[0] === 'en') {
      segs[0] = other;
    } else {
      segs.unshift(other);
    }
    return '/' + segs.join('/');
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

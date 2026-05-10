"use client";
import {useState, useRef, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

const LOCALES = [
  {code: 'en', label: 'EN', name: 'English'},
  {code: 'tr', label: 'TR', name: 'Türkçe'},
  {code: 'ro', label: 'RO', name: 'Română'}
];

export default function LanguageSwitcher({locale}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const segs = (pathname || '').split('/').filter(Boolean);
  const supported = ['en', 'tr', 'ro'];
  const current = locale || (supported.includes(segs[0]) ? segs[0] : 'en');

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  function toLocalePath(path, target) {
    if (!path) return `/${target}`;
    const s = path.split('/').filter(Boolean);
    if (s.length === 0) return `/${target}`;
    if (supported.includes(s[0])) {
      s[0] = target;
    } else {
      s.unshift(target);
    }
    return '/' + s.join('/');
  }

  function go(target) {
    setOpen(false);
    router.push(toLocalePath(pathname, target));
  }

  const currentMeta = LOCALES.find(l => l.code === current) || LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 text-white/80 hover:text-vkcyan border border-white/15 rounded-lg px-3 py-1.5 text-sm"
        aria-haspopup="listbox"
        aria-expanded={open ? 'true' : 'false'}
        aria-label={`Language: ${currentMeta.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
        </svg>
        <span className="font-mono">{currentMeta.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 opacity-70" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-[150px] rounded-xl border border-white/10 bg-[#141414]/95 backdrop-blur-md shadow-strong p-1 z-50"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === current ? 'true' : 'false'}
                onClick={() => go(l.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${l.code === current ? 'bg-white/10 text-vkcyan' : 'text-white/85 hover:bg-white/5 hover:text-white'}`}
              >
                <span>{l.name}</span>
                <span className="font-mono text-xs opacity-70">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Nav() {
  return (
    <nav className="vk-nav" aria-label="Primary">
      <a href="#top" className="vk-nav-logo">
        VELKINA
      </a>
      <div className="vk-nav-links">
        <a href="#work" className="vk-nav-hide-sm">
          Work
        </a>
        <a href="#services" className="vk-nav-hide-sm">
          Services
        </a>
        <a href="#team" className="vk-nav-hide-sm">
          Team
        </a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

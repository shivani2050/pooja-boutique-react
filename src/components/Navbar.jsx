import { useEffect, useState } from "react";
import { Menu, X, Scissors } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Story", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-gold/20 bg-ink/95 shadow-[0_8px_28px_rgba(0,0,0,.28)] backdrop-blur-xl" : "border-transparent bg-ink/75 backdrop-blur-md"}`}
      >
        <nav
          className="section-wrap flex h-[76px] items-center justify-between gap-5"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={closeMenu}
            className="luxury-focus flex items-center gap-2 rounded-sm"
            aria-label="Pooja Boutique home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-gold">
              <Scissors size={19} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl tracking-wide text-ivory">
                Pooja <span className="text-gold">Boutique</span>
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[.24em] text-muted">
                Your style, our stitching
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="luxury-focus rounded-sm text-sm text-ivory/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-full border border-gold/50 px-5 py-3 text-sm text-ivory transition hover:border-gold hover:text-gold"
            >
              Login
            </Link>

            <a className="btn-gold !px-5 !py-3 text-sm" href="#contact">
              Enquire Now
            </a>
          </div>
          <button
            type="button"
            className="luxury-focus grid h-11 w-11 place-items-center rounded-full border border-line text-ivory md:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gold/15 bg-ink px-5 pb-5 pt-3 shadow-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="luxury-focus rounded-md border-b border-white/5 px-2 py-3 text-sm text-ivory/90 hover:text-gold"
                >
                  {link.label}
                </a>
              ))}

              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-4 rounded-full border border-gold/50 px-4 py-3 text-center text-sm text-ivory transition hover:text-gold"
              >
                Login
              </Link>

              <a href="#contact" onClick={closeMenu} className="btn-gold mt-3">
                Enquire Now
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

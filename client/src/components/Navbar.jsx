import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Resorts", path: "/resorts" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500
        ${scrolled
          ? "bg-cream border-b border-primary/10 shadow-sm py-4"
          : "bg-transparent py-6"
        }`}
    >
      {/* Full width — no max-w container */}
      <div className="w-full px-8 md:px-16 flex items-center justify-between">

        {/* Logo — Left */}
        <Link to="/" className="flex flex-col leading-tight flex-shrink-0">
          <span className={`font-playfair text-2xl font-bold transition-colors duration-300
            ${scrolled ? "text-primary" : "text-white"}`}>
            Chitranchal
          </span>
          <span className={`font-inter text-[9px] tracking-[0.35em] uppercase transition-colors duration-300
            ${scrolled ? "text-accent" : "text-accent/80"}`}>
            Mukteshwar
          </span>
        </Link>

        {/* Links — Center */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.path} className="flex flex-col items-center">
              <Link
                to={link.path}
                className={`font-inter text-sm font-medium tracking-wide transition-colors duration-300
                  ${location.pathname === link.path
                    ? scrolled ? "text-accent" : "text-accent"
                    : scrolled
                      ? "text-primary/70 hover:text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
              {location.pathname === link.path && (
                <span className="w-1 h-1 bg-accent rounded-full mt-1" />
              )}
            </li>
          ))}
        </ul>

        {/* CTA — Right */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Link
            to="/contact"
            className={`font-inter text-sm font-semibold px-7 py-3 rounded-full transition-all duration-300 flex items-center gap-2
              ${scrolled
                ? "bg-primary text-white hover:bg-accent hover:text-primary"
                : "border border-white/50 text-white hover:bg-white/20"
              }`}
          >
            ✦ Plan Your Trip
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden text-2xl transition-colors duration-300
            ${scrolled ? "text-primary" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-8 py-6
          ${scrolled
            ? "bg-cream border-primary/10"
            : "bg-primary/95 border-white/10"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-4 font-inter font-medium border-b transition-colors duration-300
                ${scrolled
                  ? "text-primary/70 hover:text-primary border-primary/10"
                  : "text-white/70 hover:text-white border-white/10"
                }
                ${location.pathname === link.path ? "!text-accent" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-6 bg-accent text-primary text-center font-semibold py-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
          >
            ✦ Plan Your Trip
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { Link } from "react-router-dom";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/resorts" },
  { name: "Travel Blogs", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
];

const socials = [
  { label: "Instagram", icon: "📸", href: "#" },
  { label: "YouTube", icon: "🎥", href: "#" },
  { label: "Facebook", icon: "📘", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-darkbrown text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <Link to="/" className="flex flex-col leading-tight mb-4">
            <span className="font-playfair text-3xl font-bold text-saffron">
              Chitranchal
            </span>
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-white/40">
              Mukteshwar
            </span>
          </Link>

          <p className="text-white/50 font-inter text-sm leading-relaxed mb-6 max-w-xs">
            Discover the serene beauty of Mukteshwar — a hidden Himalayan gem 
            known for its peaceful temples, scenic trails, and breathtaking 
            mountain views. Chitranchal brings you closer to nature, culture, 
            and unforgettable travel experiences.
          </p>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-saffron hover:text-primary transition-all duration-300"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-playfair text-lg text-saffron mb-6">
            Quick Links
          </h4>

          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-white/50 font-inter text-sm hover:text-saffron transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-3 h-px bg-saffron/40" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-playfair text-lg text-saffron mb-6">
            Contact Information
          </h4>

          <ul className="space-y-4 text-sm text-white/50 font-inter">
            <li className="flex items-start gap-3">
              <span>📍</span>
              <span>
                Mukteshwar, Nainital District<br />
                Uttarakhand, India — 263138
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span>📞</span>
              <span>+91 98765 43210</span>
            </li>

            <li className="flex items-center gap-3">
              <span>✉️</span>
              <span>contact@chitranchal.com</span>
            </li>

            <li className="flex items-center gap-3">
              <span>🕐</span>
              <span>Open Daily: 9:00 AM – 7:00 PM</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/10 py-5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-white/20 font-inter text-xs">
            © {new Date().getFullYear()} Chitranchal Mukteshwar. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/20 font-inter text-xs hover:text-saffron transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-white/20 font-inter text-xs hover:text-saffron transition-colors"
            >
              Terms of Service
            </a>
          </div>

          <p className="text-white/20 font-inter text-xs">
            Crafted with ❤️ in Uttarakhand
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
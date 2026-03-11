import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const images = [
  "/bgImages/Images/mix.png",
  "/bgImages/Images/pahad.png",
  "/bgImages/Images/ghar.png",
  "/bgImages/Images/fool.png",
  "/bgImages/Images/phokhrar.png",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Fade in on load
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">

      {/* Background Slideshow */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms]
          ${index === current ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${img})`,
            transform: `translateY(${scrollY * 0.4}px)`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-1000
        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >

        {/* Location Tagline */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-saffron" />
          <p className="text-saffron text-xs tracking-[0.4em] uppercase font-inter">
            Welcome to Chitranchal • Mukteshwar, Uttarakhand
          </p>
          <div className="w-12 h-px bg-saffron" />
        </div>

        {/* Main Heading */}
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight max-w-5xl">
          Discover the Soul of{" "}
          <span className="text-saffron italic">Mukteshwar</span>
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-white/70 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
          Welcome to Chitranchal Mukteshwar — a hidden Himalayan paradise
          where misty mountains, ancient temples, and peaceful forests
          invite you to slow down, explore nature, and rediscover your
          inner soul.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <Link
            to="/destinations"
            className="bg-saffron text-primary font-inter font-semibold px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:scale-105"
          >
            Visit Mukteshwar
          </Link>

          <Link
            to="/contact"
            className="border border-white/50 text-white font-inter px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            Plan Your Dream Trip
          </Link>

          <Link
            to="/blogs"
            className="border border-saffron/50 text-saffron font-inter px-8 py-4 rounded-full hover:bg-saffron/20 transition-all duration-300"
          >
            Travel Stories
          </Link>

        </div>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300
            ${
              index === current
                ? "bg-saffron w-8 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-8 z-10 flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs tracking-widest uppercase rotate-90 mb-4 font-inter">
          Scroll
        </p>

        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

    </section>
  );
};

export default HeroSection;
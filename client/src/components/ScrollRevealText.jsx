import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const text =
  "Mukteshwar is a hidden Himalayan paradise where misty forests, ancient temples, and breathtaking mountain views create a place of serenity, adventure, and timeless beauty.";

const ScrollRevealText = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrolled =
        (windowHeight - rect.top) / (windowHeight + rect.height);

      const clamped = Math.min(Math.max(scrolled, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 bg-darkbrown relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-saffron translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-saffron -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Label */}
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <div className="w-10 h-px bg-saffron" />
          <p className="text-saffron text-xs tracking-[0.4em] uppercase font-inter">
            Discover Mukteshwar
          </p>
        </div>

        {/* Scroll Reveal Text */}
        <p className="font-playfair text-2xl md:text-4xl lg:text-5xl leading-relaxed">
          {words.map((word, i) => {
            const wordProgress = i / words.length;
            const isHighlighted = progress > wordProgress;

            return (
              <span
                key={i}
                className="transition-all duration-300 mr-2 md:mr-3 inline-block"
                style={{
                  color: isHighlighted
                    ? "#F5F5F5"
                    : "rgba(245,241,236,0.12)",
                  transform: isHighlighted
                    ? "translateY(0)"
                    : "translateY(6px)",
                }}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-saffron/20 my-10 md:my-14" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        
          {/* CTA */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-saffron text-primary font-inter font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white transition-all duration-300 whitespace-nowrap"
          >
            Plan Your Dream Trip →
          </Link>

        </div>

        {/* Beautiful Bottom Line */}
        <div className="mt-12 text-center">
          <h3 className="font-playfair text-3xl md:text-4xl text-white">
            Mukteshwar — <span className="text-saffron italic">The Beautiful</span>
          </h3>

          <p className="text-white/50 font-inter mt-3 text-sm tracking-wide">
            Come explore the serenity of the Himalayas and create unforgettable memories.
          </p>
        </div>

        {/* Bottom Label */}
        <div className="mt-10 flex items-center gap-4 justify-center">
          <div className="w-10 h-px bg-saffron/40" />
          <p className="text-saffron/40 text-xs font-inter tracking-widest uppercase">
            Chitranchal • Mukteshwar Himalayas
          </p>
        </div>

      </div>
    </section>
  );
};

export default ScrollRevealText;
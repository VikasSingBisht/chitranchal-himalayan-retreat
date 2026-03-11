// src/components/ThinkingTrip.jsx

import { Link } from "react-router-dom";

const ThinkingTrip = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">

        {/* Small label */}
        <p className="font-inter text-xs tracking-[0.4em] uppercase text-saffron mb-6">
          Your Journey Awaits
        </p>

        {/* Big Bold Heading */}
        <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-primary font-bold leading-tight mb-6">
          Thinking About <br />
          <span className="italic text-saffron">a Trip?</span>
        </h2>

        {/* Subtext */}
        <p className="font-inter text-primary/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Mukteshwar ki wadi tumhara intezaar kar rahi hai — bas ek kadam
          ki zaroorat hai. Hum baaki sab sambhal lete hain.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-primary text-white font-inter font-semibold px-8 py-4 rounded-full hover:bg-saffron hover:text-primary transition-all duration-300"
          >
            Plan Your Trip →
          </Link>
          <Link
            to="/resorts"
            className="border-2 border-primary text-primary font-inter font-semibold px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore Destinations
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-primary/10">
          {[
            { number: "5,000+", label: "Happy Travelers" },
            { number: "12+", label: "Hidden Places" },
            { number: "4.9★", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-playfair text-3xl md:text-4xl text-primary font-bold">
                {stat.number}
              </p>
              <p className="font-inter text-xs text-primary/40 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ThinkingTrip;
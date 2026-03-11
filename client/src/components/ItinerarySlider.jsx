import { useState } from "react";
import { Link } from "react-router-dom";
import itineraries from "../data/itineraries";

const ItineraryCard = ({ itinerary, isActive }) => (
  <div
    className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500
      ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"}`}
    style={{ height: "520px" }}
  >
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
      style={{
        backgroundImage: `url(${itinerary.image || "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"})`,
      }}
    />

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

    {/* Content */}
    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">

      {/* Duration Badge */}
      <div>
        <span className="inline-block bg-saffron text-primary text-xs font-inter font-bold px-4 py-1.5 rounded-full">
          {itinerary.duration}
        </span>
      </div>

      {/* Bottom Content */}
      <div>
        <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold mb-3">
          {itinerary.title}
        </h3>
        <p className="text-white/70 text-sm font-inter leading-relaxed mb-5">
          {itinerary.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1 mb-6">
          {itinerary.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-white/60 text-xs font-inter">
              <span className="w-1 h-1 bg-saffron rounded-full" />
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-inter font-medium px-6 py-3 rounded-full hover:bg-saffron hover:text-primary hover:border-saffron transition-all duration-300"
        >
          Plan This Trip →
        </Link>
      </div>
    </div>
  </div>
);

const ItinerarySlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((p) => (p - 1 + itineraries.length) % itineraries.length);
  const next = () =>
    setCurrent((p) => (p + 1) % itineraries.length);

  return (
    <section className="py-16 md:py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-saffron" />
              <p className="text-saffron text-xs tracking-[0.3em] uppercase font-inter">
                Plan
              </p>
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-bold">
              Plan Your Perfect Escape
            </h2>
            <p className="text-white/50 font-inter text-sm md:text-base mt-3 max-w-xl">
              Har safar alag hota hai — apna wala chunno!
            </p>
          </div>

          {/* Arrow Controls */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 text-white hover:border-saffron hover:text-saffron transition-all duration-300 flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-saffron text-primary hover:bg-white transition-all duration-300 flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        {/* Cards — Mobile: 1, Desktop: 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[0, 1, 2].map((offset) => {
            const index = (current + offset) % itineraries.length;
            return (
              <ItineraryCard
                key={itineraries[index].id}
                itinerary={itineraries[index]}
                isActive={offset === 0}
              />
            );
          })}
        </div>

        {/* Dots — Mobile */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {itineraries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300
                ${index === current
                  ? "bg-saffron w-6 h-2"
                  : "bg-white/20 w-2 h-2"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ItinerarySlider;
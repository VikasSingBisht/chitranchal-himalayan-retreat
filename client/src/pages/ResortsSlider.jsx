import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import resorts from "../data/resorts";

const ResortsSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % resorts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((p) => (p - 1 + resorts.length) % resorts.length);
  const next = () =>
    setCurrent((p) => (p + 1) % resorts.length);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Stay
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-primary font-bold mb-4">
            Best Stays in Kumaon
          </h2>
          <p className="text-darkbrown/60 max-w-xl mx-auto text-lg">
            Pahaadon ki godh mein — comfort aur culture ek saath!
          </p>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* Cards Container */}
          <div className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{
              transform: `translateX(calc(-${current * 100}% / 3 - ${current * 8}px))`,
            }}
          >
            {resorts.map((resort, index) => (
              <Link
                to="/resorts"
                key={resort.id}
                className={`group min-w-[calc(33.33%-16px)] bg-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500
                  ${index === current ? "scale-105" : "scale-95 opacity-70"}`}
              >
                {/* Image */}
                <div
                  className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${resort.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"})`,
                  }}
                />

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-playfair text-lg text-primary font-bold">
                      {resort.name}
                    </h3>
                    <span className="text-accent font-semibold text-sm">
                      {resort.price}
                    </span>
                  </div>

                  <p className="text-darkbrown/50 text-xs mb-2">
                    📍 {resort.location}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xs ${star <= Math.round(resort.rating) ? "text-accent" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-darkbrown/40 text-xs ml-1">
                      {resort.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors duration-300"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors duration-300"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {resorts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300
                ${index === current ? "bg-accent w-6 h-2" : "bg-darkbrown/20 w-2 h-2"}`}
            />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            to="/resorts"
            className="inline-block bg-primary text-cream px-8 py-3 rounded-full font-medium hover:bg-darkbrown transition-colors duration-300"
          >
            View All Resorts →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ResortsSlider;
import { useState } from "react";
import { Link } from "react-router-dom";
import places from "../data/places";

const DestinationsCarousel = () => {

  const visibleCards = 4;
  const [current, setCurrent] = useState(0);

  const maxIndex = Math.ceil(places.length / visibleCards) - 1;

  const next = () => {
    setCurrent((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-20 bg-cream overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex justify-between items-end mb-12">

          <div>
            <p className="text-saffron uppercase tracking-widest text-xs mb-2">
              Explore
            </p>

            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary">
              Featured Destinations
            </h2>
          </div>

          <div className="flex gap-3">

            <button
              onClick={prev}
              className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              ←
            </button>

            <button
              onClick={next}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-saffron transition"
            >
              →
            </button>

          </div>

        </div>

        {/* Slider */}

        <div className="overflow-hidden">

          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${current * 100}%)`
            }}
          >

            {places.map((place) => (

              <div
                key={place.id}
                className="min-w-[25%] px-3"
              >

                <Link
                  to={`/place/${place.id}`}
                  className="group block relative h-[420px] rounded-2xl overflow-hidden"
                >

                  {/* Image */}

                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
                    style={{
                      backgroundImage: `url(${place.image})`
                    }}
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}

                  <div className="absolute bottom-0 p-6">

                    <span className="text-xs bg-saffron text-primary px-3 py-1 rounded-full">
                      {place.category}
                    </span>

                    <h3 className="text-white text-xl font-bold mt-3">
                      {place.name}
                    </h3>

                    <p className="text-white/70 text-sm mt-1">
                      {place.tagline}
                    </p>

                  </div>

                </Link>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default DestinationsCarousel;
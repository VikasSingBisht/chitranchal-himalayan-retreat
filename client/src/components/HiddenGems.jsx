import { Link } from "react-router-dom";
import places from "../data/places";

const HiddenGems = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}

        <div className="text-center mb-10 md:mb-16">

          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="w-8 h-px bg-saffron" />

            <p className="text-saffron text-xs tracking-[0.3em] uppercase font-inter">
              Discover
            </p>

            <div className="w-8 h-px bg-saffron" />
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl text-primary font-bold mb-4">
            Hidden Corners of Mukteshwar
          </h2>

          <p className="text-primary/60 font-inter text-sm md:text-base max-w-xl mx-auto">
            Quiet forest trails, ancient temples, hidden waterfalls and
            peaceful Himalayan villages — the places that locals truly love.
          </p>

        </div>

        {/* Grid */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          {places.map((place, index) => (

            <Link
              key={place.id}
              to={`/place/${place.id}`}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer
                ${index === 0 || index === 3 ? "md:row-span-2" : ""}`}
              style={{
                height:
                  index === 0 || index === 3
                    ? "100%"
                    : "200px",
                minHeight:
                  index === 0 || index === 3
                    ? "420px"
                    : "200px",
              }}
            >

              {/* Image */}

              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${
                    place.image ||
                    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600"
                  })`,
                }}
              />

              {/* Default Gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Hover Overlay */}

              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center px-4">

                <span className="text-white font-inter text-xs tracking-widest uppercase">
                  🌿 {place.category}
                </span>

                <span className="text-white font-playfair text-lg md:text-xl font-bold">
                  {place.name}
                </span>

                <span className="text-white/70 font-inter text-xs italic">
                  {place.tagline}
                </span>

                <span className="border border-saffron text-saffron font-inter text-xs px-4 py-2 rounded-full hover:bg-saffron hover:text-primary transition-all duration-300">
                  Discover This Place →
                </span>

              </div>

              {/* Default Bottom Label */}

              <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300">

                <p className="text-white font-playfair text-sm md:text-base font-bold">
                  {place.name}
                </p>

                <p className="text-white/70 font-inter text-xs flex items-center gap-1 mt-1">
                  🌿 {place.category}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
};

export default HiddenGems;
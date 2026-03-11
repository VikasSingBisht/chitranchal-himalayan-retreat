import { Link } from "react-router-dom";
import resorts from "../data/resorts";

/* ---------- Star Rating Component ---------- */

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= Math.round(rating) ? "text-accent" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-darkbrown/50 text-xs ml-1">{rating}</span>
    </div>
  );
};

/* ---------- Resort Card ---------- */

const ResortCard = ({ resort }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">

    {/* Resort Image */}

    <div
      className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={{
        backgroundImage: `url(${
          resort.image ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
        })`,
      }}
    />

    {/* Content */}

    <div className="p-6">

      {/* Title + Price */}

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-playfair text-xl text-primary font-bold leading-snug">
          {resort.name}
        </h3>

        <span className="text-accent font-semibold text-sm whitespace-nowrap ml-2">
          {resort.price}
        </span>
      </div>

      {/* Location */}

      <p className="text-darkbrown/50 text-xs mb-2">
        📍 {resort.location}, Mukteshwar
      </p>

      {/* Rating */}

      <StarRating rating={resort.rating} />

      {/* Description */}

      <p className="text-darkbrown/60 text-sm leading-relaxed mt-3 mb-5">
        {resort.description}
      </p>

      {/* Amenities */}

      <div className="flex flex-wrap gap-2 mb-5">
        {resort.amenities?.slice(0, 3).map((amenity, index) => (
          <span
            key={index}
            className="bg-cream text-primary text-xs px-3 py-1 rounded-full border border-accent/20"
          >
            {amenity}
          </span>
        ))}
      </div>

      {/* CTA */}

      <Link
        to={`/resorts/${resort.id}`}
        className="inline-block bg-primary text-cream text-sm font-semibold px-5 py-2 rounded-full hover:bg-darkbrown transition-colors duration-300"
      >
        View Stay →
      </Link>

    </div>
  </div>
);

/* ---------- Resorts Preview Section ---------- */

const ResortsPreview = () => (
  <section id="resorts" className="py-24 px-6 bg-cream">

    <div className="max-w-7xl mx-auto">

      {/* Section Header */}

      <div className="text-center mb-16">

        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
          Stay in the Hills
        </p>

        <h2 className="font-playfair text-4xl md:text-5xl text-primary font-bold mb-4">
          Handpicked Stays in Mukteshwar
        </h2>

        <p className="text-darkbrown/60 max-w-xl mx-auto text-lg">
          Discover cozy cottages, luxury resorts, and peaceful mountain stays
          surrounded by the beauty of Kumaon.
        </p>

      </div>

      {/* Resort Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {resorts.slice(0, 3).map((resort) => (
          <ResortCard key={resort.id} resort={resort} />
        ))}

      </div>

      {/* View All Resorts Button */}

      <div className="text-center mt-12">

        <Link
          to="/resorts"
          className="inline-block bg-primary text-cream px-8 py-3 rounded-full font-medium hover:bg-darkbrown transition-colors duration-300"
        >
          Explore All Stays →
        </Link>

      </div>

    </div>

  </section>
);

export default ResortsPreview;
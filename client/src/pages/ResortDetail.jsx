import { useParams, Link } from "react-router-dom";
import resorts from "../data/resorts";

const ResortDetail = () => {
  const { id } = useParams();
  const resort = resorts.find((r) => r.id === Number(id));

  // Related resorts
  const related = resorts
    .filter((r) => r.id !== resort?.id)
    .slice(0, 3);

  // Not found
  if (!resort) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
        <p className="text-6xl mb-4">🏔️</p>
        <h2 className="font-playfair text-3xl text-primary mb-3">
          Resort nahi mila!
        </h2>
        <Link
          to="/resorts"
          className="text-accent hover:text-primary transition-colors"
        >
          ← Wapas Resorts Pe
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* Hero Image */}
      <div
        className="h-[65vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${resort.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            📍 {resort.location}
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-white font-bold mb-4">
            {resort.name}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-lg ${star <= Math.round(resort.rating) ? "text-accent" : "text-white/30"}`}
              >
                ★
              </span>
            ))}
            <span className="text-white/60 text-sm ml-1">{resort.rating}</span>
          </div>
          <span className="bg-accent text-darkbrown font-bold px-6 py-2 rounded-full text-lg">
            {resort.price}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Back Button */}
        <Link
          to="/resorts"
          className="inline-flex items-center gap-2 text-accent text-sm hover:text-primary transition-colors mb-10"
        >
          ← Wapas Resorts Pe
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left — Description */}
          <div className="md:col-span-2">
            <h2 className="font-playfair text-3xl text-primary font-bold mb-6">
              About {resort.name}
            </h2>
            <p className="text-darkbrown/70 leading-relaxed text-lg mb-8">
              {resort.description}
            </p>

            {/* Amenities */}
            <h3 className="font-playfair text-2xl text-primary font-bold mb-5">
              Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {resort.amenities?.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm"
                >
                  <span className="text-accent">✓</span>
                  <span className="text-darkbrown/70 text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Booking Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-playfair text-xl text-primary font-bold mb-2">
                Book Your Stay
              </h3>
              <p className="text-darkbrown/50 text-sm mb-6">
                Aaj hi apni jagah pakki karo!
              </p>

              <div className="flex justify-between items-center mb-6 pb-6 border-b border-accent/20">
                <span className="text-darkbrown/60 text-sm">Per Night</span>
                <span className="font-playfair text-2xl text-accent font-bold">
                  {resort.price}
                </span>
              </div>

              <div className="space-y-3 mb-6 text-sm text-darkbrown/60">
                <div className="flex justify-between">
                  <span>📍 Location</span>
                  <span className="text-primary font-medium">{resort.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>⭐ Rating</span>
                  <span className="text-primary font-medium">{resort.rating} / 5</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="block w-full bg-primary text-cream text-center font-semibold py-3 rounded-xl hover:bg-darkbrown transition-colors duration-300"
              >
                Book Now →
              </Link>

              <p className="text-center text-darkbrown/40 text-xs mt-4">
                Free cancellation • Instant confirmation
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Related Resorts */}
      {related.length > 0 && (
        <div className="bg-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-playfair text-3xl text-primary font-bold mb-10 text-center">
              Aur Dekho
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/resorts/${r.id}`}
                  className="group bg-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${r.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"})`,
                    }}
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-playfair text-lg text-primary font-bold">
                        {r.name}
                      </h3>
                      <span className="text-accent text-sm font-semibold">
                        {r.price}
                      </span>
                    </div>
                    <p className="text-darkbrown/50 text-xs">📍 {r.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResortDetail;
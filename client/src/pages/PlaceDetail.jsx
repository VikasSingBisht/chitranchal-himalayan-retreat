import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import places from "../data/places";

const categoryColors = {
  Spiritual: "#E8A020",
  Adventure: "#E84040",
  Nature: "#2D8A4E",
  Village: "#6B5CE7",
};

const PlaceDetail = () => {
  const { id } = useParams();

  const place = places.find((p) => p.id === Number(id));

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const related = place
    ? places
        .filter((p) => p.category === place.category && p.id !== place.id)
        .slice(0, 3)
    : [];

  if (!place) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
        <p className="text-6xl mb-4">🏔️</p>
        <h2 className="font-playfair text-3xl text-primary mb-3">
          Place nahi mila!
        </h2>
        <Link
          to="/destinations"
          className="text-accent hover:text-primary transition-colors"
        >
          ← Wapas Destinations Pe
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* HERO */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        <Link
          to="/destinations"
          className="absolute top-24 left-6 md:left-12 z-10 text-white/70 hover:text-white text-sm"
        >
          ← Back to Destinations
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16 z-10">
          <div className="max-w-4xl">

            <span
              className="text-xs font-bold px-4 py-1.5 rounded-full"
              style={{
                background: categoryColors[place.category],
                color: "white",
              }}
            >
              {place.category}
            </span>

            <h1 className="font-playfair text-4xl md:text-6xl text-white font-bold mt-4">
              {place.name}
            </h1>

            <p className="text-accent italic mt-3">
              "{place.tagline}"
            </p>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* MAIN */}
        <div className="md:col-span-2">

          <h2 className="text-accent uppercase text-xs tracking-widest mb-4">
            About
          </h2>

          <p className="text-primary/70 leading-relaxed mb-10">
            {place.description || place.tagline}
          </p>

          {/* Highlights */}
          {place.highlights && (
            <>
              <h2 className="text-accent uppercase text-xs tracking-widest mb-4">
                Highlights
              </h2>

              <div className="grid md:grid-cols-2 gap-3 mb-10">
                {place.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white p-4 rounded-xl border"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: categoryColors[place.category],
                      }}
                    />
                    <p className="text-sm">{h}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Best Time */}
          {place.bestTime && (
            <div className="bg-primary text-white rounded-xl p-6 flex items-center gap-4">
              <span className="text-3xl">🗓️</span>
              <div>
                <p className="text-xs text-accent uppercase tracking-widest">
                  Best Time
                </p>
                <p className="text-lg font-bold">{place.bestTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">

          {/* Info */}
          <div className="bg-white p-6 rounded-xl border">
            <p className="text-xs uppercase tracking-widest mb-4 text-primary/40">
              Place Info
            </p>

            <div className="flex justify-between mb-3">
              <span className="text-primary/50">Category</span>
              <span>{place.category}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-primary/50">Location</span>
              <span>Mukteshwar</span>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="bg-white p-6 rounded-xl border">

              <p className="text-xs uppercase tracking-widest mb-4 text-primary/40">
                Similar Places
              </p>

              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/place/${p.id}`}
                  className="flex items-center gap-3 mb-4 group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <div>
                    <p
                      className="text-xs"
                      style={{ color: categoryColors[p.category] }}
                    >
                      {p.category}
                    </p>

                    <p className="text-sm font-semibold group-hover:text-accent">
                      {p.name}
                    </p>
                  </div>
                </Link>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default PlaceDetail;
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import places from "../data/places";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const placeCoords = {
  1: [29.4634, 79.6451],
  2: [29.4612, 79.6489],
  3: [29.4701, 79.6398],
  4: [29.4589, 79.6521],
  5: [29.4820, 79.6340],
  6: [29.4715, 79.6175],
  7: [29.4785, 79.6240],
};

const categoryColors = {
  Spiritual: "#E8A020",
  Adventure: "#E84040",
  Nature: "#2D8A4E",
  Village: "#6B5CE7",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200";

// ← Only 4 panels
const visiblePlaces = places.slice(0, 4);

const createCustomIcon = (category, isActive = false) =>
  L.divIcon({
    html: `<div style="
      background:${categoryColors[category] || "#E8A020"};
      width:${isActive ? "18px" : "14px"};
      height:${isActive ? "18px" : "14px"};
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 2px 12px rgba(0,0,0,0.5);
    "></div>`,
    className: "",
    iconSize: [isActive ? 18 : 14, isActive ? 18 : 14],
    iconAnchor: [isActive ? 9 : 7, isActive ? 9 : 7],
  });

const FlyToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 14, { duration: 1.5 });
  }, [coords, map]);
  return null;
};

const Destinations = () => {
  const stickyRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelProgress, setPanelProgress] = useState(0);
  const [activeMapPlace, setActiveMapPlace] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      const totalScroll = stickyRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const totalProgress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      const panelSize = 1 / visiblePlaces.length;          // ← fixed
      const index = Math.min(
        Math.floor(totalProgress / panelSize),
        visiblePlaces.length - 1                           // ← fixed
      );
      const progress = (totalProgress % panelSize) / panelSize;
      setActiveIndex(index);
      setPanelProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-cream min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${places[0]?.image || FALLBACK_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-12 h-px bg-accent" />
            <p className="text-accent text-xs tracking-[0.5em] uppercase font-inter">
              Mukteshwar • Uttarakhand • 2,286m
            </p>
            <div className="w-12 h-px bg-accent" />
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-none mb-6">
            Discover the Soul
            <br />
            <span className="text-accent italic">of Mukteshwar</span>
          </h1>

          <p className="text-white/60 font-inter text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Hidden places in the lap of the Himalayas — temples, waterfalls,
            cliffs and peaceful landscapes — each telling its own story.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {Object.keys(categoryColors).map((cat) => (
              <span
                key={cat}
                className="font-inter text-sm px-5 py-2.5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: categoryColors[cat] + "60",
                  color: categoryColors[cat],
                  background: categoryColors[cat] + "15",
                }}
              >
                ✦ {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-16">
            {[
              { number: `${places.length}+`, label: "Places" },
              { number: "2,286m", label: "Altitude" },
              { number: "300+", label: "Years of History" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-playfair text-2xl md:text-3xl text-accent font-bold">
                  {stat.number}
                </p>
                <p className="text-white/40 font-inter text-xs uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <p className="text-white/40 text-xs font-inter tracking-widest uppercase">Begin Journey</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── JOURNEY STRIP ── */}
      <div className="bg-primary py-6 px-6 text-center">
        <p className="font-inter text-white/40 text-xs tracking-[0.4em] uppercase">
          ✦ Your Journey Through Mukteshwar Begins ✦
        </p>
      </div>

      {/* ── STICKY SCROLL — 4 PANELS ONLY ── */}
      <div
        ref={stickyRef}
        className="relative"
        style={{ height: `${visiblePlaces.length * 100}vh` }}  // ← fixed
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {visiblePlaces.map((place, index) => {           // ← fixed
            let translateY = "100%";
            if (index < activeIndex) translateY = "0%";
            else if (index === activeIndex) {
              translateY = index === 0 ? "0%" : `${(1 - panelProgress) * 100}%`;
            }

            return (
              <div
                key={place.id}
                className="absolute inset-0"
                style={{
                  transform: `translateY(${translateY})`,
                  transition: "transform 0.05s linear",
                  zIndex: index + 1,
                }}
              >
                {/* Mobile */}
                <div className="flex flex-col h-full md:hidden bg-primary">
                  <div className="relative overflow-hidden" style={{ height: "50%" }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${place.image || FALLBACK_IMAGE})`,
                        transform: `translateY(${panelProgress * -20}px)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                      <p className="text-white font-inter text-xs">
                        {String(index + 1).padStart(2, "0")} / {String(visiblePlaces.length).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-6 py-6 flex-1">
                    <span
                      className="inline-block text-xs font-inter font-bold px-3 py-1 rounded-full mb-3 w-fit"
                      style={{
                        background: categoryColors[place.category] + "20",
                        color: categoryColors[place.category],
                      }}
                    >
                      {place.category}
                    </span>
                    <h2 className="font-playfair text-3xl text-white font-bold uppercase mb-2">
                      {place.name}
                    </h2>
                    <p className="text-accent italic font-inter text-sm mb-4">
                      "{place.tagline}"
                    </p>
                    <Link
                      to={`/place/${place.id}`}
                      className="inline-flex items-center gap-2 text-white/60 font-inter text-sm hover:text-accent transition-colors w-fit"
                    >
                      <span className="w-6 h-px bg-accent" />
                      Discover Place
                    </Link>
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:grid grid-cols-2 h-full">
                  <div className="relative bg-primary flex flex-col justify-center px-16 py-16 overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-accent -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full border border-accent translate-x-1/3 translate-y-1/3" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-10">
                        <span
                          className="text-xs font-inter font-bold px-4 py-1.5 rounded-full"
                          style={{
                            background: categoryColors[place.category] + "20",
                            color: categoryColors[place.category],
                          }}
                        >
                          {place.category}
                        </span>
                        <p className="text-white/20 font-playfair text-sm">
                          {String(index + 1).padStart(2, "0")} / {String(visiblePlaces.length).padStart(2, "0")}
                        </p>
                      </div>

                      <h2 className="font-playfair text-5xl lg:text-6xl text-white font-bold leading-none uppercase mb-4">
                        {place.name}
                      </h2>

                      <p className="text-accent italic font-inter text-lg mb-4">
                        "{place.tagline}"
                      </p>

                      <div
                        className="w-16 h-1 rounded-full mb-8"
                        style={{ background: categoryColors[place.category] }}
                      />

                      {place.description && (
                        <p className="text-white/50 font-inter text-sm leading-relaxed mb-8 max-w-md">
                          {place.description}
                        </p>
                      )}

                      <Link
                        to={`/place/${place.id}`}
                        className="inline-flex items-center gap-3 group w-fit"
                      >
                        <span
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ background: categoryColors[place.category] }}
                        >
                          <span className="text-white text-sm">→</span>
                        </span>
                        <span className="text-white/60 font-inter text-sm group-hover:text-white transition-colors">
                          Discover This Place
                        </span>
                      </Link>
                    </div>

                    <p className="absolute bottom-6 left-16 font-playfair text-9xl text-white/5 font-bold select-none">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${place.image || FALLBACK_IMAGE})`,
                        transform: `scale(1.1) translateY(${panelProgress * -40}px)`,
                        transition: "transform 0.05s linear",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                  </div>
                </div>

              </div>
            );
          })}

          {/* Progress Dots */}
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
            {visiblePlaces.map((_, i) => (             // ← fixed
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: "8px",
                  height: i === activeIndex ? "32px" : "8px",
                  background: i === activeIndex
                    ? categoryColors[visiblePlaces[i].category]  // ← fixed
                    : i < activeIndex
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── MAP ── */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="w-8 h-px bg-accent" />
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-inter">Navigate</p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-bold mb-3">
              Explore on the Map
            </h2>
            <p className="text-white/40 font-inter text-sm md:text-base max-w-xl mx-auto">
              From temples to waterfalls — explore every location on the map.
            </p>
          </div>

          <div className="flex justify-center gap-4 md:gap-8 mb-10 flex-wrap">
            {Object.entries(categoryColors).map(([name, color]) => (
              <span key={name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-white/50 font-inter text-xs">{name}</span>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 rounded-2xl overflow-hidden shadow-2xl" style={{ height: "520px" }}>
              <MapContainer
                key={activeMapPlace?.id || "map"}
                center={[29.4634, 79.6451]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap & CartoDB"
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <FlyToLocation coords={activeMapPlace ? placeCoords[activeMapPlace.id] : null} />
                {places.map((place) => {
                  const coords = placeCoords[place.id];
                  if (!coords || !Array.isArray(coords)) return null;
                  return (
                    <Marker
                      key={place.id}
                      position={coords}
                      icon={createCustomIcon(place.category, activeMapPlace?.id === place.id)}
                      eventHandlers={{ click: () => setActiveMapPlace(place) }}
                    >
                      <Popup>
                        <div style={{ fontFamily: "sans-serif", minWidth: "160px" }}>
                          <span style={{
                            background: categoryColors[place.category],
                            color: "white", fontSize: "10px",
                            padding: "2px 8px", borderRadius: "999px", fontWeight: "600",
                          }}>
                            {place.category}
                          </span>
                          <p style={{ fontWeight: "700", fontSize: "14px", margin: "6px 0 4px" }}>
                            {place.name}
                          </p>
                          <p style={{ fontSize: "12px", color: "#666", margin: "0 0 8px" }}>
                            {place.tagline}
                          </p>
                          
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#E8A020", fontSize: "12px", fontWeight: "600" }}
                          >
                            Get Directions →
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "520px" }}>
              {places.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setActiveMapPlace(place)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border
                    ${activeMapPlace?.id === place.id
                      ? "bg-white/15 border-accent shadow-lg"
                      : "bg-white/5 border-white/10 hover:border-accent/40"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: categoryColors[place.category] }} />
                    <p className="font-inter text-sm font-semibold text-white">{place.name}</p>
                  </div>
                  <p className="font-inter text-xs text-white/40 pl-4 italic">{place.tagline}</p>
                  {activeMapPlace?.id === place.id && (
                    <Link
                      to={`/place/${place.id}`}
                      className="mt-3 ml-4 inline-flex items-center gap-1 text-accent font-inter text-xs hover:text-white transition-colors"
                    >
                      View Details →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="w-8 h-px bg-accent" />
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-inter">Gallery</p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-primary font-bold mb-3">
              Hidden Corners
            </h2>
            <p className="text-primary/40 font-inter text-sm max-w-xl mx-auto">
              Places only the locals know — now you do too!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {places.map((place, index) => (
              <Link
                key={place.id}
                to={`/place/${place.id}`}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer
                  ${index === 0 || index === 3 ? "md:row-span-2" : ""}`}
                style={{ minHeight: index === 0 || index === 3 ? "420px" : "200px" }}
              >
                <img
                  src={place.image || FALLBACK_IMAGE}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                  <span className="text-white/60 font-inter text-xs tracking-widest uppercase">
                    📍 {place.category}
                  </span>
                  <span className="text-white font-playfair text-lg font-bold text-center">
                    {place.name}
                  </span>
                  <span className="border border-accent text-accent font-inter text-xs px-4 py-2 rounded-full">
                    Explore →
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-white font-playfair text-sm font-bold">{place.name}</p>
                  <p className="text-white/60 font-inter text-xs mt-1">📍 {place.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${places[0]?.image || FALLBACK_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-10 h-px bg-accent" />
            <p className="text-accent text-xs tracking-[0.4em] uppercase font-inter">Your Journey Awaits</p>
            <div className="w-10 h-px bg-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl text-white font-bold mb-4">
            Ready to Experience
            <br />
            <span className="text-accent italic">Mukteshwar?</span>
          </h2>
          <p className="text-white/50 font-inter text-base md:text-lg max-w-xl mx-auto mb-10">
            Plan your perfect trip with Chitranchal — we'll show you the real colors of every place!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-primary font-inter font-semibold px-8 py-4 rounded-full hover:bg-white transition-all duration-300"
            >
              ✦ Plan Your Trip
            </Link>
            <Link
              to="/resorts"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-inter px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View Resorts →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Destinations;
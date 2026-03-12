import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const panels = [

  {
    id: 1,
    place: "Kumaoni Culture & Flavors",
    tagline: "CELEBRATE THE SOUL OF THE HILLS",
    description:
      "Experience the warmth of Kumaoni hospitality, traditional flavors, and stories of the mountains. Here, culture is not just seen — it is felt in every meal, every smile, and every moment shared.",
    category: "Culture",
//\bgImages\Images\stickyScroll\food.png
    image: "/bgImages/Images/stickyScroll/food.png",
    cta: "Experience the Culture",
  },
  {
    id: 3,
    place: "Forest & Nature Trails",
    tagline: "STEP INTO THE HEART OF NATURE",
    description:
      "Walk through ancient pine and deodar forests where the air is pure and every step reconnects you with nature. The sound of birds, wind, and rustling leaves becomes a quiet meditation for the soul.",
    category: "Nature",
    image: "/bgImages/Images/stickyScroll/forest.png",
    cta: "Explore the Trails",
  },

  {
    id: 3,
    place: "Chitranchal Himalayan Retreat",
    tagline: "WHERE THE HIMALAYAS WELCOME YOU",
    description:
      "Wake up above the clouds where the first rays of the sun touch the Himalayan peaks. At Chitranchal, every morning feels like a quiet celebration of nature, peace, and the timeless spirit of the mountains.",
    category: "Retreat",
  
    image: "/bgImages/Images/stickyScroll/stay.png",
    cta: "Discover the Retreat",
  },
  {
    id: 4,
    place: "Golden Sunset Point",
    tagline: "WHEN THE SKY TURNS TO GOLD",
    description:
      "As the sun slowly disappears behind the mountains, the sky glows with shades of gold and crimson. In this silent moment, surrounded by vast Himalayan horizons, you feel both thrill and serenity at once.",
    category: "View",
    image:"/bgImages/Images/stickyScroll/sunset.png",
    cta: "Watch the Sunset",
  },
  
  
];

const StickyScrollReveal = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelProgress, setPanelProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const totalProgress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      const panelSize = 1 / panels.length;
      const index = Math.min(
        Math.floor(totalProgress / panelSize),
        panels.length - 1
      );
      const progress = (totalProgress % panelSize) / panelSize;
      setActiveIndex(index);
      setPanelProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {panels.map((panel, index) => {
          let translateY = "100%";
          if (index < activeIndex) translateY = "0%";
          else if (index === activeIndex) {
            translateY = index === 0 ? "0%" : `${(1 - panelProgress) * 100}%`;
          }

          return (
            <div
              key={panel.id}
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translateY(${translateY})`,
                transition: "transform 0.05s linear",
                zIndex: index + 1,
              }}
            >
              {/* ── MOBILE LAYOUT ── */}
              <div className="flex flex-col h-full md:hidden bg-primary">

                {/* Image — Top 50% */}
                <div
                  className="w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${panel.image})`,
                    height: "50%",
                  }}
                />

                {/* Content — Bottom 50% */}
                <div className="flex flex-col justify-center px-6 py-6 h-1/2 overflow-hidden">
                  {/* Counter + Category */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-saffron text-xs font-inter tracking-[0.3em] uppercase">
                      {panel.category}
                    </p>
                    <p className="text-white/20 font-playfair text-sm">
                      0{index + 1}/{String(panels.length).padStart(2, "0")}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="text-white/30 text-xs font-inter tracking-widest uppercase mb-2">
                    {panel.tagline}
                  </p>

                  {/* Place Name */}
                  <h2 className="font-playfair text-3xl text-white font-bold leading-none uppercase mb-3">
                    {panel.place}
                  </h2>

                  {/* Description */}
                  <p className="text-white/50 font-inter text-xs leading-relaxed mb-5">
                    {panel.description}
                  </p>

                  {/* CTA */}
                  <Link
                    to={`/place/${panel.id}`}
                    className="inline-flex items-center gap-2 bg-saffron text-primary font-inter font-semibold text-xs px-6 py-3 rounded-full w-fit hover:bg-white transition-all duration-300"
                  >
                    {panel.cta}
                  </Link>
                </div>
              </div>

              {/* ── DESKTOP LAYOUT ── */}
              <div className="hidden md:grid grid-cols-2 h-full">

                {/* LEFT — Text */}
                <div className="relative bg-primary flex flex-col justify-center px-16 py-16 overflow-hidden">
                  {/* Bg circles decoration */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-white -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full border border-white translate-x-1/3 translate-y-1/3" />
                  </div>

                  <div className="relative z-10">
                    {/* Counter */}
                    <div className="flex items-center justify-between mb-8">
                      <p className="text-saffron text-xs font-inter tracking-[0.4em] uppercase">
                        {panel.category}
                      </p>
                      <p className="text-white/20 font-playfair text-sm">
                        0{index + 1}/{String(panels.length).padStart(2, "0")}
                      </p>
                    </div>

                    {/* Tagline */}
                    <p className="text-white/30 text-xs font-inter tracking-[0.2em] uppercase mb-3">
                      {panel.tagline}
                    </p>

                    {/* Place Name */}
                    <h2 className="font-playfair text-5xl lg:text-7xl text-white font-bold leading-none uppercase mb-6">
                      {panel.place}
                    </h2>

                    {/* Description */}
                    <p className="text-white/50 font-inter text-base leading-relaxed mb-10 max-w-md">
                      {panel.description}
                    </p>

                    {/* CTA */}
                    <Link
                      to={`/place/${panel.id}`}
                      className="inline-flex items-center gap-3 bg-saffron text-primary font-inter font-semibold text-sm px-8 py-4 rounded-full hover:bg-white transition-all duration-300 w-fit"
                    >
                      {panel.cta}
                    </Link>
                  </div>

                  {/* Panel Number bg */}
                  <p className="absolute bottom-6 left-16 font-playfair text-9xl text-white/5 font-bold select-none">
                    0{panel.id}
                  </p>
                </div>

                {/* RIGHT — Image */}
                <div className="relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${panel.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                </div>
              </div>

            </div>
          );
        })}

        {/* Progress Dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
          {panels.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300
                ${i === activeIndex
                  ? "bg-saffron w-2 h-8"
                  : i < activeIndex
                    ? "bg-white/60 w-2 h-2"
                    : "bg-white/20 w-2 h-2"
                }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default StickyScrollReveal;
import { Link } from "react-router-dom";
import places from "../data/places";
import culture from "../data/culture";
import useScrollAnimation from "../hooks/useScrollAnimation";

const PlaceCard = ({ item }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">

    <div
      className="h-72 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      style={{ backgroundImage: `url(${item.image})` }}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    <div className="absolute bottom-0 left-0 right-0 p-6">
      <span className="text-accent text-xs tracking-widest uppercase font-medium">
        {item.category || item.type}
      </span>

      <h3 className="font-playfair text-white text-xl font-bold mt-1 mb-2">
        {item.name || item.title}
      </h3>

      <p className="text-white/70 text-sm mb-4 leading-relaxed">
        {item.description}
      </p>

      <Link
        to={`/place/${item.id}`}
        className="inline-block bg-accent text-darkbrown text-sm font-semibold px-5 py-2 rounded-full hover:bg-white transition-colors duration-300"
      >
        Learn More →
      </Link>
    </div>
  </div>
);

const ExploreSection = () => {
 const ref = useScrollAnimation();
  const exploreItems = [...places, ...culture];

  return (
 <section id="explore" ref={ref} className="animate-hidden py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
            Discover
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-primary font-bold mb-4">
            Explore Kumaon
          </h2>
          <p className="text-darkbrown/60 max-w-xl mx-auto text-lg">
            Har jagah ek kahani hai — chalte hain unhe dhundhne!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreItems.map((item) => (
           <PlaceCard key={`${item.category || item.type}-${item.id}`} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreSection;
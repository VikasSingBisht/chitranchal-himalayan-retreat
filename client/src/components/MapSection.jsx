import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Fix marker icons */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Locations */

const locations = [
  {
    id: 1,
    name: "Mukteshwar Temple",
    category: "Spiritual",
    description: "Ancient Shiva temple with breathtaking Himalayan views.",
    lat: 29.4634,
    lng: 79.6451,
  },
  {
    id: 2,
    name: "Chauli Ki Jali",
    category: "Adventure",
    description: "A dramatic cliff known for its panoramic mountain views.",
    lat: 29.4612,
    lng: 79.6489,
  },
  {
    id: 3,
    name: "Bhalu Gaad Waterfall",
    category: "Nature",
    description: "A beautiful hidden waterfall reached through a forest trek.",
    lat: 29.4701,
    lng: 79.6398,
  },
  {
    id: 4,
    name: "Sitla Village",
    category: "Village",
    description: "A peaceful Himalayan village surrounded by forests.",
    lat: 29.4589,
    lng: 79.6521,
  },
  {
    id: 5,
    name: "Peora Village",
    category: "Village",
    description: "A charming mountain village famous for apple orchards.",
    lat: 29.482,
    lng: 79.634,
  },
];

/* Category colors */

const categoryColors = {
  Spiritual: "#E8A020",
  Adventure: "#E84040",
  Nature: "#2D8A4E",
  Village: "#6B5CE7",
};

/* Custom marker */

const createCustomIcon = (category) =>
  L.divIcon({
    html: `<div style="
      background:${categoryColors[category]};
      width:14px;
      height:14px;
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

/* Fly animation */

const FlyToLocation = ({ coords }) => {
  const map = useMap();

  if (coords) {
    map.flyTo(coords, 14, { duration: 1.5 });
  }

  return null;
};

const MapSection = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Explore Mukteshwar from Above
          </h2>

          <p className="text-primary/60 max-w-xl mx-auto">
            Discover temples, forests, waterfalls and peaceful villages
            through an interactive satellite view of Mukteshwar.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          {/* MAP */}

          <div className="md:col-span-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">

            <MapContainer
              center={[29.4634, 79.6451]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >

              <LayersControl position="topright">

                {/* Satellite (Default) */}

                <LayersControl.BaseLayer checked name="Satellite">
                  <TileLayer
                    attribution="Tiles © Esri"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                </LayersControl.BaseLayer>

                {/* Normal Map */}

                <LayersControl.BaseLayer name="Map">
                  <TileLayer
                    attribution="&copy; OpenStreetMap & CartoDB"
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                </LayersControl.BaseLayer>

                {/* Terrain */}

                <LayersControl.BaseLayer name="Terrain">
                  <TileLayer
                    attribution="&copy; OpenTopoMap"
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>

              </LayersControl>

              <FlyToLocation
                coords={
                  activeLocation
                    ? [activeLocation.lat, activeLocation.lng]
                    : null
                }
              />

              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  icon={createCustomIcon(loc.category)}
                  eventHandlers={{
                    click: () => setActiveLocation(loc),
                  }}
                >
                  <Popup>

                    <strong>{loc.name}</strong>

                    <p style={{ fontSize: "12px", margin: "6px 0" }}>
                      {loc.description}
                    </p>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "12px", color: "#0077cc" }}
                    >
                      Get Directions →
                    </a>

                  </Popup>
                </Marker>
              ))}

            </MapContainer>

          </div>

          {/* Place List */}

          <div className="flex flex-col gap-3">

            <p className="text-xs uppercase text-primary/40 tracking-widest">
              Places
            </p>

            {locations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                className="bg-white rounded-xl px-4 py-3 border border-primary/10 shadow-sm hover:border-accent cursor-pointer transition"
              >

                <div className="flex items-center gap-2 mb-1">

                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: categoryColors[loc.category],
                    }}
                  />

                  <p className="text-sm font-semibold text-primary">
                    {loc.name}
                  </p>

                </div>

                <p className="text-xs text-primary/40 pl-4">
                  {loc.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default MapSection;
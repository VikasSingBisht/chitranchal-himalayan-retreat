// ── Blogs.jsx ──────────────────────────────────────────

import { Link } from "react-router-dom";
import blogs from "../data/blogs";

const chips = [
  "Spiritual Trails",
  "Adventure Diaries",
  "Hidden Gems",
  "Culture & Festivals",
];

const Blogs = () => {
  return (
    <main className="bg-cream min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${blogs[5]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">
            Chitranchal • Mukteshwar
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-bold leading-none mb-6">
            STORIES FROM
            <br />
            <span className="text-accent italic">THE HILLS</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-12">
            Stories from the hills of Kumaon — culture, travel, food and life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {chips.map((chip) => (
              <span
                key={chip}
                className="bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm px-5 py-2.5 rounded-full"
              >
                ✦ {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Scroll
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="p-3 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[300px]">

          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className={`group relative overflow-hidden cursor-pointer h-full
              ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
              `}
            >

              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${blog.image})` }}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Blog Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {blog.category}
                </span>

                <h3
                  className={`text-white font-bold leading-snug
                  ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}
                `}
                >
                  {blog.title}
                </h3>
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 p-6 text-center">
                <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs">
                  {blog.summary}
                </p>

                <span className="inline-flex items-center gap-2 bg-accent text-primary font-semibold text-sm px-6 py-3 rounded-full">
                  Read Story →
                </span>
              </div>

            </Link>
          ))}

        </div>
      </section>

    </main>
  );
};

export default Blogs;
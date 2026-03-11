import { Link } from "react-router-dom";
import blogs from "../data/blogs";

const featured = blogs[0];
const rest = blogs.slice(1, 4);

const BlogSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-saffron" />
              <p className="text-saffron text-xs tracking-[0.3em] uppercase font-inter">
                Stories
              </p>
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-bold">
              Stories from the Hills
            </h2>
            <p className="text-white/40 font-inter text-sm md:text-base mt-3 max-w-xl">
              Kumaon ki kahaniyan — culture, safar aur zindagi ke rang!
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-inter text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 w-fit"
          >
            View All Blogs →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Featured Card — Left */}
          <Link
            to={`/blogs/${featured.id}`}
            className="group relative overflow-hidden rounded-2xl"
            style={{ minHeight: "500px" }}
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${featured.image || "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"})`,
              }}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              {/* Category + Date */}
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-saffron text-primary text-xs font-inter font-bold px-3 py-1 rounded-full">
                  {featured.category}
                </span>
                <span className="text-white/40 text-xs font-inter">
                  {featured.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold leading-snug mb-3">
                {featured.title}
              </h3>

              {/* Summary */}
              <p className="text-white/60 font-inter text-sm leading-relaxed mb-5 line-clamp-2">
                {featured.summary}
              </p>

              {/* Read More */}
              <span className="inline-flex items-center gap-2 text-saffron font-inter text-sm font-medium group-hover:gap-4 transition-all duration-300">
                <span className="w-6 h-px bg-saffron" />
                Read Story
              </span>
            </div>
          </Link>

          {/* Right — 3 Small Cards */}
          <div className="flex flex-col gap-4">
            {rest.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden flex transition-all duration-300"
                style={{ minHeight: "148px" }}
              >
                {/* Image */}
                <div
                  className="w-32 md:w-40 flex-shrink-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${blog.image || "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400"})`,
                  }}
                />

                {/* Content */}
                <div className="flex flex-col justify-center px-4 md:px-5 py-4">
                  {/* Category + Date */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-saffron text-xs font-inter font-medium">
                      {blog.category}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-white/30 text-xs font-inter">
                      {blog.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-base md:text-lg text-white font-bold leading-snug mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Read More */}
                  <span className="text-white/40 font-inter text-xs group-hover:text-saffron transition-colors duration-300">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default BlogSection;
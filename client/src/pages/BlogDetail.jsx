import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs";

const BlogDetail = () => {

  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  const related = blogs
    .filter((b) => b.category === blog?.category && b.id !== blog?.id)
    .slice(0, 2);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-5xl mb-4">🏔️</p>
          <h2 className="text-3xl font-playfair">Story not found</h2>
          <Link to="/blogs" className="mt-4 block text-accent">
            Back to stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f5f0] text-[#2b2b2b]">

      {/* HERO */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-4xl px-10 md:px-20 text-white">
          <p className="uppercase tracking-[0.3em] text-sm mb-4 opacity-80">
            Chitranchal • Mukteshwar
          </p>

          <h1 className="font-playfair text-5xl md:text-7xl leading-tight">
            {blog.title}
          </h1>

          <p className="mt-4 text-white/80">{blog.date}</p>
        </div>
      </section>

      {/* INTRO QUOTE */}
      <section className="max-w-3xl mx-auto text-center px-6 py-24">
        <p className="font-playfair italic text-3xl text-[#5b5244] leading-relaxed">
          “{blog.summary}”
        </p>
      </section>

      {/* STORY */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <p className="leading-relaxed text-lg whitespace-pre-line">
          {blog.content}
        </p>
      </section>

      {/* IMAGE BREAK */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <img
            src={blog.image}
            className="rounded-xl w-full object-cover h-[500px]"
          />
        </div>
      </section>

      {/* HISTORY */}
      {blog.history && (
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="font-playfair text-4xl mb-6">
            The Heritage of Mukteshwar
          </h2>

          <p className="leading-relaxed text-lg whitespace-pre-line">
            {blog.history}
          </p>
        </section>
      )}

      {/* CULTURE */}
      {blog.culture && (
        <section className="bg-white py-24">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-playfair text-4xl mb-6">
              Kumaoni Culture & Blessings
            </h2>

            <p className="leading-relaxed text-lg whitespace-pre-line">
              {blog.culture}
            </p>
          </div>
        </section>
      )}

      {/* NATURE */}
      {blog.nature && (
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="font-playfair text-4xl mb-6">
            Nature of the Himalayan Hills
          </h2>

          <p className="leading-relaxed text-lg whitespace-pre-line">
            {blog.nature}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {blog.experience && (
        <section className="bg-[#2b2b2b] text-white py-24">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-playfair text-4xl mb-6">
              Experiences at Chitranchal
            </h2>

            <p className="leading-relaxed text-lg whitespace-pre-line">
              {blog.experience}
            </p>
          </div>
        </section>
      )}

      {/* TRAVEL TIPS */}
      {blog.travelTips && (
        <section className="max-w-3xl mx-auto px-6 py-24">
          <div className="border border-[#d6cfc4] bg-[#fffdf9] p-10 rounded-lg">
            <h2 className="font-playfair text-3xl mb-4">
              Travel Tips
            </h2>

            <p className="leading-relaxed whitespace-pre-line">
              {blog.travelTips}
            </p>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="font-playfair text-4xl mb-12 text-center">
            More Stories from the Hills
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {related.map((b) => (
              <Link
                key={b.id}
                to={`/blogs/${b.id}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={b.image}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition"
                  />
                </div>

                <p className="text-sm uppercase tracking-widest text-[#8c7c65] mb-1">
                  {b.category}
                </p>

                <h3 className="font-playfair text-2xl">
                  {b.title}
                </h3>
              </Link>
            ))}

          </div>
        </section>
      )}

    </div>
  );
};

export default BlogDetail;
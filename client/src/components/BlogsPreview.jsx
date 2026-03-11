import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import useScrollAnimation from "../hooks/useScrollAnimation";

const BlogCard = ({ blog }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
    
    {/* Image */}
    <div
      className="h-52 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${blog.image || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800'})` }}
    />

    {/* Content */}
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-accent text-xs tracking-widest uppercase font-medium">
          {blog.category}
        </span>
        <span className="text-darkbrown/40 text-xs">•</span>
        <span className="text-darkbrown/40 text-xs">{blog.date}</span>
      </div>

      <h3 className="font-playfair text-xl text-primary font-bold mb-2 leading-snug">
        {blog.title}
      </h3>

      <p className="text-darkbrown/60 text-sm leading-relaxed mb-5">
        {blog.summary}
      </p>

      <Link
        to={`/blogs/${blog.id}`}
        className="inline-block text-accent text-sm font-semibold hover:text-primary transition-colors duration-300"
      >
        Read More →
      </Link>
    </div>
  </div>
);

const BlogsPreview = () => (
  
  <section id="blogs" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
          Stories
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl text-primary font-bold mb-4">
          From The Hills
        </h2>
        <p className="text-darkbrown/60 max-w-xl mx-auto text-lg">
          Kumaon ki kahaniyan — culture, travel aur zindagi ke rang!
        </p>
      </div>

      {/* Cards — sirf 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.slice(0, 3).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/blogs"
          className="inline-block bg-primary text-cream px-8 py-3 rounded-full font-medium hover:bg-darkbrown transition-colors duration-300"
        >
          View All Blogs →
        </Link>
      </div>

    </div>
  </section>
);

export default BlogsPreview;
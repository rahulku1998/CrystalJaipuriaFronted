import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Blog Image */}
      <img
        src={blog.coverImage?.url || "/Gemstone.webp"}
        alt={`${blog.title} - Crystal Jaipuria Blog`}
        className="w-full h-[240px] sm:h-[350px] object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/Gemstone.webp";
        }}
      />

      <div className="p-6 sm:p-8">
        {/* Category + Date + Read Time */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs sm:text-sm">
          {blog.category && (
            <span className="bg-orange-100 text-orange-800 font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
          )}
          <span className="text-gray-500">
            📅 {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </span>
          {blog.readTime && (
            <span className="text-gray-500">
              ⏱️ {blog.readTime}
            </span>
          )}
        </div>



        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h2>



        {/* Description */}
        <p className="text-gray-600 leading-7 mb-6 line-clamp-3">
          {blog.description}
        </p>



        {/* Read Button */}
        <Link
          to={`/blog/${blog.slug}`}
          className="
          inline-flex 
          items-center
          bg-orange-600 
          hover:bg-orange-700 
          text-white 
          px-6 
          py-3 
          rounded-lg
          transition
          "
        >
          Read Story →
        </Link>


      </div>

    </article>
  );
};


export default BlogItem;
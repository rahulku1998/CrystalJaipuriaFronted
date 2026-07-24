import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Blog Image */}
      <img
        src={blog.coverImage?.url}
        alt={blog.title}
        className="w-full h-[350px] object-cover"
      />


      <div className="p-8">

        {/* Category + Date */}
        <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">


          <span className="text-gray-500">
            📅 {new Date(blog.createdAt).toLocaleDateString("en-IN")}
          </span>

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
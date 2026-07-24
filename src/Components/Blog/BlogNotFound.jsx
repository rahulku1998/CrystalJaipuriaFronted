import { Link } from "react-router-dom";

const BlogNotFound = () => {
  return (
    <section className="min-h-[60vh] bg-[#faf7f2] flex items-center justify-center px-4">

      <div className="text-center bg-white p-10 rounded-2xl shadow-md max-w-md">

        {/* Icon */}
        <div className="text-6xl mb-5">
          📝
        </div>


        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h1>


        <p className="text-gray-600 mb-7 leading-7">
          Sorry, the story you are looking for is not available.
          Please explore our latest handmade craft stories.
        </p>


        <Link
          to="/blog"
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
          ← Explore Blogs
        </Link>


      </div>

    </section>
  );
};


export default BlogNotFound;
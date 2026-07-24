import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BlogNotFound from "../../Components/Blog/BlogNotFound";
import ShareButtons from "../../components/Blog/ShareButtons";


const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASEURL}/blogs/slug/${slug}`
      );

      setBlog(data.blog);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBlog();
  }, [slug]);



  if (loading) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">
          Loading Story...
        </h2>
      </div>
    );
  }


  if (!blog) {
  return (
    <BlogNotFound />
  );
}



  const shareUrl = window.location.href;


  return (
    <section className="bg-[#faf7f2] min-h-screen py-12">

      <div className="max-w-5xl mx-auto px-4">


        {/* Blog Container */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">


          {/* Image */}
          <img
            src={blog.coverImage?.url}
            alt={blog.title}
            className="w-full h-[350px] md:h-[500px] object-cover"
          />



          <div className="p-8 md:p-12">


            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">

              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                {blog.category}
              </span>


              <span className="text-gray-500 flex items-center">
                📅 {new Date(blog.createdAt).toLocaleDateString("en-IN")}
              </span>

            </div>



            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-8">
              {blog.title}
            </h1>



            {/* Content */}
            <div
              className="
              text-gray-700 
              text-lg 
              leading-9
              prose 
              max-w-none
              "
            >
              {blog.content}
            </div>



            {/* Share */}
           <ShareButtons
  url={window.location.href}
  title={blog.title}
/>



            {/* Back */}
            <div className="mt-10">

              <Link
                to="/blog"
                className="text-orange-600 font-semibold"
              >
                ← Back to Stories
              </Link>

            </div>


          </div>


        </article>


      </div>


    </section>
  );
};


export default BlogDetails;
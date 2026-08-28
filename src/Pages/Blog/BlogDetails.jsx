import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/axios";
import BlogNotFound from "../../Components/Blog/BlogNotFound";
import ShareButtons from "../../Components/Blog/ShareButtons";
import SEO from "../../Components/SEO";
import { getArticleSchema } from "../../utils/seo";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const { data } = await API.get(`/blogs/slug/${slug}`);
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
      <div className="py-16 sm:py-20 text-center px-4">
        <h2 className="text-lg sm:text-xl font-semibold">Loading Story...</h2>
      </div>
    );
  }

  if (!blog) {
    return <BlogNotFound />;
  }

  const canonicalUrl = `https://www.crystaljaipuria.com/blog/${blog.slug || slug}`;
  const schema = getArticleSchema(blog, canonicalUrl);

  return (
    <>
      <SEO
        title={`${blog.title} | Crystal Jaipuria Blog`}
        description={blog.description || blog.title}
        canonical={canonicalUrl}
        image={blog.coverImage?.url || "https://www.crystaljaipuria.com/logo.png"}
        type="article"
        schema={schema}
      />
      <section className="bg-[#faf7f2] min-h-screen py-8 sm:py-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Blog Container */}
          <article className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            {/* Image */}
            <img
              src={blog.coverImage?.url}
              alt={blog.title}
              className="w-full h-[220px] sm:h-[350px] md:h-[500px] object-cover"
            />

            <div className="p-5 sm:p-8 md:p-12">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 text-sm">
                <span className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-2 rounded-full">
                  {blog.category}
                </span>

                <span className="text-gray-500 flex items-center text-xs sm:text-sm">
                  📅 {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-6 sm:mb-8">
                {blog.title}
              </h1>

              {/* Content */}
              <div
                className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-9 prose max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Share */}
              <div className="mt-8 sm:mt-10">
                <ShareButtons
                  url={window.location.href}
                  title={blog.title}
                />
              </div>

              {/* Back */}
              <div className="mt-8 sm:mt-10">
                <Link
                  to="/blog"
                  className="text-orange-600 font-semibold text-sm sm:text-base"
                >
                  ← Back to Stories
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;

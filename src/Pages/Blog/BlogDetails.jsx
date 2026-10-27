import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/axios";
import BlogNotFound from "../../Components/Blog/BlogNotFound";
import ShareButtons from "../../Components/Blog/ShareButtons";
import SEO from "../../Components/SEO";
import { getArticleSchema } from "../../utils/seo";
import { getFallbackBlogBySlug } from "../../data/fallbackBlogs";
import { FaChevronDown, FaCheckCircle, FaWhatsapp, FaShieldAlt } from "react-icons/fa";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(() => getFallbackBlogBySlug(slug));
  const [loading, setLoading] = useState(!blog);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const fetchBlog = async () => {
    const fallback = getFallbackBlogBySlug(slug);
    try {
      const { data } = await API.get(`/blogs/slug/${slug}`);
      if (data?.blog) {
        setBlog(
          fallback
            ? {
                ...fallback,
                ...data.blog,
                faqs: fallback.faqs?.length ? fallback.faqs : data.blog.faqs,
                metaTitle: fallback.metaTitle || data.blog.metaTitle,
                metaDescription: fallback.metaDescription || data.blog.metaDescription,
              }
            : data.blog
        );
      } else if (fallback) {
        setBlog(fallback);
      }
    } catch (error) {
      if (fallback) {
        setBlog(fallback);
      } else {
        console.warn("Blog fetch note:", error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading && !blog) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading guide...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <BlogNotFound />;
  }

  const primarySlug = blog.slug || slug;
  const canonicalUrl = `https://www.crystaljaipuria.com/blog/${primarySlug}`;
  const schema = getArticleSchema(blog, canonicalUrl);
  const metaTitle = blog.metaTitle
    ? (blog.metaTitle.includes("Crystal Jaipuria") ? blog.metaTitle : `${blog.metaTitle} | Crystal Jaipuria`)
    : `${blog.title} | Crystal Jaipuria Blog`;
  const metaDescription = blog.metaDescription || blog.description || blog.title;
  const coverImageUrl = blog.coverImage?.url || "/Gemstone.webp";

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        image={coverImageUrl.startsWith("http") ? coverImageUrl : `https://www.crystaljaipuria.com${coverImageUrl}`}
        type="article"
        schema={schema}
      />

      <section className="bg-[#faf7f2] min-h-screen py-6 sm:py-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm text-slate-500 flex items-center flex-wrap gap-2">
            <Link to="/" className="hover:text-orange-700 transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-orange-700 transition">Blog</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-[240px] sm:max-w-md">
              {blog.title}
            </span>
          </nav>

          {/* Main Article Container */}
          <article className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
            {/* Cover Image Container */}
            <div className="relative w-full bg-slate-100 aspect-16/9 sm:aspect-21/9 max-h-[460px] overflow-hidden">
              <img
                src={coverImageUrl}
                alt={`${blog.title} - Crystal Jaipuria Jaipur`}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "/Gemstone.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
              {blog.category && (
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <span className="bg-amber-500/90 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                    {blog.category}
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-8 md:p-12">
              {/* Meta details bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center gap-3">
                  <span>
                    📅 Published: {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                  {blog.readTime && (
                    <>
                      <span>•</span>
                      <span>⏱️ {blog.readTime}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                  <FaShieldAlt className="text-xs" />
                  <span>100% Verified Gemstone Guide</span>
                </div>
              </div>

              {/* H1 SEO Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 leading-tight mb-8">
                {blog.title}
              </h1>

              {/* Rich Blog Body with Enhanced Styling */}
              <div
                className="text-slate-700 text-base sm:text-lg leading-relaxed sm:leading-8 prose max-w-none 
                [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-slate-200/70
                [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3
                [&_p]:mb-5 [&_p]:text-slate-700 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2.5 [&_ul]:text-slate-700
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2.5 [&_ol]:text-slate-700
                [&_blockquote]:border-l-4 [&_blockquote]:border-amber-500 [&_blockquote]:bg-amber-50/60 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-6 [&_blockquote]:text-slate-800 [&_blockquote]:italic
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                [&_th]:bg-slate-100 [&_th]:border [&_th]:border-slate-200 [&_th]:p-3.5 [&_th]:text-slate-900 [&_th]:font-bold [&_th]:text-left
                [&_td]:border [&_td]:border-slate-200 [&_td]:p-3.5 [&_td]:text-slate-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* FOLDING FREQUENTLY ASKED QUESTIONS (ACCORDION STYLE MATCHING PRODUCT DETAILS) */}
              {Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-xs transition-all duration-200">
                    {/* Header */}
                    <div className="w-full flex items-center justify-between py-4 px-5 sm:px-6 text-left bg-white border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="uppercase font-bold tracking-wider text-xs sm:text-sm md:text-base text-[#c05646]">
                          Frequently Asked Questions
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                          {blog.faqs.length} Q&amp;As
                        </span>
                      </div>
                    </div>

                    {/* Folding Accordion Items */}
                    <div className="p-4 sm:p-6 bg-slate-50/40 space-y-3">
                      {blog.faqs.map((faq, index) => {
                        const isOpen = openFaqIndex === index;
                        return (
                          <div
                            key={index}
                            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all duration-200 hover:border-amber-300"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                              className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-semibold text-slate-800 hover:text-[#c05646] transition-colors cursor-pointer text-xs sm:text-sm"
                              aria-expanded={isOpen}
                            >
                              <span className="pr-3">
                                {index + 1}. {faq.question}
                              </span>
                              <FaChevronDown
                                className={`text-slate-400 text-xs shrink-0 transition-transform duration-200 ${
                                  isOpen ? "rotate-180 text-[#c05646]" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-2.5 leading-relaxed bg-slate-50/50">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ARTISAN DIRECT CALLOUT BANNER */}
              <div className="mt-12 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
                    <FaCheckCircle className="text-amber-600 text-xs" /> 100% Certified Natural Carvings
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Looking for Certified Natural Gemstone Statues &amp; Shivlings?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    Every idol at Crystal Jaipuria is hand-sculpted in Jaipur from certified natural rough crystals with verifiable test reports and direct manufacturer wholesale pricing.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <a
                    href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20read%20your%20guide%20on%20Natural%20vs%20Synthetic%20Gemstones%20and%20want%20to%20inquire%20about%20natural%20carvings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition"
                  >
                    <FaWhatsapp className="text-lg" />
                    WhatsApp Inquiry
                  </a>
                  <Link
                    to="/gemstone-authenticity-guide"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-slate-300 hover:border-slate-400 text-slate-800 px-5 py-3 rounded-xl font-semibold text-sm transition"
                  >
                    Authenticity Guide
                  </Link>
                </div>
              </div>

              {/* Share & Navigation Footer */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm sm:text-base transition"
                >
                  ← Back to All Articles
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">Share Guide:</span>
                  <ShareButtons url={canonicalUrl} title={blog.title} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;

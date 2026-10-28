import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";

const BlogItem = ({ blog, variant = "grid" }) => {
  if (!blog) return null;

  const targetUrl = `/blog/${blog.slug}`;
  const coverUrl = blog.coverImage?.url || "/Gemstone.webp";
  const formattedDate = new Date(blog.createdAt || Date.now()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const excerpt = blog.description || blog.metaDescription || (blog.keyTakeaways?.[0]) || "";

  // 1. HERO VARIANT (Large 2-column featured card)
  if (variant === "hero") {
    return (
      <article className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-5 sm:p-7 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Full 3:2 Image */}
          <div className="lg:col-span-7">
            <Link to={targetUrl} className="block overflow-hidden rounded-2xl bg-stone-50 border border-slate-100 aspect-[3/2] relative group-hover:border-amber-300 transition-colors">
              <img
                src={coverUrl}
                alt={`${blog.title} - Crystal Jaipuria Blog`}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "/Gemstone.webp";
                }}
              />
            </Link>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {blog.category && (
              <div>
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-orange-600 bg-orange-50 border border-orange-200/70 px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
            )}

            <Link to={targetUrl}>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
                {blog.title}
              </h2>
            </Link>

            {excerpt && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-slate-500 font-medium">
              {blog.author && <span className="text-slate-700 font-semibold">{blog.author}</span>}
              {blog.author && <span>•</span>}
              <span className="inline-flex items-center gap-1.5">
                <FaCalendarAlt className="text-slate-400 text-xs" />
                {formattedDate}
              </span>
              {blog.readTime && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock className="text-slate-400 text-xs" />
                    {blog.readTime}
                  </span>
                </>
              )}
            </div>

            <div className="pt-2">
              <Link
                to={targetUrl}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all group/btn"
              >
                <span>Read Full Article</span>
                <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. HORIZONTAL VARIANT (for "Latest" section list)
  if (variant === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300">
        {/* Left: Full 3:2 Image */}
        <Link
          to={targetUrl}
          className="w-full sm:w-[240px] md:w-[280px] shrink-0 aspect-[3/2] rounded-xl overflow-hidden bg-stone-50 border border-slate-100 block relative"
        >
          <img
            src={coverUrl}
            alt={`${blog.title} - Crystal Jaipuria`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/Gemstone.webp";
            }}
          />
        </Link>

        {/* Right: Details */}
        <div className="flex flex-col justify-between flex-1 space-y-2.5">
          <div className="space-y-2">
            {blog.category && (
              <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-orange-600">
                {blog.category}
              </span>
            )}

            <Link to={targetUrl}>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                {blog.title}
              </h3>
            </Link>

            {excerpt && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                {blog.keyTakeaways?.[0] ? `Key takeaways: ${blog.keyTakeaways[0]}` : excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
            {blog.author && (
              <span className="truncate max-w-[150px] font-semibold text-slate-700">
                {blog.author}
              </span>
            )}
            {blog.author && <span>•</span>}
            <span>{formattedDate}</span>
            {blog.readTime && (
              <>
                <span>•</span>
                <span>{blog.readTime}</span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  // 3. GRID VARIANT (3-column responsive card)
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden h-full">
      {/* Category header */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[11px] font-bold tracking-wider uppercase text-orange-600">
          {blog.category || "Gemstone Guide"}
        </span>
      </div>

      {/* Full 3:2 Image Container - Fully visible with no cropping */}
      <div className="px-5">
        <Link
          to={targetUrl}
          className="block aspect-[3/2] w-full rounded-xl overflow-hidden bg-stone-50 border border-slate-100 relative group-hover:border-amber-300 transition-colors"
        >
          <img
            src={coverUrl}
            alt={`${blog.title} - Crystal Jaipuria`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/Gemstone.webp";
            }}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2.5">
          <Link to={targetUrl}>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
              {blog.title}
            </h3>
          </Link>

          {excerpt && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
              {blog.keyTakeaways?.[0] ? `Key takeaways: ${blog.keyTakeaways[0]}` : excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
          <span className="truncate max-w-[140px] font-semibold text-slate-700">
            {blog.author || "Crystal Jaipuria"}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
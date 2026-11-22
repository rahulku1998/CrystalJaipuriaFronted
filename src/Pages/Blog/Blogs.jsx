import { useEffect, useState, useMemo } from "react";
import API from "../../api/axios";
import BlogItem from "../../Components/Blog/BlogItem";
import SEO from "../../Components/SEO";
import { FALLBACK_BLOGS, getDeduplicatedBlogs } from "../../data/fallbackBlogs";
import {
  FaSearch,
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaGem,
  FaShieldAlt,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CATEGORIES = [
  "All",
  "Gemstone Guide",
  "Craftsmanship & Process",
  "Care & Maintenance",
  "Buyer Guide & Valuation",
  "Gifting & Decor",
];

const FILTERED_PAGE_SIZE = 6;
const EDITORIAL_PAGE_SIZE = 6;

const Blogs = () => {
  const [blogs, setBlogs] = useState(() => getDeduplicatedBlogs([], FALLBACK_BLOGS));
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs");
      const live = Array.isArray(data?.blogs) ? data.blogs : [];
      const deduplicated = getDeduplicatedBlogs(live, FALLBACK_BLOGS);
      setBlogs(deduplicated);
    } catch (error) {
      console.warn("Using offline fallback blogs:", error?.message);
      setBlogs(getDeduplicatedBlogs([], FALLBACK_BLOGS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Sort blogs chronologically descending (newest published first at the top)
  const publishedBlogs = useMemo(() => {
    return blogs.slice().sort(
      (a, b) =>
        new Date(b.publishDate || b.createdAt || 0) -
        new Date(a.publishDate || a.createdAt || 0)
    );
  }, [blogs]);

  // Filtered blogs based on Category and Search Query
  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        blog.title?.toLowerCase().includes(query) ||
        blog.description?.toLowerCase().includes(query) ||
        blog.category?.toLowerCase().includes(query) ||
        (Array.isArray(blog.keyTakeaways) &&
          blog.keyTakeaways.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [publishedBlogs, selectedCategory, searchQuery]);

  const isFiltering = selectedCategory !== "All" || searchQuery.trim().length > 0;

  // Filter handlers with page reset
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Split for Appinventiv homepage layout when not filtering:
  // 1. Hero post (item 0 - newest published guide)
  // 2. Secondary grid posts (items 1, 2, 3)
  // 3. Paginated remaining posts (items 4, ...)
  const heroPost = publishedBlogs[0];
  const secondaryPosts = publishedBlogs.slice(1, 4);
  const remainingPosts = publishedBlogs.slice(4);

  // Pagination computations
  const totalFilteredPages = Math.ceil(filteredBlogs.length / FILTERED_PAGE_SIZE) || 1;
  const paginatedFilteredBlogs = useMemo(() => {
    const start = (currentPage - 1) * FILTERED_PAGE_SIZE;
    return filteredBlogs.slice(start, start + FILTERED_PAGE_SIZE);
  }, [filteredBlogs, currentPage]);

  const totalEditorialPages = Math.ceil(remainingPosts.length / EDITORIAL_PAGE_SIZE) || 1;
  const paginatedEditorialPosts = useMemo(() => {
    const start = (currentPage - 1) * EDITORIAL_PAGE_SIZE;
    return remainingPosts.slice(start, start + EDITORIAL_PAGE_SIZE);
  }, [remainingPosts, currentPage]);

  // Reusable Pagination Controller
  const renderPagination = (totalPages) => {
    if (totalPages <= 1) return null;

    return (
      <nav
        aria-label="Blog pagination"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-200/80"
      >
        <div className="text-xs sm:text-sm text-slate-500 font-medium">
          Page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
          <span className="font-bold text-slate-900">{totalPages}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-2xs cursor-pointer"
          >
            <FaChevronLeft className="text-[10px]" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-w-[38px] h-9 px-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-amber-50 hover:border-amber-300 border border-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-2xs cursor-pointer"
          >
            <span>Next</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      </nav>
    );
  };

  const seo = (
    <SEO
      title="Gemstone Carvings & Crystal Statues Blog | Crystal Jaipuria"
      description="Explore expert guides on natural gemstones, Jaipur lapidary carving techniques, care instructions, pricing factors, and sacred deity sculptures from Crystal Jaipuria."
      canonical="https://www.crystaljaipuria.com/blog"
      ogTitle="Gemstone Carvings & Crystal Statues Blog | Crystal Jaipuria"
      ogDescription="Explore expert guides on natural gemstones, Jaipur lapidary carving techniques, care instructions, pricing factors, and sacred deity sculptures from Crystal Jaipuria."
      twitterTitle="Gemstone Carvings & Crystal Statues Blog | Crystal Jaipuria"
      twitterDescription="Explore expert guides on natural gemstones, Jaipur lapidary carving techniques, care instructions, pricing factors, and sacred deity sculptures from Crystal Jaipuria."
      image="https://www.crystaljaipuria.com/images/natural-vs-synthetic-gemstones.webp"
      type="website"
    />
  );

  if (loading && blogs.length === 0) {
    return (
      <>
        {seo}
        <section className="bg-[#faf7f2] min-h-screen py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="h-12 bg-white rounded-xl animate-pulse"></div>
            <div className="h-96 bg-white rounded-3xl animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {seo}
      <section className="bg-[#faf7f2] min-h-screen pb-20 pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          {/* ======================================================== */}
          {/* APPINVENTIV-STYLE TOP CATEGORY NAV & LIVE SEARCH BAR     */}
          {/* ======================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Horizontal Categories */}
            <nav aria-label="Blog categories" className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 md:pb-0">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>

            {/* Search Input Box */}
            <div className="w-full md:w-72 relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Status Feedback (when searching or category selected) */}
          {isFiltering && (
            <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 px-5 py-3 rounded-xl text-xs sm:text-sm text-amber-950">
              <span>
                Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "article" : "articles"}
                {selectedCategory !== "All" && <> in <strong>{selectedCategory}</strong></>}
                {searchQuery && <> matching &quot;<strong>{searchQuery}</strong>&quot;</>}
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* CASE 1: FILTERING ACTIVE (Grid View)                     */}
          {/* ======================================================== */}
          {isFiltering ? (
            <div>
              {filteredBlogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedFilteredBlogs.map((blog) => (
                      <BlogItem key={blog.slug || blog._id} blog={blog} variant="grid" />
                    ))}
                  </div>
                  {renderPagination(totalFilteredPages)}
                </>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                    <FaGem />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">No articles found</h3>
                  <p className="text-sm text-slate-600">
                    We could not find any guides matching your criteria. Try adjusting your search query or category filter.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    View All Guides
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* CASE 2: DEFAULT APPINVENTIV CURATED EDITORIAL LAYOUT     */
            /* ======================================================== */
            <>
              {/* Show Hero and Secondary Grid on Page 1 only to keep Page 2+ streamlined */}
              {currentPage === 1 && (
                <>
                  {/* SECTION 1: HERO FEATURED POST (2 Columns) */}
                  {heroPost && (
                    <section aria-label="Featured Guide">
                      <BlogItem blog={heroPost} variant="hero" />
                    </section>
                  )}

                  {/* SECTION 2: SECONDARY 3-CARD GRID */}
                  {secondaryPosts.length > 0 && (
                    <section aria-label="Highlighted Guides">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {secondaryPosts.map((blog) => (
                          <BlogItem key={blog.slug || blog._id} blog={blog} variant="grid" />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}

              {/* SECTION 3: "LATEST" 2-COLUMN SECTION (Horizontal Cards + Sidebar) */}
              <section aria-label="Latest Articles" className="pt-6 sm:pt-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {currentPage === 1 ? "Latest Articles" : `Editorial Guides — Page ${currentPage}`}
                  </h2>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">
                    {publishedBlogs.length} Curated Guides
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                  {/* Left Column: Horizontal Articles List */}
                  <div className="lg:col-span-8 space-y-6">
                    {paginatedEditorialPosts.map((blog) => (
                      <BlogItem key={blog.slug || blog._id} blog={blog} variant="horizontal" />
                    ))}

                    {/* Pagination Controls */}
                    {renderPagination(totalEditorialPages)}
                  </div>

                  {/* Right Column: Sidebar (Categories + CTA) */}
                  <aside className="lg:col-span-4 space-y-6">
                    {/* Categories Pill Box (Matching Appinventiv Screenshot 2) */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                      <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Categories</span>
                        <FaGem className="text-amber-500 text-xs" />
                      </h3>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition cursor-pointer"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Direct Jaipur Lapidary Workshop Consultation CTA */}
                    <div className="bg-gradient-to-br from-slate-900 via-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-4 relative overflow-hidden border border-amber-500/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

                      <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        <FaAward className="text-xs" /> Jaipur Lapidary Workshop
                      </div>

                      <h3 className="text-xl font-extrabold text-white leading-snug">
                        Looking for Custom Gemstone Carvings?
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        Talk directly with our 3rd-generation Jaipur master artisans for custom deity statues, Sphatik Shivlings, and certified gemstone carvings.
                      </p>

                      <div className="pt-2 space-y-2.5">
                        <a
                          href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20am%20looking%20for%20custom%20gemstone%20carvings%20from%20your%20Jaipur%20workshop."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition"
                        >
                          <FaWhatsapp className="text-base" />
                          Chat on WhatsApp
                        </a>

                        <a
                          href="tel:+918306317032"
                          className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-white/10 transition"
                        >
                          <FaPhoneAlt className="text-xs text-amber-400" />
                          +91 83063 17032
                        </a>
                      </div>
                    </div>

                    {/* Authenticity Trust Banner */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-center space-y-3">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-lg">
                        <FaShieldAlt />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        100% Certified Natural Origin
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Every carving includes independent gemological lab testing and transparent origin disclosures.
                      </p>
                      <Link
                        to="/gemstone-authenticity-guide"
                        className="inline-block text-xs font-bold text-orange-600 hover:text-orange-700 underline"
                      >
                        Read Authenticity Standards →
                      </Link>
                    </div>
                  </aside>
                </div>
              </section>
            </>
          )}

        </div>
      </section>
    </>
  );
};

export default Blogs;

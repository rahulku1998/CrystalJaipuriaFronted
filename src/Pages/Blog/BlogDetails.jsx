import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/axios";
import BlogNotFound from "../../Components/Blog/BlogNotFound";
import SEO from "../../Components/SEO";
import BlogItem from "../../Components/Blog/BlogItem";
import { getArticleSchema } from "../../utils/seo";
import { FALLBACK_BLOGS, getFallbackBlogBySlug, getDeduplicatedBlogs } from "../../data/fallbackBlogs";
import {
  FaChevronDown,
  FaCheckCircle,
  FaWhatsapp,
  FaPhoneAlt,
  FaGem,
  FaAward,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaLink,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa";

const BlogDetails = () => {
  const { slug } = useParams();
  const initialFallback = getFallbackBlogBySlug(slug);
  const [blog, setBlog] = useState(initialFallback);
  const [loading, setLoading] = useState(!initialFallback);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
                slug: fallback.slug, // keep clean target slug
                coverImage: fallback.coverImage || data.blog.coverImage,
                keyTakeaways: fallback.keyTakeaways || data.blog.keyTakeaways,
                faqs: fallback.faqs?.length ? fallback.faqs : data.blog.faqs,
                howTo: fallback.howTo || data.blog.howTo,
                about: fallback.about || data.blog.about,
                mentions: fallback.mentions || data.blog.mentions,
                keywords: fallback.keywords || data.blog.keywords,
                metaTitle: fallback.metaTitle || data.blog.metaTitle,
                metaDescription: fallback.metaDescription || data.blog.metaDescription,
                description: fallback.description || data.blog.description,
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

  // Extract Table of Contents items from H2 tags
  const tocItems = useMemo(() => {
    if (!blog?.content) return [];
    const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    const items = [];
    let match;
    let idx = 1;
    while ((match = regex.exec(blog.content)) !== null) {
      const cleanTitle = match[1].replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ");
      if (cleanTitle) {
        items.push({
          id: `section-${idx}`,
          number: String(idx).padStart(2, "0"),
          title: cleanTitle,
        });
        idx++;
      }
    }
    return items;
  }, [blog?.content]);

  // Inject id="section-1", "section-2", etc. into H2 tags for smooth scrolling
  const processedContent = useMemo(() => {
    if (!blog?.content) return "";
    let idx = 1;
    return blog.content.replace(/<h2([^>]*)>/gi, (match, attrs) => {
      if (attrs.includes("id=")) return match;
      const sectionId = `section-${idx++}`;
      return `<h2 id="${sectionId}" ${attrs}>`;
    });
  }, [blog?.content]);

  // Active section spy on scroll
  useEffect(() => {
    if (!tocItems.length) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = tocItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(tocItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(tocItems[i].id);
          return;
        }
      }
      setActiveSection(tocItems[0]?.id || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Other blogs for "Read More Blogs" (Screenshot 5)
  const relatedBlogs = useMemo(() => {
    const all = getDeduplicatedBlogs([], FALLBACK_BLOGS);
    return all.filter((b) => b.slug !== slug && b.slug !== blog?.slug).slice(0, 3);
  }, [slug, blog?.slug]);

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
    ? blog.metaTitle.includes("Crystal Jaipuria")
      ? blog.metaTitle
      : `${blog.metaTitle} | Crystal Jaipuria`
    : `${blog.title} | Crystal Jaipuria Blog`;
  const metaDescription = blog.metaDescription || blog.description || blog.title;
  const coverImageUrl = blog.coverImage?.url || "/Gemstone.webp";
  const formattedDate = new Date(blog.createdAt || Date.now()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        image={
          coverImageUrl.startsWith("http")
            ? coverImageUrl
            : `https://www.crystaljaipuria.com${coverImageUrl}`
        }
        type="article"
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt || blog.createdAt}
        author={blog.author}
        section={blog.category}
        schema={schema}
      />

      <div className="bg-[#faf7f2] min-h-screen">
        {/* ======================================================== */}
        {/* HERO SECTION (Appinventiv Style - Screenshot 3)         */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-br from-slate-950 via-stone-900 to-amber-950 text-white py-10 sm:py-14 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Breadcrumbs, Title, Meta, Share */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                {/* Breadcrumbs */}
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-stone-300"
                >
                  <Link to="/" className="hover:text-amber-400 transition">
                    Home
                  </Link>
                  <span>/</span>
                  <Link to="/blog" className="hover:text-amber-400 transition">
                    Blog
                  </Link>
                  <span>/</span>
                  <span className="text-amber-400 font-semibold">{blog.category || "Guide"}</span>
                </nav>

                {/* H1 Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white leading-tight tracking-tight">
                  {blog.title}
                </h1>

                {/* Author & Published Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-300 pt-1">
                  <span className="font-semibold text-white">{blog.author || "Crystal Jaipuria Artisans"}</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                  {blog.readTime && (
                    <>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </>
                  )}
                </div>

                {/* Share Row (Matching Screenshot 3) */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  <span className="text-stone-400 font-medium">Share:</span>
                  <div className="flex items-center gap-2">
                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        canonicalUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition"
                    >
                      <FaLinkedinIn className="text-xs" />
                    </a>

                    {/* X / Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        blog.title
                      )}&url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-black text-white flex items-center justify-center transition"
                    >
                      <FaTwitter className="text-xs" />
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        canonicalUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-700 text-white flex items-center justify-center transition"
                    >
                      <FaFacebookF className="text-xs" />
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        blog.title + " " + canonicalUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on WhatsApp"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition"
                    >
                      <FaWhatsapp className="text-xs" />
                    </a>

                    {/* Copy Link */}
                    <button
                      type="button"
                      onClick={copyPageLink}
                      aria-label="Copy link"
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <FaCheck className="text-emerald-400 text-xs" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaLink className="text-xs text-stone-300" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Full 3:2 Image Display - Fully Visible Zero Cropping */}
              <div className="lg:col-span-5">
                <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl p-1 relative">
                  <img
                    src={coverImageUrl}
                    alt={`${blog.title} - Crystal Jaipuria Jaipur`}
                    className="w-full h-full object-contain rounded-xl"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "/Gemstone.webp";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3-COLUMN BODY (TOC + Article Content + Sidebar CTA)      */}
        {/* ======================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* LEFT COLUMN: STICKY TABLE OF CONTENTS (Appinventiv Screenshot 3 & 4) */}
            <aside className="lg:col-span-3 hidden lg:block">
              {tocItems.length > 0 && (
                <div className="sticky top-28 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar space-y-3">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base pb-3 border-b border-slate-100 flex items-center justify-between">
                    <span>Table of Contents</span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {tocItems.length} Sections
                    </span>
                  </h3>

                  <nav aria-label="Table of contents" className="space-y-1.5">
                    {tocItems.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left p-2 rounded-xl transition-all duration-200 flex items-start gap-2.5 text-xs font-semibold cursor-pointer group ${
                            isActive
                              ? "bg-amber-50 text-amber-900"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-sm transition-colors ${
                              isActive
                                ? "bg-amber-600 text-white"
                                : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                            }`}
                          >
                            {item.number}
                          </span>
                          <span className="leading-snug line-clamp-2">{item.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}
            </aside>

            {/* CENTER COLUMN: KEY TAKEAWAYS + ARTICLE PROSE + FAQS */}
            <main className="lg:col-span-6 space-y-8 min-w-0">
              {/* KEY TAKEAWAYS CARD (Screenshot 3 & 4) */}
              {Array.isArray(blog.keyTakeaways) && blog.keyTakeaways.length > 0 && (
                <div className="bg-white rounded-2xl border border-amber-200/90 p-6 shadow-xs border-l-4 border-l-amber-600 space-y-3.5">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center justify-between">
                    <span>Key takeaways:</span>
                    <FaCheckCircle className="text-amber-600 text-base" />
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {blog.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* RICH BLOG BODY */}
              <article
                className="text-slate-700 text-base sm:text-lg leading-relaxed sm:leading-8 prose max-w-none 
                [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-slate-200/70 [&_h2]:scroll-mt-28
                [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-28
                [&_p]:mb-5 [&_p]:text-slate-700 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2.5 [&_ul]:text-slate-700
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2.5 [&_ol]:text-slate-700
                [&_blockquote]:border-l-4 [&_blockquote]:border-amber-500 [&_blockquote]:bg-amber-50/60 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-6 [&_blockquote]:text-slate-800 [&_blockquote]:italic
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                [&_th]:bg-slate-100 [&_th]:border [&_th]:border-slate-200 [&_th]:p-3.5 [&_th]:text-slate-900 [&_th]:font-bold [&_th]:text-left
                [&_td]:border [&_td]:border-slate-200 [&_td]:p-3.5 [&_td]:text-slate-700"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* FOLDING FREQUENTLY ASKED QUESTIONS (PRODUCT PAGE ACCORDION STYLE) */}
              {Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
                <section aria-label="Frequently Asked Questions" className="mt-12 pt-8 border-t border-slate-200">
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
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
                </section>
              )}

              {/* ARTISAN DIRECT CALLOUT BANNER */}
              <div className="mt-10 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
                    <FaCheckCircle className="text-amber-600 text-xs" /> 100% Certified Natural Carvings
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    Looking for Certified Natural Gemstone Statues &amp; Shivlings?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    Every idol at Crystal Jaipuria is hand-sculpted in Jaipur from certified natural rough crystals with verifiable test reports and direct manufacturer pricing.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <a
                    href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20read%20your%20guide%20and%20want%20to%20inquire%20about%20natural%20carvings."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition"
                  >
                    <FaWhatsapp className="text-base" />
                    WhatsApp Inquiry
                  </a>
                  <Link
                    to="/gemstone-authenticity-guide"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-slate-300 hover:border-slate-400 text-slate-800 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition"
                  >
                    Authenticity Guide
                  </Link>
                </div>
              </div>

              {/* Back to Blog Listing */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-xs sm:text-sm transition"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>Back to All Articles</span>
                </Link>
              </div>
            </main>

            {/* RIGHT COLUMN: STICKY CONSULTATION WIDGET (Appinventiv Screenshot 3 & 4) */}
            <aside className="lg:col-span-3 space-y-6 hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {/* Consultation Card */}
                <div className="bg-gradient-to-br from-slate-900 via-stone-900 to-amber-950 text-white rounded-2xl p-6 shadow-md border border-amber-500/20 space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <FaAward className="text-xs" /> Jaipur Lapidary Workshop
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    Custom Gemstone Carvings &amp; Murti Commission
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    Have a specific deity sculpture, Sphatik Shivling, or crystal size in mind? Our master lapidaries craft bespoke sculptures according to your exact Shilpa Shastra specifications.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20would%20like%20to%20commission%20a%20custom%20gemstone%20carving."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition"
                    >
                      <FaWhatsapp className="text-sm" />
                      Chat on WhatsApp
                    </a>

                    <a
                      href="tel:+918306317032"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs py-2.5 px-4 rounded-xl border border-white/10 transition"
                    >
                      <FaPhoneAlt className="text-xs text-amber-400" />
                      +91 83063 17032
                    </a>
                  </div>
                </div>

                {/* Popular Collections Quick Navigation */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                    <FaGem className="text-amber-600 text-xs" />
                    <span>Popular Collections</span>
                  </h4>
                  <div className="space-y-2 text-xs font-semibold">
                    <Link
                      to="/shivling"
                      className="block p-2 rounded-lg text-slate-700 hover:text-orange-600 hover:bg-amber-50/50 transition"
                    >
                      • Natural Sphatik Shivlings
                    </Link>
                    <Link
                      to="/god-statues"
                      className="block p-2 rounded-lg text-slate-700 hover:text-orange-600 hover:bg-amber-50/50 transition"
                    >
                      • Gemstone God Statues
                    </Link>
                    <Link
                      to="/crystal-statues"
                      className="block p-2 rounded-lg text-slate-700 hover:text-orange-600 hover:bg-amber-50/50 transition"
                    >
                      • Crystal Statues &amp; Idols
                    </Link>
                    <Link
                      to="/gemstone-authenticity-guide"
                      className="block p-2 rounded-lg text-slate-700 hover:text-orange-600 hover:bg-amber-50/50 transition"
                    >
                      • Gemstone Authenticity Guide
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>

        {/* ======================================================== */}
        {/* READ MORE BLOGS (Appinventiv Screenshot 5)               */}
        {/* ======================================================== */}
        {relatedBlogs.length > 0 && (
          <section className="bg-white border-t border-slate-200/80 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Read More Blogs
                </h2>
                <Link
                  to="/blog"
                  className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 underline"
                >
                  View All Guides →
                </Link>
              </div>

              {/* 3-Column Card Grid (Matching Screenshot 5) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedBlogs.map((relBlog) => (
                  <BlogItem key={relBlog.slug || relBlog._id} blog={relBlog} variant="grid" />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogDetails;

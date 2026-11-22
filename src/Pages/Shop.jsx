import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import SEO from "../Components/SEO";
import { FaSearch, FaArrowRight, FaTimes, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { trackSearchNoResults } from "../utils/analytics";

import { FALLBACK_PRODUCTS } from "../data/fallbackData";

const ITEMS_PER_PAGE = 15;

const SHOP_CATEGORIES = [
  {
    name: "God Statues",
    slug: "god-statues",
    icon: "🕉️",
    image: "/images/green-jade-stone-ganesha-with-arch.webp",
    tagline: "Vedic murtis in Jade, Sphatik & Quartz",
    href: "/god-statues",
  },
  {
    name: "Luxurious Idols & Decor",
    slug: "luxurious-idols-decor",
    icon: "👑",
    image: "/images/silver-natural-rose-quartz-stone-shrinath-ji.webp",
    tagline: "Grand idols with 925 Silver & 24K Gold work",
    href: "/luxurious-idols-decor",
  },
  {
    name: "Shivling",
    slug: "shivling",
    icon: "🔱",
    image: "/images/natural-sphatik-shivling.webp",
    tagline: "Natural stone & pure quartz Shivlings",
    href: "/shivling",
  },
  {
    name: "Shree Yantra",
    slug: "shree-yantra",
    icon: "✨",
    image: "/images/crystal-shree-yantra.webp",
    tagline: "3D Meru Sri Chakra Yantras",
    href: "/shree-yantra",
  },
  {
    name: "Crystal Statues",
    slug: "crystal-statues",
    icon: "🕊️",
    image: "/images/natural-rose-quartz-pair-of-swan.webp",
    tagline: "Healing animals, angels & spiritual diyas",
    href: "/crystal-statues",
  },
];

const matchesCategory = (product, selectedSlug) => {
  if (!selectedSlug || selectedSlug === "all") return true;
  const prodCat =
    typeof product.categoryId === "object"
      ? product.categoryId?.slug || product.categoryId?._id || ""
      : product.categoryId || "";
  const cleanProdCat = String(prodCat).toLowerCase().trim();
  const target = selectedSlug.toLowerCase().trim();

  if (cleanProdCat === target) return true;
  if (
    target === "crystal-statues" &&
    (cleanProdCat === "angel" || cleanProdCat === "diya")
  )
    return true;
  if (
    target === "luxurious-idols-decor" &&
    (cleanProdCat === "luxurious-idols-&-decor" ||
      cleanProdCat === "luxurious-idols-decor")
  )
    return true;

  const catName = (
    product.categoryName ||
    product.categoryId?.name ||
    ""
  ).toLowerCase();
  if (target === "god-statues" && catName.includes("god")) return true;
  if (
    target === "shivling" &&
    (catName.includes("shivling") ||
      product.name?.toLowerCase().includes("shivling"))
  )
    return true;
  if (
    target === "shree-yantra" &&
    (catName.includes("yantra") || product.name?.toLowerCase().includes("yantra"))
  )
    return true;
  if (target === "luxurious-idols-decor" && catName.includes("luxur"))
    return true;
  if (
    target === "crystal-statues" &&
    (catName.includes("crystal") ||
      catName.includes("statue") ||
      catName.includes("angel") ||
      catName.includes("diya"))
  )
    return true;
  return false;
};

const Shop = () => {
  const [allProducts, setAllProducts] = useState(() => FALLBACK_PRODUCTS);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      const dbList = res.data?.products || res.data || [];
      const missingFallbacks = FALLBACK_PRODUCTS.filter(
        (fb) => !dbList.some((p) => (p.slug || p._id) === (fb.slug || fb._id))
      );
      // Prepend missing fallbacks in chronological latest order so new arrivals appear at the top on Page 1
      const mergedList = [...missingFallbacks, ...dbList];
      setAllProducts(mergedList.length > 0 ? mergedList : FALLBACK_PRODUCTS);
    } catch (error) {
      console.warn("Shop API fetch error, fallback active:", error);
      setAllProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync category from URL if changed from outside
  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "all";
    setSelectedCategory(catFromUrl);
  }, [searchParams]);

  const handleSelectCategory = (catSlug) => {
    const nextCat = catSlug === selectedCategory && catSlug !== "all" ? "all" : catSlug;
    setSelectedCategory(nextCat);
    setPage(1);

    const newParams = new URLSearchParams(searchParams);
    if (nextCat === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", nextCat);
    }
    setSearchParams(newParams);
  };

  const getCategoryCount = (slug) => {
    if (slug === "all") return allProducts.length;
    return allProducts.filter((p) => matchesCategory(p, slug)).length;
  };

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter((product) => {
      const catOk = matchesCategory(product, selectedCategory);
      if (!catOk) return false;

      const q = search.toLowerCase().trim();
      if (!q) return true;
      const nameMatch = product.name?.toLowerCase().includes(q);
      const catMatch = product.categoryId?.name?.toLowerCase().includes(q);
      const descMatch = product.detail?.toLowerCase().includes(q);
      return nameMatch || catMatch || descMatch;
    });

    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    // 'latest' retains the newest-first chronological order

    return list;
  }, [allProducts, selectedCategory, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const displayedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (search && filteredProducts.length === 0 && !loading) {
      trackSearchNoResults(search);
    }
  }, [search, filteredProducts.length, loading]);

  const activeCategoryObj = SHOP_CATEGORIES.find((c) => c.slug === selectedCategory);

  const seo = (
    <SEO
      title="Shop Gemstone Statues & Crystal Handicrafts | Crystal Jaipuria"
      description="Shop handcrafted gemstone statues, crystal carvings, Shivlings, Shree Yantra, Diyas and spiritual decor from Crystal Jaipuria, Jaipur, India."
      canonical="https://www.crystaljaipuria.com/shop"
      ogTitle="Shop Gemstone Statues & Crystal Handicrafts | Crystal Jaipuria"
      ogDescription="Explore handcrafted gemstone statues, crystal carvings, Shivlings, Shree Yantra, Diyas and spiritual decor from Crystal Jaipuria in Jaipur, India."
      twitterTitle="Shop Gemstone Statues & Crystal Handicrafts | Crystal Jaipuria"
      twitterDescription="Explore handcrafted gemstone statues, crystal carvings, Shivlings, Shree Yantra, Diyas and spiritual decor from Crystal Jaipuria in Jaipur, India."
      image="https://www.crystaljaipuria.com/logo.png"
      type="website"
    />
  );

  return (
    <>
      {seo}
      <div className="min-h-screen bg-[#FAF9F6] py-5 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8">
          {/* HEADER & SEARCH BAR & SORT */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-850">
                Shop All Products
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Showing {filteredProducts.length} of {allProducts.length} certified gemstone statues, Shivlings &amp; crystal carvings
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
              {/* SORT DROPDOWN */}
              <div className="relative shrink-0 flex items-center">
                <label htmlFor="shop-sort-select" className="sr-only">
                  Sort products
                </label>
                <div className="w-full relative">
                  <select
                    id="shop-sort-select"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                    className="w-full sm:w-auto pl-3 pr-8 py-3 rounded-xl border border-stone-300 bg-white text-stone-700 text-xs sm:text-sm font-semibold shadow-xs outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer appearance-none transition-all"
                  >
                    <option value="latest">Sort by: Latest Arrivals (Newest First)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Product Name: A to Z</option>
                  </select>
                  <FaSortAmountDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-xs" />
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="w-full sm:w-[260px] lg:w-[320px] relative">
                <input
                  type="text"
                  placeholder="Search Ruby, Jade, Shivling, Ganesha..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-300 bg-white shadow-xs outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs sm:text-sm transition-all"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>
          </div>

          {/* VISUAL CATEGORIES SHOWCASE CARDS */}
          <section aria-label="Product Categories" className="mb-8">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <h2 className="text-sm sm:text-base font-bold text-stone-800 tracking-tight">
                  Explore by Category
                </h2>
              </div>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <FaTimes className="text-[10px]" /> Clear Filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {SHOP_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const count = getCategoryCount(cat.slug);

                return (
                  <div
                    key={cat.slug}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`group relative bg-white rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                      isSelected
                        ? "border-amber-600 ring-2 ring-amber-500/40 bg-amber-50/40 shadow-md scale-[1.02]"
                        : "border-stone-200/80 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div>
                      {/* Image Thumbnail with zoom effect */}
                      <div className="aspect-square w-full rounded-xl bg-stone-50 overflow-hidden mb-2.5 border border-stone-100 flex items-center justify-center p-2 relative">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 text-xs bg-white/90 backdrop-blur-xs font-bold text-stone-700 px-2 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                          {count}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-snug">
                        {cat.tagline}
                      </p>
                    </div>

                    {/* Bottom Action Indicator */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold">
                      <span className={isSelected ? "text-amber-800 font-bold" : "text-stone-500 group-hover:text-amber-700"}>
                        {isSelected ? "Active Filter ✓" : "Filter Products"}
                      </span>
                      <Link
                        to={cat.href}
                        onClick={(e) => e.stopPropagation()}
                        className="text-stone-400 hover:text-amber-800 transition-colors"
                        title={`View ${cat.name} page`}
                      >
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CATEGORY FILTER CHIPS BAR */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            <button
              type="button"
              onClick={() => handleSelectCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <span>All Products</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === "all" ? "bg-stone-700 text-white" : "bg-stone-100 text-stone-600"}`}>
                {allProducts.length}
              </span>
            </button>

            {SHOP_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const count = getCategoryCount(cat.slug);

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleSelectCategory(cat.slug)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-amber-700 text-white shadow-xs"
                      : "bg-white text-stone-700 border border-stone-200 hover:border-amber-300 hover:bg-stone-50"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? "bg-amber-800 text-white" : "bg-stone-100 text-stone-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE FILTER NOTICE & DEDICATED PAGE LINK */}
          {activeCategoryObj && (
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-950 font-medium">
                <FaFilter className="text-amber-600 shrink-0" />
                <span>
                  Filtering by <strong>{activeCategoryObj.name}</strong> ({filteredProducts.length} items found)
                </span>
              </div>
              <Link
                to={activeCategoryObj.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 underline underline-offset-2"
              >
                <span>View Dedicated {activeCategoryObj.name} Collection Page</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          )}

          {/* PRODUCTS GRID */}
          {displayedProducts.length === 0 && !loading ? (
            <div className="text-center py-20 text-gray-500 text-lg bg-white rounded-2xl border border-stone-200 p-8">
              <p className="text-stone-700 font-bold mb-2">No Products Found</p>
              <p className="text-stone-500 text-sm mb-4">
                No items match &ldquo;{search}&rdquo; in {selectedCategory === "all" ? "the catalog" : activeCategoryObj?.name || "this category"}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSearchParams({});
                }}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Reset Filters &amp; View All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center flex-wrap gap-2 mt-12">
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 sm:px-4 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 disabled:opacity-40 text-sm font-semibold cursor-pointer transition-colors shadow-2xs"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPage(index + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors shadow-2xs ${
                    page === index + 1
                      ? "bg-amber-700 text-white border border-amber-700 shadow-xs"
                      : "bg-white hover:bg-stone-50 border border-stone-200 text-stone-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => {
                  setPage(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 sm:px-4 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 disabled:opacity-40 text-sm font-semibold cursor-pointer transition-colors shadow-2xs"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;

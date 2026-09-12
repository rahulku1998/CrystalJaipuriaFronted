import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import SEO from "../Components/SEO";
import { formatPrice } from "../utils/price";
import { optimizeCloudinaryUrl } from "../utils/imageOptimizer";
import { getBreadcrumbSchema } from "../utils/seo";
import { trackCategoryView } from "../utils/analytics";
import { LEGACY_PRODUCTS } from "../utils/legacyProducts";
import ProductCard from "../Components/ProductCard";
import BrandLoader from "../Components/BrandLoader";
import NotFound from "./NotFound";

const CATEGORY_SEO = {
  "god-statues": {
    title: "Gemstone God Statues Manufacturer & Wholesaler | Crystal Jaipuria",
    description:
      "Buy handcrafted gemstone God statues from a trusted Jaipur manufacturer and wholesaler. Explore Ganesha, Shiva and other crystal and gemstone idols.",
    canonical: "https://www.crystaljaipuria.com/god-statues",
    ogTitle: "Gemstone God Statues Manufacturer & Wholesaler | Crystal Jaipuria",
    ogDescription:
      "Explore handcrafted gemstone God statues from Crystal Jaipuria, a Jaipur-based manufacturer and wholesaler of Ganesha, Shiva and other spiritual gemstone idols.",
    twitterTitle:
      "Gemstone God Statues Manufacturer & Wholesaler | Crystal Jaipuria",
    twitterDescription:
      "Explore handcrafted gemstone God statues from Crystal Jaipuria, a Jaipur-based manufacturer and wholesaler of Ganesha, Shiva and other spiritual gemstone idols.",
    image: "https://www.crystaljaipuria.com/logo.png",
  },
  shivling: {
    title:
      "Gemstone Shivling Manufacturer & Wholesaler in India | Crystal Jaipuria",
    description:
      "Discover handcrafted gemstone Shivlings from Crystal Jaipuria, a Jaipur manufacturer and wholesaler. Explore Lapis Lazuli and other natural stone Shiva Lingas.",
    canonical: "https://www.crystaljaipuria.com/shivling",
    ogTitle:
      "Gemstone Shivling Manufacturer & Wholesaler in India | Crystal Jaipuria",
    ogDescription:
      "Explore handcrafted gemstone Shivlings and Shiva Lingas made from natural stones. Crystal Jaipuria supplies gemstone Shivlings from Jaipur, India.",
    twitterTitle:
      "Gemstone Shivling Manufacturer & Wholesaler in India | Crystal Jaipuria",
    twitterDescription:
      "Explore handcrafted gemstone Shivlings and Shiva Lingas made from natural stones. Crystal Jaipuria supplies gemstone Shivlings from Jaipur, India.",
    image: "https://www.crystaljaipuria.com/logo.png",
  },
  "shree-yantra": {
    title:
      "Crystal Shree Yantra Manufacturer & Wholesaler in India | Crystal Jaipuria",
    description:
      "Buy handcrafted crystal and gemstone Shree Yantra products from Crystal Jaipuria, Jaipur. Explore spiritual and Vastu decor crafted from natural stones.",
    canonical: "https://www.crystaljaipuria.com/shree-yantra",
    ogTitle:
      "Crystal Shree Yantra Manufacturer & Wholesaler in India | Crystal Jaipuria",
    ogDescription:
      "Explore handcrafted crystal and gemstone Shree Yantra products from Crystal Jaipuria, Jaipur. Discover premium spiritual and Vastu decor crafted from natural stones.",
    twitterTitle:
      "Crystal Shree Yantra Manufacturer & Wholesaler in India | Crystal Jaipuria",
    twitterDescription:
      "Explore handcrafted crystal and gemstone Shree Yantra products from Crystal Jaipuria, Jaipur. Discover premium spiritual and Vastu decor crafted from natural stones.",
    image: "https://www.crystaljaipuria.com/logo.png",
  },
  angel: {
    title: "Amethyst Angel Statues & Gemstone Angels | Crystal Jaipuria",
    description:
      "Explore handcrafted amethyst angel statues and gemstone angels from Crystal Jaipuria, Jaipur. Natural crystal carvings for spiritual decor and gifting.",
    canonical: "https://www.crystaljaipuria.com/angel",
    ogTitle: "Amethyst Angel Statues & Gemstone Angels | Crystal Jaipuria",
    ogDescription:
      "Discover handcrafted amethyst angel statues and natural gemstone angel carvings from Crystal Jaipuria, Jaipur, India. Ideal for spiritual decor and gifting.",
    twitterTitle: "Amethyst Angel Statues & Gemstone Angels | Crystal Jaipuria",
    twitterDescription:
      "Discover handcrafted amethyst angel statues and natural gemstone angel carvings from Crystal Jaipuria, Jaipur, India. Ideal for spiritual decor and gifting.",
    image: "https://www.crystaljaipuria.com/logo.png",
  },
  "crystal-statues": {
    title:
      "Crystal Statues Manufacturer & Wholesaler in India | Crystal Jaipuria",
    description:
      "Explore handcrafted crystal statues and natural stone carvings from Crystal Jaipuria, a Jaipur manufacturer and wholesaler serving buyers across India and worldwide.",
    canonical: "https://www.crystaljaipuria.com/crystal-statues",
    ogTitle:
      "Crystal Statues Manufacturer & Wholesaler in India | Crystal Jaipuria",
    ogDescription:
      "Discover premium handcrafted crystal statues and natural stone carvings from Crystal Jaipuria, Jaipur. Manufacturer and wholesaler serving domestic and international buyers.",
    twitterTitle:
      "Crystal Statues Manufacturer & Wholesaler in India | Crystal Jaipuria",
    twitterDescription:
      "Discover premium handcrafted crystal statues and natural stone carvings from Crystal Jaipuria, Jaipur. Manufacturer and wholesaler serving domestic and international buyers.",
    image: "https://www.crystaljaipuria.com/logo.png",
  },
  diya: {
    title: "Gemstone Diya & Crystal Diya Manufacturer | Crystal Jaipuria",
    description:
      "Shop handcrafted gemstone and crystal Diyas from Crystal Jaipuria, Jaipur. Explore natural stone Diyas for spiritual decor, gifting and traditional spaces.",
    canonical: "https://www.crystaljaipuria.com/diya",
    ogTitle: "Gemstone Diya & Crystal Diya Manufacturer | Crystal Jaipuria",
    ogDescription:
      "Explore handcrafted gemstone and crystal Diyas from Crystal Jaipuria, Jaipur. Natural stone decor pieces designed for spiritual spaces, gifting and traditional interiors.",
    twitterTitle: "Gemstone Diya & Crystal Diya Manufacturer | Crystal Jaipuria",
    twitterDescription:
      "Explore handcrafted gemstone and crystal Diyas from Crystal Jaipuria, Jaipur. Natural stone decor pieces designed for spiritual spaces, gifting and traditional interiors.",
    image: "https://www.crystaljaipuria.com/logo.png",
  },
};

export const STATIC_CATEGORIES = {
  "god-statues": {
    _id: "6a55bb1f2e9a358fc926cbab",
    name: "God Statues",
    slug: "god-statues",
  },
  "shivling": {
    _id: "6a55bc292dcf49aacd71ef65",
    name: "Shivling",
    slug: "shivling",
  },
  "shree-yantra": {
    _id: "6a55bc362dcf49aacd71ef66",
    name: "Shree Yantra",
    slug: "shree-yantra",
  },
  "angel": {
    _id: "6a55bc3f2dcf49aacd71ef67",
    name: "Angel",
    slug: "angel",
  },
  "crystal-statues": {
    _id: "6a55bc492dcf49aacd71ef68",
    name: "Crystal Statues",
    slug: "crystal-statues",
  },
  "diya": {
    _id: "6a55bc522dcf49aacd71ef69",
    name: "Diya",
    slug: "diya",
  },
};

// In-memory cache for instant tab transitions
let categoryMemoryCache = {
  categories: null,
  subCategories: null,
  products: null,
  timestamp: 0,
};

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl sm:rounded-2xl border border-stone-100 shadow-xs overflow-hidden flex flex-col h-full animate-pulse">
    <div className="w-full aspect-square bg-stone-100/80 relative"></div>
    <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between gap-2.5">
      <div className="h-4 bg-stone-200/80 rounded-md w-4/5"></div>
      <div className="h-3 bg-stone-100 rounded-md w-3/5"></div>
      <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
        <div className="h-5 bg-stone-200/80 rounded-md w-16"></div>
        <div className="h-4 bg-stone-100 rounded-md w-14"></div>
      </div>
    </div>
  </div>
);

const SubCategorySkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-9 bg-stone-100/90 rounded-xl w-full"></div>
    <div className="h-9 bg-stone-100/90 rounded-xl w-full"></div>
    <div className="h-9 bg-stone-100/90 rounded-xl w-full"></div>
  </div>
);

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const cleanSlug = useMemo(() => String(slug || "").toLowerCase().trim(), [slug]);
  const staticCat = useMemo(() => STATIC_CATEGORIES[cleanSlug] || null, [cleanSlug]);

  const getCachedCategoryData = () => {
    if (!categoryMemoryCache.products || !categoryMemoryCache.categories) return null;
    const cat = categoryMemoryCache.categories.find((c) => c.slug === cleanSlug) || staticCat;
    if (!cat) return null;

    const subs = (categoryMemoryCache.subCategories || []).filter(
      (s) =>
        s.categoryId?._id === cat._id ||
        s.categoryId === cat._id ||
        (s.categoryId?.slug && s.categoryId.slug === cat.slug)
    );

    const prods = categoryMemoryCache.products.filter((p) => {
      const pCatId = p.categoryId?._id || p.categoryId;
      const pCatSlug = p.categoryId?.slug;
      return (
        pCatId === cat._id ||
        (pCatSlug && pCatSlug === cat.slug) ||
        (p.categoryName && p.categoryName.toLowerCase() === cat.name?.toLowerCase())
      );
    });

    return { cat, subs, prods };
  };

  const initialCached = getCachedCategoryData();

  const [category, setCategory] = useState(() => initialCached?.cat || staticCat);
  const [subCategories, setSubCategories] = useState(() => initialCached?.subs || []);
  const [products, setProducts] = useState(() => initialCached?.prods || []);
  const [allCategoryProducts, setAllCategoryProducts] = useState(() => initialCached?.prods || []);
  const [loadingProducts, setLoadingProducts] = useState(() => !initialCached);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    const cached = getCachedCategoryData();
    if (cached) {
      setCategory(cached.cat);
      setSubCategories(cached.subs);
      setProducts(cached.prods);
      setAllCategoryProducts(cached.prods);
      setLoadingProducts(false);
    } else {
      setCategory(staticCat);
      setSubCategories([]);
      setProducts([]);
      setAllCategoryProducts([]);
      setLoadingProducts(true);
    }
    setActiveSubCategory(null);
    fetchData();
  }, [cleanSlug]);

  const fetchProductsBySubCategory = async (subCategoryId) => {
    setActiveSubCategory(subCategoryId);
    if (!subCategoryId) {
      setProducts(allCategoryProducts);
      return;
    }

    const filtered = allCategoryProducts.filter(
      (p) => (p.subCategoryId?._id || p.subCategoryId) === subCategoryId
    );

    if (filtered.length > 0) {
      setProducts(filtered);
    } else {
      try {
        const res = await API.get(`/products/subcategory/${subCategoryId}`);
        const list = res.data.products || [];
        if (list.length > 0) {
          setProducts(list);
        } else {
          const pRes = await API.get("/products");
          const all = pRes.data.products || [];
          const matched = all.filter(
            (p) => (p.subCategoryId?._id || p.subCategoryId) === subCategoryId
          );
          setProducts(matched);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchData = async () => {
    try {
      const now = Date.now();
      let catData = categoryMemoryCache.categories;
      let subData = categoryMemoryCache.subCategories;
      let prodData = categoryMemoryCache.products;

      if (!catData || !subData || !prodData || now - categoryMemoryCache.timestamp > 60000) {
        const [catRes, subRes, productRes] = await Promise.all([
          API.get("/categories"),
          API.get("/subcategories"),
          API.get("/products"),
        ]);
        catData = catRes.data?.categories || [];
        subData = subRes.data?.subCategories || [];
        prodData = productRes.data?.products || productRes.data || [];

        categoryMemoryCache = {
          categories: catData,
          subCategories: subData,
          products: prodData,
          timestamp: now,
        };
      }

      const currentCat =
        catData.find((c) => c.slug === cleanSlug) || staticCat;

      if (!currentCat) {
        // Check if slug matches a product
        const matchedProd = prodData.find((p) => p.slug === cleanSlug || p._id === cleanSlug);
        if (matchedProd) {
          navigate(`/product/${matchedProd.slug || matchedProd._id}`, { replace: true });
          return;
        }

        // Check legacy products
        const legacyMatch = LEGACY_PRODUCTS.find((p) => p.slug === cleanSlug);
        if (legacyMatch) {
          navigate(`/product/${legacyMatch.slug}`, { replace: true });
          return;
        }

        setCategory(null);
        setSubCategories([]);
        setLoadingProducts(false);
        return;
      }

      setCategory(currentCat);

      const filteredSubs = subData.filter(
        (s) =>
          s.categoryId?._id === currentCat._id ||
          s.categoryId === currentCat._id ||
          (s.categoryId?.slug && s.categoryId.slug === currentCat.slug)
      );
      setSubCategories(filteredSubs);

      const liveProducts = prodData.filter((p) => {
        const pCatId = p.categoryId?._id || p.categoryId;
        const pCatSlug = p.categoryId?.slug;
        return (
          pCatId === currentCat._id ||
          (pCatSlug && pCatSlug === currentCat.slug) ||
          (p.categoryName && p.categoryName.toLowerCase() === currentCat.name?.toLowerCase())
        );
      });

      setProducts(liveProducts);
      setAllCategoryProducts(liveProducts);
      trackCategoryView(currentCat.name, liveProducts);
    } catch (err) {
      console.log("Category fetch error:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const customSeo = CATEGORY_SEO[cleanSlug];
  const pageTitle =
    customSeo?.title ||
    `${category?.name || "Products"} | Crystal Jaipuria`;
  const pageDescription =
    customSeo?.description ||
    `Explore handcrafted ${category?.name || "crystal items"} from Crystal Jaipuria, Jaipur, India.`;
  const canonicalUrl =
    customSeo?.canonical || `https://www.crystaljaipuria.com/${cleanSlug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.crystaljaipuria.com/" },
    { name: category?.name || customSeo?.title || "Category", url: canonicalUrl },
  ]);

  const seo = (
    <SEO
      title={pageTitle}
      description={pageDescription}
      canonical={canonicalUrl}
      ogTitle={customSeo?.ogTitle || pageTitle}
      ogDescription={customSeo?.ogDescription || pageDescription}
      twitterTitle={customSeo?.twitterTitle || pageTitle}
      twitterDescription={customSeo?.twitterDescription || pageDescription}
      image={customSeo?.image || "https://www.crystaljaipuria.com/logo.png"}
      type="website"
      schema={breadcrumbSchema}
    />
  );

  if (loadingProducts && !category) {
    return <BrandLoader message="Loading gemstone collection..." minHeight="60vh" />;
  }

  if (!category) {
    return <NotFound />;
  }

  return (
    <>
      {seo}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-850">
            All <span className="text-amber-800">{category.name}</span>
          </h1>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            {loadingProducts ? "Loading..." : `${products.length} Products`}
          </span>
        </div>

        {/* Mobile Horizontal Subcategory Filter Bar */}
        {loadingProducts ? (
          <div className="flex md:hidden overflow-x-auto gap-2 pb-2 mb-4 scrollbar-none animate-pulse">
            <div className="h-7 bg-stone-200/80 rounded-full w-20"></div>
            <div className="h-7 bg-stone-200/80 rounded-full w-24"></div>
            <div className="h-7 bg-stone-200/80 rounded-full w-20"></div>
          </div>
        ) : subCategories.length > 0 ? (
          <div className="flex md:hidden overflow-x-auto gap-2 pb-2 mb-4 scrollbar-none">
            <button
              onClick={() => {
                setActiveSubCategory(null);
                setProducts(allCategoryProducts);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                activeSubCategory === null
                  ? "bg-amber-800 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              All ({allCategoryProducts.length})
            </button>
            {subCategories.map((sub) => {
              const subCount = allCategoryProducts.filter((p) => {
                const pSubId = p.subCategoryId?._id || p.subCategoryId;
                return pSubId === sub._id;
              }).length;
              return (
                <button
                  key={sub._id}
                  onClick={() => fetchProductsBySubCategory(sub._id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    activeSubCategory === sub._id
                      ? "bg-amber-800 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  <span>{sub.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeSubCategory === sub._id
                        ? "bg-amber-900 text-amber-100"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {subCount}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:block md:w-1/4 w-full bg-white rounded-2xl shadow-sm border border-stone-200 p-5 h-fit">
            <h2 className="text-base font-bold text-gray-800 mb-4 border-b pb-2">
              Sub Categories
            </h2>

            {loadingProducts ? (
              <SubCategorySkeleton />
            ) : subCategories.length === 0 ? (
              <p className="text-sm text-gray-400">No Subcategories Found</p>
            ) : (
              <div className="space-y-1.5">
                <div
                  onClick={() => {
                    setActiveSubCategory(null);
                    setProducts(allCategoryProducts);
                  }}
                  className={`p-2.5 rounded-xl cursor-pointer transition text-sm font-medium flex justify-between items-center ${
                    activeSubCategory === null
                      ? "bg-amber-50 text-amber-900 font-semibold"
                      : "hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  <span>All {category.name}</span>
                  <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {allCategoryProducts.length}
                  </span>
                </div>
                {subCategories.map((sub) => {
                  const productCount = allCategoryProducts.filter((product) => {
                    const pSubId = product.subCategoryId?._id || product.subCategoryId;
                    return pSubId === sub._id;
                  }).length;

                  return (
                    <div
                      key={sub._id}
                      onClick={() => fetchProductsBySubCategory(sub._id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition text-sm flex justify-between items-center ${
                        activeSubCategory === sub._id
                          ? "bg-amber-50 text-amber-900 font-semibold"
                          : "hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      <span>{sub.name}</span>
                      <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full text-xs font-medium">
                        {productCount}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Products Content - 2-2 grid on mobile */}
          <div className="md:w-3/4 w-full">
            {loadingProducts ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <ProductCardSkeleton key={`skeleton-${n}`} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
                No Products Found in this category
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
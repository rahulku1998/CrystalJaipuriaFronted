import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import SEO from "../Components/SEO";
import { formatPrice } from "../utils/price";
import { optimizeCloudinaryUrl } from "../utils/imageOptimizer";
import { getBreadcrumbSchema } from "../utils/seo";
import { trackCategoryView } from "../utils/analytics";
import { LEGACY_PRODUCTS } from "../utils/legacyProducts";
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

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    setCategory(null);
    setSubCategories([]);
    setProducts([]);
    setLoadingProducts(true);
    fetchData();
  }, [slug]);

  const fetchProductsBySubCategory = async (subCategoryId) => {
    try {
      const res = await API.get(`/products/subcategory/${subCategoryId}`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const [catRes, subRes, productRes] = await Promise.all([
        API.get("/categories"),
        API.get("/subcategories"),
        API.get("/products"),
      ]);

      const currentCat = (catRes.data.categories || []).find(
        (c) => c.slug === slug
      );

      if (!currentCat) {
        // Check if slug matches a product
        const allProds = productRes.data?.products || productRes.data || [];
        const matchedProd = allProds.find((p) => p.slug === slug || p._id === slug);
        if (matchedProd) {
          navigate(`/product/${matchedProd.slug || matchedProd._id}`, { replace: true });
          return;
        }

        // Check legacy products
        const legacyMatch = LEGACY_PRODUCTS.find((p) => p.slug === slug);
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

      const filteredSubs = (subRes.data.subCategories || []).filter(
        (s) => s.categoryId?._id === currentCat._id
      );
      setSubCategories(filteredSubs);

      const liveProducts = (productRes.data.products || []).filter(
        (p) => p.categoryId?._id === currentCat._id
      );

      setProducts(liveProducts);
      trackCategoryView(currentCat.name, liveProducts);
    } catch (err) {
      console.log("Category fetch error:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const customSeo = CATEGORY_SEO[slug];
  const pageTitle =
    customSeo?.title ||
    `${category?.name || "Products"} | Crystal Jaipuria`;
  const pageDescription =
    customSeo?.description ||
    `Explore handcrafted ${category?.name || "crystal items"} from Crystal Jaipuria, Jaipur, India.`;
  const canonicalUrl =
    customSeo?.canonical || `https://www.crystaljaipuria.com/${slug}`;

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
    return seo;
  }

  if (!category) {
    return <NotFound />;
  }

  return (
    <>
      {seo}
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-indigo-600">All {category.name}</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="md:w-1/4 w-full bg-white rounded-xl shadow border p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Sub Categories
            </h2>

            {subCategories.length === 0 ? (
              <p>No Subcategories Found</p>
            ) : (
              <div className="space-y-2">
                {subCategories.map((sub) => {
                  const productCount = products.filter(
                    (product) => product.subCategoryId?._id === sub._id
                  ).length;

                  return (
                    <div
                      key={sub._id}
                      onClick={() => {
                        setActiveSubCategory(sub._id);
                        fetchProductsBySubCategory(sub._id);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition duration-200 flex justify-between items-center ${
                        activeSubCategory === sub._id
                          ? "bg-indigo-50 text-indigo-600"
                          : "hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      <span>{sub.name}</span>
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                        {productCount}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="md:w-3/4 w-full">
            {products.length === 0 ? (
              <div className="text-center py-10 text-indigo-600">
                No Products Found
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow border overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    {/* Image */}
                    <div className="h-56 w-full overflow-hidden bg-gray-50 flex items-center justify-center aspect-[4/3]">
                      <img
                        src={optimizeCloudinaryUrl(product.images?.[0]?.url, 450)}
                        alt={product.name}
                        width="300"
                        height="224"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-3">
                      <h2 className="text-base font-bold">{product.name}</h2>

                      {product.price && (
                        <span className="text-indigo-600 font-bold text-lg mt-2 block">
                          {formatPrice(product.price)}
                        </span>
                      )}

                      <div className="text-sm text-gray-600 mt-2 space-y-1">
                        {product.weight && (
                          <p>
                            <span className="font-semibold text-indigo-600">
                              Weight: {product.weight}
                            </span>
                          </p>
                        )}

                        {product.size && (
                          <p>
                            <span className="font-semibold text-indigo-600">
                              Size: {product.size}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
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
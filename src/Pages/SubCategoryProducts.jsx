import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import SEO from "../Components/SEO";
import NotFound from "./NotFound";
import { FALLBACK_PRODUCTS, FALLBACK_SUBCATEGORIES } from "../data/fallbackData";

const SubCategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategoryName, setSubCategoryName] = useState("");

  const cleanId = (id || "").toLowerCase().trim();
  const matchedSub = FALLBACK_SUBCATEGORIES.find(
    (s) =>
      s._id === id ||
      s._id?.toLowerCase() === cleanId ||
      s.slug === cleanId ||
      s.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanId ||
      (cleanId === "sphatik-crystal-shree-yantra" && s.slug === "sphatik-crystal-yantra") ||
      (cleanId === "sphatik-&-crystal-yantra" && s.slug === "sphatik-crystal-yantra")
  );

  // Auto 301-equivalent client redirect from raw MongoDB ID or legacy alias to SEO clean slug
  if (
    matchedSub &&
    (id === matchedSub._id ||
      cleanId === "sphatik-crystal-shree-yantra" ||
      cleanId === "sphatik-&-crystal-yantra")
  ) {
    return <Navigate to={`/subcategory/${matchedSub.slug}`} replace />;
  }

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const backendSubId = matchedSub ? matchedSub._id : id;
      let fetchedProducts = [];

      try {
        const res = await API.get(`/products/subcategory/${backendSubId}`);
        fetchedProducts = res.data?.products || [];
      } catch (apiErr) {
        console.warn("Subcategory API fetch error:", apiErr?.message);
      }

      const matchingFallbacks = FALLBACK_PRODUCTS.filter((p) => {
        const pSubId = p.subCategoryId?._id || p.subCategoryId;
        const pSubSlug = (p.subCategoryId?.slug || "").toLowerCase().trim();
        const pSubName = (p.subCategoryName || p.subCategoryId?.name || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");

        return (
          (matchedSub && (pSubId === matchedSub._id || pSubSlug === matchedSub.slug)) ||
          pSubId === id ||
          pSubId === cleanId ||
          pSubSlug === cleanId ||
          pSubName === cleanId
        );
      });

      const missingFallbacks = matchingFallbacks.filter(
        (fb) => !fetchedProducts.some((p) => (p.slug || p._id) === (fb.slug || fb._id))
      );
      fetchedProducts = [...missingFallbacks, ...fetchedProducts];

      setProducts(fetchedProducts);

      if (matchedSub?.name) {
        setSubCategoryName(matchedSub.name);
      } else if (fetchedProducts.length > 0) {
        setSubCategoryName(fetchedProducts[0].subCategoryId?.name || fetchedProducts[0].subCategoryName || "");
      }
    } catch (err) {
      console.log(err);
      const matchingFallbacks = FALLBACK_PRODUCTS.filter((p) => {
        const pSubId = p.subCategoryId?._id || p.subCategoryId;
        const pSubSlug = (p.subCategoryId?.slug || "").toLowerCase().trim();
        const pSubName = (p.subCategoryName || p.subCategoryId?.name || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");

        return (
          (matchedSub && (pSubId === matchedSub._id || pSubSlug === matchedSub.slug)) ||
          pSubId === id ||
          pSubId === cleanId ||
          pSubSlug === cleanId ||
          pSubName === cleanId
        );
      });
      setProducts(matchingFallbacks);
      if (matchedSub?.name) {
        setSubCategoryName(matchedSub.name);
      } else if (matchingFallbacks.length > 0) {
        setSubCategoryName(matchingFallbacks[0].subCategoryId?.name || matchingFallbacks[0].subCategoryName || "");
      }
    } finally {
      setLoading(false);
    }
  };

  const currentSlug = matchedSub ? matchedSub.slug : cleanId;
  const displayName = subCategoryName || matchedSub?.name || "";
  const title = displayName
    ? `${displayName} | Handcrafted Gemstone Statues | Crystal Jaipuria`
    : "SubCategory Products | Crystal Jaipuria";
  const description = displayName
    ? `Explore authentic handcrafted ${displayName} and spiritual natural crystals manufactured in Jaipur, India by Crystal Jaipuria. 100% certified quality.`
    : "Explore handcrafted gemstone statues and crystal products from Crystal Jaipuria, Jaipur.";
  const canonical = `https://www.crystaljaipuria.com/subcategory/${currentSlug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: displayName || "SubCategory Products",
    description,
    url: canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.crystaljaipuria.com/",
        },
        ...(matchedSub?.categoryId
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: matchedSub.categoryId.name,
                item: `https://www.crystaljaipuria.com/${matchedSub.categoryId.slug || ""}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: displayName,
                item: canonical,
              },
            ]
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: displayName,
                item: canonical,
              },
            ]),
      ],
    },
  };

  const seo = (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      image="https://www.crystaljaipuria.com/logo.png"
      type="website"
      schema={schema}
    />
  );

  if (loading && products.length === 0) {
    return seo;
  }

  if (!loading && products.length === 0 && !displayName) {
    return <NotFound />;
  }

  return (
    <>
      {seo}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-stone-500 mb-4 sm:mb-6 flex-wrap">
          <Link to="/" className="hover:text-amber-800 transition">
            Home
          </Link>
          <span>/</span>
          {matchedSub?.categoryId?.slug ? (
            <>
              <Link
                to={`/${matchedSub.categoryId.slug}`}
                className="hover:text-amber-800 transition"
              >
                {matchedSub.categoryId.name}
              </Link>
              <span>/</span>
            </>
          ) : null}
          <span className="font-semibold text-stone-800">{displayName || "Products"}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-850">
          {displayName || "Products"}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
            No Products Available in this subcategory.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategoryProducts;
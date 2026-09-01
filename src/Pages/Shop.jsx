import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import SEO from "../Components/SEO";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { trackSearchNoResults } from "../utils/analytics";

const ITEMS_PER_PAGE = 15;

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      const dbList = res.data.products || res.data || [];
      setAllProducts(dbList);
    } catch (error) {
      console.log(error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = product.name?.toLowerCase().includes(q);
    const catMatch = product.categoryId?.name?.toLowerCase().includes(q);
    const descMatch = product.detail?.toLowerCase().includes(q);
    return nameMatch || catMatch || descMatch;
  });

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
      <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Shop All Products
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Showing {filteredProducts.length} certified gemstone statues, Shivlings &amp; crystal carvings
              </p>
            </div>

            <div className="w-full sm:w-[350px] lg:w-[400px] relative">
              <input
                type="text"
                placeholder="Search Ruby, Jade, Shivling, Ganesha..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 pr-12 rounded-xl border bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {displayedProducts.length === 0 && !loading ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No Products Found matching &ldquo;{search}&rdquo;
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center flex-wrap gap-2 mt-12">
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 sm:px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm sm:text-base cursor-pointer"
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
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base cursor-pointer ${
                    page === index + 1
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
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
                className="px-3 sm:px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm sm:text-base cursor-pointer"
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

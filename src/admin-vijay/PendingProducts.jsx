import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { formatPrice } from "../utils/price";
import { LEGACY_PRODUCTS } from "../utils/legacyProducts";
import {
  FaSearch,
  FaImage,
  FaArrowRight,
  FaClock,
  FaShieldAlt,
  FaFilter,
} from "react-icons/fa";

const PendingProducts = () => {
  const navigate = useNavigate();
  const [dbProducts, setDbProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchDbData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        API.get("/products"),
        API.get("/categories"),
      ]);
      setDbProducts(prodRes.data.products || prodRes.data || []);
      setCategories(catRes.data.categories || []);
    } catch (err) {
      console.log("Error fetching DB data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const liveSlugs = new Set(dbProducts.map((p) => p.slug));

  // Only take products that are NOT yet live in the database
  const onlyPendingProducts = LEGACY_PRODUCTS.filter(
    (prod) => !liveSlugs.has(prod.slug)
  );

  const pendingCount = onlyPendingProducts.length;
  const liveCount = dbProducts.length;

  const filtered = onlyPendingProducts.filter((p) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.categoryId?.name?.toLowerCase().includes(q);

    const matchesCat =
      selectedCategory === "all" ||
      p.categoryId?.name?.toLowerCase() === selectedCategory.toLowerCase() ||
      p.categoryId?.slug === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleMakeLive = (prod) => {
    // Navigate to AddProduct with prefilled product data in state
    navigate(`/admin-vijay/add-product`, {
      state: {
        prefillProduct: {
          name: prod.name,
          slug: prod.slug,
          price: prod.price,
          discountPrice: prod.discountPrice,
          categoryName: prod.categoryId?.name,
          weight: prod.weight,
          size: prod.size,
          detail: prod.detail,
          description: prod.description,
          additionalInfo: prod.additionalInfo,
          faqs: prod.faqs,
          metaTitle: prod.metaTitle,
          metaDescription: prod.metaDescription,
        },
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 text-white p-6 shrink-0 flex flex-col justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-white text-indigo-600 font-semibold border hover:bg-blue-50 border-gray-200 text-xs sm:text-sm"
          >
            ← Back To Website
          </Link>
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1">
              <span>✨ AI Master Portal</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">Vijay Admin</h1>
          </div>

          <div className="space-y-2.5">
            <button
              className="adminBtn block w-full text-left cursor-pointer text-gray-300 hover:text-white"
              onClick={() => navigate("/admin-vijay/dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className="adminBtn block w-full text-left cursor-pointer bg-amber-500/20 text-amber-300 font-bold border border-amber-400/40 rounded-xl px-3 py-2.5 flex items-center justify-between"
              onClick={() => navigate("/admin-vijay/pending-products")}
            >
              <span>⏳ Pending Listing</span>
              <span className="bg-amber-400 text-slate-950 text-xs px-2 py-0.5 rounded-full font-extrabold">
                {pendingCount}
              </span>
            </button>
            <button
              className="adminBtn block w-full text-left cursor-pointer text-gray-300 hover:text-white"
              onClick={() => navigate("/admin-vijay/add-product")}
            >
              ➕ Add Product (AI)
            </button>
            <button
              className="adminBtn block w-full text-left cursor-pointer text-gray-300 hover:text-white"
              onClick={() => navigate("/admin-vijay/categories")}
            >
              📂 Categories
            </button>
            <button
              className="adminBtn block w-full text-left cursor-pointer text-gray-300 hover:text-white"
              onClick={() => navigate("/admin-vijay/subcategories")}
            >
              📁 Sub Categories
            </button>
            <button
              className="adminBtn block w-full text-left cursor-pointer text-gray-300 hover:text-white"
              onClick={() => navigate("/admin-vijay/blogs")}
            >
              📝 Blogs
            </button>
          </div>
        </div>

        <button
          className="adminBtn block w-full text-left cursor-pointer text-red-400 hover:text-red-300 pt-6 border-t border-slate-800"
          onClick={() => {
            localStorage.removeItem("vijay_admin_token");
            localStorage.removeItem("vijay_admin_email");
            navigate("/admin-vijay/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏳</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                Pending Product Listings
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Old website products recovered from Google Search Console. Attach real photos &amp; publish to make live on website.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-center">
              <p className="text-xs text-amber-700 font-semibold">Pending Photos</p>
              <p className="text-xl font-bold text-amber-800">{pendingCount}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-center">
              <p className="text-xs text-emerald-700 font-semibold">Already Live</p>
              <p className="text-xl font-bold text-emerald-800">{liveCount + (dbProducts.length - liveCount)}</p>
            </div>
          </div>
        </div>

        {/* Protection Note */}
        <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs sm:text-sm text-indigo-900">
          <FaShieldAlt className="text-indigo-600 text-lg shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">🔒 Protected Status: Hidden with &ldquo;noindex, nofollow&rdquo;</p>
            <p className="text-indigo-700/90 mt-0.5">
              These pending products are hidden from the store catalog (`/shop` and category pages) and protected with `noindex, nofollow` tags so Google won&rsquo;t index placeholder images. Once you attach real photos and click <strong>&ldquo;Attach Photos &amp; Publish Live&rdquo;</strong>, they will instantly go live with full SEO indexing!
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by product name or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FaFilter className="text-gray-400 text-xs" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Categories ({onlyPendingProducts.length})</option>
              <option value="Shivling">Shivling</option>
              <option value="God Statues">God Statues</option>
              <option value="Shree Yantra">Shree Yantra</option>
              <option value="Angel">Angel &amp; Healing</option>
              <option value="Crystal Statues">Crystal Statues</option>
              <option value="Diya">Diya</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-600 tracking-wider">
                <tr>
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Weight / Size</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">
                      No pending products found matching &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, idx) => (
                    <tr
                      key={item.slug || idx}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      {/* Product Name & Slug */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-lg shrink-0">
                            💎
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 leading-snug">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                              /product/{item.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
                          {item.categoryId?.name || "God Statues"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <span className="font-bold text-gray-900 text-base">
                          {formatPrice(item.price)}
                        </span>
                      </td>

                      {/* Specs */}
                      <td className="p-4 text-xs text-gray-600">
                        <p className="font-medium text-gray-800">{item.weight || "N/A"}</p>
                        <p className="text-gray-400 mt-0.5">{item.size || "N/A"}</p>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                          <FaClock className="text-amber-500" />
                          <span>Pending Photos (Hidden)</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleMakeLive(item)}
                          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                        >
                          <FaImage className="text-amber-300" />
                          <span>Attach Photos &amp; Live</span>
                          <FaArrowRight className="text-[10px]" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingProducts;

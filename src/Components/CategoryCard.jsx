import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategorySection = ({ title, slug, products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full overflow-hidden py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-850 truncate">
            {title}
          </h2>
          <Link
            to={`/${slug}`}
            className="text-amber-800 hover:text-amber-900 font-semibold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-1"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        {/* PRODUCTS GRID - 2-2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
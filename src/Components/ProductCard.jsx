import { Link } from "react-router-dom";
import { formatPrice } from "../utils/price";
import { getProductImageUrl } from "../utils/imageOptimizer";
import { getStandardizedProduct } from "../utils/productStandardizer";
import { FALLBACK_PRODUCTS } from "../data/fallbackData";

const ProductCard = ({ product, headingTag = "p" }) => {
  const item = getStandardizedProduct(product);
  if (!item) return null;

  const HeadingTag = headingTag || "p";

  const initialSrc = getProductImageUrl(item, 0);

  const unitPriceLabel = item.pricePerUnit || (() => {
    if (!item.slug && !item._id) return "";
    const fb = FALLBACK_PRODUCTS.find(p => p.slug === item.slug || p._id === item._id);
    return fb?.pricePerUnit || "";
  })();

  return (
    <Link
      to={`/product/${item.slug || item._id}`}
      className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      {/* Image Container - Strictly responsive 1:1 square ratio with zero cropping */}
      <div className="w-full aspect-square bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center p-1.5 sm:p-2.5">
        <img
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
          src={initialSrc}
          onError={(e) => {
            const rawFallback = typeof item.images?.[0] === 'string' ? item.images[0] : item.images?.[0]?.url;
            if (rawFallback && e.target.src !== rawFallback) {
              e.target.src = rawFallback;
            } else if (!e.target.src.endsWith("/Gemstone.webp")) {
              e.target.src = "/Gemstone.webp";
            }
          }}
          alt={`${item.name} - 100% Natural Certified Gemstone Handicraft | Crystal Jaipuria`}
          className="w-full h-full object-contain rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* 100% Certified Micro Badge */}
        <span className="absolute top-2 left-2 bg-amber-600/90 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-xs tracking-wide">
          100% Certified
        </span>
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-grow justify-between">
        <HeadingTag className="text-xs sm:text-sm md:text-base font-bold text-gray-800 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
          {item.name}
        </HeadingTag>

        {/* Price & Weight Footer */}
        <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-100 flex items-end justify-between gap-1">
          <div>
            {item.price ? (
              <p className="text-amber-800 font-extrabold text-sm sm:text-base md:text-lg leading-tight">
                {formatPrice(item.price)}
              </p>
            ) : (
              <span className="text-xs text-amber-700 font-semibold">Inquire Price</span>
            )}
            {unitPriceLabel && (
              <p className="text-[10px] sm:text-xs text-stone-500 font-medium leading-tight mt-0.5">
                {unitPriceLabel}
              </p>
            )}
          </div>

          {item.weight && (
            <span className="text-[10px] sm:text-xs bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium whitespace-nowrap mb-0.5">
              {item.weight}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
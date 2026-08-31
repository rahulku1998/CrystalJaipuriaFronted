import { Link } from "react-router-dom";
import { formatPrice } from "../utils/price";
import { getStandardizedProduct } from "../utils/productStandardizer";

const ProductCard = ({ product }) => {
  const item = getStandardizedProduct(product);
  if (!item) return null;

  return (
    <Link
      to={`/product/${item.slug || item._id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group block"
    >
      {/* Image */}
      <div className="h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={item.images?.[0]?.url}
          alt={item.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">
          {item.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {item.description}
        </p>

        {item.price && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-indigo-600 font-bold text-xl">
              {formatPrice(item.price)}
            </p>
            {item.weight && (
              <span className="text-xs text-gray-400 font-medium">
                {item.weight}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
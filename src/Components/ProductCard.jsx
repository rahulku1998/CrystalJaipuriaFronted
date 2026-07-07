import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        <h2 className="text-lg font-semibold line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <div>

            {product.discountPrice ? (
              <>
                <p className="text-red-600 font-bold text-xl">
                  ₹{product.discountPrice}
                </p>

                <p className="text-gray-400 line-through text-sm">
                  ₹{product.price}
                </p>
              </>
            ) : (
              <p className="text-red-600 font-bold text-xl">
                ₹{product.price}
              </p>
            )}

          </div>

          <Link
            to={`/product/${product._id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
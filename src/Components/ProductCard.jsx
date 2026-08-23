import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group block"
    >

      {/* Image */}
      <div className="h-72 bg-gray-100 flex items-center justify-center overflow-hidden">

        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 duration-500"
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


        <div className="mt-4">

          {product.discountPrice ? (
            <>
              <p className="text-indigo-600 font-bold text-xl">
                ₹{product.discountPrice}
              </p>

              <p className="text-red-400 line-through text-sm">
                ₹{product.price}
              </p>
            </>
          ) : (
            <p className="text-indigo-600 font-bold text-xl">
              ₹{product.price}
            </p>
          )}
          {product.pricePerGram && (
            <p className="text-green-700 text-sm">
              <span>Price/gram: </span>₹{product.pricePerGram}
            </p>
          )}
          {product.pricePerCarat && (
            <p className="text-yellow-700 text-sm">
              <span>Price/carat: </span>₹{product.pricePerCarat}
            </p>
          )}

        </div>

      </div>

    </Link>
  );
};

export default ProductCard;
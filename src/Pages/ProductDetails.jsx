import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setProduct(res.data.product);

      if (res.data.product.images.length > 0) {
        setSelectedImage(res.data.product.images[0].url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  const whatsappMessage = `Hi, I am interested in buying "${product.name}". Please share more details.`;

  const whatsappLink = `https://wa.me/918955613237?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* LEFT */}

        <div>

          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[550px] object-cover rounded-xl shadow"
          />

          <div className="flex gap-3 mt-5 flex-wrap">

            {product.images.map((img) => (
              <img
                key={img.public_id}
                src={img.url}
                alt=""
                onClick={() => setSelectedImage(img.url)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img.url
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              />
            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-6">

            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-red-600">
                  ₹{product.discountPrice}
                </span>

                <span className="line-through text-gray-500 text-xl">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-red-600">
                ₹{product.price}
              </span>
            )}

          </div>

          <div className="mt-8">

            <h2 className="font-semibold text-xl mb-2">
              Description
            </h2>

            <p className="text-gray-600 leading-8">
              {product.description}
            </p>

          </div>

          {product.additionalInfo && (
            <div className="mt-8">

              <h2 className="font-semibold text-xl mb-2">
                Additional Information
              </h2>

              <p className="text-gray-600 leading-8">
                {product.additionalInfo}
              </p>

            </div>
          )}

          <div className="mt-8 space-y-3">

            <p>
              <span className="font-semibold">Category :</span>{" "}
              {product.categoryId?.name}
            </p>

            <p>
              <span className="font-semibold">Sub Category :</span>{" "}
              {product.subCategoryId?.name}
            </p>

            <p>
              <span className="font-semibold">Availability :</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out Of Stock</span>
              )}
            </p>

          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Buy on WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
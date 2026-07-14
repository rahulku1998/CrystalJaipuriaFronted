import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";

const SubCategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategoryName, setSubCategoryName] = useState("");
  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/subcategory/${id}`);

      setProducts(res.data.products);

      if (res.data.products.length > 0) {
        setSubCategoryName(
          res.data.products[0].subCategoryId?.name
        );
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold mb-10 text-center">
        {subCategoryName}
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Products Available
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default SubCategoryProducts;
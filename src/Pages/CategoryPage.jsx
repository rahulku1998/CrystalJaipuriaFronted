import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
const [products, setProducts] = useState([]);
const [loadingProducts, setLoadingProducts] = useState(true);
const [selectedSubCategory, setSelectedSubCategory] = useState(null);
const [activeCategory, setActiveCategory] = useState(null);
const [activeSubCategory, setActiveSubCategory] = useState(null);
  useEffect(() => {
    setCategory(null);
    setSubCategories([]);
    setProducts([]);
    fetchData();
  }, [slug]);

const fetchProductsBySubCategory = async (subCategoryId) => {
  try {
    const res = await API.get(`/products/subcategory/${subCategoryId}`);
    setProducts(res.data.products);
    setSelectedSubCategory(subCategoryId);
  } catch (err) {
    console.log(err);
  }
};


  const fetchData = async () => {
    try {
      const [catRes, subRes, productRes] = await Promise.all([
        API.get("/categories"),
        API.get("/subcategories"),
         API.get("/products"),
      ]);

      const currentCat = catRes.data.categories.find(
        (c) => c.slug === slug
      );

      console.log("Current Category:", currentCat);

      // ❗ IMPORTANT: reset if category not found
      if (!currentCat) {
        setCategory(null);
        setSubCategories([]);
        return;
      }

      setCategory(currentCat);

      const filteredSubs = subRes.data.subCategories.filter(
        (s) => s.categoryId?._id === currentCat._id
      );

      setSubCategories(filteredSubs);
      const filteredProducts = productRes.data.products.filter(
  (p) => p.categoryId?._id === currentCat._id
);

setProducts(filteredProducts);
setLoadingProducts(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };


  
  // ❗ UI guard (VERY IMPORTANT)
  if (!category) {
    return (
      <div className="p-10 text-center">
        <h2>Loading... No Category Found</h2>
      </div>
    );
  }
  

  return (
    <div className="max-w-7xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6">
    <span className="text-indigo-600">
      All {category.name}
    </span>
  </h1>

  <div className="flex flex-col md:flex-row gap-6">

    {/* Left Sidebar */}
    <div className="md:w-1/4 w-full bg-white rounded-xl shadow border p-4 h-fit">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Sub Categories
      </h2>

      {subCategories.length === 0 ? (
        <p>No Subcategories Found</p>
      ) : (
        <div className="space-y-2">
          {subCategories.map((sub) => {
  const productCount = products.filter(
    (product) => product.subCategoryId?._id === sub._id
  ).length;

  return (
    <div
  key={sub._id}
  onClick={() => {
    setActiveSubCategory(sub._id);
    fetchProductsBySubCategory(sub._id);
  }}
  className={`p-3 rounded-lg cursor-pointer transition duration-200 flex justify-between items-center ${
    activeSubCategory === sub._id
      ? "bg-indigo-50 text-indigo-600"
      : "hover:bg-indigo-50 hover:text-indigo-600"
  }`}
>
  <span>{sub.name}</span>

  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
    {productCount}
  </span>
</div>
  );
})}
        </div>
      )}
    </div>

    {/* Right Content */}
    <div className="md:w-3/4 w-full">
  {loadingProducts ? (
    <div className="text-center py-10">Loading...</div>
  ) : products.length === 0 ? (
    <div className="text-center py-10 text-indigo-600">
      No Products Found
    </div>
  ) : (
   <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
  {products.map((product) => (
    <div
      key={product._id}
      className="bg-white rounded-xl shadow border overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >

      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>


      {/* Details */}
      <div className="p-3">

        <h2 className="text-base font-bold">
          {product.name}
        </h2>

     {product.discountPrice ? (
  <div className="flex items-center gap-3 mt-2">
    <span className="text-gray-400 line-through text-sm">
      ₹{product.price}
    </span>

    <span className="text-indigo-600 font-bold text-lg">
      ₹{product.discountPrice}
    </span>
  </div>
) : (
  <span className="text-indigo-600 font-bold text-lg">
    ₹{product.price}
  </span>
)}

        <div className="text-sm text-gray-600 mt-2 space-y-1">

          {product.weight && (
            <p>
              <span className="font-semibold  text-indigo-600">
                Weight: {" "} {product.weight}
              </span>
            </p>
          )}

          {product.size && (
            <p>
              <span className="font-semibold text-indigo-600">
                Size: {" "} {product.size}
              </span>
            </p>
          )}

        </div>

      </div>

    </div>
  ))}
</div>
  )}
</div>

  </div>
</div>
  );
};

export default CategoryPage;
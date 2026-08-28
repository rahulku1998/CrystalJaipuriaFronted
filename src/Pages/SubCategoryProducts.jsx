import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import SEO from "../Components/SEO";

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
      const fetchedProducts = res.data.products || [];
      setProducts(fetchedProducts);

      if (fetchedProducts.length > 0) {
        setSubCategoryName(fetchedProducts[0].subCategoryId?.name || "");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const title = subCategoryName
    ? `${subCategoryName} | Crystal Jaipuria`
    : "SubCategory Products | Crystal Jaipuria";
  const description = subCategoryName
    ? `Explore handcrafted ${subCategoryName} and spiritual crystal products from Crystal Jaipuria, Jaipur.`
    : "Explore handcrafted gemstone statues and crystal products from Crystal Jaipuria, Jaipur.";
  const canonical = `https://www.crystaljaipuria.com/subcategory/${id}`;

  const seo = (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      image="https://www.crystaljaipuria.com/logo.png"
      type="website"
    />
  );

  if (loading) {
    return (
      <>
        {seo}
        <div className="flex justify-center items-center h-[70vh] text-xl">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          {subCategoryName || "Products"}
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No Products Available
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategoryProducts;
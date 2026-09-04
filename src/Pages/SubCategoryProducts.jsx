import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import SEO from "../Components/SEO";
import NotFound from "./NotFound";

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
      setProducts([]);
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

  if (loading && products.length === 0) {
    return seo;
  }

  if (!loading && products.length === 0 && !subCategoryName) {
    return <NotFound />;
  }

  return (
    <>
      {seo}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-850">
          {subCategoryName || "Products"}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
            No Products Available
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    setCategory(null);
    setSubCategories([]);
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        API.get("/categories"),
        API.get("/subcategories"),
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
        {category.name}
      </h1>

      {subCategories.length === 0 ? (
        <p>No Subcategories Found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              onClick={() => navigate(`/subcategory/${sub._id}`)}
              className="p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer text-center"
            >
              {sub.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
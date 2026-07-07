import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import API from "../../api/axios";

const CategoryBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-flow-col auto-cols-fr py-3 px-4">

          {/* Static */}
          <button
  onClick={() => navigate("/")}
  className={`flex-1 text-center text-sm font-medium transition-colors cursor-pointer ${
    location.pathname === "/"
      ? "text-indigo-600"
      : "text-gray-700 hover:text-indigo-600"
  }`}
>
  Home
</button>

          {/* Dynamic Categories */}
        {categories.map((cat) => (
  <button
    key={cat._id}
    onClick={() => navigate(`/${cat.slug}`)}
    className={`flex-1 text-center text-sm font-medium transition-colors cursor-pointer ${
      location.pathname === `/${cat.slug}`
        ? "text-indigo-600"
        : "text-gray-700 hover:text-indigo-600"
    }`}
  >
    {cat.name}
  </button>
))}

          {/* Static */}
          <button
            onClick={() => navigate("/about")}
            className={`flex-1 text-center text-sm font-medium transition-colors cursor-pointer ${
              location.pathname === "/about"
                ? "text-indigo-600"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => navigate("/contact")}
            className={`flex-1 text-center text-sm font-medium transition-colors cursor-pointer ${
              location.pathname === "/contact"
                ? "text-indigo-600"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            Contact
          </button>

        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
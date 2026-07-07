import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/productService";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data || []);
    };

    fetchCategories();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-80 h-screen bg-white z-50 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 font-bold">Menu</div>

      {categories.map((cat) => (
        <div
          key={cat._id}
          className="px-4 py-3 border-b cursor-pointer"
          onClick={() => {
            navigate(`/category/${cat.slug}`);
            setIsOpen(false);
          }}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default MobileMenu;
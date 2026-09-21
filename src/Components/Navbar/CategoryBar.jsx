import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineNewspaper,
  HiOutlineInformationCircle,
  HiOutlinePhone,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaPinterest,
  FaFacebookF,
  FaWhatsapp,
  FaChevronRight,
} from "react-icons/fa";
import API from "../../api/axios";

const DEFAULT_CATEGORIES = [
  { name: "God Statues", path: "/god-statues", icon: <HiOutlineShoppingBag /> },
  { name: "Shivling", path: "/shivling", icon: <HiOutlineShoppingBag /> },
  { name: "Shree Yantra", path: "/shree-yantra", icon: <HiOutlineShoppingBag /> },
  { name: "Angel", path: "/angel", icon: <HiOutlineShoppingBag /> },
  { name: "Crystal Statues", path: "/crystal-statues", icon: <HiOutlineShoppingBag /> },
  { name: "Diya", path: "/diya", icon: <HiOutlineShoppingBag /> },
];

const CategoryBar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const staticMenu = [
    {
      name: "Home",
      path: "/",
      icon: <HiOutlineHome />,
    },
    {
      name: "Shop",
      path: "/shop",
      icon: <HiOutlineShoppingBag />,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <HiOutlineNewspaper />,
    },
    {
      name: "About",
      path: "/about",
      icon: <HiOutlineInformationCircle />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <HiOutlinePhone />,
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      const data = (res.data.categories || []).map((cat) => ({
        name: cat.name,
        path: `/${cat.slug}`,
        icon: <HiOutlineShoppingBag />,
      }));
      setCategories(data);
    } catch (err) {
      console.log("Category Error:", err);
    }
  };

  const allMenu = [
    ...staticMenu.slice(0, 2),
    ...categories,
    ...staticMenu.slice(2),
  ];

  return (
    <>
      {/* ================= PC NAVBAR ================= */}
      <div className="hidden lg:block w-full bg-white border-b border-gray-200">
        <div className="w-full px-4">
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {allMenu.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex-1 text-center cursor-pointer py-3 text-sm font-medium whitespace-nowrap transition
                  ${
                    location.pathname === item.path
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-700 hover:text-indigo-600"
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE SIDE DRAWER (Triggered by 3-dots in TopBar) ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center">
                <img
                  src="/logo.jpeg"
                  alt="Crystal Jaipuria - Handcrafted Gemstone Statues & Crystal Manufacturer Jaipur"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition text-sm cursor-pointer shadow-2xs"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Main Pages */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Navigation
                </p>
                <div className="space-y-1">
                  {staticMenu.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium transition cursor-pointer
                        ${
                          location.pathname === item.path
                            ? "bg-indigo-50 text-indigo-600 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }
                      `}
                    >
                      <span className="text-base text-amber-500">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Collections / Categories */}
              {categories.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Handcrafted Collections
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.path}
                        onClick={() => {
                          navigate(cat.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`
                          flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left text-sm transition cursor-pointer
                          ${
                            location.pathname === cat.path
                              ? "bg-indigo-50 text-indigo-600 font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }
                        `}
                      >
                        <FaChevronRight className="text-[11px] text-slate-400" />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media & Contact */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Follow &amp; Contact
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <a
                    href="https://www.instagram.com/crystal_jaipuria/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-pink-100 transition"
                  >
                    <FaInstagram className="text-sm text-pink-600" />
                    <span>Insta</span>
                  </a>
                  <a
                    href="https://in.pinterest.com/jaipuriacrystal/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-100 transition"
                  >
                    <FaPinterest className="text-sm text-[#E60023]" />
                    <span>Pinterest</span>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61565599797453"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition"
                  >
                    <FaFacebookF className="text-sm text-blue-600" />
                    <span>Facebook</span>
                  </a>
                </div>

                <a
                  href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition shadow-2xs"
                >
                  <FaWhatsapp className="text-base" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE STATIC BOTTOM NAVBAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-md z-40 md:hidden">
        <div className="flex justify-around items-center py-2 px-1">
          {staticMenu.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex-1 flex flex-col items-center justify-center text-[11px] gap-1 cursor-pointer transition py-0.5
                ${
                  location.pathname === item.path
                    ? "text-indigo-600 font-bold"
                    : "text-slate-700 hover:text-indigo-600 font-medium"
                }
              `}
            >
              <span className="text-[22px] stroke-[1.75]">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryBar;
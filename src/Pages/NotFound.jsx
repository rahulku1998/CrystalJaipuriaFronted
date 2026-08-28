import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingBag, FaWhatsapp, FaGem, FaSearch } from "react-icons/fa";
import SEO from "../Components/SEO";

const NotFound = () => {
  const quickLinks = [
    { name: "Gemstone Shivling", path: "/shivling", icon: "🕉️" },
    { name: "God Statues", path: "/god-statues", icon: "🪔" },
    { name: "Crystal Shree Yantra", path: "/shree-yantra", icon: "🔺" },
    { name: "Amethyst Angels", path: "/angel", icon: "👼" },
    { name: "Handcrafted Diyas", path: "/diya", icon: "✨" },
    { name: "All Products", path: "/shop", icon: "💎" },
  ];

  return (
    <>
      <SEO
        title="404 - Page Not Found | Crystal Jaipuria"
        description="The page you are looking for does not exist. Explore authentic handcrafted gemstone statues, Shivlings, Shree Yantra, and crystal spiritual decor from Crystal Jaipuria."
        canonical="https://www.crystaljaipuria.com/404"
        image="https://www.crystaljaipuria.com/logo.png"
      />

      <div className="min-h-[85vh] bg-gradient-to-b from-[#fdfbf7] via-[#faf5eb] to-[#f5ede0] flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-100/60">
          
          {/* Gemstone Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <FaGem className="text-indigo-600 animate-pulse text-xs" />
            <span>Crystal Jaipuria • Jaipur Art & Craft</span>
          </div>

          {/* 404 Large Gradient Text */}
          <div className="relative my-2">
            <h1 className="text-7xl sm:text-9xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-700 to-amber-600 bg-clip-text text-transparent tracking-tight select-none">
              404
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-indigo-500 to-amber-500 pointer-events-none" />
          </div>

          {/* Heading & Subtext */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Sacred Piece or Page Not Found
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            The gemstone statue or page you are looking for may have been moved, renamed, or is currently unavailable. Let's get you back to our divine collection!
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base active:scale-95"
            >
              <FaHome className="text-base" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base active:scale-95"
            >
              <FaShoppingBag className="text-base" />
              <span>Explore All Shop</span>
            </Link>

            <a
              href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20was%20looking%20for%20a%20product%20on%20your%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base active:scale-95"
            >
              <FaWhatsapp className="text-lg" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Quick Categories Navigation */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Popular Gemstone Categories
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 text-gray-700 hover:text-indigo-700 text-xs sm:text-sm font-medium transition-colors duration-150"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default NotFound;
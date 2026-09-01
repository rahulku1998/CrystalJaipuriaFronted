import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingBag, FaShieldAlt } from "react-icons/fa";
import SEO from "../Components/SEO";

const SpamRemoved = () => {
  return (
    <>
      <SEO
        title="410 Gone - Page Permanently Removed | Crystal Jaipuria"
        description="This obsolete legacy URL has been permanently removed. Explore authentic certified gemstone statues, Shivlings & spiritual decor at Crystal Jaipuria."
        robots="noindex, nofollow, noarchive"
      />

      <div className="min-h-[80vh] bg-gradient-to-b from-[#fdfbf7] via-[#faf5eb] to-[#f5ede0] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-red-100">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold mb-6">
            <FaShieldAlt className="text-red-600 text-xs" />
            <span>Legacy URL Purged &amp; De-Indexed</span>
          </div>

          <div className="relative my-2">
            <h1 className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent tracking-tight">
              410
            </h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Page Permanently Removed
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            The requested legacy URL belongs to an obsolete catalog and has been permanently purged from Crystal Jaipuria. Please explore our authentic handcrafted gemstone collection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <FaHome className="text-base" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition shadow-md shadow-amber-500/20 active:scale-95"
            >
              <FaShoppingBag className="text-base" />
              <span>Explore Official Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpamRemoved;

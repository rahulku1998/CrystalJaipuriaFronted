import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSearch,
  FaRegHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        {/* ================= Left ================= */}

        <div className="flex items-center gap-4">

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition"
          >
            <FaInstagram />
          </a>

        </div>

        {/* ================= Center Logo ================= */}

        <div className="flex flex-col items-center cursor-pointer">

          {/* Replace with your logo image */}
          {/* <img src="/logo.png" className="h-14" alt="Logo" /> */}

          <h1 className="text-3xl font-bold tracking-widest text-indigo-600">
            Crystal Jaipuria 
          </h1>

          <p className="text-xs tracking-[5px] text-gray-500 uppercase">
            Luxury Collection of Handicrafts
          </p>

        </div>

        {/* ================= Right ================= */}

        <div className="flex items-center gap-6">

          {/* Search */}

          <button className="text-gray-700 hover:text-indigo-600 transition text-xl">
            <FaSearch />
          </button>

          {/* Profile */}

      

          {/* Wishlist */}

          

          {/* Cart */}

          

        </div>

      </div>
    </div>
  );
};

export default TopBar;
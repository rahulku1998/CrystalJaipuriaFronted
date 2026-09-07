import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { trackSearch, trackSocialClick } from "../../utils/analytics";

const TopBar = ({ onOpenMenu }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      trackSearch(search.trim());
      navigate(`/shop?search=${search}`);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-xs">
      <div
        className="
        max-w-7xl mx-auto
        px-3 sm:px-5 lg:px-8
        min-h-[64px]
        sm:min-h-[95px]
        lg:min-h-[120px]
        flex
        items-center
        justify-between
        "
      >
        {/* ================= Left: Hamburger Menu on Mobile, Social Icons on Desktop ================= */}
        <div className="flex items-center">
          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="
              sm:hidden
              w-8 h-8
              rounded-lg
              bg-slate-100
              hover:bg-slate-200
              text-slate-700
              flex
              items-center
              justify-center
              transition
              cursor-pointer
              border border-slate-200
              shadow-2xs
            "
          >
            <FaBars className="text-sm text-slate-700" />
          </button>

          {/* Desktop Social Icons */}
          <div className="
            hidden 
            sm:flex 
            items-center 
            gap-3
          ">
            <a
              href="https://www.facebook.com/profile.php?id=61565599797453"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Facebook profile"
              onClick={() => trackSocialClick("facebook")}
              className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              bg-indigo-600
              text-white
              flex
              items-center
              justify-center
              hover:bg-indigo-700
              transition shadow-2xs
              "
            >
              <FaFacebookF className="text-xs sm:text-sm"/>
            </a>

            <a
              href="https://www.instagram.com/crystal_jaipuria/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Instagram profile"
              onClick={() => trackSocialClick("instagram")}
              className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              bg-pink-500
              text-white
              flex
              items-center
              justify-center
              hover:bg-pink-600
              transition shadow-2xs
              "
            >
              <FaInstagram className="text-xs sm:text-sm"/>
            </a>
          </div>
        </div>

        {/* ================= Center Logo ================= */}
        <Link
          to="/"
          className="flex flex-col items-center cursor-pointer group"
        >
          <img
            src="/logo.jpeg"
            alt="Crystal Jaipuria - Handcrafted Gemstone Statues & Crystal Manufacturer Jaipur"
            className="
            h-8
            sm:h-12
            md:h-14
            lg:h-18
            w-auto
            object-contain
            group-hover:opacity-90
            transition
            "
          />

          <p
            className="
            block
            text-[7px]
            sm:text-[9px]
            md:text-xs
            font-semibold
            tracking-[1px]
            sm:tracking-[2px]
            md:tracking-[3px]
            text-indigo-600
            uppercase
            mt-0.5
            whitespace-nowrap
            "
          >
            Luxury Collection of Handicrafts
          </p>
        </Link>

        {/* ================= Right Search ================= */}
        <div className="flex items-center">
          {/* Mobile Search Button */}
          <button
            onClick={() => navigate("/shop")}
            aria-label="Search products"
            className="
            lg:hidden
            w-8 h-8
            rounded-lg
            bg-slate-100
            hover:bg-slate-200
            text-slate-700
            flex
            items-center
            justify-center
            transition
            cursor-pointer
            border border-slate-200
            shadow-2xs
            "
          >
            <FaSearch className="text-xs text-slate-700" />
          </button>

       {/* ================= Right Search ================= */}

        <div
          className="
          hidden
          lg:flex
          items-center
          w-[250px]
          "
        >
          <form
            onSubmit={handleSearch}
            className="
            flex
            items-center
            w-full
            relative
            "
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              px-4
              py-2.5
              pr-10
              rounded-full
              border
              border-gray-300
              text-sm
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              "
            />

            <button
              type="submit"
              aria-label="Submit search"
              className="
              absolute
              right-4
              text-gray-500
              cursor-pointer
              hover:text-indigo-600
              "
            >
              <FaSearch />
            </button>
          </form>
        </div>

        </div>

      </div>

    </div>
  );
};

export default TopBar;
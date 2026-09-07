import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
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
        min-h-[85px]
        sm:min-h-[110px]
        lg:min-h-[125px]
        flex
        items-center
        justify-between
        "
      >
        {/* ================= Left: 3-dot on Mobile, Social Icons on Desktop ================= */}
        <div className="flex items-center">
          {/* Mobile 3-dot Menu Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="
              sm:hidden
              w-9 h-9
              rounded-xl
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
            <BsThreeDotsVertical className="text-lg text-slate-700" />
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
            h-11
            sm:h-14
            md:h-16
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
            text-[8px]
            sm:text-[10px]
            md:text-xs
            font-semibold
            tracking-[1.5px]
            sm:tracking-[2px]
            md:tracking-[3px]
            text-indigo-600
            uppercase
            mt-1
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
            w-9 h-9
            rounded-xl
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
            <FaSearch className="text-sm text-slate-700" />
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
import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      {/* Top Features Strip (Subtle & Elegant, Not Overly Colorful) */}
      <div className="border-b border-stone-800 bg-stone-900/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/50">
              <span className="text-2xl text-amber-500">✨</span>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold text-sm sm:text-base">100% Authentic</h4>
                <p className="text-stone-400 text-xs sm:text-[13px] mt-0.5">Certified Pure Gemstones</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/50">
              <span className="text-2xl text-amber-500">🏛️</span>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold text-sm sm:text-base">Jaipur Heritage</h4>
                <p className="text-stone-400 text-xs sm:text-[13px] mt-0.5">Master Craftsmanship Since 1989</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/50">
              <span className="text-2xl text-amber-500">✈️</span>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold text-sm sm:text-base">Global Shipping</h4>
                <p className="text-stone-400 text-xs sm:text-[13px] mt-0.5">Safe Shockproof Doorstep Delivery</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/50">
              <span className="text-2xl text-amber-500">🤝</span>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold text-sm sm:text-base">Factory Direct</h4>
                <p className="text-stone-400 text-xs sm:text-[13px] mt-0.5">Wholesale &amp; Custom Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand & Logo (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-block bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-stone-300 hover:shadow-md transition"
            >
              <img
                src="/logo.png"
                alt="Crystal Jaipuria - Gemstone Statues & Crystal Manufacturer"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-stone-300 max-w-sm">
              Since 1989, Crystal Jaipuria is a trusted manufacturer, wholesaler, and exporter of certified natural gemstone idols, Sphatik Shivlings, and crystal carvings crafted in Jaipur, India.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Follow &amp; Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/crystal_jaipuria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-all shadow-sm hover:scale-105"
                  title="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61565599797453"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-all shadow-sm hover:scale-105"
                  title="Facebook"
                >
                  <FaFacebookF className="text-base" />
                </a>

                <a
                  href="https://wa.me/918306317032"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-green-400 hover:text-white hover:bg-green-600 flex items-center justify-center transition-all shadow-sm hover:scale-105"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                </a>

                <a
                  href="https://www.google.com/maps/place/Crystal+Jaipuria+%E2%80%93+Gemstone+God+Statues+%26+Crystal+Carvings+Manufacturer/@26.7981343,75.7772003,17z/data=!3m1!4b1!4m6!3m5!1s0x396dcb5b941638d5:0xdc6c82ae60c2c87d!8m2!3d26.7981295!4d75.7797752!16s%2Fg%2F11v_90xdgf?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Location"
                  className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-all shadow-sm hover:scale-105"
                  title="View on Google Maps"
                >
                  <FaMapMarkerAlt className="text-base" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wide border-b border-stone-700/80 pb-2.5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-[14px] sm:text-[15px]">
              <li>
                <Link
                  to="/"
                  className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <FaChevronRight className="text-[11px] text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <FaChevronRight className="text-[11px] text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <FaChevronRight className="text-[11px] text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <FaChevronRight className="text-[11px] text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  <span>Spiritual Blogs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <FaChevronRight className="text-[11px] text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Collections (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wide border-b border-stone-700/80 pb-2.5">
              Popular Collections
            </h3>
            <ul className="space-y-3 text-[14px] sm:text-[15px] text-stone-300">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-amber-500 text-xs">◆</span>
                  <span>Natural Sphatik Shivling</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-amber-500 text-xs">◆</span>
                  <span>Green Jade Shiva &amp; Ganesha</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-amber-500 text-xs">◆</span>
                  <span>Rose Quartz Divine Statues</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-amber-500 text-xs">◆</span>
                  <span>Ruby &amp; Amethyst Shree Yantras</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-amber-500 text-xs">◆</span>
                  <span>Lapis Lazuli &amp; Blue Sapphire Idols</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Store & Direct Contact Info (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wide border-b border-stone-700/80 pb-2.5">
              Store &amp; Contact Info
            </h3>

            <div className="space-y-3.5 text-[14px] sm:text-[15px] text-stone-300">
              {/* Address */}
              <a
                href="https://www.google.com/maps/place/Crystal+Jaipuria+%E2%80%93+Gemstone+God+Statues+%26+Crystal+Carvings+Manufacturer/@26.7981343,75.7772003,17z/data=!3m1!4b1!4m6!3m5!1s0x396dcb5b941638d5:0xdc6c82ae60c2c87d!8m2!3d26.7981295!4d75.7797752!16s%2Fg%2F11v_90xdgf?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-amber-300 transition group"
              >
                <FaMapMarkerAlt className="text-amber-500 mt-1 text-base shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed text-stone-300">
                  Bajni Talai, Plot No. 03 West Part, Prabha, Mangal Vihar, Sanganer, Jaipur, Rajasthan - 302029
                </span>
              </a>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-amber-500 mt-1 text-sm shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919828723652" className="hover:text-amber-300 transition font-medium">
                    +91 98287 23652
                  </a>
                  <a href="tel:+918955613237" className="hover:text-amber-300 transition font-medium">
                    +91 89556 13237
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20enquiry%20regarding%20your%20gemstones."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-300 transition"
              >
                <FaWhatsapp className="text-green-400 text-base shrink-0" />
                <span className="font-semibold text-green-400">+91 83063 17032 (WhatsApp)</span>
              </a>

              {/* Email */}
              <a
                href="mailto:crystaljaipurya@gmail.com"
                className="flex items-center gap-3 hover:text-amber-300 transition"
              >
                <FaEnvelope className="text-amber-500 text-sm shrink-0" />
                <span className="truncate">crystaljaipurya@gmail.com</span>
              </a>

              {/* Timings */}
              <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-400 pt-1.5 border-t border-stone-800">
                <FaClock className="text-amber-500 shrink-0" />
                <span>Mon - Sat: 8:00 AM - 7:30 PM (Sun Open)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-stone-400 gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-stone-200 font-semibold">Crystal Jaipuria</strong>. All Rights Reserved. (Est. 1989 in Jaipur, India)
          </p>

          <p className="text-center sm:text-right">
            Designed &amp; Developed with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://www.codewithrahulkumawat.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold hover:underline transition"
            >
              Rahul Kumawat
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
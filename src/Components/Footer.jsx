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
    <footer className="bg-[#eef3fb] text-slate-700 mt-20 border-t border-slate-200">
      {/* Top Features Strip (Clean Light Accent) */}
      <div className="border-b border-slate-200 bg-[#e4ebf7]/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-2xs">
              <span className="text-2xl text-amber-500">✨</span>
              <div className="text-center sm:text-left">
                <h4 className="text-slate-900 font-bold text-sm sm:text-base">100% Authentic</h4>
                <p className="text-slate-600 text-xs sm:text-[13px] mt-0.5">Certified Pure Gemstones</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-2xs">
              <span className="text-2xl text-indigo-600">🏛️</span>
              <div className="text-center sm:text-left">
                <h4 className="text-slate-900 font-bold text-sm sm:text-base">Jaipur Heritage</h4>
                <p className="text-slate-600 text-xs sm:text-[13px] mt-0.5">Master Craftsmanship Since 1989</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-2xs">
              <span className="text-2xl text-emerald-600">✈️</span>
              <div className="text-center sm:text-left">
                <h4 className="text-slate-900 font-bold text-sm sm:text-base">Global Shipping</h4>
                <p className="text-slate-600 text-xs sm:text-[13px] mt-0.5">Safe Shockproof Delivery</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-2xs">
              <span className="text-2xl text-amber-600">🤝</span>
              <div className="text-center sm:text-left">
                <h4 className="text-slate-900 font-bold text-sm sm:text-base">Factory Direct</h4>
                <p className="text-slate-600 text-xs sm:text-[13px] mt-0.5">Wholesale &amp; Custom Orders</p>
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
              className="inline-block hover:opacity-90 transition"
            >
              <img
                src="/logo.png"
                alt="Crystal Jaipuria - Gemstone Statues & Crystal Manufacturer"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-600 max-w-sm">
              Since 1989, Crystal Jaipuria is a trusted manufacturer, wholesaler, and exporter of certified natural gemstone idols, Sphatik Shivlings, and crystal carvings crafted in Jaipur, India.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Follow &amp; Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/crystal_jaipuria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-pink-600 hover:border-pink-600 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61565599797453"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="Facebook"
                >
                  <FaFacebookF className="text-base" />
                </a>

                <a
                  href="https://wa.me/918306317032"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-green-600 hover:text-white hover:bg-green-600 hover:border-green-600 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                </a>

                <a
                  href="https://www.google.com/maps/place/Crystal+Jaipuria+%E2%80%93+Gemstone+God+Statues+%26+Crystal+Carvings+Manufacturer/@26.7981343,75.7772003,17z/data=!3m1!4b1!4m6!3m5!1s0x396dcb5b941638d5:0xdc6c82ae60c2c87d!8m2!3d26.7981295!4d75.7797752!16s%2Fg%2F11v_90xdgf?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Location"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="View on Google Maps"
                >
                  <FaMapMarkerAlt className="text-base" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-slate-900 font-bold text-base sm:text-lg tracking-wide border-b border-slate-300 pb-2.5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-[14px] sm:text-[15px]">
              <li>
                <Link
                  to="/"
                  className="text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group font-medium"
                >
                  <FaChevronRight className="text-[11px] text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group font-medium"
                >
                  <FaChevronRight className="text-[11px] text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group font-medium"
                >
                  <FaChevronRight className="text-[11px] text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group font-medium"
                >
                  <FaChevronRight className="text-[11px] text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  <span>Spiritual Blogs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group font-medium"
                >
                  <FaChevronRight className="text-[11px] text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Collections (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-slate-900 font-bold text-base sm:text-lg tracking-wide border-b border-slate-300 pb-2.5">
              Popular Collections
            </h3>
            <ul className="space-y-3 text-[14px] sm:text-[15px] text-slate-700">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <span className="text-amber-500 text-xs">◆</span>
                  <span>Natural Sphatik Shivling</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <span className="text-emerald-600 text-xs">◆</span>
                  <span>Green Jade Shiva &amp; Ganesha</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <span className="text-pink-600 text-xs">◆</span>
                  <span>Rose Quartz Divine Statues</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <span className="text-red-500 text-xs">◆</span>
                  <span>Ruby &amp; Amethyst Shree Yantras</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <span className="text-blue-600 text-xs">◆</span>
                  <span>Lapis Lazuli &amp; Sapphire Idols</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Store & Direct Contact Info (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-slate-900 font-bold text-base sm:text-lg tracking-wide border-b border-slate-300 pb-2.5">
              Store &amp; Contact Info
            </h3>

            <div className="space-y-3.5 text-[14px] sm:text-[15px] text-slate-700">
              {/* Address */}
              <a
                href="https://www.google.com/maps/place/Crystal+Jaipuria+%E2%80%93+Gemstone+God+Statues+%26+Crystal+Carvings+Manufacturer/@26.7981343,75.7772003,17z/data=!3m1!4b1!4m6!3m5!1s0x396dcb5b941638d5:0xdc6c82ae60c2c87d!8m2!3d26.7981295!4d75.7797752!16s%2Fg%2F11v_90xdgf?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-indigo-600 transition group"
              >
                <FaMapMarkerAlt className="text-indigo-600 mt-1 text-base shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed text-slate-700">
                  Bajni Talai, Plot No. 03 West Part, Prabha, Mangal Vihar, Sanganer, Jaipur, Rajasthan - 302029
                </span>
              </a>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-indigo-600 mt-1 text-sm shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919828723652" className="hover:text-indigo-600 transition font-semibold text-slate-800">
                    +91 98287 23652
                  </a>
                  <a href="tel:+918955613237" className="hover:text-indigo-600 transition font-semibold text-slate-800">
                    +91 89556 13237
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20enquiry%20regarding%20your%20gemstones."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-600 transition"
              >
                <FaWhatsapp className="text-green-600 text-base shrink-0" />
                <span className="font-bold text-green-700">+91 83063 17032 (WhatsApp)</span>
              </a>

              {/* Email */}
              <a
                href="mailto:crystaljaipurya@gmail.com"
                className="flex items-center gap-3 hover:text-indigo-600 transition"
              >
                <FaEnvelope className="text-indigo-600 text-sm shrink-0" />
                <span className="truncate text-slate-700 font-medium">crystaljaipurya@gmail.com</span>
              </a>

              {/* Timings */}
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 pt-1.5 border-t border-slate-300">
                <FaClock className="text-amber-600 shrink-0" />
                <span>Mon - Sat: 8:00 AM - 7:30 PM (Sun Open)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-300 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-slate-500 gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-slate-800 font-bold">Crystal Jaipuria</strong>. All Rights Reserved. (Jaipur, India)
          </p>

          <p className="text-center sm:text-right">
            Designed &amp; Developed with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://www.codewithrahulkumawat.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline transition"
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
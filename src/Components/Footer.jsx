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
  FaGem,
  FaShieldAlt,
  FaGlobeAmericas,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-stone-950 via-zinc-950 to-black text-gray-300 mt-20 border-t border-zinc-800/80">
      {/* Top Features Strip */}
      <div className="border-b border-zinc-800/60 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/50">
              <span className="text-2xl text-amber-400">✨</span>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm">100% Authentic</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">Certified Natural Gemstones</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/50">
              <span className="text-2xl text-indigo-400">🏛️</span>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm">Jaipur Heritage</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">Master Artisans Since 1989</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/50">
              <span className="text-2xl text-emerald-400">📦</span>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm">Worldwide Export</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">Safe Shockproof Delivery</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/50">
              <span className="text-2xl text-purple-400">🤝</span>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm">Wholesale & Custom</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">Direct Factory Pricing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Legacy (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block hover:opacity-95 transition">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Crystal <span className="bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">Jaipuria</span>
                </h2>
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <FaGem className="text-[11px] text-amber-400" />
              <span>Jaipur Gemstone Manufacturer (Est. 1989)</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Premier manufacturer, wholesaler &amp; global exporter of handcrafted gemstone god statues, natural Sphatik Shivlings, crystal deity idols, and healing gemstones from Jaipur, India.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/crystal_jaipuria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <FaInstagram className="text-lg" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61565599797453"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-white hover:bg-blue-600 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <FaFacebookF className="text-base" />
                </a>

                <a
                  href="https://wa.me/918306317032"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-white hover:bg-green-600 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <FaWhatsapp className="text-lg" />
                </a>

                <a
                  href="https://www.google.com/maps/place/Crystal+Jaipuria+%E2%80%93+Gemstone+God+Statues+%26+Crystal+Carvings+Manufacturer/@26.7981343,75.7772003,17z/data=!3m1!4b1!4m6!3m5!1s0x396dcb5b941638d5:0xdc6c82ae60c2c87d!8m2!3d26.7981295!4d75.7797752!16s%2Fg%2F11v_90xdgf?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Location"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-white hover:bg-indigo-600 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="View on Google Maps"
                >
                  <FaMapMarkerAlt className="text-base" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide border-b border-zinc-800 pb-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                >
                  <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                >
                  <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                >
                  <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  <span>About Our Legacy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                >
                  <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  <span>Spiritual Blogs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                >
                  <FaChevronRight className="text-[10px] text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  <span>Contact &amp; Enquiry</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Collections (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide border-b border-zinc-800 pb-2.5">
              Popular Collections
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-amber-400 text-xs">◆</span>
                  <span>Natural Sphatik Shivling</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-emerald-400 text-xs">◆</span>
                  <span>Green Jade Ganesha &amp; Shiva</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-pink-400 text-xs">◆</span>
                  <span>Rose Quartz Love Swans &amp; Idols</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-red-400 text-xs">◆</span>
                  <span>Ruby &amp; Amethyst Shree Yantras</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-blue-400 text-xs">◆</span>
                  <span>Lapis Lazuli &amp; Blue Sapphire Statues</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Store & Direct Contacts (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide border-b border-zinc-800 pb-2.5">
              Store &amp; Contact Info
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-400">
              {/* Address */}
              <a
                href="https://www.google.com/maps/place/Crystal+Jaipuria+%E2%80%93+Gemstone+God+Statues+%26+Crystal+Carvings+Manufacturer/@26.7981343,75.7772003,17z/data=!3m1!4b1!4m6!3m5!1s0x396dcb5b941638d5:0xdc6c82ae60c2c87d!8m2!3d26.7981295!4d75.7797752!16s%2Fg%2F11v_90xdgf?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-indigo-300 transition group"
              >
                <FaMapMarkerAlt className="text-indigo-400 mt-1 text-base shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  Bajni Talai, Plot No. 03 West Part, Prabha, Mangal Vihar, Sanganer, Jaipur, Rajasthan - 302029
                </span>
              </a>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-indigo-400 mt-1 text-sm shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919828723652" className="hover:text-indigo-300 transition font-medium">
                    +91 98287 23652
                  </a>
                  <a href="tel:+918955613237" className="hover:text-indigo-300 transition font-medium">
                    +91 89556 13237
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20enquiry%20regarding%20your%20gemstones."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <FaWhatsapp className="text-green-500 text-base shrink-0" />
                <span className="font-semibold text-green-400">+91 83063 17032 (WhatsApp)</span>
              </a>

              {/* Email */}
              <a
                href="mailto:crystaljaipurya@gmail.com"
                className="flex items-center gap-3 hover:text-indigo-300 transition"
              >
                <FaEnvelope className="text-indigo-400 text-sm shrink-0" />
                <span className="truncate">crystaljaipurya@gmail.com</span>
              </a>

              {/* Timings */}
              <div className="flex items-center gap-3 text-xs text-gray-500 pt-1 border-t border-zinc-800/60">
                <FaClock className="text-amber-400 shrink-0" />
                <span>Mon - Sat: 8:00 AM - 7:30 PM (Sun Open)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-zinc-800/80 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-gray-400">Crystal Jaipuria</strong>. All Rights Reserved. (Est. 1989 in Jaipur, India)
          </p>

          <p className="text-center sm:text-right">
            Designed &amp; Developed with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://www.codewithrahulkumawat.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline transition"
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
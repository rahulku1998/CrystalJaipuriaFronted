import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-gray-300 mt-20 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-5">
              Crystal <span className="text-indigo-500">Jaipuria</span>
            </h2>

            <p className="text-sm leading-7 text-gray-400">
              Since 1999, Crystal Jaipuria has been delivering premium quality
              gemstones, crystal idols, bracelets, spiritual products, and
              handcrafted collections across India.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-indigo-600 flex items-center justify-center duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-indigo-600 flex items-center justify-center duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://wa.me/919828723652"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-green-500 flex items-center justify-center duration-300"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-400 duration-300 hover:translate-x-2 inline-block"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-400 duration-300 hover:translate-x-2 inline-block"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/god-statues"
                  className="hover:text-indigo-400 duration-300 hover:translate-x-2 inline-block"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-400 duration-300 hover:translate-x-2 inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Store */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Store Information
            </h3>

            <div className="space-y-4 text-sm">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 hover:text-indigo-400 duration-300"
              >
                <FaMapMarkerAlt className="mt-1 text-indigo-500" />
                <span>
                  Malpura Gate, Hanuman Nagar,
                  <br />
                  Kishan Colony,
                  <br />
                  Sanganer, Jaipur,
                  <br />
                  Rajasthan - 302029
                </span>
              </a>

              <a
                href="mailto:crystaljaipurya@gmail.com"
                className="flex gap-3 hover:text-indigo-400 duration-300"
              >
                <FaEnvelope className="mt-1 text-indigo-500" />
                crystaljaipurya@gmail.com
              </a>
<a
  href="https://wa.me/919828723652"
  target="_blank"
  rel="noopener noreferrer"
  className="flex gap-3 hover:text-indigo-600 duration-300"
>
  <FaWhatsapp className="mt-1 text-green-600" />
  +918955613237
</a>
              <p className="text-gray-400">
                Monday - Saturday
                <br />
                8:00 AM - 5:00 PM
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">
              <a
                href="tel:+919828723652"
                className="flex items-center gap-3 hover:text-indigo-400 duration-300"
              >
                <FaPhoneAlt className="text-indigo-500" />
                +91 98287 23652
              </a>

              <a
                href="tel:+918955613237"
                className="flex items-center gap-3 hover:text-indigo-400 duration-300"
              >
                <FaPhoneAlt className="text-indigo-500" />
                +91 89556 13237
              </a>

              <Link
                to="/contact"
                className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-lg text-white font-medium duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>
            © {new Date().getFullYear()} Crystal Jaipuria. All Rights Reserved.
          </p>

          <p>
            Designed & Developed by{" "}

            <a
    href="https://www.codewithrahulkumawat.com/contact"
    target="_blank"
    rel="noopener noreferrer"
    className="text-indigo-400 hover:underline"
  >
     <span className="text-indigo-400 font-medium">
              Rahul Kumawat
            </span>
  </a>
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
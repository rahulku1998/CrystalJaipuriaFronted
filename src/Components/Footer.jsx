import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ================= About ================= */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4 ">
              <span className="text-indigo-600">Crystal Jaipuria</span>
            </h2>

            <p className="text-sm leading-6">
              Founded in 1999, Crystal Jaipuria has grown into a premier name
              in the gemstone and handicraft industry.
            </p>
          </div>

          {/* ================= Store Info ================= */}
          <div>
            <h3 className="text-white font-semibold mb-4">
             <span className="text-indigo-600">Store Location</span>
            </h3>

            <p className="text-sm flex gap-2 mb-3">
              <FaMapMarkerAlt className="mt-1 text-indigo-400" />
              Office: Malpura gate, Hanuman Nagar, Kishan Colony,
              Sanganer, Jaipur, Rajasthan 302029
            </p>

            <p className="text-sm flex gap-2 mb-3">
              <FaEnvelope className="mt-1 text-indigo-400" />
              crystaljaipurya@gmail.com
            </p>

            <p className="text-sm">
              Monday – Saturday: 8am – 5pm <br />
              
            </p>
          </div>

          {/* ================= Useful Links ================= */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              <span className="text-indigo-600">Useful Links</span>
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 cursor-pointer">Home</li>
              <li className="hover:text-indigo-400 cursor-pointer">About Us</li>
              <li className="hover:text-indigo-400 cursor-pointer">Our Blog</li>
              <li className="hover:text-indigo-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-indigo-400 cursor-pointer">Shop</li>
            </ul>
          </div>

          {/* ================= Contact ================= */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              <span className="text-indigo-600">Call Us 24/7</span>
            </h3>

            <div className="space-y-3 text-sm">

              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-indigo-400" />
                +91-9828723652
              </p>

              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-indigo-400" />
                +91-8955613237
              </p>

            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Crystal Jaipuria. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;
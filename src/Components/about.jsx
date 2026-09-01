import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const AboutGemstoneSection = () => {
  return (
    <section className="relative overflow-hidden bg-stone-50/60 py-10 sm:py-14 lg:py-16 border-b border-stone-200/80">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">

          {/* LEFT: SQUARE IMAGE SHOWCASE (Span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-white p-2 shadow-lg group">
              <img
                src="/Gemstone.webp"
                loading="lazy"
                decoding="async"
                alt="Handcrafted gemstone statues and crystal carvings manufacturer in Jaipur"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-103"
              />

              {/* Top Right Floating Badge */}
              <div className="absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 border border-stone-200 shadow-sm flex items-center gap-1.5">
                <span className="text-amber-500 text-xs">✨</span>
                <span className="text-[11px] font-bold text-stone-800">Est. 1989 • Jaipur</span>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-stone-200 bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-md flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 text-sm">🏆</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Jaipur Craftsmanship
                    </p>
                    <p className="text-xs font-bold text-stone-900">
                      100% Handcrafted • Export Ready
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Certified
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT (Span 7) - Perfectly Leveled with Square Image */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                Crystal Jaipuria — Jaipur Heritage
              </span>
            </div>

            {/* Heading (Optimized font size) */}
            <h2 className="text-xl sm:text-2xl lg:text-[25px] font-bold tracking-tight text-stone-900 leading-tight">
              Handcrafted Gemstone Statues &amp; Crystal Carvings{" "}
              <span className="text-indigo-600 block mt-0.5">
                Manufacturer in Jaipur, India
              </span>
            </h2>

            {/* Crisp Summary Text */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              <strong>Crystal Jaipuria</strong> is a leading Jaipur-based manufacturer, wholesaler, and global exporter of certified natural gemstone idols, Sphatik Shivlings, and crystal sculptures crafted with authentic Vedic Shilpa Shastra precision.
            </p>

            {/* 3 Key Feature Bullets */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  💎
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900">
                    100% Certified Pure Natural Gemstones
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Natural Sphatik (Quartz), Green Jade, Rose Quartz, Ruby, Amethyst, Lapis Lazuli &amp; Black Agate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  🕉️
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900">
                    Sacred Deities &amp; Custom Artistic Sculptures
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Hand-carved Shivlings, Ganesha, Shiva, Krishna, Lakshmi, Buddha &amp; bespoke custom sculptures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✈️
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900">
                    Wholesale Factory Direct &amp; Global Doorstep Export
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Serving stores, interior designers, temples &amp; collectors across India, USA, UK, Europe &amp; UAE.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="rounded-xl border border-stone-200 bg-white p-2 text-center shadow-2xs">
                <p className="text-base font-extrabold text-indigo-600">100%</p>
                <p className="text-[10px] font-semibold text-stone-500">Handcrafted</p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-2 text-center shadow-2xs">
                <p className="text-base font-extrabold text-indigo-600">35+ Yrs</p>
                <p className="text-[10px] font-semibold text-stone-500">Legacy (1989)</p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-2 text-center shadow-2xs">
                <p className="text-base font-extrabold text-indigo-600">Factory</p>
                <p className="text-[10px] font-semibold text-stone-500">Direct Pricing</p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-2 text-center shadow-2xs">
                <p className="text-base font-extrabold text-indigo-600">Global</p>
                <p className="text-[10px] font-semibold text-stone-500">Safe Delivery</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>🛍️ Explore Products</span>
              </Link>

              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20am%20interested%20in%20your%20handcrafted%20gemstone%20statues."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutGemstoneSection;
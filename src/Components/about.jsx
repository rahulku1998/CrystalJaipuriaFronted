import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaGem, FaCheckCircle, FaGlobeAsia, FaAward } from "react-icons/fa";

const AboutGemstoneSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf9f6] via-white to-[#faf9f6] py-14 sm:py-18 lg:py-24 border-b border-stone-200/70">
      {/* Subtle Ambient Decorative Glows */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* LEFT: LUXURY IMAGE SHOWCASE (Span 5) */}
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-2.5 shadow-2xl shadow-stone-900/10 group">
              <img
                src="/Gemstone.webp"
                loading="lazy"
                decoding="async"
                alt="Handcrafted gemstone statues and crystal carvings manufacturer in Jaipur"
                className="h-[320px] w-full rounded-2xl object-cover sm:h-[420px] lg:h-[520px] transition-transform duration-700 group-hover:scale-102"
              />

              {/* Bottom Subtle Gradient */}
              <div className="absolute inset-x-2.5 bottom-2.5 h-36 rounded-b-2xl bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Top Right Floating Badge */}
              <div className="absolute top-5 right-5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 border border-stone-200 shadow-md flex items-center gap-1.5">
                <span className="text-amber-500 text-xs">✨</span>
                <span className="text-xs font-bold text-stone-900">Est. 1989 • Jaipur</span>
              </div>

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  Authentic Vedic Craftsmanship
                </p>
                <p className="text-sm sm:text-base font-bold drop-shadow-md mt-0.5">
                  Natural Sphatik, Jade &amp; Gemstone Idols
                </p>
              </div>
            </div>

            {/* Bottom Floating Pill Badge */}
            <div className="absolute -bottom-5 left-6 right-6 sm:left-10 sm:right-10 rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-lg px-4 py-3 shadow-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
                  🏆
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Jaipur Craftsmanship
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-900">
                    100% Handcrafted • Export Ready
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ✓ Certified
              </span>
            </div>
          </div>

          {/* RIGHT: CONTENT & HIGHLIGHTS (Span 7) */}
          <div className="lg:col-span-7 lg:pl-4 mt-6 lg:mt-0 space-y-6">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-800">
                Crystal Jaipuria — Jaipur Heritage
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 leading-snug">
              Handcrafted Gemstone Statues &amp; Crystal Carvings{" "}
              <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent block mt-1.5">
                Manufacturer in Jaipur, India
              </span>
            </h1>

            {/* Introductory Lead Text */}
            <p className="text-sm sm:text-base leading-relaxed text-stone-600">
              <strong>Crystal Jaipuria</strong> is a leading manufacturer, wholesaler, and global exporter of certified natural gemstone idols, crystal carvings, and spiritual sculptures. Crafted in Jaipur by master artisans using authentic Vedic Shilpa Shastra traditions, our pieces grace temples, meditation spaces, and luxury homes worldwide.
            </p>

            {/* 3 Key Feature Bullets with Visual Accents */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-stone-200/70 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  💎
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    100% Certified Pure Natural Gemstones
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    Specializing in Natural Sphatik (Quartz), Green Jade, Rose Quartz, Ruby, Amethyst, Lapis Lazuli, Pyrite, and Black Agate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-stone-200/70 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  🕉️
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    Sacred Deities &amp; Custom Artistic Sculptures
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    Exquisite hand-carved Shivlings, Ganesha, Shiva, Krishna, Lakshmi, Buddha, Shree Yantras, and bespoke custom collector figurines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-stone-200/70 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  ✈️
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    Wholesale Factory Direct &amp; Global Doorstep Export
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    Serving spiritual stores, interior designers, temples, and collectors across India, USA, UK, Europe, Australia, and UAE.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center shadow-xs">
                <p className="text-lg sm:text-xl font-extrabold text-indigo-700">100%</p>
                <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Handcrafted</p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center shadow-xs">
                <p className="text-lg sm:text-xl font-extrabold text-indigo-700">35+ Yrs</p>
                <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Legacy (1989)</p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center shadow-xs">
                <p className="text-lg sm:text-xl font-extrabold text-indigo-700">Factory</p>
                <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Direct Pricing</p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center shadow-xs">
                <p className="text-lg sm:text-xl font-extrabold text-indigo-700">Global</p>
                <p className="text-[11px] font-semibold text-stone-600 mt-0.5">Safe Delivery</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-95"
              >
                <span>🛍️ Explore Products</span>
              </Link>

              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20am%20interested%20in%20your%20handcrafted%20gemstone%20statues."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-95"
              >
                <FaWhatsapp className="text-lg" />
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
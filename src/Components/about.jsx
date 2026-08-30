import React from "react";

const AboutGemstoneSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-12 sm:py-16 lg:py-20">
      {/* Decorative Background */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-stone-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">

          {/* IMAGE */}
          <div className="relative order-1">
            <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
              <img
                src="/Gemstone.webp"
                loading="lazy"
                decoding="async"
                alt="Handcrafted gemstone statues and crystal carvings"
                className="h-[280px] w-full rounded-xl object-cover sm:h-[360px] lg:h-[470px]"
              />

              <div className="absolute inset-x-2 bottom-2 h-28 rounded-b-xl bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Premium Badge */}
            <div className="absolute -bottom-4 left-5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 shadow-lg sm:left-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
                Jaipur Craftsmanship
              </p>
              <p className="mt-1 text-sm font-semibold text-stone-900">
                Handcrafted • Export Ready
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="order-2 lg:pl-4">

            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-indigo-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">
                Crystal Jaipuria
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-2xl font-bold leading-snug tracking-tight text-stone-900 sm:text-3xl lg:text-[32px] xl:text-[36px]">
              Handcrafted Gemstone Statues & Crystal Carvings
              <span className="block text-indigo-700 font-bold mt-1">
                Manufacturer in Jaipur, India
              </span>
            </h1>

            {/* Content */}
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-stone-600 sm:text-base">
              <p>
                Crystal Jaipuria is a Jaipur, India-based gemstone statue and
                crystal carvings manufacturer, wholesaler, and supplier,
                offering handcrafted pieces for retailers, spiritual stores,
                interior designers, collectors, and international buyers.
                We specialize in natural gemstone idols, crystal statues,
                deity carvings, figurines, Shivlings, and decorative gemstone
                sculptures made from materials such as jade, rose quartz,
                amethyst, quartz, and other semi-precious stones.
              </p>

              <p>
                Our collection combines traditional Indian craftsmanship with
                designs suited to global markets. From Ganesha, Shiva,
                Lakshmi, Buddha, and other spiritual statues to crystal
                animals, decorative carvings, and custom gemstone sculptures,
                we support wholesale and bulk requirements from India and
                overseas.
              </p>

              <p>
                Based in Jaipur, a renowned center for gemstone craftsmanship,
                we serve buyers across India, the USA, UK, Europe, Australia,
                UAE, and other international markets with quality-focused
                sourcing and export-ready products.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-stone-200 bg-white px-3 py-3 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">100%</p>
                <p className="mt-1 text-xs text-stone-500">Handcrafted</p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white px-3 py-3 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">Global</p>
                <p className="mt-1 text-xs text-stone-500">Shipping</p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white px-3 py-3 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">Bulk</p>
                <p className="mt-1 text-xs text-stone-500">Orders</p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white px-3 py-3 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">Jaipur</p>
                <p className="mt-1 text-xs text-stone-500">India</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGemstoneSection;
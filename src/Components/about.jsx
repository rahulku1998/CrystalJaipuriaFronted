import React from "react";

const AboutGemstoneSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-16 sm:py-20 lg:py-24">
      
      {/* Decorative Background */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-stone-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div className="relative order-1">
            
            {/* Image Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
              
              <img
                src="../Gemstone.webp"
                alt="Handcrafted gemstone statues and crystal carvings"
                className="h-[320px] w-full rounded-xl object-cover sm:h-[420px] lg:h-[540px]"
              />

              {/* Bottom Gradient */}
              <div className="absolute inset-x-2 bottom-2 h-32 rounded-b-xl bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Small Premium Badge */}
            <div className="absolute -bottom-5 left-5 rounded-xl border border-stone-200 bg-white px-5 py-3 shadow-lg sm:left-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
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
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-indigo-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700">
                Crystal Jaipuria
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[46px]">
              Handcrafted Gemstone Statues & Crystal Carvings Manufacturer
              <span className="block text-indigo-700">
                in Jaipur, India
              </span>
            </h2>

            {/* Content */}
            <div className="mt-7 space-y-5 text-[15px] leading-7 text-stone-600 sm:text-base sm:leading-8">

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

            {/* Bottom Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">100%</p>
                <p className="mt-1 text-xs text-stone-500">
                  Handcrafted
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">
                  Global
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Shipping
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">
                  Bulk
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Orders
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
                <p className="text-lg font-semibold text-stone-900">
                  Jaipur
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  India
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutGemstoneSection;
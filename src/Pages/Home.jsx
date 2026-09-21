import React, { useEffect, useState } from "react";
import API from "../api/axios";
import CategorySection from "../Components/CategoryCard";
import ProductCard from "../Components/ProductCard";
import SEO from "../Components/SEO";
import homeImg from "../assets/images/banner-divine.webp";
import StatsSection from "../Components/StatsSection";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/price";
import AboutGemstoneSection from "../Components/about";
import FAQSection from "../Components/FAQSection";
import GoogleReviewsSection from "../Components/GoogleReviewsSection";
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGem, FaAward, FaTruck, FaIndustry, FaCogs, FaCheckCircle, FaGlobeAmericas } from "react-icons/fa";

const B2BWholesaleSection = () => (
  <section className="py-12 sm:py-16 bg-white border-t border-stone-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Direct From Jaipur Workshop
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
          Gemstone Statues Wholesale Supplier &amp; Custom Carving in Jaipur
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
          Crystal Jaipuria is an authentic <strong>gemstone god statues manufacturer and wholesale supplier in Jaipur, Rajasthan (India)</strong>. We carve certified natural crystals into divine idols, Sphatik Shivlings, and sacred Vedic yantras for temples, retail jewelers, spiritual practitioners, and international buyers.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-lg border border-stone-200 bg-stone-50/50 hover:border-amber-400 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-md bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 mb-3.5">
            <FaIndustry className="text-lg" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">Direct Factory Wholesale</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Procure directly from our Jaipur manufacturing unit. Tiered wholesale pricing with zero middlemen markup for resellers and institutions.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-stone-200 bg-stone-50/50 hover:border-amber-400 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-md bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 mb-3.5">
            <FaCogs className="text-lg" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">Bespoke Deity Carving</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Custom deity carving from 2 inches to 5+ feet in Clear Quartz, Rose Quartz, Green Jade, Amethyst, and Black Obsidian as per Vedic Shilpa Shastra.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-stone-200 bg-stone-50/50 hover:border-amber-400 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-md bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 mb-3.5">
            <FaCheckCircle className="text-lg" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">100% Natural Earth Crystals</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Every statue is carved from authentic natural earth-mined rough gemstones with verifiable inclusions. Laboratory authenticity certificate provided.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-stone-200 bg-stone-50/50 hover:border-amber-400 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-md bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 mb-3.5">
            <FaGlobeAmericas className="text-lg" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">All-India &amp; Global Shipping</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Insured express delivery across India and worldwide exports to USA, UK, Canada, Australia, and UAE with custom wooden crate packaging.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/home");
        setProducts(res.data.latestProducts || []);
        setCategories(res.data.categories || []);
        setCategoryProducts(res.data.categoryProducts || {});
      } catch (err) {
        console.log("Home data fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SEO
        title="Gemstone God Statues Manufacturer & Wholesale Supplier in Jaipur, India | Crystal Jaipuria"
        description="Leading gemstone god statues manufacturer & wholesale supplier in Jaipur, Rajasthan (India). Handcrafted natural crystal idols, Sphatik Shivlings & Vedic spiritual decor since 1989."
        canonical="https://www.crystaljaipuria.com/"
        ogTitle="Gemstone God Statues Manufacturer & Wholesale Supplier in Jaipur, India | Crystal Jaipuria"
        ogDescription="Leading gemstone god statues manufacturer & wholesale supplier in Jaipur, Rajasthan (India). Handcrafted natural crystal idols, Sphatik Shivlings & Vedic spiritual decor since 1989."
        twitterTitle="Gemstone God Statues Manufacturer & Wholesale Supplier in Jaipur, India | Crystal Jaipuria"
        twitterDescription="Leading gemstone god statues manufacturer & wholesale supplier in Jaipur, Rajasthan (India). Handcrafted natural crystal idols, Sphatik Shivlings & Vedic spiritual decor since 1989."
        image="https://www.crystaljaipuria.com/logo.png"
        type="website"
      />
      <section className="w-full">

<AboutGemstoneSection/>




      {/* PRODUCTS SECTION */}
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-4 sm:mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-850">
              Our Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Handcrafted, certified gemstone idols &amp; sacred Vedic decor
            </p>
          </div>
          <Link
            to="/shop"
            className="text-amber-800 hover:text-amber-900 font-semibold text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-1"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      </div>









{/* BANNER */}



{/* BANNER */}
<div className="w-full my-6 sm:my-10 overflow-hidden">
  <Link to="/shop" className="block w-full">
    <img
      src={homeImg}
      loading="lazy"
      decoding="async"
      alt="Handcrafted Gemstone God Statues, Vastu Decor & Healing Crystals Manufacturer - Crystal Jaipuria"
      className="w-full aspect-[1898/721] max-h-[721px] object-cover object-center block"
    />
  </Link>
</div>









{/* CATEGORY */}



<div className="mt-8 sm:mt-12">
        {categories.map((category) => {
          const isDiya =
            category.slug === "diya" ||
            category.name?.toLowerCase().includes("diya");

          return (
            <React.Fragment key={category._id}>
              <CategorySection
                title={category.name}
                slug={category.slug}
                products={categoryProducts[category._id] || []}
              />
              {isDiya && <B2BWholesaleSection />}
            </React.Fragment>
          );
        })}
        {categories.length > 0 &&
          !categories.some(
            (c) => c.slug === "diya" || c.name?.toLowerCase().includes("diya")
          ) && <B2BWholesaleSection />}
      </div>

<StatsSection />

<GoogleReviewsSection />

<FAQSection />

{/* CONTACT */}



      {/* Get in Touch CTA Section */}
      <section className="bg-stone-50/50 py-8 sm:py-12 border-t border-stone-200/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200/80 shadow-md p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2.5">
              Get in Touch
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Looking for premium crystal products, customized gifts, or bulk orders? We'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-sm font-semibold transition text-xs sm:text-sm text-center shadow-sm hover:shadow active:scale-95"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-sm font-semibold transition text-xs sm:text-sm text-center shadow-sm hover:shadow active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="mailto:crystaljaipurya@gmail.com"
                className="w-full sm:w-auto px-6 py-2.5 border border-stone-300 hover:border-slate-800 text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 rounded-sm font-semibold transition text-xs sm:text-sm text-center shadow-sm hover:shadow active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <FaEnvelope className="text-xs" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>






</section>
</>
);

};

export default Home;
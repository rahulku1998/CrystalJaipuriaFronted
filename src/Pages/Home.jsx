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
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

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
        title="Gemstone God Statues Manufacturer in India | Crystal Jaipuria"
        description="Leading gemstone god statues manufacturer & wholesaler in Jaipur, India. Hand-carved crystal idols, Vastu decor & healing stones. Global shipping since 1989."
        canonical="https://www.crystaljaipuria.com/"
        ogTitle="Gemstone God Statues Manufacturer in India | Crystal Jaipuria"
        ogDescription="Leading manufacturer & wholesaler of authentic gemstone god statues & crystal carvings in Jaipur since 1989. Shop hand-carved Ganesha idols, Vastu products & healing crystals. Worldwide shipping available."
        twitterTitle="Gemstone God Statues Manufacturer in India | Crystal Jaipuria"
        twitterDescription="Leading manufacturer & wholesaler of authentic gemstone god statues & crystal carvings in Jaipur since 1989. Shop hand-carved Ganesha idols, Vastu products & healing crystals. Worldwide shipping available."
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


{

categories.map((category)=>(


<CategorySection


key={category._id}

title={category.name}

slug={category.slug}

products={categoryProducts[category._id] || []}


/>


))


}



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
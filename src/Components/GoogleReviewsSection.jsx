import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight, FaPen, FaExternalLinkAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Pradeep Kumar Sharma",
    badge: "Local Guide · 2 reviews · 3 photos",
    avatar: "P",
    avatarBg: "bg-indigo-600",
    time: "5 months ago",
    rating: 5,
    review:
      "I purchased a Crystal Shivling and Shree Yantra from Crystal Jaipuria at wholesale price, and I am very satisfied with the quality. They are a trusted manufacturer and wholesaler of gemstone idols, crystal carvings, and spiritual products. The finishing of the Shivling and Shree Yantra is excellent, and the stones are genuine. Highly recommended for bulk buyers, resellers, and anyone looking for authentic crystal products in Jaipur and online.",
    googleUrl: "https://share.google/N0cxzOYaEBhJ71gzT",
  },
  {
    id: 2,
    name: "DeepakKumar Deepakjangid",
    badge: "1 review",
    avatar: "D",
    avatarBg: "bg-emerald-600",
    time: "a month ago",
    rating: 5,
    review:
      "I recently purchased a crystal Shivling along with a few other crystal god idols from Crystal Jaipuria, and I'm really happy with my purchase. The craftsmanship is beautiful, and every idol is finely detailed with a premium finish. The crystals are clear, elegant, and look even better in person. The packaging was secure, and everything arrived safely and on time.",
    googleUrl: "https://share.google/KRRBgigbJg1a0fyXs",
  },
  {
    id: 3,
    name: "Sunil Kumawat",
    badge: "1 review · 2 photos",
    avatar: "S",
    avatarBg: "bg-rose-600",
    time: "4 months ago",
    rating: 5,
    review:
      "The labradorite carvings and crystal shiva have the best flash I've ever seen in bulk orders. crystal jaipuria definitely uses premium raw materials. These statues are the highlight of my display case and sell quickly.",
    googleUrl: "https://share.google/SWQAca7WdlNXbHnMg",
  },
  {
    id: 4,
    name: "Nk Enterprises",
    badge: "Local Guide · 23 reviews",
    avatar: "N",
    avatarBg: "bg-purple-600",
    time: "Edited 4 months ago",
    rating: 5,
    review:
      "The rose quartz carvings are so soft and pink. Very high-quality stone with no visible inclusions. Expertly carved into beautiful, peaceful shapes. 5 stars! I was looking for unique spiritual decor and found the most beautiful carvings here. The craftsmanship at crystal jaipuria is truly world-class, especially their intricate gemstone statues.",
    googleUrl: "https://share.google/zFrcBAMj1i6huwdwz",
  },
  {
    id: 5,
    name: "Gopal sahu",
    badge: "1 review",
    avatar: "G",
    avatarBg: "bg-amber-600",
    time: "4 months ago",
    rating: 5,
    review:
      "I recently purchased a gemstone Buddha along with a crystal Shivling/Shree Yantra from Crystal Jaipuria, and I’m genuinely impressed with the overall experience. The craftsmanship of both pieces is beautiful. The gemstone Buddha has a very calming presence, with fine detailing. The quality of the crystals is authentic and premium.",
    googleUrl: "https://share.google/NrE1CI7W6T4S6GRui",
  },
  {
    id: 6,
    name: "Lucky Mahendwariya",
    badge: "1 review · 1 photo",
    avatar: "L",
    avatarBg: "bg-blue-600",
    time: "5 months ago",
    rating: 5,
    review:
      "I purchased a Green Jade Radha Krishna statue from Crystal Jaipuria. The carving quality is very beautiful and the stone looks genuine. They have a good collection of gemstone idols and prices are negotiable. Highly recommended.",
    googleUrl: "https://maps.app.goo.gl/AHk7P9q4CV8NcM1q7",
  },
];

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/Crystal+Jaipuria/data=!4m2!3m1!1s0x0:0xdc6c82ae60c2c87d?sa=X&ved=1t:2428&ictx=111";

const GoogleReviewsSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Google Review Schema JSON-LD for rich snippet stars
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Crystal Jaipuria",
    "image": "https://www.crystaljaipuria.com/logo.png",
    "url": "https://www.crystaljaipuria.com/",
    "telephone": "08955613237",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West Part, Prabha Mangal Vihar, Plot No.03, Mod, Sanganer, Muhana",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302029",
      "addressCountry": "IN",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "39",
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name,
      },
      "datePublished": "2026-04-01",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(r.rating),
        "bestRating": "5",
      },
      "reviewBody": r.review,
    })),
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-10 sm:py-16 lg:py-20 border-t border-stone-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Unified Header & Rating Bar */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80">
          <div>
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="h-px w-5 bg-indigo-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                Customer Trust & Google Ratings
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Why Clients Choose Crystal Jaipuria
            </h2>

            {/* Google Rating Badge */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <span className="text-base font-extrabold text-stone-900">5.0</span>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
              <span className="text-stone-300">•</span>
              <span className="font-medium text-stone-600">39 Google reviews</span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-medium">
                <MdVerified className="text-sm text-emerald-600" />
                100% Genuine Gemstones
              </span>
            </div>
          </div>

          {/* Action Button & Carousel Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-stone-800 shadow-sm transition-all hover:bg-stone-50 hover:border-indigo-500 hover:text-indigo-600 active:scale-[0.98]"
            >
              <FaPen className="text-xs text-indigo-600" />
              <span>Write a review</span>
            </a>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                ref={prevRef}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer active:scale-95 disabled:opacity-40"
                aria-label="Previous reviews"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                ref={nextRef}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer active:scale-95 disabled:opacity-40"
                aria-label="Next reviews"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Slider (4 Cards Desktop, 2 Cards Tablet, 1.15 Cards Mobile) */}
        <div className="w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="w-full !py-2"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-indigo-200 hover:shadow-md">
                  <div>
                    {/* Header: Avatar, Name, Badge, Google G Icon */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full ${item.avatarBg} text-white font-bold text-xs sm:text-sm shadow-sm`}
                        >
                          {item.avatar}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug truncate">
                            {item.name}
                          </h4>
                          {item.badge && (
                            <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">
                              {item.badge}
                            </p>
                          )}
                          <p className="text-[10px] text-stone-400">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-lg sm:text-xl" title="Verified Google Review">
                        <FcGoogle />
                      </div>
                    </div>

                    {/* Stars & Verified Badge */}
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                        {[...Array(item.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <MdVerified
                        className="text-indigo-600 text-xs"
                        title="Verified Reviewer"
                      />
                    </div>

                    {/* Review Text */}
                    <p className="mt-2.5 text-xs leading-relaxed text-stone-600 line-clamp-5">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Read on Google Link */}
                  <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 font-medium">Google Review</span>
                    <a
                      href={item.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
                    >
                      <span>Read on Google</span>
                      <FaExternalLinkAlt className="text-[8px]" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;

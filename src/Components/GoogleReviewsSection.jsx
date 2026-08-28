import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight, FaPen } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Rajesh Sharma",
    avatar: "R",
    avatarBg: "bg-indigo-600",
    time: "1 month ago",
    rating: 5,
    review:
      "Ordered custom Gemstone Ganesha idol for our home temple. The carving details, facial expressions, and natural stone finish are beyond exceptional. Best gemstone manufacturer in Jaipur!",
  },
  {
    id: 2,
    name: "Amit Kumawat",
    avatar: "A",
    avatarBg: "bg-emerald-600",
    time: "2 months ago",
    rating: 5,
    review:
      "Best manufacturer and wholesaler in Jaipur for authentic natural Shivling and Sphatik Shree Yantra. 100% genuine stone quality, transparent pricing, and secure packaging.",
  },
  {
    id: 3,
    name: "Dr. Ananya Roy",
    avatar: "A",
    avatarBg: "bg-purple-600",
    time: "2 months ago",
    rating: 5,
    review:
      "Bought an Amethyst Diya and Green Jade Shiva statue. The polish, clarity, and positive vibration of the crystals are incredible. Very prompt customer service and quick delivery.",
  },
  {
    id: 4,
    name: "Michael Vance",
    avatar: "M",
    avatarBg: "bg-amber-600",
    time: "3 months ago",
    rating: 5,
    review:
      "We regularly source crystal carvings and gemstone statues for our spiritual store in the USA. Crystal Jaipuria delivers top-notch artisan craftsmanship and always fulfills bulk orders on time.",
  },
  {
    id: 5,
    name: "Suresh Patel",
    avatar: "S",
    avatarBg: "bg-blue-600",
    time: "4 months ago",
    rating: 5,
    review:
      "Visited their workshop in Sanganer, Jaipur. Mr. Kailash Kumawat and the team explained all gemstone properties with great honesty. Authentic products at genuine wholesale rates.",
  },
  {
    id: 6,
    name: "Neha Agarwal",
    avatar: "N",
    avatarBg: "bg-rose-600",
    time: "4 months ago",
    rating: 5,
    review:
      "Exquisite quality Radha Krishna idol carved in natural Lapis Lazuli. The craftsmanship is divine and the packaging was heavy-duty. Highly recommended for spiritual decor!",
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
    "telephone": "+918955613237",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West Part, Prabha Mangal Vihar, Plot No.03, Mod, Sanganer",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302029",
      "addressCountry": "IN",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name,
      },
      "datePublished": "2026-06-01",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(r.rating),
        "bestRating": "5",
      },
      "reviewBody": r.review,
    })),
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-12 sm:py-16 lg:py-20 border-t border-stone-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-6 bg-indigo-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
              Customer Trust & Ratings
            </span>
            <span className="h-px w-6 bg-indigo-600" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            Why Clients Choose Crystal Jaipuria
          </h2>
          <p className="mt-3 text-sm text-stone-600 sm:text-base">
            Verified ratings & customer reviews from devotees, retailers, and
            collectors across India & worldwide.
          </p>
        </div>

        {/* Main Grid: Left Business Card + Right Reviews Slider */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Google Business Profile Summary Card */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div>
              {/* Header Info */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-stone-100 bg-stone-50 p-1 shadow-inner">
                  <img
                    src="/logo.jpeg"
                    alt="Crystal Jaipuria Logo"
                    className="h-full w-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                    Crystal Jaipuria
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Gemstone & Crystal Manufacturer
                  </p>
                </div>
              </div>

              {/* Rating Summary */}
              <div className="mt-6 border-t border-stone-100 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                    4.9
                  </span>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 text-lg">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p className="text-xs font-medium text-stone-500 mt-0.5">
                      Based on 150+ Google & verified reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-xl">
                <MdVerified className="text-base text-emerald-600 shrink-0" />
                <span>100% Genuine Natural Gemstones Verified</span>
              </div>
            </div>

            {/* Action Button: Write a review */}
            <div className="mt-6 pt-4 border-t border-stone-100">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:bg-stone-50 hover:border-indigo-500 hover:text-indigo-600 active:scale-[0.98]"
              >
                <FaPen className="text-xs text-indigo-600" />
                <span>Write a review</span>
              </a>
            </div>
          </div>

          {/* Right Column: Swiper Review Cards Carousel */}
          <div className="lg:col-span-8 relative flex flex-col justify-center">
            {/* Custom Navigation Buttons */}
            <div className="hidden sm:flex absolute -top-12 right-0 items-center gap-2 z-10">
              <button
                ref={prevRef}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer active:scale-95 disabled:opacity-40"
                aria-label="Previous review"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                ref={nextRef}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer active:scale-95 disabled:opacity-40"
                aria-label="Next review"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1.4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 2.2,
                  spaceBetween: 24,
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
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-indigo-200 hover:shadow-lg">
                    <div>
                      {/* Card Header: Avatar, Name, Time, Google G Icon */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.avatarBg} text-white font-bold text-base shadow-sm`}
                          >
                            {item.avatar}
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-[15px] font-bold text-stone-900 leading-snug">
                              {item.name}
                            </h4>
                            <p className="text-xs text-stone-400">
                              {item.time}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-xl" title="Google Review">
                          <FcGoogle />
                        </div>
                      </div>

                      {/* Stars & Verified Badge */}
                      <div className="mt-3.5 flex items-center gap-1.5">
                        <div className="flex items-center gap-1 text-amber-400 text-sm">
                          {[...Array(item.rating)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <MdVerified
                          className="text-indigo-600 text-sm"
                          title="Verified Buyer"
                        />
                      </div>

                      {/* Review Text */}
                      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-4">
                        "{item.review}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                      <span>Verified Google Review</span>
                      <span className="text-indigo-600 font-medium hover:underline cursor-pointer">
                        Read on Google
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;

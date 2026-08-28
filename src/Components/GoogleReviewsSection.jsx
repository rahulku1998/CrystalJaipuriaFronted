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
      "I purchased a Crystal Shivling and Shree Yantra from Crystal Jaipuria at wholesale price, and I am very satisfied with the quality. They are a trusted manufacturer and wholesaler of gemstone idols, crystal carvings, and spiritual products. The finishing of the Shivling and Shree Yantra is excellent, and the stones are genuine. Crystal Jaipuria has a wide collection of gemstone god statues, crystal Shivlings, Shree Yantras, and other spiritual crystal items at reasonable wholesale prices. Highly recommended for bulk buyers, resellers, and anyone looking for authentic crystal products in Jaipur and online.",
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
      "I recently purchased a crystal Shivling along with a few other crystal god idols from Crystal Jaipuria, and I'm really happy with my purchase. The craftsmanship is beautiful, and every idol is finely detailed with a premium finish. The crystals are clear, elegant, and look even better in person. The packaging was secure, and everything arrived safely and on time. You can tell they pay attention to quality and customer satisfaction. These idols have added a peaceful and positive vibe to my home temple. I would definitely recommend Crystal Jaipuria to anyone looking for authentic, high-quality crystal idols.",
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
      "The rose quartz carvings are so soft and pink. Very high-quality stone with no visible inclusions. Expertly carved into beautiful, peaceful shapes. 5 stars! I was looking for unique spiritual decor and found the most beautiful carvings here. The craftsmanship at crystal jaipuria is truly world-class, especially their intricate gemstone statues. Highly recommend for collectors!",
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
      "I recently purchased a gemstone Buddha along with a crystal Shivling/Shree Yantra from Crystal Jaipuria, and I’m genuinely impressed with the overall experience. The craftsmanship of both pieces is beautiful. The gemstone Buddha has a very calming presence, with fine detailing that makes it feel both elegant and spiritually uplifting. The crystal Shivling/Shree Yantra is equally well-made, with a smooth finish and a strong, positive energy that really stands out when placed in my space. The quality of the crystals seems authentic and premium. Everything was well-packaged, ensuring the items arrived safely without any damage. Delivery was also timely, which added to the smooth experience.",
    googleUrl: "https://share.google/NrE1CI7W6T4S6GRui",
  },
  {
    id: 6,
    name: "Mukesh Moond",
    badge: "Local Guide · 5 reviews",
    avatar: "M",
    avatarBg: "bg-blue-600",
    time: "5 months ago",
    rating: 5,
    review:
      "Great experience with Crystal Jaipuria. High quality gemstone statues and crystal carvings. Very cooperative team and genuine wholesale rates. One of the best gemstone manufacturers in Jaipur!",
    googleUrl: "https://share.google/vHLdhMayGn2mWABop",
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
    <section className="relative overflow-hidden bg-[#faf9f6] py-12 sm:py-16 lg:py-20 border-t border-stone-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-6 bg-indigo-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
              Customer Trust & Google Ratings
            </span>
            <span className="h-px w-6 bg-indigo-600" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            Why Clients Choose Crystal Jaipuria
          </h2>
          <p className="mt-2.5 text-sm text-stone-600 sm:text-base">
            Verified ratings & customer reviews from devotees, retailers, and
            collectors across India & worldwide.
          </p>
        </div>

        {/* Business Summary Header Card */}
        <div className="mb-8 rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Left: Brand info & Rating */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-stone-100 bg-stone-50 p-1 shadow-inner shrink-0">
              <img
                src="/logo.jpeg"
                alt="Crystal Jaipuria Logo"
                className="h-full w-full object-contain rounded-xl"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                  Crystal Jaipuria
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <MdVerified className="text-xs text-emerald-600" />
                  Verified Business
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Gemstone jeweler in Jaipur, Rajasthan
              </p>

              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                <span className="text-2xl font-extrabold text-stone-900">
                  5.0
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-xs font-medium text-stone-500">
                  (39 Google reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions & Carousel Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 shadow-sm transition-all hover:bg-stone-50 hover:border-indigo-500 hover:text-indigo-600 active:scale-[0.98]"
            >
              <FaPen className="text-xs text-indigo-600" />
              <span>Write a review</span>
            </a>

            {/* Slider Navigation Buttons */}
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

        {/* Reviews Slider: 4 cards on Desktop */}
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
            slidesPerView={1.15}
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
                <div className="flex h-full flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-indigo-200 hover:shadow-lg">
                  <div>
                    {/* Header: Avatar, Name, Badge, Google G Icon */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.avatarBg} text-white font-bold text-sm shadow-sm`}
                        >
                          {item.avatar}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-sm font-bold text-stone-900 leading-snug truncate">
                            {item.name}
                          </h4>
                          {item.badge && (
                            <p className="text-[11px] text-stone-500 truncate">
                              {item.badge}
                            </p>
                          )}
                          <p className="text-[11px] text-stone-400">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-xl" title="Verified Google Review">
                        <FcGoogle />
                      </div>
                    </div>

                    {/* Stars & Verified Badge */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs sm:text-sm">
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
                    <p className="mt-3 text-xs leading-relaxed text-stone-600 line-clamp-6">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Read on Google Link */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 font-medium">Google Review</span>
                    <a
                      href={item.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
                    >
                      <span>Read on Google</span>
                      <FaExternalLinkAlt className="text-[9px]" />
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

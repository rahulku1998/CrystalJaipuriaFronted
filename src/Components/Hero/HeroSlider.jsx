import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import img7 from "../../assets/images/m1 (1).webp";
import img7Mob from "../../assets/images/m1 (1)-mob.webp";

import img8 from "../../assets/images/m1 (2).webp";
import img8Mob from "../../assets/images/m1 (2)-mob.webp";

import img10 from "../../assets/images/m1 (4).webp";
import img10Mob from "../../assets/images/m1 (4)-mob.webp";

export default function HeroSlider() {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-auto lg:aspect-[1920/650] max-h-[650px] bg-[#f8f3ea]"
      >
        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <picture className="w-full h-full block">
              <source media="(max-width: 767px)" srcSet={img7Mob} type="image/webp" />
              <source media="(min-width: 768px)" srcSet={img7} type="image/webp" />
              <img
                src={img7}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                alt="Handcrafted Gemstone Ganesha Idols & Pure Crystal Ganesh Statues Manufacturer Jaipur - Crystal Jaipuria"
                className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-full lg:aspect-[1920/650] max-h-[650px] object-cover object-center block"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                width="1920"
                height="650"
              />
            </picture>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <picture className="w-full h-full block">
              <source media="(max-width: 767px)" srcSet={img8Mob} type="image/webp" />
              <source media="(min-width: 768px)" srcSet={img8} type="image/webp" />
              <img
                src={img8}
                loading="lazy"
                decoding="async"
                alt="Natural Gemstone Shivling, Pure Sphatik Quartz Shiva Linga & Nandi Carvings - Crystal Jaipuria"
                className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-full lg:aspect-[1920/650] max-h-[650px] object-cover object-center block"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                width="1920"
                height="650"
              />
            </picture>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <picture className="w-full h-full block">
              <source media="(max-width: 767px)" srcSet={img10Mob} type="image/webp" />
              <source media="(min-width: 768px)" srcSet={img10} type="image/webp" />
              <img
                src={img10}
                loading="lazy"
                decoding="async"
                alt="Hand Carved Gemstone Radha Krishna Statues & Natural Stone Deity Idols - Crystal Jaipuria"
                className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-full lg:aspect-[1920/650] max-h-[650px] object-cover object-center block"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                width="1920"
                height="650"
              />
            </picture>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
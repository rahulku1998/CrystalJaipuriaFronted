import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import img7 from "../../assets/images/m1 (1).webp";
import img8 from "../../assets/images/m1 (2).webp";
import img10 from "../../assets/images/m1 (4).webp";

export default function HeroSlider() {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-auto lg:aspect-[1024/346] max-h-[650px]"
      >
        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <img
              src={img7}
              alt="Handcrafted Gemstone Ganesha Idols & Pure Crystal Ganesh Statues Manufacturer Jaipur - Crystal Jaipuria"
              className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-full lg:aspect-[1024/346] max-h-[650px] object-cover object-center block"
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <img
              src={img8}
              alt="Natural Gemstone Shivling, Pure Sphatik Quartz Shiva Linga & Nandi Carvings - Crystal Jaipuria"
              className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-full lg:aspect-[1024/346] max-h-[650px] object-cover object-center block"
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <img
              src={img10}
              alt="Hand Carved Gemstone Radha Krishna Statues & Natural Stone Deity Idols - Crystal Jaipuria"
              className="w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-full lg:aspect-[1024/346] max-h-[650px] object-cover object-center block"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
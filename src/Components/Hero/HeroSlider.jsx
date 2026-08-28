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
        className="w-full aspect-[1898/721] max-h-[721px]"
      >
        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <img
              src={img7}
              alt="Handcrafted Gemstone Ganesha Idols & Statues for Home & Temple - Crystal Jaipuria"
              className="w-full h-full aspect-[1898/721] max-h-[721px] object-cover object-center block"
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <img
              src={img8}
              alt="Natural Gemstone Shivling & Sphatik Shiva Linga Manufacturer in Jaipur - Crystal Jaipuria"
              className="w-full h-full aspect-[1898/721] max-h-[721px] object-cover object-center block"
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/shop" className="block w-full h-full">
            <img
              src={img10}
              alt="Hand Carved Gemstone Radha Krishna Statues & Spiritual Idols - Crystal Jaipuria"
              className="w-full h-full aspect-[1898/721] max-h-[721px] object-cover object-center block"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {Link} from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import img7 from "../../assets/images/m1 (1).webp";
import img8 from "../../assets/images/m1 (2).webp";
import img9 from "../../assets/images/banner1.webp";
import img10 from "../../assets/images/m1 (4).webp";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 9000,
        disableOnInteraction: false,
      }}
      loop
      autoHeight={true}
      pagination={{ clickable: true }}
      className="w-full"
    >
      <SwiperSlide>
        <Link to="/shop">
        <img
          src={img7}
          alt="banner"
          
          className="w-full h-auto block"
        />
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link to="/shop">
        <img
          src={img8}
          alt="banner"
          to="/shop"
          className="w-full h-auto block"
        />
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link to="/shop">
        <img
          src={img9}
          to="/shop"
          alt="banner"
          className="w-full h-auto block"
        />
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link to="/shop">
        <img
          src={img10}
          to="/shop"
          alt="banner"
          className="w-full h-auto block"
        />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
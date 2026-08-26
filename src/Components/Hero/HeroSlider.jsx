import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img7 from "../../assets/images/m1 (1).webp";
import img8 from "../../assets/images/m1 (2).webp";
import img9 from "../../assets/images/banner1.webp";
import img10 from "../../assets/images/m1 (4).webp";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{
        delay: 9000,
        disableOnInteraction: false,
      }}
      loop
      autoHeight={true}
      navigation
      pagination={{ clickable: true }}
      className="
        w-full
        [&_.swiper-button-prev]:!top-1/2
        [&_.swiper-button-prev]:!bottom-auto
        [&_.swiper-button-prev]:!-translate-y-1/2
        [&_.swiper-button-prev]:!mt-0

        [&_.swiper-button-next]:!top-1/2
        [&_.swiper-button-next]:!bottom-auto
        [&_.swiper-button-next]:!-translate-y-1/2
        [&_.swiper-button-next]:!mt-0
      "
    >
      <SwiperSlide>
        <img
          src={img7}
          alt="banner"
          className="w-full h-auto block"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={img8}
          alt="banner"
          className="w-full h-auto block"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={img9}
          alt="banner"
          className="w-full h-auto block"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={img10}
          alt="banner"
          className="w-full h-auto block"
        />
      </SwiperSlide>
    </Swiper>
  );
}
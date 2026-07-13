
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../assets/images/banner1.webp";
import img2 from "../../assets/images/mama2.webp";
import img3 from "../../assets/images/mama3.webp";
import img4 from "../../assets/images/b.png";
import img5 from "../../assets/images/ganesh.jpeg";
import img6 from "../../assets/images/shiva.jpeg";

export default function HeroSlider() {
  return (
    <Swiper
  modules={[Autoplay, Navigation, Pagination]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop
  navigation
  pagination={{ clickable: true }}
  className="w-full  h-screen"
  
>

  <SwiperSlide className="h-full">
    <img
      src={img4}
      className="w-full h-full object-cover object-center"
    />
  </SwiperSlide>
  
  <SwiperSlide className="h-full">
    <img
      src={img5}
      className="w-full h-full object-cover object-center"
    />
  </SwiperSlide>
  <SwiperSlide className="h-full">
    <img
      src={img6}
      className="w-full h-full object-cover object-center"
    />
  </SwiperSlide>



  <SwiperSlide className="h-full">
    <img
      src={img1}
      className="w-full h-full object-cover object-center"
    />
  </SwiperSlide>

  <SwiperSlide className="h-full">
    <img
      src={img2}
      className="w-full h-full object-cover object-center"
    />
  </SwiperSlide>

  <SwiperSlide className="h-full">
    <img
      src={img3}
      className="w-full h-full object-cover object-center"
    />
  </SwiperSlide>
</Swiper>
  );
}
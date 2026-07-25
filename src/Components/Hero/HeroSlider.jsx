import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

      className="
      w-full
      h-[260px]
      sm:h-[400px]
      md:h-[550px]
      lg:h-screen
      "
    >


      <SwiperSlide>

        <img
          src={img4}
          alt="banner"
          className="
          w-full
          h-full
          object-cover
          object-center
          "
        />

      </SwiperSlide>



      <SwiperSlide>

        <img
          src={img5}
          alt="banner"
          className="
          w-full
          h-full
          object-cover
          object-center
          "
        />

      </SwiperSlide>



      <SwiperSlide>

        <img
          src={img6}
          alt="banner"
          className="
          w-full
          h-full
          object-cover
          object-center
          "
        />

      </SwiperSlide>




      <SwiperSlide>

        <img
          src={img3}
          alt="banner"
          className="
          w-full
          h-full
          object-cover
          object-center
          "
        />

      </SwiperSlide>


    </Swiper>
  );
}
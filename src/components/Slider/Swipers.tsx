"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import dos from "../../ui/2.jpg";
import tres from "../../ui/3.jpg";
import cuatro from "../../ui/4.jpg";
import cinco from "../../ui/5.jpeg";
import seis from "../../ui/6.jpeg";
import siete from "../../ui/7.jpeg";
import ocho from "../../ui/8.jpeg";
import nueve from "../../ui/9.jpeg";


function Swipers() {
  return (
    <div className="bg-slate-100 h-[60vh] flex items-center">
          <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={dos} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={tres} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={cuatro} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={cinco} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={seis} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={siete} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={ocho} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={nueve} alt="mobile" className="w-full" />
          </SwiperSlide>
        </Swiper>
      </div>
  )
}

export default Swipers
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
import useMatchMedia from "../ui/matchMedia";
import { useEffect, useState } from "react";


function Swipers() {
  const [slidesPerView, setSlidesPerView] = useState(2)

  const isMobile = useMatchMedia('(max-width: 480px)')
  const isTablet = useMatchMedia('(min-width: 481px) and (max-width: 1024px)')

  useEffect(() => {
    if (isMobile) {
      setSlidesPerView(2)
    } else if (isTablet) {
      setSlidesPerView(3)
    } else {
      setSlidesPerView(4)
    }
  }, [isMobile, isTablet])

  return (
    <div className="bg-slate-100 h-[80vh] flex flex-col justify-center gap-7 ">
      <div className="">
        <h2 className="text-center text-2xl mb-2 font-bold leading-8">
          Categorias
        </h2>
        <p className="text-center text-lg font-extralight leading-8 ">
          We are trusted by the world’s most innovative teams
        </p>
      </div>
      
          <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={8}
          loop={true}
          // pagination={{
          //   clickable: true,
          // }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper cursor-pointer"
        >
          <SwiperSlide >
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={dos} alt="mobile" className="w-full " />
          </SwiperSlide>
          <SwiperSlide >
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={tres} alt="mobile" className="w-full " />
          </SwiperSlide>
          <SwiperSlide >
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={cuatro} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide >
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={cinco} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide >
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={seis} alt="mobile" className="w-full" />
          </SwiperSlide>
          <SwiperSlide >
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
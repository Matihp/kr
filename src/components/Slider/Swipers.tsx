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
    <div className="bg-slate-100 h-[60vh] flex flex-col justify-center gap-7 ">
      <div className="ml-[5%]">
        <h2 className=" text-2xl mb-1 font-bold leading-8">
          Categorias mas populares
        </h2>
        {/* <p className="text-center text-lg font-extralight leading-8 ">
          We are trusted by the world’s most innovative teams
        </p> */}
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
          <SwiperSlide>     
            <Image src={dos} alt="mobile" className="object-cover w-full h-full rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white rounded-md">
              <p className="text-sm">Get more customers</p>
              <p className="text-lg font-bold">SEM, Adwords & PPC</p>
            </div>               
          </SwiperSlide>
          <SwiperSlide >
            <Image src={tres} alt="mobile" className="object-cover w-full h-full rounded-md" />
            <div className="absolute inset-0 bg-yellow-500 bg-opacity-75 flex flex-col justify-end p-4 text-white rounded-md">
              <p className="text-sm">Convert more leads</p>
              <p className="text-lg font-bold">Sales & Calls</p>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <Image src={cuatro} alt="mobile" className="object-cover w-full h-full rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white rounded-md">
              <p className="text-sm">Ease your workload</p>
              <p className="text-lg font-bold">Admin Assistance</p>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <Image src={cinco} alt="mobile" className="object-cover w-full h-full rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white rounded-md">
              <p className="text-sm">Visualise your story</p>
              <p className="text-lg font-bold">Videography</p>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <Image src={seis} alt="mobile" className="object-cover w-full h-full rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white rounded-md">
              <p className="text-sm">Reach new audiences</p>
              <p className="text-lg font-bold">Translation</p>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <Image src={siete} alt="mobile" className="object-cover w-full h-full rounded-md" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white rounded-md">
              <p className="text-sm">Bring it to life</p>
              <p className="text-lg font-bold">Graphic Design</p>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={ocho} alt="mobile" className="object-cover w-full h-full rounded-md" />
          </SwiperSlide>
          <SwiperSlide>
            <p className="absolute top-0 w-full text-white">Programacion</p>
            <Image src={nueve} alt="mobile" className="object-cover w-full h-full rounded-md" />
          </SwiperSlide> */}
        </Swiper>
      </div>
  )
}

export default Swipers
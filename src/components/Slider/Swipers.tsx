"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
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


interface SlideData {
  image: StaticImageData;
  alt: string;
  smallText: string;
  bigText: string;
  bgColor: string;
}

const slideData: SlideData[] = [
  {
    image: dos,
    alt: "mobile",
    smallText: "Get more customers",
    bigText: "SEM, Adwords & PPC",
    bgColor: "bg-black",
  },
  {
    image: tres,
    alt: "mobile",
    smallText: "Convert more leads",
    bigText: "Sales & Calls",
    bgColor: "bg-yellow-500",
  },
  {
    image: cuatro,
    alt: "mobile",
    smallText: "Ease your workload",
    bigText: "Admin Assistance",
    bgColor: "bg-black",
  },
  {
    image: cinco,
    alt: "mobile",
    smallText: "Visualise your story",
    bigText: "Videography",
    bgColor: "bg-black",
  },
  {
    image: seis,
    alt: "mobile",
    smallText: "Reach new audiences",
    bigText: "Translation",
    bgColor: "bg-black",
  },
  {
    image: siete,
    alt: "mobile",
    smallText: "Bring it to life",
    bigText: "Graphic Design",
    bgColor: "bg-black",
  },
];

function Swipers() {
  const [slidesPerView, setSlidesPerView] = useState(2);

  const isMobile = useMatchMedia('(max-width: 480px)');
  const isTablet = useMatchMedia('(min-width: 481px) and (max-width: 1024px)');

  useEffect(() => {
    if (isMobile) {
      setSlidesPerView(2);
    } else if (isTablet) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(4);
    }
  }, [isMobile, isTablet]);

  return (
    <div className="bg-slate-100 h-[60vh] flex flex-col justify-center gap-7">
      <div className="ml-[5%]">
        <h2 className="text-2xl mb-1 font-bold leading-8">
          Categorias mas populares
        </h2>
      </div>
      
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={8}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper cursor-pointer"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>     
            <Image src={slide.image} alt={slide.alt} className="object-cover w-full h-full rounded-md" />
            <div className={`absolute inset-0 ${slide.bgColor} bg-opacity-50 flex flex-col justify-end p-4 text-white rounded-md`}>
              <p className="text-sm">{slide.smallText}</p>
              <p className="text-lg font-bold">{slide.bigText}</p>
            </div>               
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Swipers;
"use client";
import Image from "next/image";
import "./globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import mobile from "../ui/mobile.png";
import dos from "../ui/2.jpg";
import tres from "../ui/3.jpg";
import cuatro from "../ui/4.jpg";
import cinco from "../ui/5.jpeg";
import seis from "../ui/6.jpeg";
import siete from "../ui/7.jpeg";
import ocho from "../ui/8.jpeg";
import nueve from "../ui/9.jpeg";

import { Pagination, Navigation } from "swiper/modules";
function Profile() {
  return (
    // inline-flex animate-text-gradient bg-gradient-to-r
    <>
      <div className="h-[80dvh] md:h-[100dvh] flex justify-center md:justify-end lg:justify-center items-end bg-[url('../ui/mobile.png')] md:bg-[url('../ui/tablet.png')] lg:bg-[url('../ui/bg.png')] bg-cover bg-no-repeat">
        <div className="md:w-[68%] lg:w-1/2 flex flex-col mb-1 md:mb-20 lg:mb-24">
          <h1 className="text-4xl animate-slide-in-top md:text-6xl lg:text-7xl text-center text-prPink font-[900]">
            Certificate como{" "}
            <span className="inline-flex animate-text-gradient bg-gradient-to-r bg-[200%_auto] from-[#5a51e8] via-[#c83eba] to-[#5d49d5] bg-clip-text text-7xl text-transparent">
              freelancer
            </span>
          </h1>
          <h2 className="text-xl animate-slide-in-top md:text-3xl text-center text-prPink leading-[2] font-extrabold">
            ¡Ahora es posible!
          </h2>
          <div className="flex justify-center animate-slide-in-bottom gap-4">
            <button className="bg-[#ff8fa3] font-semibold hover:bg-red-400 rounded-3xl px-8 py-2 mt-5">
              Cotizarme
            </button>
            <button className="bg-[#ff8fa3] font-semibold hover:bg-red-400 rounded-3xl px-8 py-2 mt-5">
              Freelancer
            </button>
          </div>
          <div className="flex justify-center animate-slide-in-bottom">
            <button className="bg-[#fab6b6] font-semibold hover:bg-red-500 rounded-3xl px-9 py-2 mt-8">
              Quiero mi certificacion gratuita
            </button>
          </div>
        </div>
      </div>

      <section className="bg-black text-white py-8">
        <h2 className="text-center text-2xl mb-2 font-bold leading-8">
          Our Clients
        </h2>
        <p className="text-center text-lg font-extralight leading-8 ">
          We are trusted by the world’s most innovative teams
        </p>

        <div className="logos group cursor-cell relative overflow-hidden whitespace-nowrap py-10 [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]">
          <div className="animate-slide-left-infinite group-hover:animation-pause inline-block w-max">
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
              alt="Transistor"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
              alt="Reform"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
              alt="Tuple"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
              alt="SavvyCal"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
              alt="SavvyCal"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/laravel-logo-white.svg"
              alt="SavvyCal"
            />
          </div>

          <div className="animate-slide-left-infinite group-hover:animation-pause inline-block w-max">
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
              alt="Transistor"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
              alt="Reform"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
              alt="Tuple"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
              alt="SavvyCal"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
              alt="SavvyCal"
            />
            <img
              className="mx-4 inline h-16"
              src="https://tailwindui.com/img/logos/158x48/laravel-logo-white.svg"
              alt="SavvyCal"
            />
          </div>
        </div>
      </section>

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
      
    </>
  );
}

export default Profile;

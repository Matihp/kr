"use client";
import Image from "next/image";
import "./globals.css";

import CompanyLogos from "@/components/CompanyLogos/CompanyLogos";
import Swipers from "@/components/Slider/Swipers";
import CertificactionSteps from "@/components/CertificationSteps/CertificactionSteps";
import Testimonials from "@/components/Testimonials/Testimonials";
function Profile() {
  return (
    // inline-flex animate-text-gradient bg-gradient-to-r
    <>
      <div className="h-[80dvh] md:h-[100dvh] flex justify-center md:justify-end lg:justify-center items-end bg-[url('../ui/mobile.png')] md:bg-[url('../ui/tablet.png')] lg:bg-[url('../ui/bg.png')] bg-cover bg-no-repeat">
        <div className="md:w-[68%] lg:w-1/2 flex flex-col mb-1 md:mb-20 lg:mb-24">
          <h1 className="text-4xl animate-slide-in-top md:text-6xl lg:text-7xl text-center text-prPink font-[900]">
            Certificate como{" "}
            <span className="inline-flex animate-text-gradient bg-gradient-to-r bg-[200%_auto] from-[#5a51e8] via-[#c83eba] to-[#5d49d5] bg-clip-text text-5xl md:text-7xl text-transparent">
              freelancer
            </span>
          </h1>
          <h2 className="text-xl animate-slide-in-top md:text-3xl text-center text-prPink leading-[2] font-extrabold">
            ¡Ahora es posible!
          </h2>
          <div className="flex justify-center animate-slide-in-bottom gap-4">
            <button className="bg-slate-200 font-semibold hover:bg-slate-300 rounded-3xl px-8 py-2 mt-5">
              Cotizarme
            </button>
            <button className="bg-slate-200 font-semibold hover:bg-slate-300 rounded-3xl px-8 py-2 mt-5">
              Freelancer
            </button>
          </div>
          <div className="flex justify-center animate-slide-in-bottom">
            <button className="bg-violet-600 text-slate-100 font-semibold hover:bg-violet-700 rounded-3xl px-9 py-2 mt-8">
              Quiero mi certificacion gratuita
            </button>
          </div>
        </div>
      </div>

      <CertificactionSteps/>  

      <Swipers/>
      
      <CompanyLogos/>

      <Testimonials/>
    </>
  );
}

export default Profile;

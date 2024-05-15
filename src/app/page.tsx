"use client";
import Image from "next/image";
import "./globals.css";

function Profile() {
  return (
    // inline-flex animate-text-gradient bg-gradient-to-r
    <>
      <div className="h-[80dvh] md:h-[100dvh] flex justify-center md:justify-end lg:justify-center items-end bg-[url('../ui/mobile.png')] md:bg-[url('../ui/tablet.png')] lg:bg-[url('../ui/bg.png')] bg-cover bg-no-repeat">
        <div className="md:w-[68%] lg:w-1/2 flex flex-col mb-1 md:mb-20 lg:mb-24">  
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-center text-prPink font-[900]">
              Certificate como <span className='inline-flex animate-text-gradient bg-gradient-to-r bg-[200%_auto] from-[#ee6794] via-[#f3358e] to-[#ff1783] bg-clip-text text-7xl text-transparent'>
      freelancer
    </span>
            </h1>
            <h2 className="text-xl md:text-3xl text-center text-prPink leading-[2] font-extrabold">
              ¡Ahora es posible!
            </h2>
            <div className="flex justify-center gap-4">
              <button className="bg-[#ff8fa3] font-semibold hover:bg-red-400 rounded-3xl px-8 py-2 mt-5">
                Cotizarme
              </button>
              <button className="bg-[#ff8fa3] font-semibold hover:bg-red-400 rounded-3xl px-8 py-2 mt-5">
                Freelancer
              </button>
            </div>
            <div className="flex justify-center">
              <button className="bg-[#fab6b6] font-semibold hover:bg-red-500 rounded-3xl px-9 py-2 mt-8">
                Quiero mi certificacion gratuita
              </button>
            </div>
        </div>
      </div>

      {/* <div className="flex items-end justify-between h-[100vh] bg relative">
        <div className="w-1/2 mr-40">
          <Image
            src={man}
            unoptimized
            alt="Picture of the author"
            className="object-contain h-[500px] w-[1000px]"
          />
        </div>
        <div className="w-full h-[350px] absolute top-40  ">
            <div className="w-1/2 mx-auto">
                <h1 className="text-7xl text-center text-prPink font-[900]">
                Certificate como freelancer
                </h1>
                <h2 className="text-4xl text-center text-prPink leading-[2] font-extrabold">
                    ¡Ahora es posible!
                </h2>
                <div className="flex justify-center gap-4">
                    <button className="bg-prPink font-semibold hover:bg-slate-300 rounded-3xl px-8 py-2 mt-5">
                    Cotizarme
                    </button>
                    <button className="bg-prPink font-semibold hover:bg-slate-300 rounded-3xl px-8 py-2 mt-5">
                    Cotizarme
                    </button>    
            </div>
          <div className="flex justify-center">
            <button className="bg-prPink font-semibold hover:bg-slate-300 rounded-3xl px-9 py-2 mt-5">
              Quiero mi certificacion gratuita
            </button>
          </div>
          </div>
          
        </div>
        <div className="w-1/2 pl-40">
          <Image
            src={woman}
            alt="Picture of the author"
            className="object-contain h-[500px] w-[1000px]"
          />
        </div>
      </div> */}
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
    </>
  );
}

export default Profile;

"use client";
import Image from "next/image";
import './globals.css';

function Profile() {
  return (
    <>
        <div className="h-[100vh] bg">
        <div className="w-full h-[350px] absolute top-48  ">
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
                    Freelancer
                    </button>    
            </div>
          <div className="flex justify-center">
            <button className="bg-prPink font-semibold hover:bg-slate-300 rounded-3xl px-9 py-2 mt-8">
              Quiero mi certificacion gratuita
            </button>
          </div>
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
        <section className="py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16">
      
    


        </section>


    </>
  );
}

export default Profile;

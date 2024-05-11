"use client"
import Image from "next/image";
import avatar from "@/ui/avatar.jpg";
import Link from "next/link";
import project from "@/ui/project.webp";
import certs from "@/ui/certs.jpg";
import Icon from '@mdi/react';
import { mdiMapMarker,mdiAccountSchool,mdiCertificateOutline,mdiHeadCogOutline, mdiPencilCircle} from '@mdi/js';
import { useEffect, useState } from 'react';
import ModalProject from "@/components/Modal/ModalProject";
import ModalInfo from "@/components/Modal/ModalInfo";
import { DropdownProject } from "@/components/Dropdown/DropdownProject";

function profile() {
  const active =
    "flex gap-1 items-center px-3 py-1 border-b-4 text-prBlue font-bold border-prBlue";
  const noActive = "flex gap-1 items-center px-3 py-1 border-b-4 border-white";
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Ajusta el valor (100 en este ejemplo) al punto en el que deseas que el encabezado aparezca
      setShowNav(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento de escucha al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="relative">
      <div className="md:sticky md:top-0 bg-slate-100 md:pt-6 md:pl-2">
      
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-20">
            <div className="mx-auto md:mx-0">
              <Image
              width={100}
              height={50}
              alt=""
              src={avatar}
              className=" rounded-full  "
            />
            </div>
            
            <div className="p-2 bg-slate-100 w-[70%] mx-auto md:mx-0 md:w-[30vw] rounded-md shadow-xl border-2 border-gray-300">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Juan Perez</h2>
                <Icon className="cursor-pointer" path={mdiPencilCircle} size={1.2} />
              </div>
              
              <div className="flex">
                <Icon path={mdiMapMarker} size={1} />
                <p className="text-slate-400">Ubicacion</p>               
              </div>
              <div className="mt-2 flex">
                <Icon path={mdiAccountSchool} size={1} />
                <p className="text-slate-400">Profesión</p>  
              </div>        
            </div>
          </div>         
       
        <div className={`flex h-14 lg:ml-20 md:mt-8 mt-3 justify-between sm:justify-start sm:gap-1 ${showNav ? "mxmd:fixed mxmd:top-0 mxmd:z-50 mxmd:mt-0 mxmd:w-screen mxmd:bg-slate-100" : ""}`}>
          <Link href={"#"} className={active}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <span className="hidden sm:block">Sobre Mi</span>
          </Link>
          <Link href={"#proyectos"} className={noActive}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <span className="hidden sm:block">Proyectos</span>
          </Link>
          <Link href={`#habilidades`} className={noActive}>
            <Icon className="w-6 h-6" path={mdiHeadCogOutline}  />
            <span className="hidden sm:block">Habilidades</span>
          </Link>
          <Link href={"#certificaciones"} className={noActive}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg> */}
            <Icon  className="pt-1 h-7" path={mdiCertificateOutline} />
            <span className="hidden sm:block">Certificaciones</span>
          </Link>
        </div>
      </div>

      <div className="fixed h-40 md:right-5 md:top-56 hidden md:block w-[30vw]">
        <div className=" w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          {/* <div className="flex justify-center -mt-16 md:justify-end">
            <Image
              width={100}
              height={100}
              className="object-cover w-20 h-20 border-2  rounded-full dark:border-black"
              alt="Testimonial avatar"  
              src={certi}
            />
          </div> */}

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            Design Tools
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 pb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error.
          </p>
          <div className="flex justify-center items-center mx-auto">
            <button className=" px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">
              Quiero mi certificado
            </button>
          </div>
        </div>
      </div>
      
        <div className="fixed bottom-0 bg-white w-screen flex justify-center items-center h-16  md:hidden ">
            <button className="fixed px-8 py-2 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">
              Quiero mi certificado
            </button>
        </div>
      
      <div
        className="block md:w-[60vw] m-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sobre Mi
          </h5>
        <ModalInfo />
        </div>
        
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>       
      </div>

      <div>
        <h2 id="proyectos" className="ml-8 text-2xl font-semibold">
          Proyectos
        </h2>
      </div>

      <div
        className="flex flex-col items-center m-8 bg-white border border-gray-200 rounded-lg shadow md:w-[60vw] md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          unoptimized
          className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg "
          src={project}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
            </h5> 
            <DropdownProject/>
          </div>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div>
            <ModalProject/>
          </div> 
        </div>
      </div>
      <div
        className="flex flex-col items-center m-8 bg-white border border-gray-200 rounded-lg shadow md:w-[60vw] md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          unoptimized
          className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg "
          src={certs}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-screen">
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
            </h5>
            <DropdownProject/>
          </div>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div>
            <ModalProject/>
          </div> 
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-[60vw] gap-y-4 md:gap-x-4 m-8">
        <div
          className="block   p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between">
            <h5
            id="habilidades"
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Habilidades
            </h5>
            <ModalInfo />
          </div>         
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        <div
          id="idiomas"
          className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Idiomas
            </h5>
            <ModalInfo />
          </div>
          
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

      <a
        href="#"
        className="block md:w-[60vw] m-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="flex justify-between">
          <h5
          id="certificaciones"
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Certificaciones
          </h5>
          <ModalInfo/>
        </div>
        
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>

    </main>
  );
}

export default profile;

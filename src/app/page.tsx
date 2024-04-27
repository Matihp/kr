"use client";
import Image from "next/image";
import imagen from "@/ui/imagen.png";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import Icon from "@mdi/react";
import {
  mdiMapMarker,
  mdiTwitter,
  mdiGithub,
  mdiLinkedin,
  mdiInstagram,
  mdiYoutube,
} from "@mdi/js";

function Profile() {
  const [parent, tapes] = useDragAndDrop<HTMLDivElement, string>(
    [
      "Depeche Mode",
      "Duran Duran",
      "Pet Shop Boys",
      "Kraftwerk",
      "Tears for Fears",
      "Spandau Ballet",
    ],
    {
      plugins: [animations()],
    }
  );

  return (
    <>
      <div className="container flex justify-center mx-auto flex-col md:flex-row">
        <div className="container h-[44vh] sm:w-[55vw]  md:m-10 dark:bg-gray-800 border-[8px] border-gray-800 rounded-xl ">
          <div className="relative flex h-[47vh] w-full rounded-xl bg-cover ">
            <Image
              width={100}
              height={100}
              alt="Picture of the author"
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
              className="absolute flex w-full h-full justify-center rounded-xl bg-cover"
            />
            <div className="absolute -bottom-3 h-[87px] -left-2 rounded-full border-[4px] border-black dark:border-gray-800 bg-pink-400 ">
              <Image
                width={100}
                height={100}
                className="h-full w-full rounded-full"
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
                alt=""
              />
            </div>
          </div>
          {/* <div className=" flex flex-col items-center">
            <p className="font-bold text-white pt-6">Freelancer Profile</p>
          </div> */}
        </div>
        <div className="container w-1/3 h-1/2 border-gray-800 mt-10 bg-gray-800">
          <div className="mt-6 text-center ">
            <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
              Angelina Luca
            </h3>
            <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
              <Icon path={mdiMapMarker} size={1} />
              <div className="font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-md">
                Front-end
              </div>
            </div>
            <div className="w-full text-center">
              <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                <div className="flex space-x-2">
                  <a
                    className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.twitter.com/"
                    rel="noopener"
                    aria-label="Twitter"
                    target="_blank"
                  >
                    <Icon path={mdiTwitter} size={1} />
                  </a>

                  <a
                    className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.github.com/"
                    rel="noopener"
                    aria-label=" Github"
                    target="_blank"
                  >
                    <Icon path={mdiGithub} size={1} />
                  </a>

                  <a
                    className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.linkedin.com/in/"
                    rel="noopener"
                    aria-label="Linkedin"
                    target="_blank"
                  >
                    <Icon path={mdiLinkedin} size={1} />
                  </a>

                  <a
                    className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.instagram.com/"
                    rel="noopener"
                    aria-label="Instagram"
                    target="_blank"
                  >
                    <Icon path={mdiInstagram} size={1} />
                  </a>

                  <a
                    className="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.youtube.com/"
                    rel="noopener"
                    aria-label="Youtube"
                    target="_blank"
                  >
                    <Icon path={mdiYoutube} size={1} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-6">
                <p className="mb-4 font-light leading-relaxed text-white dark:text-gray-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  turpis orci, maximus sed purus a, cursus scelerisque purus.
                  Morbi molestie, odio at sagittis rhoncus, felis massa iaculis
                  mi, quis molestie erat ipsum vel risus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start gap-2 mt-10">
        <div>
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Image
              width={100}
              height={96}
              className="object-cover w-full rounded-t-lg h-96 md:h-28 md:w-48 md:rounded-none md:rounded-s-lg"
              src={imagen}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Nombre del proyecto
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Descripcion
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                link repo - link sitio web
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Tecnologias verificadas por Krovit: java - react ----logo
                otros:...........150 caracteres
              </p>
            </div>
          </a>
        </div>
        <div>
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Image
              width={100}
              height={96}
              className="object-cover w-full rounded-t-lg h-96 md:h-44 md:w-48 md:rounded-none md:rounded-s-lg"
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
        </div>
      </div>
      <div
        className="grid grid-cols-2 gap-4 justify-items-center mt-16"
        ref={parent}
      >
        {tapes.map((tape:string) => (
          <a
            href="#"
            data-label={tape} key={tape}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
              <Image
                width={100}
                height={96}
                className="object-cover w-full rounded-t-lg h-96 md:h-44 md:w-48 md:rounded-none md:rounded-s-lg"
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {tape}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021
                  so far, in reverse chronological order.
                </p>
              </div>
          </a>
        ))}
      </div>

      {/* <div
        className="grid grid-cols-3 gap-4 justify-items-center mt-16"
        ref={parent}
      >
        {tapes.map((tape) => (
          <div className="cassette text-black" data-label={tape} key={tape}>
            {tape}
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Profile;

"use client";
import Card from "@/components/Card";
import Image from "next/image";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

function Home() {
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
        <div className="flex justify-center gap-8 items-center h-[100vh]">
          <div className="relative flex flex-col items-center rounded-[20px] w-[600px] p-4 bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
            <div className="relative flex h-60 w-full justify-center rounded-xl bg-cover">
              <Image
                width={100}
                height={100}
                alt="Picture of the author"
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                className="absolute flex h-80 w-full justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-28 mr-[500px] flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-black bg-pink-400 dark:!border-navy-700">
                <Image
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <p className="font-bold text-white pt-6">Product Manager page</p>
            </div>
          </div>
          {/* <div className="relative flex flex-col rounded-[20px] w-[400px] p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
              <h2 className='text-3xl text-center text-blue-400'>Angeline Doll</h2>
              <h4 className='text-black mt-4'>Sobre Mi</h4>
              <h5 className='text-black mt-4 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ab sed itaque veniam aperiam voluptas magnam impedit saepe debitis alias, odit expedita a dolores iure nisi cumque unde esse vero.</h5>
            </div>   */}
          <Card />
        </div>
       
         <div
          className="grid grid-cols-3 gap-4 justify-items-center mt-16"
          ref={parent}
        >
          {tapes.map((tape) => (
            <div className="cassette text-black" data-label={tape} key={tape}>
              {tape}
            </div>
          ))}
        </div>
      </>
    );
}

export default Home;

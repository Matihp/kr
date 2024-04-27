import Image from "next/image";
import avatar from "@/ui/avatar.jpg";
import Link from "next/link";
import certi from "@/ui/certif.jpg";
import project from "@/ui/project.webp";


function profile() {
  const active =
    "flex gap-1 items-center px-3 py-1 border-b-4 text-prBlue font-bold border-prBlue";
  const noActive = "flex gap-1 items-center px-3 py-1 border-b-4 border-white";
  return (
    <main className="">
      <div className="flex mt-10">
        <div className="flex gap-10">
          <Image
            width={100}
            height={50}
            alt=""
            src={avatar}
            className=" rounded-full"
          />
          <div className=" bg-slate-100 w-[30vw] rounded-md shadow-xl">
            <h2>Hola</h2>
          </div>
        </div>
      </div>
      <div className="flex md:ml-40 md:mt-8 mt-3 justify-between sm:justify-start sm:gap-1">
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
          <span className="hidden sm:block">Posts</span>
        </Link>
        <Link href={"#"} className={noActive}>
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
          <span className="hidden sm:block">About</span>
        </Link>
        <Link href={`#`} className={noActive}>
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
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <span className="hidden sm:block">Friends</span>
        </Link>
        <Link href={"#"} className={noActive}>
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="hidden sm:block">Photos</span>
        </Link>
      </div>
      <div className="absolute right-5 top-28">
        <div className=" w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex justify-center -mt-16 md:justify-end">
            <Image
              width={100}
              height={100}
              className="object-cover w-20 h-20 border-2  rounded-full dark:border-black"
              alt="Testimonial avatar"
              src={certi}
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            Design Tools
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error, rerum quas odio quaerat
            nam ex commodi hic, suscipit in a veritatis pariatur minus
            consequuntur!
          </p>
          <div className="flex justify-center items-center mx-auto">
            <button className=" px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">Quiero mi certificado</button>
          </div>
        </div>
      </div>

      <div className="flex border-red-200 border-4 h-[30vh] flex-col m-8 rounded-lg bg-white shadow-xl  shadow-secondary-1  text-black md:max-w-4xl md:flex-row">
        {/* <div className="flex-none w-48 relative">
          <Image width={100 } height={100} alt=""src={project} unoptimized className=" absolute inset-0 w-full h-full object-fit"/>
        </div> */}
        <div className="w-[50%] h-[100%] ">
          <Image width={100} height={100} unoptimized
          className=" w-full h-full rounded-md object-contain "
          src={project}
          alt=""
        />
        </div>
        
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium">Card title</h5>
          <p className="mb-4 text-base">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="text-xs  dark:text-neutral-300">
            Last updated 3 mins ago
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-40  md:max-w-4xl m-8">
        <div className="me-4  rounded-lg bg-black shadow-secondary-1 text-white ">
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Special title treatment
            </h5>
            <p className="mb-4 text-base">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Go somewhere
            </button>
          </div>
        </div>

        <div className=" me-4 rounded-lg bg-black shadow-secondary-1  text-white ">
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Special title treatment
            </h5>
            <p className="mb-4 text-base">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Go somewhere
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default profile;

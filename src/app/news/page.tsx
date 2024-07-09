import { Paginations } from "@/components/Pagination/Pagination";
import Link from "next/link";
import newsData from "./news.json";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
}

function News() {
  return (
    <div className="bg-white py-6 sm:py-6 md:pt-24">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            News
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {newsData.map((item: NewsItem) => (
            <div
              key={item.id}
              className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96"
            >
              <img
                src={item.image}
                loading="lazy"
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="relative mt-auto p-4">
                <span className="block text-sm text-gray-200">{item.date}</span>
                <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">
                  {item.title}
                </h2>
                <Link
                  href={item.link}
                  className="font-semibold text-indigo-300"
                >
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Paginations />
    </div>
  );
}

export default News;

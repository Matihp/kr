"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: string;
}

interface NewsData {
  news: NewsItem[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function News() {
  const [newsData, setNewsData] = useState<NewsData>({
    news: [],
    total: 0,
    page: 1,
    limit: 18,
    pages: 1
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/news`);
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-black py-6 sm:py-6 md:pt-24">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Noticias
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Esta es una sección de texto de relleno simple, también conocido como
            texto de marcador de posición. Comparte algunas características de un texto
            escrito real, pero es aleatorio o generado de otra manera.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {newsData.news.map((item: NewsItem) => (
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
                <span className="block text-sm text-gray-200">{new Date(item.createdAt).toLocaleDateString()}</span>
                <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">
                  {item.title}
                </h2>
                <Link
                  href={`/news/${item.id}`}
                  className="font-semibold text-indigo-300"
                >
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

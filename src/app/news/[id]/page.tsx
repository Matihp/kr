"use client"
import { useEffect, useState } from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function NewsDetail({params}: Params) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const {id} = params
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}/news/${id}`);
          const data = await response.json();
          setNews(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  if (!news) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-8 md:pt-24">
      <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-500 dark:text-gray-400 mb-4">{news.content}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Autor: {news.author}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Fecha de creación: {new Date(news.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Última actualización: {new Date(news.updatedAt).toLocaleDateString()}</p>
    </div>
  );
}

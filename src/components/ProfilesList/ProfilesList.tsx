"use client"
import { useState, useMemo, SVGProps } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Paginations } from "../Pagination/Pagination"

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

interface Filter {
  category: string[];
  price: [number, number];
  brand: string[];
}

export default function ProfilesList({user} : any) {
  const [selectedFilters, setSelectedFilters] = useState<Filter>({
    category: [],
    price: [0, 500],
    brand: [],
  })

  const products: Product[] = [
    {
      id: 1,
      name: "Capitan America",
      description: "Desarrollo sitio web personalizado para ChatGPT",
      price: 19.99,
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/351818690/original/3665db34473cd4c15d856de5e662159434eb7978/create-custom-3d-animations-and-interactions-in-webflow.png",
      category: "DesarrolladorWeb",
      brand: "Java",
    },
    {
      id: 2,
      name: "Hulk",
      description: "Desarrollo de aplicaciones móviles con integración de inteligencia artificial",
      price: 39.99,
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/292504149/original/67cb088d2f6fc8e13d485bc4b22fea6992e5f3cf/create-ai-chatbot-for-your-instagram-or-facebook-page-using-chatgpt-and-manychat.jpg",
      category: "DesarrolladorWeb",
      brand: "Html",
    },
    {
      id: 3,
      name: "Capitana Marvel",
      description: "Experta un sitio web en wordpress, wix o squarespace",
      price: 59.99,
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/191619991/original/9287551b484ea8ccd65dd8bb8dbb20711bf4dd0f/be-your-social-media-manager-and-content-creator.png",
      category: "Ux/Ui",
      brand: "Css",
    },
    {
      id: 4,
      name: "Black Panter",
      description: "Desarrollo de aplicaciones móviles con integración de inteligencia artificial",
      price: 99.99,
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/310802791/original/60f2bd80ec3b54cb93bdf4323706a1208e2b1c57/build-your-custom-ai-app-with-open-ai-and-machine-learning-models.png",
      category: "DevOps",
      brand: "React",
    },
    {
      id: 5,
      name: "Thor",
      description: "Desarrollo sitio web personalizado para ChatGPT",
      price: 79.99,
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/349340146/original/2318d2bb4bb4cbb4897c64fbc5f08128b6b7e35d/build-you-openai-gpt-agents.jpg",
      category: "DevOps",
      brand: "Python",
    },
    {
      id: 6,
      name: "Ironman",
      description: "Experto un sitio web en wordpress, wix o squarespace",
      price: 79.99,
      image: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/375285453/original/abab4e16e1728c5365993e1f56d7881170b6d412/create-ai-chatbot-ai-application-ai-software.png",
      category: "DesarrolladorWeb",
      brand: "Go",
    },
  ]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false;
      }
      if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
        return false;
      }
      return true;
    });
  }, [selectedFilters]);

  const handleCategoryChange = (category: string): void => {
    setSelectedFilters((prevFilters) => {
      const updatedCategory = prevFilters.category.includes(category)
        ? prevFilters.category.filter((item) => item !== category)
        : [...prevFilters.category, category];

      return {
        ...prevFilters,
        category: updatedCategory,
      };
    });
  };

  const handleBrandChange = (brand: string): void => {
    setSelectedFilters((prevFilters) => {
      const updatedBrand = prevFilters.brand.includes(brand)
        ? prevFilters.brand.filter((item) => item !== brand)
        : [...prevFilters.brand, brand];

      return {
        ...prevFilters,
        brand: updatedBrand,
      };
    });
  };

  const handleReset = (filterType: 'category' | 'brand'): void => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: [],
    }));
  };

  return (
    <div className="container mx-auto py-8 md:pt-24">
      <header className="bg-gray-100 dark:bg-gray-800 p-4 mb-6">
        <div className="flex sm:items-center justify-start gap-11 mxsm:flex-col mxsm:gap-5">
          <h1 className="text-2xl font-bold">Perfiles Freelance</h1>
          <div className="md:w-[40vw]">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar palabra clave..."
                className="bg-white dark:bg-gray-950 pl-8 py-2 md:pr-4 rounded-md w-full"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-4">Filtros</h2>
          <div className="mb-4">
            <details
              open
              className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
              >
                <span className="text-sm font-medium"> Categorías </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700"> {selectedFilters.category.length} Seleccionados </span>

                  <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={() => handleReset('category')}>
                    Reset
                  </button>
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    <label htmlFor="FilterDesarrolladorWeb" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterDesarrolladorWeb"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.category.includes("DesarrolladorWeb")}
                        onChange={() => handleCategoryChange("DesarrolladorWeb")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Desarrollador Web </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterUx/Ui" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterUx/Ui"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.category.includes("Ux/Ui")}
                        onChange={() => handleCategoryChange("Ux/Ui")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Ux/Ui </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterDevOps" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterDevOps"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.category.includes("DevOps")}
                        onChange={() => handleCategoryChange("DevOps")}
                      />

                      <span className="text-sm font-medium text-gray-700"> DevOps </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>
          </div>
          <div>
            <details
              className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
              >
                <span className="text-sm font-medium"> Tecnologías </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700"> {selectedFilters.brand.length} Seleccionados </span>

                  <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={() => handleReset('brand')}>
                    Reset
                  </button>
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    <label htmlFor="FilterJava" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterJava"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.brand.includes("Java")}
                        onChange={() => handleBrandChange("Java")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Java </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterHtml" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterHtml"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.brand.includes("Html")}
                        onChange={() => handleBrandChange("Html")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Html </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterCss" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterCss"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.brand.includes("Css")}
                        onChange={() => handleBrandChange("Css")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Css </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterReact" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterReact"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.brand.includes("React")}
                        onChange={() => handleBrandChange("React")}
                      />

                      <span className="text-sm font-medium text-gray-700"> React </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterPython" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterPython"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.brand.includes("Python")}
                        onChange={() => handleBrandChange("Python")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Python </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterGo" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterGo"
                        className="size-5 rounded border-gray-300"
                        checked={selectedFilters.brand.includes("Go")}
                        onChange={() => handleBrandChange("Go")}
                      />

                      <span className="text-sm font-medium text-gray-700"> Go </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-950 rounded-md overflow-hidden shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
                  <div className="">
                    <Button className="" variant="outline">Mas info</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Paginations/>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

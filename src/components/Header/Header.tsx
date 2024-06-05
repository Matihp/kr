"use client"
import Link from "next/link";
import logo from "@/ui/logo.png";
import Image from "next/image";
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { NavigationMenus } from "../NavigationMenu/NavigationMenu";

export function Header() {
  const [isOpen,setIsOpen]=useState(false)
  return (
    <>
    <header className="md:fixed animate-fade-in duration-700 inset-x-0 top-0 z-30 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-md lg:top-4 md:rounded-3xl md:w-[93vw] lg:w-[90vw]">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" href="/">
              <Image src={logo} alt="" className="h-7 w-auto" />
              <p className="sr-only">Website Title</p>
            </Link>
          </div>
          <div className="flex md:justify-end lg:justify-between md:w-[600px] md:gap-1">
            <div className="hidden md:flex md:items-center md:justify-end md:gap-1 lg:gap-5">
            <NavigationMenus/>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Noticias
            </Link>
            <Link
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Explorar
            </Link>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Precios
            </Link>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100 "
              href="/register"             
            >
              Regístrate
            </Link>
            <Link
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href="/login"  
            >
              Iniciar Sesión
            </Link>
            <button onClick={()=>setIsOpen(!isOpen)} type="button" className="inline-flex md:hidden items-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
          </div>
          </div>        
        </div>
      </div>   
    </header>
    {isOpen ? <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen}/> : ""}
    </>
  );
}

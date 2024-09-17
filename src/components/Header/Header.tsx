"use client";
import Link from "next/link";
import logo from "@/ui/logo.png";
import Image from "next/image";
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { NavigationMenus } from "../NavigationMenu/NavigationMenu";
import useHeaderStore from "@/lib/store/headerStore";
import { AvatarDropdown } from "../Dropdown/AvatarDropdown";
import { NotificationDropdown } from "../Dropdown/NotificationDropdown"; // Importa el hook useAuth
import { useAuth } from "@/lib/useAuth";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrollingHeader = useHeaderStore((state) => state.IsScrollingHeader);
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un loader esqueleto
  }

  return (
    <>
      {isScrollingHeader && (
        <header className="md:fixed sticky inset-x-0 top-0 animate-fade-in duration-700 z-50 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-md md:top-4 md:rounded-3xl md:w-[94vw]">
          <div className="px-4">
            <div className="flex items-center justify-between">
              <div className="flex shrink-0">
                <Link aria-current="page" className="flex items-center" href="/">
                  <Image src={logo} alt="" className="h-7 w-auto" />
                  <p className="sr-only">Website Title</p>
                </Link>
              </div>
              <div className="flex md:justify-end lg:justify-between md:w-[650px] lg:w-[630px] md:gap-1">
                <div className="hidden md:flex md:items-center md:justify-end lg:gap-2">
                  <NavigationMenus />
                  <Link
                    className="inline-block rounded-lg px-2 py-1 text-sm font-semibold text-[#39466e] transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="/list"
                  >
                    Freelancers
                  </Link>
                  <Link
                    aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-semibold text-[#39466e] transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="#"
                  >
                    Certificate
                  </Link>
                  <Link
                    className="inline-block rounded-lg px-2 py-1 text-sm font-semibold text-[#39466e] transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="/news"
                  >
                    Noticias
                  </Link>
                </div>
                <div className="flex items-center justify-end gap-3">
            {isAuthenticated ? (
              <>
                <NotificationDropdown />
                <AvatarDropdown />
              </>
            ) : (
              <>
                <Link
                  className="hidden md:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100"
                  href="/register"
                >
                  Regístrate
                </Link>
                <Link
                  className="hidden md:inline-flex items-center justify-center rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="/login"
                >
                  Ingresar
                </Link>
              </>
            )}
            <HamburgerMenu isConnected={isAuthenticated} />
          </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}

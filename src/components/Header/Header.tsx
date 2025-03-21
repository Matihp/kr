"use client";
import Link from "next/link";
import logo from "@/ui/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { NavigationMenus } from "../NavigationMenu/NavigationMenu";
import useHeaderStore from "@/lib/store/headerStore";
import { AvatarDropdown } from "../Dropdown/AvatarDropdown";
import { NotificationDropdown } from "../Dropdown/NotificationDropdown";
import { useAuth } from "@/lib/useAuth";

export function Header() {
  const isScrollingHeader = useHeaderStore((state) => state.IsScrollingHeader);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user, checkAuth, logout } = useAuth();
  const stylesLink="inline-block rounded-lg px-2 py-1 text-sm font-semibold text-[#39466e] transition-all duration-200 hover:bg-gray-100 hover:text-gray-900";

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

  return (
    <>
      {isScrollingHeader && (
        <header className="md:fixed sticky inset-x-0 top-0 animate-fade-in duration-700 z-50 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-md md:top-4 md:rounded-3xl md:w-[94vw]">
          <div className="px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex shrink-0">
                <Link
                  aria-current="page"
                  className="flex items-center"
                  href="/"
                >
                  <Image src={logo} alt="" className="h-7 w-auto" />
                </Link>
              </div>
              <div className="flex flex-grow justify-end">
                <div className="hidden md:flex md:items-center md:justify-end gap-2 flex-grow">
                  <NavigationMenus />
                  <Link
                    className={stylesLink}
                    href="/list"
                  >
                    Freelancers
                  </Link>
                  {isAuthenticated ? (
                    <>
                    <Link
                      className={stylesLink}
                      href="/projects"
                    >
                      Proyectos
                    </Link>
                    <Link
                      className={stylesLink}
                      href="/gigs"
                    >
                      Trabajos
                    </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        aria-current="page"
                        className={stylesLink}
                        href="/certificate"
                      >
                        Certificate
                      </Link>
                      <Link
                        className={stylesLink}
                        href="/news"
                      >
                        Noticias
                      </Link>
                    </>
                  )}
                </div>
                {/* Auth Buttons*/}
                <div
                  className={`flex items-center justify-end ${
                    isAuthenticated ? "gap-0" : "gap-3"
                  } ml-4`}
                >
                  {isLoading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  ) : isAuthenticated ? (
                    <>
                      <NotificationDropdown />
                      <AvatarDropdown user={user} logout={logout} />
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

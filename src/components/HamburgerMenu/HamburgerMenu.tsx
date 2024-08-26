"use client"
import { useState } from "react"
import { Menu, Users, User,UserRoundPlus, Settings, LogOut,GraduationCap,LayoutList,Newspaper} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function HamburgerMenu({isConnected}: {isConnected: boolean}) {
  const [isOpen, setIsOpen] = useState(false)
  const userName = "Juan Lopez"

  return (
    <div className="relative md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-gradient-to-b from-white to-sky-100">
          <SheetHeader>
            <SheetTitle className="text-left text-2xl font-bold text-sky-700">Menú</SheetTitle>
          </SheetHeader>
          {isConnected ? (
          <div className="flex flex-col gap-6 py-6">
            <div className="flex items-center gap-4 px-2">
              <Avatar className="h-16 w-16 border-2 border-sky-300">
                <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                <AvatarFallback className="text-xl bg-sky-200 text-sky-700">{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-lg font-semibold text-sky-800">{userName}</span>
                <p className="text-sm text-sky-600">usuario@ejemplo.com</p>
              </div>
            </div>
            <Separator className="bg-sky-200" />
            <nav className="space-y-2">
              <Link href={"/profile"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <User className="h-5 w-5" />
                Perfil
              </Link>
              <Link href={"/settings"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <Settings className="h-5 w-5" />
                Configuración
              </Link>
            </nav>
            <Separator className="bg-sky-200" />
            <Link href={"/"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50 mt-auto" onClick={() => setIsOpen(false)}>
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </Link>
          </div>
          ) : (
          <div className="flex flex-col gap-6 py-6">
            <Separator className="bg-sky-200" />
            <nav className="space-y-3">
              <Link href={"#"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <LayoutList className="h-5 w-5" />
                Categorias
              </Link>
              <Link href={"/list"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <Users className="h-5 w-5" />
                Freelancers
              </Link>
              <Link href={"/certificate"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <GraduationCap className="h-5 w-5" />
                Certificate
              </Link>
              <Link href={"/news"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <Newspaper className="h-5 w-5" />
                Noticias
              </Link>
            </nav>
            <Separator className="bg-sky-200" />
            <div className="space-y-3">
              <Link href={"/register"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <UserRoundPlus className="h-5 w-5" />
                Registrate
              </Link>
              <Link href={"/login"} className="w-full flex items-center gap-3 text-lg text-sky-700 hover:bg-sky-200/50" onClick={() => setIsOpen(false)}>
                <LogOut className="h-5 w-5" />
                Iniciar sesión
              </Link>
            </div>
            
          </div>
          )}
          
        </SheetContent>
      </Sheet>
    </div>
  )
}

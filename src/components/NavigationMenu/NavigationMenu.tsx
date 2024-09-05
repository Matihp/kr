"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Desarrollo Web",
    href: "/docs/categories/web-development",
    description:
      "Freelancers especializados en el desarrollo de sitios web y aplicaciones web.",
  },
  {
    title: "Diseño Gráfico",
    href: "/docs/categories/graphic-design",
    description:
      "Freelancers que ofrecen servicios de diseño gráfico, incluyendo logotipos, branding y más.",
  },
  {
    title: "Marketing Digital",
    href: "/docs/categories/digital-marketing",
    description:
      "Expertos en marketing digital que pueden ayudarte a mejorar tu presencia en línea y atraer más clientes.",
  },
  {
    title: "Redacción y Traducción",
    href: "/docs/categories/writing-translation",
    description:
      "Freelancers que ofrecen servicios de redacción, edición y traducción de contenido.",
  },
  {
    title: "Desarrollo de Software",
    href: "/docs/categories/software-development",
    description:
      "Desarrolladores de software que pueden crear aplicaciones personalizadas para tus necesidades.",
  },
  {
    title: "Consultoría y Asesoramiento",
    href: "/docs/categories/consulting-advisory",
    description:
      "Consultores que ofrecen asesoramiento en diversas áreas, desde negocios hasta tecnología.",
  },
  {
    title: "Fotografía y Video",
    href: "/docs/categories/photography-video",
    description:
      "Fotógrafos y videógrafos que pueden capturar y editar imágenes y videos de alta calidad.",
  },
  {
    title: "Administración y Asistencia Virtual",
    href: "/docs/categories/virtual-assistance",
    description:
      "Asistentes virtuales que pueden ayudarte con tareas administrativas y de gestión.",
  },
  {
    title: "Desarrollo de Aplicaciones Móviles",
    href: "/docs/categories/mobile-app-development",
    description:
      "Desarrolladores especializados en la creación de aplicaciones móviles para iOS y Android.",
  },
  {
    title: "SEO y Optimización de Motores de Búsqueda",
    href: "/docs/categories/seo-optimization",
    description:
      "Expertos en SEO que pueden mejorar el posicionamiento de tu sitio web en los motores de búsqueda.",
  }
];

export function NavigationMenus() {
  return (
    <NavigationMenu>
      <NavigationMenuList >
        <NavigationMenuItem >
          <NavigationMenuTrigger className="py-1 text-[#39466e] font-semibold">Categorias</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

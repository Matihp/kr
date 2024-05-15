"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { useState } from "react";
import ModalProject from "../Modal/ModalProject";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

export function DropdownProject() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Icon className="cursor-pointer h-12 md:h-9" path={mdiPencilCircle}  />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel >My Project</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                Editar
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Eliminar
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Compartir
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
        </DropdownMenuContent>
        </DropdownMenu>
        {isModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center">
             <div
               className="fixed inset-0 w-full h-full bg-black opacity-80"
               onClick={() => setIsModalOpen(false)}
             ></div>
             <div className="bg-white rounded-md shadow-lg px-4 py-6 w-full max-w-lg mx-auto relative">
               <button
                 className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                 onClick={() => setIsModalOpen(false)}
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="w-6 h-6"
                   viewBox="0 0 20 20"
                   fill="currentColor"
                 >
                   <path
                     fillRule="evenodd"
                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                     clipRule="evenodd"
                   />
                 </svg>
               </button>
               <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="w-5 h-5 text-green-600"
                   viewBox="0 0 20 20"
                   fill="currentColor"
                 >
                   <path
                     fillRule="evenodd"
                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                     clipRule="evenodd"
                   />
                 </svg>
               </div>
               <h3 className="text-lg font-medium text-gray-800 text-center mt-3">
                 {" "}
                 Successfully accepted!
               </h3>
               <p className="mt-1 text-sm leading-relaxed text-center text-gray-500">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                 eget lorem dolor sed viverra ipsum nunc. Consequat id porta nibh
                 venenatis.
               </p>
               <div className="items-center gap-2 mt-3 text-sm sm:flex">
                 <button
                   className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                   onClick={() => setIsModalOpen(false)}
                 >
                   Dashboard
                 </button>
                 <button
                   className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                   aria-label="Close"
                   onClick={() => setIsModalOpen(false)}
                 >
                   Undo
                 </button>
               </div>
             </div>
           </div>
        )
        }
    </>
  )
}

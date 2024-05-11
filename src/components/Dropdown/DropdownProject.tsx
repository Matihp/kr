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

export function DropdownProject() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Icon className="cursor-pointer" path={mdiPencilCircle} size={1.2} />
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
        {isModalOpen && <ModalProject/>}
    </>
  )
}

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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import ModalInfo from "../Modal/ModalInfo";
import { Button } from "../ui/button";

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  imageSrc: string;
  website: string;
  repository: string;
}

// Esta interfaz representa los datos que recibiremos del formulario
interface ProjectFormData {
  id?: string; // Añadimos 'id' como opcional
  title: string;
  role: string;
  description: string;
  skills: string[];
  image?: File | null; // Ahora "image" es opcional
  website: string;
  repository: string;
  imageSrc?: string; // Añadimos "imageSrc" como opcional
}

interface DropdownProjectProps {
  project: Project;
  onEdit: (projectData: ProjectFormData) => void;
  onDelete: (projectId: string) => void;
}

export function DropdownProject({ project, onEdit, onDelete }: DropdownProjectProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProject = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = () => {
    onDelete(project.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon className="cursor-pointer h-12 md:h-6" path={mdiPencilCircle} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Project</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleEditProject}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteProject}>
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
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="w-full max-w-none max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              All fields are required unless otherwise indicated.
            </DialogDescription>
          </DialogHeader>
          <ModalInfo onAddProject={onEdit} projectToEdit={project} />
          <DialogFooter className="flex justify-between">
            <Button variant="ghost">Save as draft</Button>
            <Button variant="default">Next: Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}




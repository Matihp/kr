import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { useState } from "react";
import ModalInfo from "../Modal/ModalInfo";

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  images: string[];
  website: string;
  repository: string;
}

interface ProjectFormData {
  id?: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  images: (File | string)[];
  website: string;
  repository: string;
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

  const handleEditSubmit = (editedProject: ProjectFormData) => {
    onEdit({
      ...editedProject,
      id: project.id,
      images: editedProject.images.map(image =>
        typeof image === 'string' ? image : URL.createObjectURL(image)
      ),
    });
    setIsEditModalOpen(false);
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
      <ModalInfo
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onAddProject={handleEditSubmit}
        projectToEdit={project}
      />
    </>
  );
}




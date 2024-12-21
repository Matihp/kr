import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Dropzone from "../ui/file-input";
import TechTagsInput from "../TagsInput/TechTagsInput";
import { Alert, AlertDescription } from "../ui/alert";


interface ProjectFormData {
  id?: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  images: string[];
  website: string;
  repository: string;
}

interface ModalInfoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProject: (project: ProjectFormData) => void;
  projectToEdit?: ProjectFormData;
}

function ModalInfo({ isOpen, onOpenChange, onAddProject, projectToEdit }: ModalInfoProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    role: "",
    description: "",
    skills: [],
    images: [],
    website: "",
    repository: "",
  });
  const [tagError, setTagError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        ...projectToEdit,
        images: projectToEdit.images || [],
      });
    }
  }, [projectToEdit]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSkillsChange = useCallback((skills: string[]) => {
    setFormData((prev) => ({ ...prev, skills }));
  }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen a Cloudinary");
    }

    const data = await response.json();
    return data.url;
  };

  const handleImageUpload = useCallback(async (files: File[]) => {
    try {
      const uploadedImages = await Promise.all(files.map(uploadToCloudinary));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
      setFileError(null);
    } catch (error) {
      setFileError("Error al subir las imágenes. Por favor, inténtalo nuevamente.");
    }
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.images.length) {
        setFileError("Por favor, agregue al menos una imagen.");
        return;
      }
      if (!formData.skills.length) {
        setTagError("Por favor, agregue al menos una habilidad.");
        return;
      }

      onAddProject(formData);
      onOpenChange(false);
      setFormData({
        title: "",
        role: "",
        description: "",
        skills: [],
        images: [],
        website: "",
        repository: "",
      });
      setFileError(null);
      setTagError(null);
    },
    [formData, onAddProject]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-none max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="px-4">
          <DialogHeader>
            <DialogTitle>{projectToEdit ? "Edit Project" : "Agregar un nuevo proyecto"}</DialogTitle>
            <DialogDescription>
              All fields are required unless otherwise indicated.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 mt-4">
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="space-y-2">
                <label htmlFor="project-title" className="block text-sm font-medium">
                  Titulo del proyecto
                </label>
                <Input
                  name="title"
                  required
                  minLength={5}
                  maxLength={100}
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Introduce un título breve pero descriptivo."
                />
              </div>
              <div className="space-y-2 pt-5 md:pt-0">
                <label htmlFor="project-title" className="block text-sm font-medium">
                  Rol que desempeñaste en el proyecto
                </label>
                <Input
                  name="role"
                  required
                  minLength={5}
                  maxLength={40}
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Por ej. desarrollador front-end o analista de marketing"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="project-title" className="block text-sm font-medium">
                Descripción del proyecto
              </label>
              <Textarea
                name="description"
                required
                minLength={10}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe brevemente los objetivos del proyecto, tu solución y el impacto que tuviste aquí."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="project-title" className="block text-sm font-medium">
                Tecnologías del proyecto
              </label>
              <TechTagsInput value={formData.skills} onChange={handleSkillsChange} />
              {tagError && (
                <Alert variant="destructive">
                  <AlertDescription>{tagError}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="project-title" className="block text-sm font-medium">
                Archivos del proyecto
              </label>
              <Dropzone onDrop={handleImageUpload} />
            </div>
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            {fileError && (
              <Alert variant="destructive">
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            )}
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="space-y-2">
                <label htmlFor="project-title" className="block text-sm font-medium">
                  Sitio Web del proyecto
                </label>
                <Input
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                />
              </div>
              <div className="space-y-2 pt-5 md:pt-0">
                <label htmlFor="project-title" className="block text-sm font-medium">
                  Repositorio del proyecto
                </label>
                <Input
                  name="repository"
                  required
                  value={formData.repository}
                  onChange={handleInputChange}
                  placeholder="Enlace de github,gitlab,bitbucket,etc."
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mxmd:grid mxmd:grid-cols-2 mxmd:gap-4 mt-8">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              {projectToEdit ? "Guardar cambios" : "Agregar Proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalInfo;
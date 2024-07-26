import React, { useState, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Dropzone from "../ui/file-input";
import TechTagsInput from "../TagsInput/TechTagsInput";
import { Alert, AlertDescription } from '../ui/alert';

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

interface ModalInfoProps {
  onAddProject: (project: ProjectFormData) => void;
  projectToEdit?: ProjectFormData;
}

function ModalInfo({ onAddProject, projectToEdit }: ModalInfoProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: projectToEdit?.title || '',
    role: projectToEdit?.role || '',
    description: projectToEdit?.description || '',
    skills: projectToEdit?.skills || [],
    image: projectToEdit?.image || null,
    website: projectToEdit?.website || '',
    repository: projectToEdit?.repository || '',
  });
  const [tagError, setTagError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        id: projectToEdit.id,
        title: projectToEdit.title,
        role: projectToEdit.role,
        description: projectToEdit.description,
        skills: projectToEdit.skills,
        image: projectToEdit.image || null,
        website: projectToEdit.website,
        repository: projectToEdit.repository,
      });
    }
  }, [projectToEdit]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSkillsChange = useCallback((skills: string[]) => {
    setFormData(prev => ({ ...prev, skills }));
  }, []);

  const handleImageUpload = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const { image, ...otherData } = formData;
    let imageSrc: string;

    if (!formData.image && !otherData.skills.length) {
      setFileError("Por favor, agregue al menos una imagen.");
      setTagError("Por favor, agregue al menos una habilidad.");
      return;
    }
    if (!formData.image) {
      setFileError("Por favor, agregue al menos una imagen.")
      return;
    }
    if (!otherData.skills.length) {
      setTagError("Por favor, agregue al menos una habilidad.")
      return;
    }

    if (image) {
      if (image instanceof Blob) {
        imageSrc = URL.createObjectURL(image);
      } else {
        console.error("Invalid file type:", image);
        return;
      }
    } else {
      imageSrc = '/placeholder-image.jpg';
    }

    onAddProject({
      ...otherData,
      image, // Añadimos "image" solo si no es null
      imageSrc
    });
    setOpen(false);
    setFormData({
      title: '',
      role: '',
      description: '',
      skills: [],
      image: null,
      website: '',
      repository: '',
    });
    setFileError(null)
    setTagError(null)
  }, [formData, onAddProject]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center justify-center rounded-xl bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">+</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-none max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{projectToEdit ? 'Edit Project' : 'Add a new portfolio project'}</DialogTitle>
            <DialogDescription>All fields are required unless otherwise indicated.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <Input name="title" required minLength={5} maxLength={100} value={formData.title} onChange={handleInputChange} placeholder="Project title" />
            <Input name="role" required minLength={5} maxLength={40} value={formData.role} onChange={handleInputChange} placeholder="Your role (optional)" />
            <Textarea name="description" required minLength={10} value={formData.description} onChange={handleInputChange} placeholder="Project description" />
            <TechTagsInput value={formData.skills} onChange={handleSkillsChange} />
            {tagError && (
              <Alert variant="destructive">
                <AlertDescription>{tagError}</AlertDescription>
              </Alert>
            )}
            <Dropzone onDrop={handleImageUpload} />
            {fileError && (
              <Alert variant="destructive">
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            )}
            <Input name="website" required value={formData.website} onChange={handleInputChange} placeholder="Project website" />
            <Input name="repository" required value={formData.repository} onChange={handleInputChange} placeholder="Project repository" />
          </div>
          <DialogFooter className="flex justify-between">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="default">{projectToEdit ? 'Save Changes' : 'Add Project'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalInfo;



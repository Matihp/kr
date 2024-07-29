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
  id?: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  images: (File | string)[];
  website: string;
  repository: string;
}

interface ModalInfoProps {
  onAddProject: (project: ProjectFormData) => void;
  projectToEdit?: ProjectFormData;
}

function ModalInfo({ onAddProject, projectToEdit }: ModalInfoProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    role: '',
    description: '',
    skills: [],
    images: [],
    website: '',
    repository: '',
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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSkillsChange = useCallback((skills: string[]) => {
    setFormData(prev => ({ ...prev, skills }));
  }, []);

  const handleImageUpload = useCallback((files: File[]) => {
    setFormData(prev => {
      const newImages = [...prev.images, ...files];
      return { ...prev, images: newImages.slice(0, 10) };
    });
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
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
    setOpen(false);
    setFormData({
      title: '',
      role: '',
      description: '',
      skills: [],
      images: [],
      website: '',
      repository: '',
    });
    setFileError(null);
    setTagError(null);
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
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
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




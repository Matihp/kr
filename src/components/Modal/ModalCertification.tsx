"use client";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PencilIcon } from "../ui/icons";
import { PlusIcon, TrashIcon } from "lucide-react";

type Certification = {
  id: string;
  name: string;
  date: string;
  url: string;
  description: string
};

type ModalCertificationsProps = {
  certifications: Certification[];
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
};

const ModalCertification: FC<ModalCertificationsProps> = ({ certifications, setCertifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddCertificationModalOpen, setIsAddCertificationModalOpen] = useState(false);
  const [isEditCertificationModalOpen, setIsEditCertificationModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormDirty) {
      console.log("Form is not dirty, not submitting");
      return;
    }
    setIsFormSubmitted(true);
  
    const formData = new FormData(e.currentTarget);
  
    const name = formData.get('name') as string;
    const date = formData.get('date') as string;
    const url = formData.get('url') as string;
    const description = formData.get('description') as string;
  
    console.log("Before updating certifications:", { name, date, url, description });
    console.log("Editing certification state:", editingCertification);
    if (editingCertification) {
      console.log("Updating certification with ID:", editingCertification.id);
      const updatedCertifications = certifications.map((cert) =>
        cert.id === editingCertification.id ? { ...cert, name, date, url, description } : cert
      );
      setCertifications(updatedCertifications);
    } else {
      console.log("Adding new certification");
      const newCertification: Certification = {
        id: crypto.randomUUID(),
        name,
        date,
        url,
        description,
      };
      setCertifications((prevCertifications: Certification[]) => [...prevCertifications, newCertification]);
    }
  
    handleCloseModal();
  };
  
  const handleCloseModal = () => {
    if (!isFormSubmitted) {
      console.log("Closing modal without submitting form");
    }
    setIsAddCertificationModalOpen(false);
    setIsEditCertificationModalOpen(false);
    setEditingCertification(null);
    setIsFormSubmitted(false);
    setIsFormDirty(false);
  };
  
  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  const handleEdit = (certification: Certification) => {
    console.log("Editing certification:", certification);
    setEditingCertification(certification);
    setIsEditCertificationModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCertifications((prevCertifications) =>
      prevCertifications.filter((cert) => cert.id !== id)
    );
  };

  const openAddCertificationModal = () => {
    setEditingCertification(null);
    setIsAddCertificationModalOpen(true);
  };

  return (
    <>
      <PencilIcon onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle>Certificaciones</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 mt-2">
            {certifications.map((certification) => (
              <div key={certification.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{certification.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Fecha: {certification.date}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">URL: {certification.url}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Descripción: {certification.description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(certification)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(certification.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button className="gap-2 mt-2" onClick={openAddCertificationModal}><PlusIcon className="h-4 w-4" /> Agregar Certificación</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddCertificationModalOpen} onOpenChange={setIsAddCertificationModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Certificación</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre de la Certificación</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue=""
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date">Fecha de Obtención</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue=""
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="url">URL de la Certificación</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  defaultValue=""
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue=""
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <Button variant="outline" onClick={() => {
                console.log("Cancel button clicked");
                handleCloseModal();
              }}>Cancelar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditCertificationModalOpen} onOpenChange={setIsEditCertificationModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Certificación</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre de la Certificación</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCertification?.name || ""}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date">Fecha de Obtención</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={editingCertification?.date || ""}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="url">URL de la Certificación</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  defaultValue={editingCertification?.url || ""}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingCertification?.description || ""}
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <Button variant="outline" onClick={() => {
                console.log("Cancel button clicked");
                handleCloseModal();
              }}>Cancelar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCertification;


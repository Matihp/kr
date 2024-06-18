"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PencilIcon } from "../ui/icons";

type Certification = {
  id: string;
  name: string;
  date: string;
  url: string;
  description: string;
};

function ModalCertification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddCertificationModalOpen, setIsAddCertificationModalOpen] = useState(false);
  const [isEditCertificationModalOpen, setIsEditCertificationModalOpen] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "Certificación 1",
      date: "2023-01-01",
      url: "https://example.com/cert1",
      description: "Descripción de la Certificación 1",
    },
    {
      id: "2",
      name: "Certificación 2",
      date: "2023-02-02",
      url: "https://example.com/cert2",
      description: "Descripción de la Certificación 2",
    },
  ]);
  const [editingCertification, setEditingCertification] = useState<Certification | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const date = formData.get('date') as string;
    const url = formData.get('url') as string;
    const description = formData.get('description') as string;

    if (editingCertification) {
      const updatedCertifications = certifications.map((cert) =>
        cert.id === editingCertification.id ? { ...cert, name, date, url, description } : cert
      );
      setCertifications(updatedCertifications);
    } else {
      const newCertification: Certification = {
        id: crypto.randomUUID(),
        name,
        date,
        url,
        description,
      };
      setCertifications((prevCertifications) => [...prevCertifications, newCertification]);
    }

    setIsAddCertificationModalOpen(false);
    setIsEditCertificationModalOpen(false);
    setEditingCertification(undefined);
  };

  const handleCancel = () => {
    setIsAddCertificationModalOpen(false);
    setIsEditCertificationModalOpen(false);
    setEditingCertification(undefined);
  };

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setIsEditCertificationModalOpen(true);
  };

  const openAddCertificationModal = () => {
    setEditingCertification(undefined);
    setIsAddCertificationModalOpen(true);
  };

  return (
    <>
      <PencilIcon onClick={() => setIsOpen(true)}/>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mis Certificaciones</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {certifications.map((certification) => (
              <div key={certification.id} className="flex items-center w-96 justify-between">
                <div>
                  <div className="font-medium">{certification.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Fecha: {certification.date}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">URL: {certification.url}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Descripción: {certification.description}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleEdit(certification)}>
                  Editar
                </Button>
              </div>
            ))}
            <Button onClick={openAddCertificationModal}>Agregar Certificación</Button>
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
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue=""
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
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
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingCertification?.description || ""}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCertification;


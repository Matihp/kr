"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

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
    const name = e.currentTarget.name.value as string;
    const date = e.currentTarget.date.value as string;
    const url = e.currentTarget.url.value as string;
    const description = e.currentTarget.description.value as string;
    const newCertification = {
      id: crypto.randomUUID(),
      name,
      date,
      url,
      description,
    } as Certification;
  
    if (editingCertification) {
      const updatedCertifications = certifications.map((cert) =>
        cert.id === editingCertification.id ? newCertification : cert,
      );
      setCertifications([...updatedCertifications, newCertification]);
    } else {
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

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ver Certificaciones</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mis Certificaciones</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
                <Button variant="outline" size="sm" onClick={() => handleEdit(certification)}>
                  Editar
                </Button>
              </div>
            ))}
            <Button onClick={() => setIsAddCertificationModalOpen(true)}>Agregar Certificación</Button>
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
                value={editingCertification?.name || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    name: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date">Fecha de Obtención</Label>
                <Input
                id="date"
                type="date"
                value={editingCertification?.date || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    date: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />

              </div>
              <div className="space-y-1.5">
                <Label htmlFor="url">URL de la Certificación</Label>
                <Input
                id="url"
                type="url"
                value={editingCertification?.url || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    url: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />

              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                id="description"
                value={editingCertification?.description || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    description: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />

              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <div>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
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
                value={editingCertification?.name || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    name: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date">Fecha de Obtención</Label>
                <Input
                id="date"
                type="date"
                value={editingCertification?.date || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    date: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="url">URL de la Certificación</Label>
                <Input
                id="url"
                type="url"
                value={editingCertification?.url || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    url: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                id="description"
                value={editingCertification?.description || ""}
                onChange={(e) => {
                    const updatedCertification = {
                    ...editingCertification,
                    description: e.target.value,
                    } as Certification;

                    setEditingCertification(updatedCertification);
                }}
                required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <div>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCertification;
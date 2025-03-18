"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { fetchProposalById, updatePropStatus, deleteProposal, updateProposal } from "@/api/proposalApi";
import { Proposal, ProposalStatus } from "@/types/proposal";
import { proposalStatusTranslations } from "@/lang/translations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ProposalDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    price: 0,
    description: "",
    videoUrl: ""
  });

  useEffect(() => {
    const getProposalDetails = async () => {
      try {
        const data = await fetchProposalById(id as string);
        setProposal(data);
        setEditForm({
          price: data.price,
          description: data.description,
          videoUrl: data.videoUrl || ""
        });
      } catch {
        setError("No se pudo cargar la propuesta");
      } finally {
        setLoading(false);
      }
    };

    id && getProposalDetails();
  }, [id]);

  useEffect(() => {
    if (!loading && proposal && user) {
      const isProposalOwner =
        user.userType === "freelancer" && user.id === proposal.freelancer.id;
      const isGigOwner =
        user.userType === "recruiter" && user.id === proposal.gig.recruiter?.id;
      if (!isProposalOwner && !isGigOwner) {
        router.push("/gigs");
      }
    }
  }, [loading, proposal, user, router]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!proposal) return; 
    try {
      const updatedProposal = await updatePropStatus(
        proposal.id,
        newStatus
      );
      setProposal(updatedProposal);
      toast.success("Estado actualizado", {
        description: `La propuesta ha sido ${newStatus === "accepted" ? "aceptada" : "rechazada"} correctamente.`,
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError("No se pudo actualizar el estado de la propuesta");
      toast.error("Error", {
        description: "No se pudo actualizar el estado de la propuesta.",
      });
    }
  };

  const handleEditProposal = async () => {
    if (!proposal) return;
    try {
      const formattedData = {
        ...editForm,
        price: Number(editForm.price),
        // Si videoUrl está vacío, enviarlo como null
        videoUrl: editForm.videoUrl.trim() === "" ? null : editForm.videoUrl
      };
      const updatedProposal = await updateProposal(proposal.id, formattedData);
      setProposal(updatedProposal);
      setIsEditDialogOpen(false);
      toast.success("Propuesta actualizada", {
        description: "La propuesta ha sido actualizada exitosamente",
      });
    } catch (error) {
      console.error("Error al editar:", error);
      toast.error("Error", {
        description: "No se pudo actualizar la propuesta.",
      });
    }
  };

  const handleDeleteProposal = async () => {
    if (!proposal) return;
    try {
      await deleteProposal(proposal.id);
      toast.success("Propuesta eliminada", {
        description: "La propuesta ha sido eliminada correctamente.",
      });
      router.push("/proposals");
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error", {
        description: "No se pudo eliminar la propuesta.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  if (!proposal)
    return (
      <div className="flex justify-center items-center h-screen">
        Propuesta no encontrada
      </div>
    );

  const isGigOwner = user?.userType === "recruiter" && user.id === proposal.gig.recruiter?.id;
  const isProposalOwner = user?.userType === "freelancer" && user.id === proposal.freelancer.id;
  const canUpdateStatus = isGigOwner && proposal.status === ProposalStatus.PENDING;
  const canEditOrDelete = isProposalOwner && proposal.status === ProposalStatus.PENDING;

  const getTranslatedStatus = (status: string) => {
    return (
      proposalStatusTranslations[
        status as keyof typeof proposalStatusTranslations
      ] || status
    );
  };

  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Detalles de la Propuesta</h1>
        <div className="flex gap-4">
          <Link href={`/gigs/${proposal.gig.id}`}>
            <Button variant="outline">Detalles del trabajo</Button>
          </Link>
          {user?.userType === "freelancer" && (
            <Link href="/proposals">
              <Button variant="outline">Mis propuestas</Button>
            </Link>
          )}
          {user?.userType === "recruiter" && (
            <Link href={`/gigs/${proposal.gig.id}/proposals`}>
              <Button variant="outline">Todas las propuestas</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">
                  Propuesta para: {proposal.gig.title}
                </CardTitle>
                <Badge
                  variant={
                    proposal.status === ProposalStatus.ACCEPTED
                      ? "default"
                      : proposal.status === ProposalStatus.REJECTED
                      ? "destructive"
                      : "outline"
                  }
                >
                  {getTranslatedStatus(proposal.status)}
                </Badge>
              </div>
              <CardDescription>
                Enviada por: {proposal.freelancer.firstName}
              </CardDescription>
              <CardDescription>
                Fecha: {new Date(proposal.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Precio propuesto
                  </h3>
                  <p className="text-2xl font-bold">${proposal.price}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Descripción
                  </h3>
                  <p className="text-sm text-gray-700">
                    {proposal.description}
                  </p>
                </div>
                {proposal.videoUrl && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Video de presentación
                    </h3>
                    <a 
                      href={proposal.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Ver video
                    </a>
                  </div>
                )}
              </div>
            </CardContent>

              {canUpdateStatus && (
                <CardFooter className="flex gap-4 pt-4 border-t">
                  <Button
                    variant="default"
                    onClick={() => handleStatusUpdate(ProposalStatus.ACCEPTED)}
                  >
                    Aceptar Propuesta
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusUpdate(ProposalStatus.REJECTED)}
                  >
                    Rechazar Propuesta
                  </Button>
                </CardFooter>
              )}
              
              {canEditOrDelete && (
                <CardFooter className="flex gap-4 pt-4 border-t">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Editar Propuesta</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Propuesta</DialogTitle>
                        <DialogDescription>
                          Actualiza los detalles de tu propuesta. Haz clic en guardar cuando termines.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="price" className="text-right">
                            Precio
                          </label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            value={editForm.price}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="description" className="text-right">
                            Descripción
                          </label>
                          <Textarea
                            id="description"
                            name="description"
                            value={editForm.description}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="videoUrl" className="text-right">
                            URL del Video
                          </label>
                          <Input
                            id="videoUrl"
                            name="videoUrl"
                            value={editForm.videoUrl}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleEditProposal}>
                          Guardar cambios
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Eliminar Propuesta</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                          ¿Estás seguro de que deseas eliminar esta propuesta? Esta acción no se puede deshacer.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteProposal}>
                          Eliminar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              )}
          </Card>
        </div>
          {isGigOwner && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Información del Freelancer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Nombre
                    </h3>
                    <p>
                      {proposal.freelancer.firstName}{" "}
                      {proposal.freelancer.lastName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{proposal.freelancer.email}</p>
                  </div>
                  <div>
                    <Link href={`/profile/${proposal.freelancer.id}`}>
                      <Button variant="outline" className="w-full">
                        Ver Perfil del Freelancer
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}

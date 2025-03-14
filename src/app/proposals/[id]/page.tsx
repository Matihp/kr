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
import { fetchProposalById, updatePropStatus } from "@/api/proposalApi";
import { Proposal } from "@/types/proposal";
import { proposalStatusTranslations } from "@/lang/translations";

export default function ProposalDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProposalDetails = async () => {
      try {
        const data = await fetchProposalById(id as string);
        setProposal(data);
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

    } catch (error) {
      console.error("Error al actualizar:", error);
      setError("No se pudo actualizar el estado de la propuesta");
    }
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
  const canUpdateStatus = isGigOwner && proposal.status === "pending";

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
                    proposal.status === "accepted"
                      ? "default"
                      : proposal.status === "rejected"
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
              </div>
            </CardContent>

            {canUpdateStatus && (
              <CardFooter className="flex gap-4 pt-4 border-t">
                <Button
                  variant="default"
                  onClick={() => handleStatusUpdate("accepted")}
                >
                  Aceptar Propuesta
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusUpdate("rejected")}
                >
                  Rechazar Propuesta
                </Button>
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

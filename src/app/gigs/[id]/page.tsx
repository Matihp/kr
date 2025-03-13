"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { fetchGigById } from "@/api/gigsApi";
import {
  Clock,
  DollarSign,
  AlertTriangle,
  Check,
  Award,
  Layers,
} from "lucide-react";
import { Gig } from "@/types/gig";
import { deleteGig } from "@/api/gigsApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const data = await fetchGigById(params.id as string);
        setGig(data);
      } catch (err) {
        setError("Failed to load gig details");
      } finally {
        setLoading(false);
      }
    };
    fetchGigData();
  }, [params.id]);

  const isGigOwner = user && gig?.recruiter?.id === user.id;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500 space-y-4">
        <AlertTriangle size={48} />
        <h2 className="text-xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );

  if (!gig)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 space-y-4">
        <AlertTriangle size={48} />
        <h2 className="text-xl font-semibold">Gig Not Found</h2>
        <Button onClick={() => router.push("/gigs")}>Back to Gigs</Button>
      </div>
    );

  const handleDeleteGig = async () => {
    if (!gig || !isGigOwner) return;

    setIsDeleting(true);
    try {
      await deleteGig(gig.id);
      toast.success("Gig eliminado", {
        description: "El trabajo ha sido eliminado exitosamente",
      });
      router.push("/gigs/my-gigs");
    } catch (error) {
      toast.error("Error", {
        description: "No se pudo eliminar el trabajo. Intente nuevamente.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto pt-28 pb-8 px-8 bg-gray-50 min-h-screen">
      <Card className="border-none shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {gig.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {gig.currentStage && (
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                  >
                    <Clock size={14} />
                    Stage: {gig.currentStage.name}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isGigOwner ? (
                <Link href={`/gigs/${gig.id}/proposals`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    Ver Propuestas
                  </Button>
                </Link>
              ) : (
                user?.userType === "freelancer" && (
                  <Link href={`/gigs/${gig.id}/proposals/create`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Aplicar
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pb-4">
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Layers size={18} className="text-blue-600" />
                </div>
                Descripción
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {gig.description}
              </p>
            </CardContent>
          </Card>

          {gig.stages && gig.stages.length > 0 && (
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b pb-4">
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Layers size={18} className="text-purple-600" />
                  </div>
                  Etapas del Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {gig.stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          {stage.name}
                        </h3>
                        <Badge
                          className={`${
                            stage.isCompleted
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          } px-3 py-1 rounded-full flex items-center gap-1`}
                        >
                          {stage.isCompleted ? (
                            <Check size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                          {stage.isCompleted ? "Completado" : "Pendiente"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mt-3 leading-relaxed">
                        {stage.description}
                      </p>
                      <div className="flex justify-between mt-4 text-sm bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-500 flex items-center gap-1">
                          <DollarSign size={16} className="text-green-500" />
                          Pago:
                        </span>
                        <span className="font-bold text-green-600">
                          ${stage.payment.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {gig.rewards && gig.rewards.length > 0 && (
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b pb-4">
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Award size={18} className="text-amber-600" />
                  </div>
                  Recompensas de bonificación
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {gig.rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="border border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-colors duration-300"
                    >
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <Award size={18} className="text-amber-500" />
                        {reward.name}
                      </h3>
                      <p className="text-gray-600 mt-3 leading-relaxed">
                        {reward.description}
                      </p>
                      <div className="flex justify-between mt-4 text-sm bg-amber-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-500 flex items-center gap-1">
                          <DollarSign size={16} className="text-amber-500" />
                          Monto del bono:
                        </span>
                        <span className="font-bold text-amber-600">
                          ${reward.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          Criterios:
                        </h4>
                        <ul className="space-y-2">
                          {reward.criteria.map((criterion, index) => (
                            <li
                              key={index}
                              className="text-gray-600 flex items-start gap-2"
                            >
                              <div className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5">
                                <Check size={12} />
                              </div>
                              <span>{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="space-y-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 sticky top-4">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b pb-4 .probandoe">
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <DollarSign size={18} className="text-green-600" />
                </div>
                Presupuesto
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-white p-5 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center text-lg pb-4 border-b">
                  <span className="font-medium text-gray-600">Mínimo:</span>
                  <span className="font-bold text-green-600">
                    ${gig.budgetMin.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg pt-4">
                  <span className="font-medium text-gray-600">Máximo:</span>
                  <span className="font-bold text-green-600">
                    ${gig.budgetMax.toLocaleString()}
                  </span>
                </div>
              </div>
              {isGigOwner && (
                <div className="mt-8 space-y-3">
                  <Link href={`/gigs/${gig.id}/edit`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                    >
                      Editar Trabajo
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Eliminando..." : "Eliminar Trabajo"}
                  </Button>
                </div>
              )}
              <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente el trabajo y todas sus etapas y
                      recompensas asociadas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteGig}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      {isDeleting ? "Eliminando..." : "Eliminar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">¿Necesitas ayuda?</h3>
              <p className="text-blue-100 mb-4">
                ¿Tienes preguntas sobre gestionar este trabajo o necesitas
                ayuda?
              </p>
              <Button
                variant="outline"
                className="w-full bg-white text-blue-700 hover:bg-blue-50 border-white"
              >
                Contactar a Soporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
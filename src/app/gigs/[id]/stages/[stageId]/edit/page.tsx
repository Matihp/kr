"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { fetchGigStage, updateGigStage } from "@/api/stagesGigApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

const stageFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  payment: z.coerce.number().min(0, "El pago no puede ser negativo"),
  order: z.coerce.number().min(1, "El orden debe ser al menos 1"),
  isCompleted: z.boolean().default(false),
});

type StageFormValues = z.infer<typeof stageFormSchema>;

export default function EditGigStagePage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const gigId = params.id as string;
  const stageId = params.stageId as string;

  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      payment: 0,
      order: 1,
      isCompleted: false,
    },
  });

  useEffect(() => {
    const loadStageData = async () => {
      try {
        const stageData = await fetchGigStage(gigId, stageId);
        form.reset({
          name: stageData.name,
          description: stageData.description,
          payment: stageData.payment,
          order: stageData.order,
          isCompleted: stageData.isCompleted,
        });
      } catch (err) {
        setError("No se pudo cargar la información de la etapa");
      } finally {
        setLoading(false);
      }
    };

    loadStageData();
  }, [gigId, stageId, form]);

  const onSubmit = async (data: StageFormValues) => {
    setIsSubmitting(true);
    try {
      // Mantenemos el orden original que se cargó del servidor
      const originalOrder = form.getValues().order;
      
      await updateGigStage(gigId, stageId, {
        ...data,
        order: originalOrder // Aseguramos que se envíe el orden original
      });
      
      toast.success("Etapa actualizada", {
        description: "La etapa ha sido actualizada exitosamente",
      });
      router.push(`/gigs/${gigId}`);
    } catch (error) {
      toast.error("Error", {
        description: "No se pudo actualizar la etapa. Intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500 space-y-4">
        <AlertTriangle size={48} />
        <h2 className="text-xl font-semibold">Error</h2>
        <p>{error}</p>
        <Button onClick={() => router.back()}>Volver</Button>
      </div>
    );

  return (
    <div className="container mx-auto pt-28 pb-8 px-8 bg-gray-50 min-h-screen">
      <Card className="max-w-2xl mx-auto border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b pb-4">
          <CardTitle className="text-xl text-gray-800">
            Editar Etapa
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Etapa</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pago (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ocultamos el campo de orden pero lo mantenemos en el formulario */}
                <input type="hidden" {...form.register("order")} />
              </div>

              <FormField
                control={form.control}
                name="isCompleted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Etapa completada</FormLabel>
                      <p className="text-sm text-gray-500">
                        Marca esta opción si la etapa ya ha sido completada
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
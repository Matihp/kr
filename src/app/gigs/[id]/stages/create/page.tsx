"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { toast } from "sonner";
import { createGigStage } from "@/api/stagesGigApi";

const stageFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  payment: z.coerce.number().min(0, "El pago no puede ser negativo"),
});

type StageFormValues = z.infer<typeof stageFormSchema>;

export default function CreateGigStagePage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gigId = params.id as string;

  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      payment: 0,
    },
  });

  const onSubmit = async (data: StageFormValues) => {
    setIsSubmitting(true);
    try {
      await createGigStage(gigId, data);
      toast.success("Etapa creada", {
        description: "La etapa ha sido creada exitosamente",
      });
      router.push(`/gigs/${gigId}`);
    } catch (error) {
      toast.error("Error", {
        description: "No se pudo crear la etapa. Intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto pt-28 pb-8 px-8 bg-gray-50 min-h-screen">
      <Card className="max-w-2xl mx-auto border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b pb-4">
          <CardTitle className="text-xl text-gray-800">
            Crear Nueva Etapa
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
                      <Input placeholder="Ej: Diseño Inicial" {...field} />
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
                        placeholder="Describe lo que se debe lograr en esta etapa..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                  {isSubmitting ? "Creando..." : "Crear Etapa"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
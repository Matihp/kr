import { z } from 'zod';
import { GigType } from '../types/gigTypes';

export const createGigStageSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  payment: z.number().positive(),
});

export const createGigRewardSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().positive(),
  criteria: z.array(z.string()).min(1)
});

export const createGigSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.nativeEnum(GigType),
  isAnonymous: z.boolean().optional(),
  budgetMin: z.number().positive(),
  budgetMax: z.number().positive(),
  flashDeadline: z.date().optional(),
  requiresTeam: z.boolean().optional(),
  stages: z.array(createGigStageSchema).optional(),
  rewards: z.array(createGigRewardSchema).optional()
}).refine(data => data.budgetMax >= data.budgetMin, {
  message: "Maximum budget must be greater than or equal to minimum budget"
});

// Actualizado para incluir todos los campos que pueden ser actualizados
export const updateGigStageSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  payment: z.number().positive().optional(),
  order: z.number().int().min(0).optional(),
  isCompleted: z.boolean().optional()
});

// Para la ruta PATCH que solo actualiza el estado de completado
export const updateGigStageCompletionSchema = z.object({
  isCompleted: z.boolean()
});
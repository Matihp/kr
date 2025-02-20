import { z } from 'zod';
import { GigType } from '../types/gigTypes';

export const createGigStageSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  payment: z.number().positive(),
  order: z.number().int().min(0)
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

export const updateGigStageSchema = z.object({
  completed: z.boolean()
});
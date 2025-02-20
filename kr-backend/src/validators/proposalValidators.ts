import { z } from 'zod';

export const priceOptionSchema = z.object({
  price: z.number().positive(),
  scope: z.string().min(1)
});

export const createProposalSchema = z.object({
  gigId: z.string().uuid(),
  price: z.number().positive(),
  description: z.string().min(1),
  videoUrl: z.string().url().optional(),
  priceOptions: z.array(priceOptionSchema).optional()
});

export const updateProposalStatusSchema = z.object({
  status: z.enum(['pending', 'under_review', 'accepted', 'rejected']),
  feedback: z.string().optional()
});
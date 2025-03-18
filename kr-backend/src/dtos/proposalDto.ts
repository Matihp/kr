import { z } from 'zod';
import { createProposalSchema, updateProposalSchema } from '../validators/proposalValidators';
import { updateProposalStatusSchema } from '../validators/proposalValidators';

export type CreateProposalDto = z.infer<typeof createProposalSchema>;
export type UpdateProposalDto = z.infer<typeof updateProposalSchema>;
export type UpdateProposalStatusDto = z.infer<typeof updateProposalStatusSchema>;
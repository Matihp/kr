import { z } from 'zod';
import { createProposalSchema } from '../validators/proposalValidators';
import { updateProposalStatusSchema } from '../validators/proposalValidators';

export type CreateProposalDto = z.infer<typeof createProposalSchema>;
export type UpdateProposalStatusDto = z.infer<typeof updateProposalStatusSchema>;
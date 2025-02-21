import { z } from "zod";
import { ProposalStatus } from "../types/proposalTypes";

export const createProposalSchema = z.object({
  gigId: z.string().uuid(),
  price: z.number().positive(),
  description: z.string().min(1, "Description is required"),
  videoUrl: z.string().url().optional(),
  priceOptions: z.array(
    z.object({
      price: z.number().positive(),
      scope: z.string().min(1, "Scope description is required")
    })
  ).optional()
});

export const updateProposalStatusSchema = z.object({
  status: z.enum([
    ProposalStatus.PENDING,
    ProposalStatus.ACCEPTED,
    ProposalStatus.REJECTED
  ]),
  feedback: z.string().optional().refine(
    (val) => {
      if (val === undefined) return true;
      return true;
    },
    (val) => ({
      message: "Feedback can only be provided for accepted proposals"
    })
  )
}).refine(
  (data) => {
    if (data.feedback && data.status !== ProposalStatus.ACCEPTED) {
      return false;
    }
    return true;
  },
  {
    message: "Feedback can only be provided for accepted proposals",
    path: ["feedback"]
  }
);
import { User } from "./user"

export enum ProposalStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected"
}

export interface Proposal {
    id: string
    price: number
    description: string
    videoUrl?: string
    status: string
    priceOptions?: PriceOption[]
    createdAt: string
    updatedAt: string
    freelancer: {
      id: string
      firstName: string
      lastName: string
      email: string
    }
    gig: {
      recruiter: User
      id: string
      title: string
      description: string      
      budgetMin: number
      budgetMax: number
    }
  }
export interface PriceOption {
    price: number
    scope: string
  }

export interface UpdateProposalDto {
  price?: number;
  description?: string;
  videoUrl?: string | null;
  priceOptions?: PriceOption[];
}
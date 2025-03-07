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
      name: string
      email: string
    }
    gig: {
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
export interface Gig {
    id: string
    title: string
    description: string
    budgetMin: number
    budgetMax: number
    status: string
    createdAt: string
    createdBy: string
    recruiter: {
      id: string
      firstName: string
      lastName: string
      email: string
    }
    stages?: {
      id: string
      name: string
      description: string
      payment: number
      order: number
      isCompleted: boolean
    }[]
    rewards?: {
      id: string
      name: string
      description: string
      amount: number
      criteria: string[]
    }[]
    currentStage?: {
      id: string
      name: string
    }
    proposalsCount?: number
  }
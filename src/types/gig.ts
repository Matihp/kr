export interface Gig {
    id: string
    title: string
    description: string
    budgetMin: number
    budgetMax: number
    status?: string
    type: GigType
    isAnonymous?: boolean
    requiresTeam?: boolean
    flashDeadline?: string
    createdAt: string
    createdBy?: string
    recruiter: {
      id: string
      firstName: string
      lastName: string
      email: string
    }
    myProposal: {
      price: number
      id: string
      title: string
      description: string
      status: string
      createdAt: string
      createdBy: string
      reviewer: {
        id: string
        firstName: string
        lastName: string
        email: string
      }
    }
    stages?: GigStage[]
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
  export enum GigType {
    STANDARD = 'standard',
    FLASH = 'flash',
    TEAM = 'team'
  }
  export interface GigStage {
    id: string;
    name: string;
    description: string;
    payment: number;
    order: number;
    isCompleted: boolean;
    gig?: Gig;
  }
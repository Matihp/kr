export enum ProposalStatus {
    PENDING = "pending",
    UNDER_REVIEW = "under_review",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
  }
  
  export interface PriceOption {
    price: number;
    scope: string;
  }
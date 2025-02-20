export class CreateProposalDto {
    gigId!: string;
    price!: number;
    description!: string;
    videoUrl?: string;
    priceOptions?: {
      price: number;
      scope: string;
    }[];
  }
  
  export class UpdateProposalStatusDto {
    status!: string;
    feedback?: string;
  }
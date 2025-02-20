export class CreateGigDto {
    title!: string;
    description!: string;
    type!: string;
    isAnonymous?: boolean;
    budgetMin!: number;
    budgetMax!: number;
    flashDeadline?: Date;
    requiresTeam?: boolean;
    stages?: CreateGigStageDto[];
    rewards?: CreateGigRewardDto[];
  }
  
  export class CreateGigStageDto {
    name!: string;
    description!: string;
    payment!: number;
    order!: number;
  }
  
  export class CreateGigRewardDto {
    name!: string;
    description!: string;
    amount!: number;
    criteria!: string[];
  }
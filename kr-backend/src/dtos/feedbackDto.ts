export class CreateFeedbackDto {
    proposalId!: string;
    content!: string;
    rating?: number;
  }
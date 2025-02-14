import { UserType } from "../models/onboardingModel";

export class InitializeOnboardingDto {
    userId!: string;
  }
  
export class UpdateOnboardingDto {
    userType?: UserType;
    professionalSummary?: string;
    preferredWorkTypes?: string[];
    yearsOfExperience?: number;
    companyName?: string;
    industry?: string;
    hiringNeeds?: string;
    currentStep?: number;
  }
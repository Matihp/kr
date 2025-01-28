import { Type } from "class-transformer";
import { IsInt, IsObject, ValidateNested } from "class-validator";
import { ProfileCompletionDto } from "./profileCompletionDto";

export class UpdateLevelProgressDto {
  @IsInt()
  level?: number;

  @IsInt()
  experiencePoints?: number;

  @IsObject()
  completedAchievements?: Record<string, boolean>;

  @ValidateNested()
  @Type(() => ProfileCompletionDto)
  profileCompletion?: ProfileCompletionDto;
}
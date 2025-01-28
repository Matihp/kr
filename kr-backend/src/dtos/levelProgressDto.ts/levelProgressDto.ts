import { IsUUID, IsInt, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileCompletionDto } from './profileCompletionDto';

export class LevelProgressDto {
  @IsUUID()
  id!: string;

  @IsInt()
  level!: number;

  @IsInt()
  experiencePoints!: number;

  @IsObject()
  completedAchievements!: Record<string, boolean>;

  @ValidateNested()
  @Type(() => ProfileCompletionDto)
  profileCompletion!: ProfileCompletionDto;
}

import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGigStageDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  payment!: number;

  @IsNumber()
  @Min(0)
  order!: number;
}

export class CreateGigRewardDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsArray()
  @IsString({ each: true })
  criteria!: string[];
}

export class CreateGigDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;

  @IsNumber()
  @Min(0)
  budgetMin!: number;

  @IsNumber()
  @Min(0)
  budgetMax!: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  flashDeadline?: Date;

  @IsOptional()
  @IsBoolean()
  requiresTeam?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGigStageDto)
  stages?: CreateGigStageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGigRewardDto)
  rewards?: CreateGigRewardDto[];
}
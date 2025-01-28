import {IsObject } from 'class-validator';
import { LevelProgressDto } from './levelProgressDto';
import { UserDto } from '../userDto';

export class ProfileCompletionDto {
  @IsObject()
  basicInfo!: boolean;

  @IsObject()
  description!: boolean;

  @IsObject()
  avatar!: boolean;

  @IsObject()
  skills!: boolean;

  @IsObject()
  languages!: boolean;

  @IsObject()
  projects!: boolean;

  @IsObject()
  certifications!: boolean;
}
export class ProfileResponseDto {
  user!: UserDto; 
  levelProgress!: LevelProgressDto;
}
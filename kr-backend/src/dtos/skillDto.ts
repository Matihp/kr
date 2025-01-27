import { IsString, Length } from 'class-validator';

export class CreateSkillDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  name!: string;
}

export class UpdateSkillDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  name!: string;
}

export class SkillResponseDto {
  id!: string;
  name!: string;
}
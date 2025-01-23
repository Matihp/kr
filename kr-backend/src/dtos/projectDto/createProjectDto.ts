import { IsString, IsArray, IsOptional, IsUrl, ArrayMinSize } from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'El título debe ser un string' })
  title!: string;

  @IsString({ message: 'La descripción debe ser un string' })
  description!: string;

  @IsArray({ message: 'Las imágenes deben ser un array' })
  @IsString({ each: true, message: 'Cada imagen debe ser un string' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos una imagen' })
  images!: string[];

  @IsOptional()
  @IsUrl({}, { message: 'El website debe ser una URL válida' })
  website?: string;

  @IsOptional()
  @IsUrl({}, { message: 'El repository debe ser una URL válida' })
  repository?: string;

  @IsArray({ message: 'Los skillIds deben ser un array' })
  @IsString({ each: true, message: 'Cada skillId debe ser un string' })
  skillIds!: string[];
}

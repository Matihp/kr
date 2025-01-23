import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateProjectDto {
    @IsOptional()
    @IsString({ message: 'El título debe ser un string' })
    title?: string;
  
    @IsOptional()
    @IsString({ message: 'La descripción debe ser un string' })
    description?: string;
  
    @IsOptional()
    @IsArray({ message: 'Las imágenes deben ser un array' })
    @IsString({ each: true, message: 'Cada imagen debe ser un string' })
    images?: string[];
  
    @IsOptional()
    @IsUrl({}, { message: 'El website debe ser una URL válida' })
    website?: string;
  
    @IsOptional()
    @IsUrl({}, { message: 'El repository debe ser una URL válida' })
    repository?: string;
  
    @IsOptional()
    @IsArray({ message: 'Los skillIds deben ser un array' })
    @IsString({ each: true, message: 'Cada skillId debe ser un string' })
    skillIds?: string[];
  }

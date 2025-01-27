import { IsString, IsOptional } from 'class-validator';

export class CreateNewsDto {
  @IsString({ message: 'El título debe ser un string' })
  title!: string;

  @IsString({ message: 'El contenido debe ser un string' })
  content!: string;

  @IsString({ message: 'El autor debe ser un string' })
  author!: string;

  @IsString({ message: 'La imagen debe ser un string' })
  image!: string;
}

export class UpdateNewsDto {
  @IsOptional()
  @IsString({ message: 'El título debe ser un string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'El contenido debe ser un string' })
  content?: string;

  @IsOptional()
  @IsString({ message: 'El autor debe ser un string' })
  author?: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser un string' })
  image?: string;
}

export class NewsResponseDto {
  id!: string;
  title!: string;
  content!: string;
  author!: string;
  image!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

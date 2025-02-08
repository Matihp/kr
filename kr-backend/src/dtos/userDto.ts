import { IsString, IsEmail, IsOptional } from 'class-validator';
import { RoleType } from '../models/roleModel';
import { AvailabilityType } from '../types/userTypes';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser un string' })
  firstName!: string;

  @IsString({ message: 'El apellido debe ser un string' })
  lastName!: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser un string' })
  password!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un string' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser un string' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido' })
  email?: string;
}

export class UserResponseDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authProvider: any;
  role: RoleType;
  avatarSrc: string;
  levelProgress: number;
  availabilityType: AvailabilityType;
  languages: any[];
  skills: any[];
  projects: any[];
  certifications: any[];
  notifications: any[];
}
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'First name is required' })
  firstName!: string;

  @IsString({ message: 'Last name is required' })
  lastName!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password!: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password!: string;
}

export class ChangePasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString({ message: 'Current password is required' })
  currentPassword!: string;

  @IsString({ message: 'New password is required' })
  @MinLength(4, { message: 'New password must be at least 4 characters long' })
  newPassword!: string;
}

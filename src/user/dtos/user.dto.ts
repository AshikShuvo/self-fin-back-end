import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+880|0)(\s)?(1[3456789]{1})(\s)?(\d{8})$/, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+880|0)(\s)?(1[3456789]{1})(\s)?(\d{8})$/, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserResponseDto {
  id: string;
  @Exclude()
  first_name: string;

  @Expose({ name: 'firstName' })
  firstName() {
    return this.first_name;
  }

  @Exclude()
  last_name: string;

  @Expose({ name: 'lastName' })
  lastName() {
    return this.last_name;
  }

  email: string;
  phone: string;

  @Exclude()
  password: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refresh: string;
}

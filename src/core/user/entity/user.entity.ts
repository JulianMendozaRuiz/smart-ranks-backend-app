import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from './user-role.enum';

export class User {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsDate()
  @IsNotEmptyObject()
  createdAt: Date;
}

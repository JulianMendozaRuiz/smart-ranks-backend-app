import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../entity/user-role.enum';
import { User } from '../entity/user.entity';

/**
 * Data transfer object for the user entity
 */
export class UserDTO {
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

  @IsEnum(UserRole)
  role: UserRole;

  constructor(pUser: User) {
    this.id = pUser._id.toString();
    this.name = pUser.name;
    this.email = pUser.email;
    this.role = pUser.role;
  }
}

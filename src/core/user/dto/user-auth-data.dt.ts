import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entity/user-role.enum';
import { User } from '../entity/user.entity';

export class UserAuthDataDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  constructor(pUser: User) {
    this.userId = pUser._id.toString();
    this.email = pUser.email;
    this.password = pUser.password;
    this.role = pUser.role;
  }
}

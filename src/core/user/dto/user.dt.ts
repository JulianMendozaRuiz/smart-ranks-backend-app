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
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for the user entity
 */
export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: 'string',
    description: 'Unique identifier of the user',
    example: '67cf6c6ef2fed55d187c16aa',
  })
  _id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Name of the user',
    example: 'John Doe',
  })
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsEnum(UserRole)
  @ApiProperty({
    enum: Object.values(UserRole),
    description: 'Role of the user (ADMIN or USER)',
    example: 'ADMIN',
  })
  role: UserRole;

  constructor(pUser: User) {
    this._id = pUser._id;
    this.name = pUser.name;
    this.email = pUser.email;
    this.role = pUser.role;
  }
}

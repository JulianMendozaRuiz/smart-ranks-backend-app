import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResultDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  constructor(token: string, userId: string, email: string) {
    this.token = token;
    this.userId = userId;
    this.email = email;
  }
}

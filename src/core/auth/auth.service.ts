import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dt';
import { AuthResultDTO } from './dto/auth-result.dt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserAuthDataDTO } from '../user/dto/user-auth-data.dt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(authInput: AuthLoginDTO): Promise<UserAuthDataDTO | null> {
    const user = await this.userService.findByEmailForAuthentication(
      authInput.email,
    );
    if (!user) {
      throw new NotFoundException(
        `User with email ${authInput.email} not found`,
      );
    }

    return user;
  }

  async authenticate(authInput: AuthLoginDTO): Promise<AuthResultDTO | null> {
    const user = await this.validateUser(authInput);

    const isPasswordValid = await bcrypt.compare(
      authInput.password,
      user!.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `Invalid password for user with email ${authInput.email}`,
      );
    }

    return new AuthResultDTO('fake-token', user!.userId, user!.email);
  }
}

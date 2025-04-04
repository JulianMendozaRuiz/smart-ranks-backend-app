import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthInputDTO } from './dto/auth-input.dt';
import { AuthResultDTO } from './dto/auth-result.dt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserAuthDataDTO } from '../user/dto/user-auth-data.dt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(authInput: AuthInputDTO): Promise<AuthResultDTO | null> {
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

    return this.signIn(user!);
  }

  async validateUser(authInput: AuthInputDTO): Promise<UserAuthDataDTO | null> {
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

  async signIn(user: UserAuthDataDTO) {
    const tokenPayload = {
      sub: user.userId,
      username: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return new AuthResultDTO(accessToken, user.userId, user.email);
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid or missing authorization token');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
        role: tokenPayload.role,
      };

      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

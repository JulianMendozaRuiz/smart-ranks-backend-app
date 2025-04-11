/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenPayloadDTO } from '../../../../core/auth/dto/auth-token-payload.dt';
import { UserRole } from '../../../../core/user/entity/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] as string;
    const payload: AuthTokenPayloadDTO = this.JwtService.decode(token, {
      json: true,
    });

    if (!payload) {
      return false;
    }

    if (Object.values(UserRole).includes(payload.role as UserRole)) {
      throw new UnauthorizedException(
        'Unauthorized access. User missing role assignment.',
      );
    }

    return true;
  }
}

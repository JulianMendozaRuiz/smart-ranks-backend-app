/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '../../../../core/user/entity/user-role.enum';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<any>();
    const user = request.user;
    const id = request.params.id;

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    const isAdmin = user.role === UserRole.ADMIN;
    const isSelf = user.userId === id;

    if (isAdmin || isSelf) {
      return true;
    }

    throw new ForbiddenException('Insufficient permissions.');
  }
}

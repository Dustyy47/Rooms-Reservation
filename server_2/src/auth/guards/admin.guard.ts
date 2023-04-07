import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayload } from '../types';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;
    return user.role === 'ADMIN';
  }
}

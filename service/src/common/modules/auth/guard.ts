import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const allowUnauthorizedRequest = this.reflector.get<boolean>(
        'allowUnauthorizedRequest',
        context.getHandler(),
      );
      if (allowUnauthorizedRequest) {
        return true;
      }
      if (!req.raw.user) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

export const AllowUnauthenticatedRequest = () =>
  SetMetadata('allowUnauthorizedRequest', true);

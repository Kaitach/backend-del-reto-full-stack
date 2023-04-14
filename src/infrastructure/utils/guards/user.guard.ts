import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SecretGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    const password = body?.contraseña;
    return password === 'abretesesamo';
  }
}

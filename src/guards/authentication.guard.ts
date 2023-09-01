import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class Authenticated implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split('Bearer ')[1];
    if (!token) {
      return false;
    }
    try {
      return this.verifyToken(token);
    } catch (e) {
      return false;
    }
  }

  private verifyToken(token: string) {
    const payload = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    if (!payload) {
      return false;
    }
    return true;
  }
}

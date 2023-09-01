import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1];
    if (!token) {
      request.user = null;
    } else {
      const payload = jwt.verify(token, process.env.JWT_TOKEN_KEY);
      if (!payload) {
        request.user = null;
      } else {
        request.user = payload;
      }
    }

    return next.handle();
  }
}

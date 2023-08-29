import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class UserModule {}

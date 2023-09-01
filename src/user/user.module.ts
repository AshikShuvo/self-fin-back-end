import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwt.service';

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
    JwtService,
  ],
  imports: [JwtModule],
})
export class UserModule {}

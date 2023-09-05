import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwt.service';
import { UserController } from './user.controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    PrismaService,
    JwtService,
  ],
  imports: [JwtModule],
})
export class UserModule {}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, SigninDto } from '../dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user.service';
import { JwtService } from '../../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async userSignup({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    try {
      return this.jwtService.generateAccessAndRefreshToken({
        id: user.id,
        email: user.email,
      });
    } catch (e) {
      throw new HttpException('jwt service failed', 500);
    }
  }

  async userSignin({ email, password }: SigninDto) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('credential dose not match', 400);
    }
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      throw new HttpException('credential dose not match', 400);
    }
    try {
      return this.jwtService.generateAccessAndRefreshToken({
        id: user.id,
        email: user.email,
      });
    } catch (e) {
      throw new HttpException('jwt service failed', 500);
    }
  }

  refreshUserAccessToken(refreshToken: string) {
    try {
      return this.jwtService.generateAccessTokenFromRefreshToken(refreshToken);
    } catch (e) {
      throw new HttpException('jwt service failed', 500);
    }
  }
}

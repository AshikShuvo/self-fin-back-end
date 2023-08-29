import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, SigninDto } from '../dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
    const access = this.generateJwtToken({ id: user.id, email: user.email }); //currently both token have same expire time later we will change
    const refresh = this.generateJwtToken({ id: user.id, email: user.email }); //currently both token have same expire time later we will change
    return {
      access,
      refresh,
    };
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
    const access = this.generateJwtToken({ id: user.id, email: user.email }); //currently both token have same expire time later we will change
    const refresh = this.generateJwtToken({ id: user.id, email: user.email }); //currently both token have same expire time later we will change
    return {
      access,
      refresh,
    };
  }

  private generateJwtToken({ id, email }: { id: string; email: string }) {
    const token = jwt.sign({ id, email }, process.env.JWT_TOKEN_KEY, {
      expiresIn: 36000,
    });
    return token;
  }
}

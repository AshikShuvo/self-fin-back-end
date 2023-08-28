import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user.service';

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
    return user;
  }
}

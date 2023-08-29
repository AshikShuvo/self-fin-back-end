import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';
import { user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const existedUser = await this.userRepository.findByEmail(data.email);
    if (existedUser) {
      throw new ConflictException();
    }
    const newUser: user = await this.userRepository.create(data);
    return new UserResponseDto(newUser);
  }

  async findUserByEmail(email: string): Promise<user | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';
import { user } from '@prisma/client';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletService: WalletService,
  ) {}

  async createUser(data: CreateUserDto) {
    const existedUser = await this.userRepository.findByEmail(data.email);
    if (existedUser) {
      throw new ConflictException();
    }
    const newUser: user = await this.userRepository.create(data);
    await this.walletService.createWallet({
      name: newUser.first_name + ' wallet',
      user_id: newUser.id,
    });
    return new UserResponseDto(newUser);
  }

  async findUserByEmail(email: string): Promise<user | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const userById = await this.userRepository.findById(id);
    if (!userById) {
      throw new NotFoundException();
    }
    const updatedUser = await this.userRepository.update(id, data);
    return new UserResponseDto(updatedUser);
  }
}

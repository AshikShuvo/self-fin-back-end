import { RepositoryInterface } from '../interfaces/Repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { user } from '@prisma/client';

@Injectable()
export class UserRepository implements RepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): string {
    return 'return all user according to the ';
  }

  async create({
    firstName,
    lastName,
    email,
    password,
    phone,
  }: CreateUserDto): Promise<user> {
    const user = await this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
      },
    });
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<user | null> {
    const { firstName, lastName, phone } = data;
    const payload = {
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
      ...(phone && { phone }),
    };
    const updatedUser = await this.prismaService.user.update({
      data: payload,
      where: { id },
    });
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  }

  delete(id: string): string {
    return 'deleted';
  }

  async findById(id: string): Promise<user | null> {
    const existedUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    return existedUser;
  }

  async findByEmail(email: string): Promise<user | null> {
    const existedUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    return existedUser;
  }
}

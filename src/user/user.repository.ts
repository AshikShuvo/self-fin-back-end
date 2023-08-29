import { RepositoryInterface } from '../interfaces/Repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
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

  update(id: string, data: any): string {
    return 'updated';
  }

  delete(id: string): string {
    return 'deleted';
  }

  findById(id: string): string {
    return 'found';
  }

  async findByEmail(email: string): Promise<user | null> {
    const existedUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    return existedUser;
  }
}

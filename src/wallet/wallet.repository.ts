import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '../interfaces/Repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { wallet } from '@prisma/client';
import { CreateWalletDto, UpdateWalletDto } from './dtos';

@Injectable()
export class WalletRepository implements RepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<wallet[]> {
    return this.prismaService.wallet.findMany();
  }

  create(data: CreateWalletDto): Promise<wallet> {
    return this.prismaService.wallet.create({
      data: {
        ...(data.name && { name: data.name }),
        user: {
          connect: {
            id: data.user_id,
          },
        },
      },
    });
  }

  findById(id: string): Promise<wallet> {
    return this.prismaService.wallet.findUnique({ where: { id } });
  }

  findByUserId(id: string): Promise<wallet> {
    return this.prismaService.wallet.findUnique({
      where: {
        user_id: id,
      },
      include: {
        handCash: {
          include: {
            deposit: true,
            spent: true,
          },
        },
        bankAccount: true,
      },
    });
  }

  update(id: string, data: UpdateWalletDto): Promise<wallet> {
    return this.prismaService.wallet.update({ data, where: { id } });
  }

  delete(id: string): string {
    return 'deleted' + id;
  }
}

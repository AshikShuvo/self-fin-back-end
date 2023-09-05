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
    return this.prismaService.wallet.create({ data });
  }

  findById(id: string): Promise<wallet> {
    return this.prismaService.wallet.findUnique({ where: { id } });
  }

  findByUserId(id: string): Promise<wallet> {
    return this.prismaService.wallet.findUnique({
      where: {
        user_id: id,
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

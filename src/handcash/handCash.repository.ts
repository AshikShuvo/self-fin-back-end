import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '../interfaces/Repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { handCash } from '@prisma/client';
import { CreateHandCashDto } from './dtos/handCash.dto';

@Injectable()
export class HandCashRepository implements RepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<handCash[]> {
    return this.prismaService.handCash.findMany();
  }

  create(data: CreateHandCashDto): Promise<handCash> {
    return this.prismaService.handCash.create({
      data: {
        ...(data.name && { name: data.name }),
        wallet: {
          connect: {
            id: data.wallet_id,
          },
        },
      },
    });
  }

  update(id: string, data: unknown): string {
    return 'not needed';
  }

  findById(id: string): Promise<handCash> {
    return this.prismaService.handCash.findUnique({ where: { id } });
  }

  findByWalletId(id: string): Promise<handCash> {
    return this.prismaService.handCash.findUnique({ where: { wallet_id: id } });
  }

  delete(id: string): string {
    return 'not implemented';
  }
}

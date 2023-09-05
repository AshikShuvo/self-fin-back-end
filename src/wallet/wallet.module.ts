import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaService } from '../prisma/prisma.service';
import { WalletRepository } from './wallet.repository';

@Module({
  providers: [WalletService, PrismaService, WalletRepository],
})
export class WalletModule {}

import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaService } from '../prisma/prisma.service';
import { WalletRepository } from './wallet.repository';
import { HandcashModule } from '../handcash/handcash.module';
import { HandcashService } from '../handcash/handcash.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [HandcashModule],
  providers: [WalletService, PrismaService, WalletRepository, HandcashService],
  exports: [WalletService, WalletRepository],
  controllers: [WalletController],
})
export class WalletModule {}

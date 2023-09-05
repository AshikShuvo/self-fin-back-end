import { Module } from '@nestjs/common';
import { HandcashService } from './handcash.service';
import { HandCashRepository } from './handCash.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [HandcashService, HandCashRepository, PrismaService],
  exports: [HandcashService, HandCashRepository],
})
export class HandcashModule {}

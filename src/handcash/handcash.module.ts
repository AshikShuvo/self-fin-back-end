import { Module } from '@nestjs/common';
import { HandcashService } from './handcash.service';
import { HandCashRepository } from './handCash.repository';

@Module({
  providers: [HandcashService, HandCashRepository],
  exports: [HandcashService, HandCashRepository],
})
export class HandcashModule {}

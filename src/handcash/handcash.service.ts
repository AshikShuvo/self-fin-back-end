import { Injectable } from '@nestjs/common';
import { HandCashRepository } from './handCash.repository';
import { CreateHandCashDto } from './dtos/handCash.dto';
import { handCash } from '@prisma/client';

@Injectable()
export class HandcashService {
  constructor(private readonly handCashRepository: HandCashRepository) {}

  createHandCash(data: CreateHandCashDto): Promise<handCash> {
    return this.handCashRepository.create(data);
  }
}

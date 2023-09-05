import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { CreateWalletDto, UpdateWalletDto } from './dtos';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  createWallet(data: CreateWalletDto) {
    return this.walletRepository.create(data);
  }

  updateWallet(id: string, data: UpdateWalletDto) {
    return this.walletRepository.update(id, data);
  }

  deleteWallet(id: string) {
    return this.walletRepository.delete(id);
  }

  getWalletByUserId(id: string) {
    return this.walletRepository.findByUserId(id);
  }
}

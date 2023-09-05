import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { CreateWalletDto, UpdateWalletDto } from './dtos';
import { HandcashService } from '../handcash/handcash.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly handCashService: HandcashService,
  ) {}

  async createWallet(data: CreateWalletDto) {
    const newWallet = await this.walletRepository.create(data);
    await this.handCashService.createHandCash({
      name: 'user hand cash',
      wallet_id: newWallet.id,
    });
    return newWallet;
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

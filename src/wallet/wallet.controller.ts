import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { WalletService } from './wallet.service';
import { wallet } from "@prisma/client";
import { Authenticated } from "../guards/authentication.guard";
import { UserFromToken } from "../user/auth/decorator/userFromToken.decorator";
import { UserFromTokenDto } from "../user/dtos/user.dto";

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @UseGuards(Authenticated)
  @Get('')
  getWalletByUserId(@UserFromToken() userFromToken: UserFromTokenDto,):Promise<wallet> {
    return this.walletService.getWalletByUserId(userFromToken.id);
  }
}

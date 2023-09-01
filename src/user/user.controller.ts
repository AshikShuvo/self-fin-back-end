import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDto, UserFromTokenDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { UserFromToken } from './auth/decorator/userFromToken.decorator';
import { Authenticated } from '../guards/authentication.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(Authenticated)
  @Put('update')
  updateUser(
    @Body() data: UpdateUserDto,
    @UserFromToken() userFromToken: UserFromTokenDto,
  ) {
    return this.userService.updateUser(userFromToken.id, data);
  }
}

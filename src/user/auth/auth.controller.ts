import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, RefreshTokenDto, SigninDto } from '../dtos/user.dto';
import { AuthService } from './auth.service';
import { Authenticated } from '../../guards/authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUpUser(@Body() data: CreateUserDto) {
    return this.authService.userSignup(data);
  }

  @Post('signin')
  signinUser(@Body() data: SigninDto) {
    return this.authService.userSignin(data);
  }

  @Post('refresh')
  refreshUserAccessTokenByRefreshToken(@Body() data: RefreshTokenDto) {
    return this.authService.refreshUserAccessToken(data.refresh);
  }

  @Get('me')
  @UseGuards(Authenticated)
  getPersonalInfo() {
    return 'personal info';
  }
}

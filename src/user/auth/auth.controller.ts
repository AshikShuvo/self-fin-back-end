import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, RefreshTokenDto, SigninDto } from '../dtos/user.dto';
import { AuthService } from './auth.service';

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
}

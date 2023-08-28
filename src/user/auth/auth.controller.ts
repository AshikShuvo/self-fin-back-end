import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, SigninDto } from '../dtos/user.dto';
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
    return 'sign in';
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  generateAccessAndRefreshToken(data: { id: string; email: string }) {
    const { id, email } = data;
    const access = jwt.sign({ id, email }, process.env.JWT_TOKEN_KEY, {
      expiresIn: 36000,
    });
    const refresh = jwt.sign({ id, email }, process.env.JWT_TOKEN_KEY, {
      expiresIn: 36000,
    });
    return {
      access,
      refresh,
    };
  }

  generateAccessTokenFromRefreshToken(refresh: string) {
    //   check if valid jwt token
    const payload = jwt.verify(refresh, process.env.JWT_TOKEN_KEY);
    // if token not valid throw unauthorized exception
    if (!payload) {
      throw new UnauthorizedException();
    }
    //   generate a access token base on refresh token payload
    const access = jwt.sign(
      {
        id: (payload as { id: string; email: string }).id,
        email: (payload as { id: string; email: string }).email,
      },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: 36000,
      },
    );
    // return an object {access:string; refresh:string}
    return {
      access,
      refresh,
    };
  }
}

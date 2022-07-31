import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { UnauthorizedException } from '../exceptions';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const tokenPayload = await this.authService.verifyToken(token);

    if (!tokenPayload) {
      throw new UnauthorizedException();
    }

    return { ...tokenPayload, token };
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { config } from '../../config';
import { UnauthorizedException } from '../exceptions';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(apiKey: string) {
    if (apiKey !== config.apiKey) {
      throw new UnauthorizedException();
    }

    return;
  }
}

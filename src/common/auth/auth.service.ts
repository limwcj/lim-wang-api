import { Injectable, Logger } from '@nestjs/common';

import { TokenPayload } from '../types/tokenPayload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async verifyToken(token: string): Promise<TokenPayload | undefined> {
    try {
      return { userId: '' };
    } catch (e) {
      this.logger.error(e.message);
      return;
    }
  }
}

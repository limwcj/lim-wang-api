import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [HttpModule],
  providers: [AuthService, BearerStrategy],
  exports: [AuthService],
})
export class AuthModule {}

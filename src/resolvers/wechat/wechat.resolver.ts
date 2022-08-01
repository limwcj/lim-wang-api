import { Controller, Get, Req } from '@nestjs/common';
import sha1 from 'crypto-js/sha1';
import { Request } from 'express';

import { config } from '../../config';

@Controller('wechat')
export class WechatResolver {
  @Get('checkSignature')
  checkSignature(@Req() req: Request): string {
    const { signature, timestamp, nonce, echostr } = req.query;
    const tmpStr = [config.wechat.token, timestamp, nonce].sort().join('');
    const sign = sha1(tmpStr).toString();
    return sign === signature ? <string>echostr : '';
  }
}

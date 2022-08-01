import { Module } from '@nestjs/common';

import { WechatResolver } from './wechat.resolver';

@Module({
  imports: [WechatResolverModule],
  providers: [WechatResolver],
  controllers: [WechatResolver],
  exports: [WechatResolver],
})
export class WechatResolverModule {}

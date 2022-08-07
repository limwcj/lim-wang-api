import { Module } from '@nestjs/common';

import { WechatControllerModule } from '../../controllers/wechat/wechat.controller.module';
import { WechatResolver } from './wechat.resolver';

@Module({
  imports: [WechatResolverModule, WechatControllerModule],
  providers: [WechatResolver],
  controllers: [WechatResolver],
  exports: [WechatResolver],
})
export class WechatResolverModule {}

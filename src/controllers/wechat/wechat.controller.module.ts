import { Module } from '@nestjs/common';

import { WechatServiceModule } from '../../services/wechat/wechat.service.module';
import { WechatController } from './wechat.controller';

@Module({
  imports: [WechatServiceModule],
  providers: [WechatController],
  exports: [WechatController],
})
export class WechatControllerModule {}

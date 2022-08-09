import { Module } from '@nestjs/common';

import { RedisModule } from '../../common/redis/redis.module';
import { BaiduMapServiceModule } from '../../services/baidu-map/baidu-map.service.module';
import { WechatServiceModule } from '../../services/wechat/wechat.service.module';
import { WechatController } from './wechat.controller';

@Module({
  imports: [WechatServiceModule, BaiduMapServiceModule, RedisModule],
  providers: [WechatController],
  exports: [WechatController],
})
export class WechatControllerModule {}

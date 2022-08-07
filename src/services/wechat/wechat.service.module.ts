import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { RedisModule } from '../../common/redis/redis.module';
import { config } from '../../config';
import { WechatService } from './wechat.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: config.wechat.apiEndpoint,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        responseType: 'json',
        transformResponse: (data) => {
          const dataJson = JSON.parse(data);
          if (dataJson.errcode) {
            throw new Error(data);
          }
          return dataJson;
        },
      }),
    }),
    RedisModule,
  ],
  providers: [WechatService],
  exports: [WechatService],
})
export class WechatServiceModule {}

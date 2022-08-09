import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { config } from '../../config';
import { BaiduMapService } from './baidu-map.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: config.baiduMap.apiEndpoint,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        responseType: 'json',
        transformResponse: (data) => {
          const dataJson = JSON.parse(data);
          if (dataJson.status) {
            throw new Error(data);
          }
          return dataJson;
        },
      }),
    }),
  ],
  providers: [BaiduMapService],
  exports: [BaiduMapService],
})
export class BaiduMapServiceModule {}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { RedisClient } from '../../common/redis/redis.client';
import { config } from '../../config';
import { WECHAT_ACCESS_TOKEN_KEY } from '../../constants';
import { WechatAccessTokenPayload } from '../../types/wechat.interface';

@Injectable()
export class WechatService {
  constructor(private readonly httpService: HttpService, private readonly redisClient: RedisClient) {}

  private requestWechatApi({
    url,
    method,
    data,
    params,
  }: {
    url: string;
    method: 'get' | 'post';
    data?: Record<string, any>;
    params?: Record<string, any>;
  }): Promise<any> {
    return lastValueFrom(this.httpService.request({ method, url, data, params }).pipe(map((i) => i.data)));
  }

  async getAccessToken(): Promise<string> {
    const cache = await this.redisClient.instance.get(WECHAT_ACCESS_TOKEN_KEY);
    if (cache) {
      const parsedCache: WechatAccessTokenPayload = JSON.parse(cache);
      return parsedCache.access_token;
    }

    const result: WechatAccessTokenPayload = await this.requestWechatApi({
      method: 'post',
      url: '/token',
      params: { grant_type: 'client_credential', appid: config.wechat.appId, secret: config.wechat.appSecret },
    });

    await this.redisClient.instance.set(WECHAT_ACCESS_TOKEN_KEY, JSON.stringify(result), 'EX', result.expires_in);
    return result.access_token;
  }
}

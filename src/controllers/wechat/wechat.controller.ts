import { Injectable } from '@nestjs/common';
import { forEach } from 'lodash';
import LRU from 'lru-cache';

import { RedisClient } from '../../common/redis/redis.client';
import { config } from '../../config';
import { AUTO_MSG, DEFAULT_MSG, LRU_SUFFIX, MsgActions, SUBSCRIBE_TEXT } from '../../constants';
import { BaiduMapService } from '../../services/baidu-map/baidu-map.service';
import { WechatService } from '../../services/wechat/wechat.service';
import { GetGeoCodingResult, SearchPlaceResult } from '../../types/baidu-map.interface';
import { WechatEventMsg, WechatEventType, WechatLocationMsg, WechatTextMsg } from '../../types/wechat.interface';

@Injectable()
export class WechatController {
  private cache: LRU<string, any>;

  constructor(
    private readonly wechatService: WechatService,
    private readonly baiduMapService: BaiduMapService,
    private readonly redisClient: RedisClient,
  ) {
    const options = {
      max: 500,
      maxSize: 5000,
      ttl: 1000 * 60,
      allowStale: false,
      updateAgeOnGet: false,
      updateAgeOnHas: false,
      sizeCalculation: (value, key) => {
        return 1;
      },
    };

    this.cache = new LRU(options);
  }

  async handleText(msg: WechatTextMsg): Promise<{ Content: string }> {
    const { FromUserName, Content } = msg;
    let result = Content;
    let geoCoding: GetGeoCodingResult;

    try {
      const geoCodingResult = await this.baiduMapService.getGeoCoding({
        address: Content,
        output: 'json',
        ak: config.baiduMap.ak,
        extension_analys_level: '1',
      });
      geoCoding = geoCodingResult.result;
      console.log(geoCoding);
    } catch (e) {}

    if (geoCoding) {
      if (geoCoding.precise) {
        const location = await this.handleLocation({
          ...msg,
          Location_X: geoCoding.location.lng,
          Location_Y: geoCoding.location.lat,
        });
        result = location.Content;
      } else {
        result = '请输入详细的地址或直接发送定位🌏';
      }
    } else if (AUTO_MSG[MsgActions.WHAT_TO_EAT].includes(Content)) {
      let cache = await this.redisClient.instance.get(`WECHAT:${FromUserName}:${LRU_SUFFIX.PLACE}`);
      if (!cache) {
        result = '请先发送定位或上报地理位置🌏';
      } else {
        const places: SearchPlaceResult[] = JSON.parse(cache);
        const place = places[Math.floor(Math.random() * places.length)];
        result = `吃一顿少一顿，这顿就吃这个吧：${this.resolvePlaceContent(place)}\n☞ 餐厅地址：${place.address}`;
      }
    } else {
      result = DEFAULT_MSG[Math.floor(Math.random() * DEFAULT_MSG.length)];
    }

    return { Content: result };
  }

  async handleEvent(msg: WechatEventMsg): Promise<{ Content: string }> {
    let Content = '';
    switch (msg.Event) {
      case WechatEventType.SUBSCRIBE:
        Content = SUBSCRIBE_TEXT;
    }
    return { Content };
  }

  private resolvePlaceContent(place: SearchPlaceResult): string {
    let content = '';
    let star = ``;
    for (let i = 0; i < Math.ceil(Number(place.detail_info.overall_rating)); i++) {
      star += `⭒`;
    }

    content += `${place.name} ${place.detail_info.distance}m ${star}`;
    return content;
  }

  async handleLocation(msg: WechatLocationMsg): Promise<{ Content: string }> {
    const { Location_X, Location_Y, FromUserName } = msg;
    let Content = '';
    const places = await this.baiduMapService.searchPlace({
      query: `中餐厅$外国餐厅$小吃快餐店`,
      location: `${Location_X},${Location_Y}`,
      radius: '2000',
      radius_limit: 'true',
      ak: config.baiduMap.ak,
      output: 'json',
      scope: '2',
      tag: '美食,中餐厅,外国餐厅,小吃快餐店',
      filter: 'industry_type:cater|sort_name:distance|sort_rule:1',
      page_size: 20,
    });
    forEach(places.results, (place, i) => {
      let star = ``;
      for (let i = 0; i < Math.ceil(Number(place.detail_info.overall_rating)); i++) {
        star += `⭒`;
      }

      Content += `➤ ${++i}. ${this.resolvePlaceContent(place)}\n`;
    });

    await this.redisClient.instance.set(
      `WECHAT:${FromUserName}:${LRU_SUFFIX.PLACE}`,
      JSON.stringify(places.results),
      'EX',
      config.placeExpireTime,
    );

    return { Content };
  }
}

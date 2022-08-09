import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { SearchPlaceInput, SearchPlaceOutput } from '../../types/baidu-map.interface';

@Injectable()
export class BaiduMapService {
  constructor(private readonly httpService: HttpService) {}

  private requestBaiduMapApi({
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

  searchPlace(params: SearchPlaceInput): Promise<SearchPlaceOutput> {
    return this.requestBaiduMapApi({ url: '/place/v2/search', method: 'get', params });
  }
}

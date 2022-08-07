import { Injectable } from '@nestjs/common';

import { WechatService } from '../../services/wechat/wechat.service';

@Injectable()
export class WechatController {
  constructor(private readonly wechatService: WechatService) {}

  async createMenu(menu: any) {
    const accessToken = await this.wechatService.getAccessToken();
    await this.wechatService.createMenu(menu, accessToken);
  }
}

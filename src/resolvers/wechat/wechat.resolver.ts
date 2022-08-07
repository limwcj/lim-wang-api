import { Body, Controller, Get, Logger, Post, Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import sha1 from 'crypto-js/sha1';

import { InternalAuthGuard } from '../../common/auth/internal-auth.guard';
import { config } from '../../config';
import { WechatController } from '../../controllers/wechat/wechat.controller';
import { WechaMsgTypes, WechatMsgType, WechatTextMsg } from '../../types/wechat.interface';

@Resolver()
@Controller('wechat')
export class WechatResolver {
  private readonly logger = new Logger(WechatResolver.name);

  constructor(private readonly wechatController: WechatController) {}

  @Get()
  checkSignature(@Query() query: { signature: string; timestamp: string; nonce: string; echostr: string }): string {
    const { signature, timestamp, nonce, echostr } = query;
    const tmpStr = [config.wechat.token, timestamp, nonce].sort().join('');
    const sign = sha1(tmpStr).toString();
    return sign === signature ? <string>echostr : '';
  }

  // TODO should verify message is from wechat
  @Post()
  webhook(@Body() { xml }: { xml: WechatMsgType }) {
    console.log(xml);
    switch (xml.MsgType) {
      case WechaMsgTypes.TEXT:
        const { Content } = xml as WechatTextMsg;
        console.log(Content);
        break;

      default:
        this.logger.log(`Unsupported MsgType ${xml.MsgType}`);
    }
  }

  @Mutation((returns) => String)
  @UseGuards(InternalAuthGuard)
  async createMenu(@Args('menu') menu: string) {
    let parsedMenu;
    try {
      parsedMenu = JSON.parse(menu);
    } catch (e) {
      throw new Error(e);
    }

    await this.wechatController.createMenu(parsedMenu);
    return 'OK';
  }
}

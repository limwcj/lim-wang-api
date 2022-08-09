import { Body, Controller, ForbiddenException, Get, Logger, Post, Query, Res } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import sha1 from 'crypto-js/sha1';
import { Response } from 'express';
import { XMLBuilder } from 'fast-xml-parser';

import { config } from '../../config';
import { WechatController } from '../../controllers/wechat/wechat.controller';
import {
  WechaMsgTypes,
  WechatEventMsg,
  WechatLocationMsg,
  WechatMsgType,
  WechatSignature,
  WechatTextMsg,
} from '../../types/wechat.interface';

@Resolver()
@Controller('wechat')
export class WechatResolver {
  private readonly logger = new Logger(WechatResolver.name);

  constructor(private readonly wechatController: WechatController) {}

  private _checkSignature(params: WechatSignature): boolean {
    const { signature, timestamp, nonce } = params;
    const tmpStr = [config.wechat.token, timestamp, nonce].sort().join('');
    const sign = sha1(tmpStr).toString();
    return sign === signature;
  }

  @Get()
  checkSignature(@Query() query: WechatSignature): string {
    return this._checkSignature(query) ? <string>query.echostr : '';
  }

  @Post()
  async webhook(@Body('xml') msg: WechatMsgType, @Query() query: WechatSignature, @Res() res: Response) {
    if (!this._checkSignature(query)) {
      throw new ForbiddenException();
    }

    this.logger.log(msg);
    const xml: WechatTextMsg = {
      ToUserName: msg.FromUserName,
      FromUserName: msg.ToUserName,
      CreateTime: Math.floor(Date.now() / 1000),
      MsgType: WechaMsgTypes.TEXT,
      Content: 'success',
    };
    switch (msg.MsgType) {
      case WechaMsgTypes.TEXT:
        const textResult = await this.wechatController.handleText(msg as WechatTextMsg);
        xml.Content = textResult.Content;
        break;
      case WechaMsgTypes.EVENT:
        const eventResult = await this.wechatController.handleEvent(msg as WechatEventMsg);
        xml.Content = eventResult.Content;
        break;
      case WechaMsgTypes.LOCATION:
        const locationResult = await this.wechatController.handleLocation(msg as WechatLocationMsg);
        xml.Content = locationResult.Content;
        break;
    }

    const builder = new XMLBuilder({});
    const xmlContent = builder.build({ xml });
    res.set('Content-Type', 'text/xml');
    res.status(200).send(xmlContent);
  }
}

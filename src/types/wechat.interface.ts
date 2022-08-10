export type WechatMsgType = WechatTextMsg | WechatImageMsg | WechatLocationMsg | WechatEventMsg;

export enum WechaMsgTypes {
  TEXT = 'text',
  IMAGE = 'image',
  LOCATION = 'location',
  EVENT = 'event',
}

export interface WechatMsg {
  MsgType: WechaMsgTypes;
  FromUserName: string;
  ToUserName: string;
  CreateTime: number;
}

export interface WechatCommonMsg extends WechatMsg {
  MsgId?: string;
  MsgDataId?: string;
  Idx?: string;
}

export interface WechatTextMsg extends WechatCommonMsg {
  Content: string;
}

export interface WechatImageMsg extends WechatCommonMsg {
  PicUrl: string;
}

export interface WechatLocationMsg extends WechatCommonMsg {
  Location_X: number;
  Location_Y: number;
  Scale?: number;
  Label?: string;
}

export enum WechatEventType {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  LOCATION = 'LOCATION',
  CLICK = 'CLICK',
  VIEW = 'VIEW',
}

export interface WechatEventMsg extends WechatMsg {
  Event: WechatEventType;
}

export interface WechatAccessTokenPayload {
  access_token: string;
  expires_in: number;
}

export interface WechatSignature {
  signature: string;
  timestamp: string;
  nonce: string;
  echostr?: string;
}

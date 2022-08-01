export const config = {
  port: process.env.PORT || 3000,
  wechat: {
    appId: process.env.WECHAT_APP_ID,
    appSecret: process.env.WECHAT_APP_SECRET,
    token: process.env.WECHAT_TOKEN,
    encodingAESKey: process.env.WECHAT_ENCODING_AES_KEY,
  },
};

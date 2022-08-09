export const WECHAT_ACCESS_TOKEN_KEY = 'WECHAT:ACCESS_TOKEN';

export const SUPPORTED_TEXT = ['吃什么'];
export const SUBSCRIBE_TEXT = `欢迎关注良民网!

🤔每天纠结和小伙伴吃什么❓
🤓本站自研【趣饭团】智能AI
👋跟纠结说拜拜

试试对我说：
${SUPPORTED_TEXT.map((i) => `✅${i}\n`).join('')}

🌹饭团功能即将上线，敬请期待~
`;

export enum MsgActions {
  WHAT_TO_EAT = 'WHAT_TO_EAT',
}
export enum LRU_SUFFIX {
  PLACE = 'PLACE',
}
export const DEFAULT_MSG = [
  '你在说什么？',
  'Who are you?',
  '你是谁？',
  '真是搞不懂你',
  '让我猜猜?',
  '原来如此?',
  '什么？',
  '是吗？',
];
export const AUTO_MSG = {
  [MsgActions.WHAT_TO_EAT]: ['e', 'ee', 'eat', 'g', 'go', 'what to eat', '吃什么', '吃', '什么', '怎么吃'],
};

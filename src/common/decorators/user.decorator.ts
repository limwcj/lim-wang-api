import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../types/tokenPayload.interface';

export const UserInfo = createParamDecorator((data, ctx: ExecutionContext) => getUser(ctx));

export function getUser(ctx): TokenPayload {
  return ctx.args[2].req.user;
}

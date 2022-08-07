import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { split } from 'lodash';
import { Observable } from 'rxjs';

import { config } from '../../config';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const bearerToken = context.getArgs()[2].req.headers['authorization'];
    const apiKey = split(bearerToken, ' ')[1];
    return apiKey === config.apiKey;
  }
}

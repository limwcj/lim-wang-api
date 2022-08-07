import { Resolver } from '@nestjs/graphql';
import Redis from 'ioredis';

import { config } from '../../config';

let redisClient: Redis;

@Resolver()
export class RedisClient {
  constructor() {
    redisClient = new Redis(config.redis);
  }

  get instance() {
    return redisClient;
  }
}

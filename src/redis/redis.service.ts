import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor(@Inject('REDIS_CLIENT') client: Redis) {
    this.client = client;
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, time?: number): Promise<void> {
    if (time !== undefined) {
      await this.client.set(key, value, 'EX', time);
    } else {
      await this.client.set(key, value);
    }
  }
}

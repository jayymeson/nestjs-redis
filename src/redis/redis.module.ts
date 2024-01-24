import { Module, Global, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

const redisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB, 10),
    });
  },
};

@Global()
@Module({
  providers: [RedisService, redisProvider],
  exports: [RedisService],
})
export class RedisModule {}

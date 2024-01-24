import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}

  async getFakeUsersWithCache() {
    let users = await this.redisService.get('users');

    if (!users) {
      console.log('\x1b[33m%s\x1b[0m', 'dados vindo do db');
      const fakeUsers = await this.prismaService.generateFakeUsers(10);

      await this.redisService.set(
        'users',
        JSON.stringify(fakeUsers),
        10, // Tempo de expiração do cache em segundos
      );
      users = JSON.stringify(fakeUsers);
    } else {
      console.log('\x1b[32m%s\x1b[0m', 'dados vindo do cache');
      users = JSON.parse(users);
    }

    return users;
  }

  async generateFakeUsersDb() {
    // Sempre gera e retorna usuários falsos
    const fakeUsers = await this.prismaService.generateFakeUsers(10);
    return fakeUsers;
  }
}

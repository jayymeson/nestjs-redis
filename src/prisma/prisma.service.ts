import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async generateFakeUsers(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
      const user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
      };
      users.push(this.user.create({ data: user }));
    }
    return Promise.all(users);
  }
}

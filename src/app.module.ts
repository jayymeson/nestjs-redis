import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

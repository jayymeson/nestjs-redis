import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cache')
  getFakeUsersWithCache() {
    return this.appService.getFakeUsersWithCache();
  }

  @Get('/no-cache')
  getFakeUsers() {
    return this.appService.generateFakeUsersDb();
  }
}

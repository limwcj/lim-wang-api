import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppResolver {
  constructor() {}

  @Get()
  async rootPath() {
    return 'SUCCESS';
  }
}

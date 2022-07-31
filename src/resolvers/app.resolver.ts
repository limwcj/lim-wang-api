import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppResolver {
  @Get()
  rootPath(): string {
    return 'SUCCESS';
  }
}

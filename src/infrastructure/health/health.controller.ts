import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/health')
  async check() {
    return { status: 'ok' };
  }
} 
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { Ok } from 'src/utils';

@ApiTags('Health-Check')
@Controller()
export class HealthCheckController {
  constructor() {}

  @Get()
  async healthCheck(): Promise<Ok> {
    return new Ok();
  }
}

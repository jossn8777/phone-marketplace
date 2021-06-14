import { ApiProperty } from '@nestjs/swagger';

export class Count {
  @ApiProperty()
  count: number;
}

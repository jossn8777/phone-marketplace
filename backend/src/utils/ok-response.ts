import { ApiProperty } from '@nestjs/swagger';

export class Ok {
  @ApiProperty()
  public message: string;

  constructor(message?: string) {
    this.message = message || 'ok';
  }
}

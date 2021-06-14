import { ApiProperty } from '@nestjs/swagger';

export class Paginate<T> {
  @ApiProperty()
  total: number;

  items: T[];

  constructor(datas: T[], count: number) {
    this.total = count || 0;
    this.items = datas;
  }
}

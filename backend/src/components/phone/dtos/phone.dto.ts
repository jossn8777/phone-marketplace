import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PHONE } from 'src/constants';

export class PhoneDto {
  @ApiProperty({
    default: 'phone-name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    default: PHONE.STATUS.ACTIVE,
  })
  @IsOptional()
  status: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  manufacturer?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  color?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  price?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  screen?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  processor?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  ram?: string;
}

export class PhoneUploadDto {
  @ApiProperty({
    type: 'file',
  })
  picture: Buffer;
}

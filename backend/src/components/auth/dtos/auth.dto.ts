import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Trim } from '../../../utils/customTransformers';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'superadmin' })
  userIdentity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class RefreshTokenBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  refreshToken: string;
}

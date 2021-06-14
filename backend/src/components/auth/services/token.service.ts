import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { RedisService } from '../../../global_modules/redis/redis.service';
import { IUser } from '../../../common/interfaces';
import { v4 as uuidv4 } from 'uuid';
import config from '../../../config';
import { ERROR_CODE } from '../../../constants';

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async createToken(
    payload: IUser,
    requireRefreshToken = true,
  ): Promise<AuthToken> {
    const accessToken = this.jwtService.sign(payload);
    if (!requireRefreshToken) {
      return { accessToken };
    }
    const refreshToken = uuidv4();
    await this.redisService.setAsync(
      refreshToken,
      accessToken,
      'EX', // seconds
      // 'PX', // mili-sec
      Number(config.REFRESH_TOKEN_TTL),
    );
    return { accessToken, refreshToken };
  }

  async decodeAccessTokenByRefreshToken(refreshToken: string) {
    const accessToken = await this.redisService.getAsync(refreshToken);
    if (!accessToken) {
      throw new BadRequestException(ERROR_CODE.INVALID_REFRESH_TOKEN);
    }
    return this.jwtService.verify(accessToken, { ignoreExpiration: true });
  }

  async deleteRefreshToken(refreshToken: string) {
    return this.redisService.delAsync(refreshToken);
  }
}

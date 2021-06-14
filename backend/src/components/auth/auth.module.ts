import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import config from '../../config';
import { AuthController } from './controller';
import { AuthService, TokenService } from './services';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: Number(config.JWT_EXP_TIME) },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}

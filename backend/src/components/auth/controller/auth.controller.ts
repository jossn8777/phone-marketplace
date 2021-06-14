import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';

import { LoginBody, RefreshTokenBody } from '../dtos';
import { AuthToken, AuthService } from '../services';
import { Ok } from 'src/utils';
import { LoggingInterceptor } from 'src/common/interceptors';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginBody): Promise<AuthToken> {
    const { userIdentity, password } = body;
    return this.authService.login(userIdentity, password);
  }

  @Post('refreshToken')
  async refreshToken(@Body() body: RefreshTokenBody): Promise<AuthToken> {
    const { refreshToken } = body;
    return this.authService.refreshToken(refreshToken);
  }
}

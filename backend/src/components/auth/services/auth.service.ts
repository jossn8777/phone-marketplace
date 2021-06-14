import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ProviderRepository } from '../../../repositories';
import { AuthToken, TokenService } from './token.service';
import { Provider } from '../../../entities';
import bcrypt = require('bcrypt');
import { ERROR_CODE } from '../../../constants/error.constant';

@Injectable()
export class AuthService {
  constructor(
    private providerRepository: ProviderRepository,
    private tokenService: TokenService,
  ) {}

  async login(userIdentity: string, password: string): Promise<AuthToken> {
    let user: Provider;
    const existedUser = await this.providerRepository.findOne({
      select: ['id', 'username', 'passwordHash'],
      where: [{ username: userIdentity }],
    });

    if (!existedUser) {
      user = await this.providerRepository.save(
        this.providerRepository.create({
          username: userIdentity,
          passwordHash: password,
        }),
      );
    } else {
      user = existedUser;

      const validPassword = bcrypt.compareSync(password, user.passwordHash);
      if (!validPassword) {
        throw new UnauthorizedException(ERROR_CODE.INVALID_PASSWORD);
      }
    }

    try {
      return await this.tokenService.createToken({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      if (error.message.includes('not a valid phone number')) {
        throw new BadRequestException(ERROR_CODE.INVALID_PHONE_NUMBER);
      }
    }
  }

  async refreshToken(oldRefreshToken: string): Promise<AuthToken> {
    const data = await this.tokenService.decodeAccessTokenByRefreshToken(
      oldRefreshToken,
    );
    if (!data.id) {
      throw new BadRequestException(ERROR_CODE.INVALID_DECODED_ACCESS_TOKEN);
    }
    const user = await this.providerRepository.findOne({ id: data.id });
    this.checkUser(user);
    await this.tokenService.deleteRefreshToken(oldRefreshToken);
    return this.tokenService.createToken({
      id: user.id,
      username: user.username,
    });
  }

  private checkUser(user: Provider) {
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
  }
}

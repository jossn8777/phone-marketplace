import { mixin, Type, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {}

interface AuthSetting {
  isOptional?: boolean;
}

export function JWTAuth(setting?: AuthSetting): Type<any> {
  return mixin(
    class JwtGuard extends AuthGuard('jwt') {
      handleRequest(err, user, info, context) {
        if (setting?.isOptional) {
          return user;
        }

        if (err || !user) {
          throw err || new UnauthorizedException();
        }

        return user;
      }
    },
  );
}

import { SetMetadata } from '@nestjs/common';

export const IsAuthOptional = (isOptional = false): any =>
  SetMetadata('isAuthOptional', isOptional);

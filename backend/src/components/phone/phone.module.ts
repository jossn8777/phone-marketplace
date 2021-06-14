import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PaginationMiddleware } from 'src/common/middlewares';
import config from 'src/config';
import { PhoneController } from './controllers';
import { PhoneService } from './services';

@Module({
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        PaginationMiddleware({
          filterFields: ['statuses'],
          sortFields: ['createdAt', 'updatedAt'],
          defaultSort: { field: 'createdAt', order: 'DESC' },
        }),
      )
      .forRoutes(
        { path: '/phones', method: RequestMethod.GET },
        { path: '/phones/count', method: RequestMethod.GET },
      );
  }
}

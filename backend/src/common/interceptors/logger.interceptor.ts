import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from 'src/global_modules/logger/main.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  calculateTime(now: number): number {
    const spentTime = Date.now() - now;

    return spentTime;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const methodKey = context.getHandler().name;
    const className = context.getClass().name;

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.calculateTime(now)))
      .pipe(
        catchError((err) => {
          const spentTime = this.calculateTime(now);

          const input = {
            query: req?.query,
            params: req?.params,
            pagination: req?.pagination,
          };
          this.loggerService.error(
            methodKey,
            className,
            req?.originalUrl,
            input,
            err,
            spentTime,
            {
              id: req?.user?.id,
            },
          );
          return throwError(err);
        }),
      );
  }
}

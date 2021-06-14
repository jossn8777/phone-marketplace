import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import ormconfig = require('./ormconfig');
import { AuthModule } from './components/auth/auth.module';
import { RedisModule } from './global_modules/redis/redis.module';
import { RepositoryModule } from './global_modules/repository/repository.module';
import { JwtStrategy } from './common/strategies';
import { PhoneModule } from './components/phone/phone.module';
import { HealthCheckModule } from './components/healthcheck/health-check.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ImageProcessingModule } from './global_modules/image-processing/image-processing.module';
import { LoggerModule } from './global_modules/logger/logger.module';

@Module({
  imports: [
    PassportModule, // exports AuthGuard
    TypeOrmModule.forRoot(ormconfig),

    // components
    AuthModule,
    PhoneModule,

    HealthCheckModule,

    // global modules
    RedisModule,
    RepositoryModule,
    HttpModule,
    ImageProcessingModule,
    LoggerModule,

    // Background jobs
    ScheduleModule.forRoot(),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  providers: [
    JwtStrategy, // extends JwtGuard
  ],
})
export class AppModule {}

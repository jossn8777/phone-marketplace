import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

import config from './config';

declare const module: any;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = [];
        for (const error of errors) {
          message.push({
            property: error.property,
            constraints: error.constraints,
            details: config?.ENV_PROJECT !== 'PRODUCTION' ? error : null,
          });
        }
        return new BadRequestException(message);
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (config?.SWAGGER === 'yes') {
    const options = new DocumentBuilder()
      .setTitle('Phone Marketplace')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(config.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};
bootstrap();

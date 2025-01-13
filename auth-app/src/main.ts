import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as basicAuth from 'express-basic-auth';
import { setupSwagger } from './config/swagger/swagger.config';
import {
  ValidationException,
  ValidationFilter,
} from './common/filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const appConfig: AppConfigService = app.get(AppConfigService);
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: appConfig.version,
  });

  // validation filters
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((err) => {
          errMsg[err.property] = [...Object.values(err.constraints)];
        });
        return new ValidationException(errMsg);
      },
    }),
  );

  app.use(
    '/api-docs',
    basicAuth({
      challenge: true,
      users: { ['admin']: 'password' },
    }),
  );

  // Call the setupSwagger function after other configurations
  setupSwagger(app);
  await app.listen(appConfig.port ?? 3003);
}
bootstrap();

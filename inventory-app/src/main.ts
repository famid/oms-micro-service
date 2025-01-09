import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { ValidationError } from 'class-validator';
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
  await app.listen(process.env.PORT ?? 3000);
  // await app.listen(parseInt(String(appConfig.port)));
}
bootstrap();

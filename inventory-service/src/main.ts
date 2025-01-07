import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  // Use ConfigService for dynamic configuration
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', 3001);

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port);
  Logger.log(`🚀 Inventory Service is running on port ${port}`);
}

bootstrap();

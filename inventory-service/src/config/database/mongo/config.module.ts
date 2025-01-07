import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGODB_HOST: Joi.string().default('mongodb'),
        MONGODB_PORT: Joi.number().default(7013),
        MONGODB_USER: Joi.string().default('root'),
        MONGODB_PASSWORD: Joi.string().default('password'),
        MONGODB_DATABASE: Joi.string().default('qrius'),
        MONGODB_URI: Joi.string().default('mongodb://mongodb:7013/qrius'),
      }),
    }),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}

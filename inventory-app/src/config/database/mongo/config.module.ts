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
        MONGODB_HOST: Joi.string().default('mongo'),
        MONGODB_PORT: Joi.number().default(27073),
        MONGODB_USER: Joi.string().default('root'),
        MONGODB_PASSWORD: Joi.string().default('example'),
        MONGODB_DATABASE: Joi.string().default('inventory_db'),
        MONGODB_URI: Joi.string().default(
          'mongodb://mongodb:27073/inventory_db',
        ),
      }),
    }),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}

import { Module } from '@nestjs/common';
import { MongoConfigModule } from 'src/config/database/mongo/config.module';
import { MongoConfigService } from 'src/config/database/mongo/config.service';
import { MongooseModule } from '@nestjs/mongoose';

/**
 *  Mongodb Connection Provider Module
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      inject: [MongoConfigService],
      useFactory: async (mongoConfigService: MongoConfigService) => {
        console.log('Mongo URI:', mongoConfigService.uri); // This will log the URI
        return {
          uri: `${mongoConfigService.uri}`,
        };
      },
    }),
  ],
})
export class MongoDatabaseProviderModule {}

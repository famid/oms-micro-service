import { Module } from '@nestjs/common';
import { MongoConfigModule } from 'src/config/database/mongo/config.module';
import { MongoConfigService } from 'src/config/database/mongo/config.service';
import { MongooseModule } from '@nestjs/mongoose';

/**
 *  Mongodb Connection Provider Module
 *
 * @author Ahsanul Hoque Famid <https://github.com/famid>
 * @date 2022-10-23 00:00:36
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      inject: [MongoConfigService],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: `${mongoConfigService.uri}`,
      }),
    }),
  ],
})
export class MongoDatabaseProviderModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDatabaseProviderModule } from './provider/database/mongo/provider.module';

@Module({
  imports: [MongoDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

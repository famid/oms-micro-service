import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDatabaseProviderModule } from './provider/database/mongo/provider.module';
import { AppConfigModule } from './config/app/config.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { RabbitMQProviderModule } from './provider/rabbitmq/provider.modules';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongoDatabaseProviderModule,
    RabbitMQProviderModule,
    AppConfigModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // Optional: Print a confirmation message on successful connection
    console.log('MongoDB connection established successfully.');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/config.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PostgresDatabaseProviderModule } from './provider/database/postgres/provider.module';
import { RabbitMQProviderModule } from './provider/database/rabbitmq/provider.modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make config global
    AppConfigModule,
    // Database connection
    PostgresDatabaseProviderModule,
    RabbitMQProviderModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // Optional: Print a confirmation message on successful connection
    console.log('Postgres connection established successfully.');
  }
}

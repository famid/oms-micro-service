import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/config.module';
import { PostgresDatabaseProviderModule } from './provider/database/postgres/provider.module';
import {PaymentModule} from "./modules/payment/payment.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make config global
    AppConfigModule,
    // Database connection
    PostgresDatabaseProviderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentTransaction } from './entity/payment-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderClientService } from './services/order-client.service';
import { RabbitMQProviderModule } from '../../provider/rabbitmq/provider.modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentTransaction]),
    RabbitMQProviderModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, OrderClientService],
})
export class PaymentModule {}

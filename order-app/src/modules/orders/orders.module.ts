import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { RabbitMQProviderModule } from '../../provider/database/rabbitmq/provider.modules';
import { InventoryClientService } from './services/inventory-client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    RabbitMQProviderModule,
    // Import the dynamic RabbitMQ module
  ],
  controllers: [OrderController],
  providers: [OrderService, InventoryClientService],
})
export class OrdersModule {}

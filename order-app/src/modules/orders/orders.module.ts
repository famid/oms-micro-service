import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}

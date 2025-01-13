import { Module } from '@nestjs/common';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { RabbitMQProviderModule } from '../../provider/rabbitmq/provider.modules';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PRODUCTS', schema: ProductSchema }]),
    RabbitMQProviderModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}

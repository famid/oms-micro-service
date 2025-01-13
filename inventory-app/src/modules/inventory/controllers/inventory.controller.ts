import { Controller, Get, Put, Post, Param, Body } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { InventoryService } from '../services/inventory.service';
import { UpdateProductStockDto } from '../dto/update-product-stock.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { InventorySwagger } from '../swagger/swagger.inventory';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  // Get product stock
  @InventorySwagger.getProductStock()
  @Get(':product_id')
  async getProductStock(@Param('product_id') productId: string) {
    return await this.inventoryService.getProductStock(productId);
  }

  // update product by id
  @InventorySwagger.updateProductStock()
  @Put(':product_id')
  async updateProductStock(
    @Param('product_id') productId: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return await this.inventoryService.updateProductStock(
      productId,
      updateProductStockDto.quantity,
    );
  }

  // Add new products
  @InventorySwagger.addNewProduct()
  @Post()
  async addNewProduct(@Body() createProductDto: CreateProductDto) {
    return await this.inventoryService.createProduct(createProductDto);
  }

  @RabbitSubscribe({
    exchange: 'inventory_exchange', // Exchange defined in the Order App
    routingKey: 'inventory.update_stock', // Routing key for stock updates
    queue: 'inventory_update_queue', // Queue specific to the Inventory Service
  })
  async handleStockUpdateMessage(msg: any) {
    console.log('Received stock update message:', msg);

    // Call the service method to handle stock updates
    await this.inventoryService.handleStockUpdate(msg);
  }
}

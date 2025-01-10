import { Controller, Get, Put, Post, Param, Body } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { InventoryService } from '../services/inventory.service';
import { UpdateProductStockDto } from '../dto/update-product-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Get product stock (GET /inventory/{product_id})
  @Get(':product_id')
  async getProductStock(@Param('product_id') productId: string) {
    return await this.inventoryService.getProductStock(productId);
  }

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
  @Post()
  async addNewProduct(@Body() createProductDto: CreateProductDto) {
    return await this.inventoryService.createProduct(createProductDto);
  }
}

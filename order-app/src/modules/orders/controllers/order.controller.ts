import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { PlaceOrderDto } from '../dto/place-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Place a new order
  @Post()
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return await this.orderService.placeOrder(placeOrderDto);
  }

  // Retrieve order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  /**
   * Retrieve all orders, including their order items.
   */
  @Get()
  async getAllOrders(
    @Query('current_page') currentPage: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('status') status?: string,
  ) {
    return await this.orderService.getAllOrders(currentPage, perPage, status);
  }
}

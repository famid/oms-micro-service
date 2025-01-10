import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  // Retrieve all orders
  @Get()
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { PlaceOrderDto } from '../dto/place-order.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  /**
   * Send a dummy message to RabbitMQ (Producer)
   */
  @Get('/send-message')
  async sendMessage() {
    console.log('MESSGE CAME HERE!!!!!!');
    return this.orderService.sendDummyMessage('Demmon is coming!!!');
  }

  /**
   * Consume messages from RabbitMQ (Consumer)
   */
  @EventPattern('dummy_event') // This should match the routing key used in the producer
  async consumeDummyMessage(@Payload() data: any) {
    console.log('Message received by consumer:', data);
    // Add logic to process the message
  }

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

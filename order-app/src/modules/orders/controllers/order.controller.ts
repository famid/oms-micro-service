import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { PlaceOrderDto } from '../dto/place-order.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ApiTags } from '@nestjs/swagger';
import { OrderSwagger } from '../swagger/order.swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @OrderSwagger.placeOrder()
  @Post()
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return await this.orderService.placeOrder(placeOrderDto);
  }

  @OrderSwagger.getOrderById()
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  @OrderSwagger.getAllOrders()
  @Get()
  async getAllOrders(
    @Query('current_page') currentPage: number = 1,
    @Query('per_page') perPage: number = 10,
    @Query('status') status?: string,
  ) {
    return await this.orderService.getAllOrders(currentPage, perPage, status);
  }

  @RabbitSubscribe({
    exchange: 'payment_exchange',
    routingKey: 'payment.success',
    queue: 'order_payment_success_queue',
  })
  async handlePaymentSuccess(msg: any) {
    console.log('Received payment success message:', msg);
    const { orderId, paymentId } = msg;

    if (!orderId || !paymentId) {
      console.error('Invalid message format for success:', msg);
      return;
    }

    // Call the service method for successful payments
    await this.orderService.handlePaymentSuccess(orderId);
  }

  @RabbitSubscribe({
    exchange: 'payment_exchange',
    routingKey: 'payment.failed',
    queue: 'order_payment_failed_queue',
  })
  async handlePaymentFailure(msg: any) {
    console.log('Received payment failure message:', msg);
    const { orderId, failure_reason } = msg;

    if (!orderId || !failure_reason) {
      console.error('Invalid message format for failure:', msg);
      return;
    }

    // Call the service method for failed payments
    await this.orderService.handlePaymentFailure(orderId);
  }
}

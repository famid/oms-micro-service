import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentSwagger } from '../swagger/payment.swagger';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Process a payment
   */
  @PaymentSwagger.processPayment()
  @Post()
  async processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    return this.paymentService.processPayment(processPaymentDto);
  }

  /**
   * Retrieve payment status by ID
   */
  @PaymentSwagger.getPaymentStatus()
  @Get(':id')
  async getPaymentStatus(@Param('id') id: string) {
    return this.paymentService.getPaymentStatus(id);
  }
}

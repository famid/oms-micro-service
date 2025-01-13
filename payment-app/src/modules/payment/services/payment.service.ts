import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { PaymentTransaction } from '../entity/payment-transaction.entity';
import { OrderClientService } from './order-client.service';
import { RabbitMQProviderModule } from '../../../provider/rabbitmq/provider.modules';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private readonly paymentRepository: Repository<PaymentTransaction>,
    private readonly dataSource: DataSource,
    private readonly orderClientService: OrderClientService,
    private readonly rabbitmqService: RabbitMQProviderModule,
  ) {}

  /**
   * Process a payment transaction
   */
  async processPayment(processPaymentDto: ProcessPaymentDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { order_id, amount } = processPaymentDto;

      // Fetch order details from the Order Service
      const orderDetails =
        await this.orderClientService.getOrderDetails(order_id);

      // Validate order status
      if (orderDetails.status === 'completed') {
        throw {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Cannot process payment for a completed order.',
          error: {},
        };
      }

      // Validate order amount
      if (Number(orderDetails.total_amount) !== Number(amount)) {
        throw {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Payment amount does not match the order total.',
          error: {},
        };
      }

      // Mock payment processing: 70% success rate
      const isSuccess = Math.random() > 0.3;
      const status = isSuccess ? 'success' : 'failed';

      // Create payment transaction
      const newPayment = this.paymentRepository.create({
        order_id,
        amount,
        status,
        failure_reason: isSuccess ? null : 'Insufficient funds', // Mock failure reason
      });

      const savedPayment = await queryRunner.manager.save(newPayment);

      // Publish Message to RabbitMQ
      const exchange = 'payment_exchange';

      const routingKey = isSuccess ? 'payment.success' : 'payment.failed';
      const message = {
        event: isSuccess ? 'Payment Success' : 'Payment Failed',
        paymentId: savedPayment.id,
        orderId: savedPayment.order_id,
        amount: savedPayment.amount,
        status: savedPayment.status,
      };

      await this.rabbitmqService.publish(
        'payment_exchange',
        routingKey,
        message,
      );
      console.log(
        `Published message to exchange '${exchange}' with routing key '${routingKey}':`,
        message,
      );

      // Commit transaction
      await queryRunner.commitTransaction();

      return {
        success: isSuccess,
        statusCode: HttpStatus.CREATED,
        message: isSuccess
          ? 'Payment processed successfully.'
          : 'Payment failed.',
        response: {
          paymentId: savedPayment.id,
          orderId: savedPayment.order_id,
          amount: savedPayment.amount,
          status: savedPayment.status,
        },
      };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();

      console.error('PROCESS PAYMENT ERROR:', error);

      throw new HttpException(
        {
          success: false,
          statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to process payment. Please try again later.',
          error: error.message || {},
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  /**
   * Retrieve payment status by ID
   */
  async getPaymentStatus(id: string) {
    try {
      // Fetch payment by ID
      const payment = await this.paymentRepository.findOne({ where: { id } });

      if (!payment) {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Payment not found.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Payment retrieved successfully.',
        data: payment,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to process payment. Please try again later.',
          error: error.message || {},
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

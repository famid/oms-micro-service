import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { PlaceOrderDto } from '../dto/place-order.dto';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly dataSource: DataSource,
    @Inject('DUMMY_QUEUE_SERVICE') private readonly rabbitMQClient: ClientProxy,
  ) {}

  async placeOrder(placeOrderDto: PlaceOrderDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { customer_id, order_items } = placeOrderDto;

      // Calculate the total amount from the order items
      const totalAmount = order_items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      // Create the order using the repository
      const newOrder = this.orderRepository.create({
        customer_id,
        total_amount: totalAmount,
        status: 'PENDING',
      });

      const savedOrder = await queryRunner.manager.save(newOrder);

      // Create order items using the repository
      const orderItems = order_items.map((item) =>
        this.orderItemRepository.create({
          order_id: savedOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        }),
      );

      await queryRunner.manager.save(orderItems);

      // Commit transaction
      await queryRunner.commitTransaction();

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Order placed successfully.',
        response: {
          orderId: savedOrder.id,
          totalAmount: savedOrder.total_amount,
          status: savedOrder.status,
          items: orderItems,
        },
      };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();

      console.error('PLACE ORDER ERROR:', error);

      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to place the order. Please try again later.',
          error: error.message || {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  /**
   * Get a single order by ID, including its order items.
   * @param id - The ID of the order to retrieve
   */
  async getOrderById(id: string) {
    try {
      // Fetch the order by ID, including related order items
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['order_items'], // Include related order items
      });

      if (!order) {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Order not found.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Order retrieved successfully.',
        data: order,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve the order.',
          error: error.message || {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllOrders(
    currentPage: number = 1,
    perPage: number = 10,
    status?: string,
  ) {
    try {
      // Ensure that currentPage and perPage are numbers
      currentPage = Number(currentPage);
      perPage = Number(perPage);

      if (isNaN(currentPage) || isNaN(perPage)) {
        throw new Error('Invalid pagination values');
      }
      // Calculate pagination offsets
      const skip = (currentPage - 1) * perPage;
      const take = perPage;

      // Build the query with optional filters
      const queryBuilder = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.order_items', 'order_items')
        .orderBy('order.created_at', 'DESC') // Corrected field name
        .skip(skip)
        .take(take);

      if (status) {
        queryBuilder.where('LOWER(order.status) = LOWER(:status)', { status });
      }

      // Fetch the orders
      const [orders, total] = await queryBuilder.getManyAndCount();

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Orders retrieved successfully.',
        data: {
          orders,
          pagination: {
            current_page: currentPage,
            per_page: perPage,
            total,
            total_pages: Math.ceil(total / perPage),
          },
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve orders.',
          error: error.message || {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Send a dummy message to RabbitMQ
   */
  async sendDummyMessage(message: string) {
    const payload = { message, timestamp: new Date().toISOString() };
    this.rabbitMQClient.emit('dummy_event', payload); // Emit message to RabbitMQ
    console.log('Message sent:', payload);
    return { success: true, payload };
  }
}

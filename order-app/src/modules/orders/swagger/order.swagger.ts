import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlaceOrderDto } from '../dto/place-order.dto';
import {
  OrderResponseDto,
  PaginatedOrderResponseDto,
} from '../dto/swagger/order-response.dto';
import { ErrorResponseDto } from '../dto/swagger/error-response.dto';

export class OrderSwagger {
  static placeOrder() {
    return applyDecorators(
      ApiTags('Orders'),
      ApiOperation({ summary: 'Place a new order' }),
      ApiBody({ type: PlaceOrderDto }),
      ApiResponse({
        status: 201,
        description: 'Order placed successfully.',
        type: OrderResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Bad request or insufficient stock.',
        type: ErrorResponseDto,
      }),
    );
  }

  static getOrderById() {
    return applyDecorators(
      ApiTags('Orders'),
      ApiOperation({ summary: 'Retrieve order by ID' }),
      ApiParam({
        name: 'id',
        description: 'Order ID',
        example: 'order123',
      }),
      ApiResponse({
        status: 200,
        description: 'Order retrieved successfully.',
        type: OrderResponseDto,
      }),
      ApiResponse({
        status: 404,
        description: 'Order not found.',
        type: ErrorResponseDto,
      }),
    );
  }

  static getAllOrders() {
    return applyDecorators(
      ApiTags('Orders'),
      ApiOperation({ summary: 'Retrieve all orders' }),
      ApiQuery({
        name: 'current_page',
        description: 'Current page number',
        example: 1,
        required: false,
      }),
      ApiQuery({
        name: 'per_page',
        description: 'Number of orders per page',
        example: 10,
        required: false,
      }),
      ApiQuery({
        name: 'status',
        description: 'Filter by order status',
        example: 'PENDING',
        required: false,
      }),
      ApiResponse({
        status: 200,
        description: 'Paginated list of orders.',
        type: PaginatedOrderResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid pagination values or query parameters.',
        type: ErrorResponseDto,
      }),
    );
  }
}

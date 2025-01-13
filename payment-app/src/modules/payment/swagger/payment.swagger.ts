import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { ErrorResponseDto } from '../dto/swagger/error-response.dto';

export class PaymentSwagger {
  static processPayment() {
    return applyDecorators(
      ApiTags('Payments'),
      ApiOperation({ summary: 'Process a payment for an order' }),
      ApiBody({
        description: 'Details of the payment to be processed',
        type: ProcessPaymentDto,
      }),
      ApiResponse({
        status: 201,
        description: 'Payment processed successfully.',
        schema: {
          example: {
            success: true,
            statusCode: 201,
            message: 'Payment processed successfully.',
            response: {
              paymentId: '123e4567-e89b-12d3-a456-426614174000',
              orderId: '223e4567-e89b-12d3-a456-426614174001',
              amount: 100.0,
              status: 'success',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid payment details or order validation failed.',
        type: ErrorResponseDto,
      }),
      ApiResponse({
        status: 500,
        description: 'Internal server error while processing the payment.',
        type: ErrorResponseDto,
      }),
    );
  }

  static getPaymentStatus() {
    return applyDecorators(
      ApiTags('Payments'),
      ApiOperation({ summary: 'Retrieve payment status by ID' }),
      ApiParam({
        name: 'id',
        description: 'Payment ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiResponse({
        status: 200,
        description: 'Payment status retrieved successfully.',
        schema: {
          example: {
            success: true,
            statusCode: 200,
            message: 'Payment retrieved successfully.',
            data: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              order_id: '223e4567-e89b-12d3-a456-426614174001',
              amount: 100.0,
              status: 'success',
              failure_reason: null,
              created_at: '2025-01-12T12:34:56Z',
              updated_at: '2025-01-12T12:34:56Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Payment not found for the given ID.',
        type: ErrorResponseDto,
      }),
      ApiResponse({
        status: 500,
        description: 'Internal server error while retrieving payment status.',
        type: ErrorResponseDto,
      }),
    );
  }
}
